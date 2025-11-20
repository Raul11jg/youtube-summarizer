import youtubedl from "youtube-dl-exec";
import fs from "fs";
import path from "path";
import os from "os";
import ffmpegPath from "ffmpeg-static";
import ffprobePath from "ffprobe-static";

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
   * Get video metadata using youtube-dl-exec
   */
  async getVideoMetadata(videoId: string): Promise<VideoMetadata> {
    try {
      const videoURL = `https://www.youtube.com/watch?v=${videoId}`;
      const output = await youtubedl(videoURL, {
        dumpSingleJson: true,
        noWarnings: true,
        noCheckCertificates: true,
        preferFreeFormats: true,
        youtubeSkipDashManifest: true,
        ffmpegLocation: ffmpegPath as string,
      });

      // output is typed as any by the library, but contains the JSON metadata
      const metadata = output as any;

      return {
        videoId,
        title: metadata.title,
        thumbnail: metadata.thumbnail,
        duration: metadata.duration,
      };
    } catch (error: any) {
      console.error("Error fetching video metadata:", error);
      throw new Error(`Failed to fetch video metadata: ${error.message}`);
    }
  }

  /**
   * Download audio from YouTube video
   * Returns audio as Buffer for processing
   */
  async downloadAudio(videoId: string): Promise<Buffer> {
    try {
      const videoURL = `https://www.youtube.com/watch?v=${videoId}`;

      // Create a temporary file path
      const tempDir = os.tmpdir();
      const tempFilePath = path.join(tempDir, `${videoId}-${Date.now()}.mp3`);

      // Download audio using youtube-dl-exec
      await youtubedl(videoURL, {
        extractAudio: true,
        audioFormat: "mp3",
        output: tempFilePath,
        noWarnings: true,
        noCheckCertificates: true,
        ffmpegLocation: ffmpegPath as string,
      });

      // Read the file into a buffer
      const audioBuffer = await fs.promises.readFile(tempFilePath);

      // Clean up: delete the temporary file
      await fs.promises.unlink(tempFilePath);

      return audioBuffer;
    } catch (error: any) {
      console.error("Error downloading audio:", error);
      throw new Error(`Failed to download audio: ${error.message}`);
    }
  }
}

export const youtubeService: YouTubeService = new YouTubeServiceImpl();
