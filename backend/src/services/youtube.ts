import { google } from "googleapis";
import fs from "fs";
import path from "path";
import os from "os";
import youtubedl from "youtube-dl-exec";
import ffmpegPath from "ffmpeg-static";

const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_API_KEY,
});

export interface VideoMetadata {
  videoId: string;
  title: string;
  thumbnail: string;
  duration: number;
}

export interface YouTubeService {
  extractVideoId(url: string): string | null;
  getVideoMetadata(videoId: string): Promise<VideoMetadata>;
  downloadAudio(videoId: string): Promise<Buffer>;
}

class YouTubeServiceImpl implements YouTubeService {
  /**
   * Extract video ID from various YouTube URL formats
   * Supports:
   * - https://www.youtube.com/watch?v=VIDEO_ID
   * - https://youtu.be/VIDEO_ID
   * - https://www.youtube.com/embed/VIDEO_ID
   */
  extractVideoId(url: string): string | null {
    try {
      const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
        /^([a-zA-Z0-9_-]{11})$/, // Direct video ID
      ];

      for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
          return match[1];
        }
      }

      return null;
    } catch (error) {
      console.error("Error extracting video ID:", error);
      return null;
    }
  }

  /**
   * Get video metadata using YouTube Data API v3
   */
  async getVideoMetadata(videoId: string): Promise<VideoMetadata> {
    try {
      if (!process.env.YOUTUBE_API_KEY) {
        throw new Error("YOUTUBE_API_KEY environment variable is not set. Please add your YouTube Data API v3 key to your environment variables.");
      }

      const response = await youtube.videos.list({
        part: ["snippet", "contentDetails"],
        id: [videoId],
      });

      if (!response.data.items || response.data.items.length === 0) {
        throw new Error(`Video not found: ${videoId}`);
      }

      const video = response.data.items[0];
      const snippet = video.snippet;
      const contentDetails = video.contentDetails;

      if (!snippet || !contentDetails) {
        throw new Error("Video metadata is incomplete");
      }

      // Parse ISO 8601 duration format (e.g., "PT1H2M10S" -> 3730 seconds)
      const duration = this.parseDuration(contentDetails.duration || "PT0S");

      // Get the highest quality thumbnail available
      const thumbnail = snippet.thumbnails?.maxres?.url || snippet.thumbnails?.standard?.url || snippet.thumbnails?.high?.url || snippet.thumbnails?.medium?.url || snippet.thumbnails?.default?.url || "";

      return {
        videoId,
        title: snippet.title || "Untitled",
        thumbnail,
        duration,
      };
    } catch (error: any) {
      console.error("Error fetching video metadata:", error);

      // More specific error messages
      if (error.message?.includes("quota")) {
        throw new Error("YouTube API quota exceeded. Please try again later or check your API quota limits.");
      }

      if (error.message?.includes("API key")) {
        throw new Error("Invalid YouTube API key. Please check your YOUTUBE_API_KEY environment variable.");
      }

      throw new Error(`Failed to fetch video metadata: ${error.message}`);
    }
  }

  /**
   * Parse ISO 8601 duration format to seconds
   * Example: "PT1H2M10S" -> 3730 seconds
   */
  private parseDuration(duration: string): number {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return 0;

    const hours = parseInt(match[1] || "0", 10);
    const minutes = parseInt(match[2] || "0", 10);
    const seconds = parseInt(match[3] || "0", 10);

    return hours * 3600 + minutes * 60 + seconds;
  }

  /**
   * Download audio from YouTube video using youtube-dl-exec (yt-dlp)
   * Returns audio as Buffer for processing
   */
  async downloadAudio(videoId: string): Promise<Buffer> {
    try {
      const videoURL = `https://www.youtube.com/watch?v=${videoId}`;

      // Create a temporary file path
      const tempDir = os.tmpdir();
      const tempFilePath = path.join(tempDir, `${videoId}-${Date.now()}.mp3`);

      console.log("Downloading audio for video:", videoId);
      console.log("Temp file path:", tempFilePath);

      // Use youtube-dl-exec to download audio
      await youtubedl(videoURL, {
        extractAudio: true,
        audioFormat: "mp3",
        output: tempFilePath,
        noCheckCertificates: true,
        noWarnings: true,
        preferFreeFormats: true,
        ffmpegLocation: ffmpegPath,
        addHeader: ["referer:youtube.com", "user-agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"],
      });

      // Check if file exists
      if (!fs.existsSync(tempFilePath)) {
        throw new Error("Audio file was not created");
      }

      // Read the file into a buffer
      const audioBuffer = await fs.promises.readFile(tempFilePath);

      // Clean up: delete the temporary file
      try {
        await fs.promises.unlink(tempFilePath);
      } catch (unlinkError) {
        console.warn("Failed to delete temp file:", unlinkError);
      }

      return audioBuffer;
    } catch (error: any) {
      console.error("Error downloading audio:", error);
      throw new Error(`Failed to download audio: ${error.message}`);
    }
  }
}

export const youtubeService: YouTubeService = new YouTubeServiceImpl();
