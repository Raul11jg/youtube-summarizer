const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const https = require("https");

// Function to find the youtube-dl-exec package directory
function findYoutubeDlExecPath() {
  try {
    // Try to resolve from require
    const mainPath = require.resolve("youtube-dl-exec");
    // Usually resolves to .../node_modules/youtube-dl-exec/lib/index.js or similar
    // We need the root of the package
    let currentDir = path.dirname(mainPath);
    while (currentDir !== path.parse(currentDir).root) {
      if (fs.existsSync(path.join(currentDir, "package.json"))) {
        const pkg = require(path.join(currentDir, "package.json"));
        if (pkg.name === "youtube-dl-exec") {
          return currentDir;
        }
      }
      currentDir = path.dirname(currentDir);
    }
  } catch (e) {
    console.warn("Could not resolve youtube-dl-exec via require, trying node_modules walk...");
  }

  // Fallback: try standard node_modules locations
  const possiblePaths = [path.join(__dirname, "..", "node_modules", "youtube-dl-exec"), path.join(process.cwd(), "node_modules", "youtube-dl-exec")];

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) return p;
  }

  return null;
}

const pkgRoot = findYoutubeDlExecPath();

if (!pkgRoot) {
  console.error("Could not find youtube-dl-exec package. Make sure it is installed.");
  process.exit(1);
}

const binDir = path.join(pkgRoot, "bin");
const binaryName = process.platform === "win32" ? "yt-dlp.exe" : "yt-dlp";
const binaryPath = path.join(binDir, binaryName);

console.log(`Checking for yt-dlp binary at: ${binaryPath}`);

if (!fs.existsSync(binaryPath)) {
  console.log("yt-dlp binary not found. Attempting to download...");

  // Ensure bin directory exists
  if (!fs.existsSync(binDir)) {
    fs.mkdirSync(binDir, { recursive: true });
  }

  // Determine download URL based on platform
  let downloadUrl = "https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp";
  if (process.platform === "win32") {
    downloadUrl += ".exe";
  } else if (process.platform === "darwin") {
    downloadUrl += "_macos";
  } else {
    // Linux
    downloadUrl += "_linux";
  }

  console.log(`Downloading from: ${downloadUrl}`);

  const file = fs.createWriteStream(binaryPath);
  https
    .get(downloadUrl, (response) => {
      if (response.statusCode !== 200) {
        console.error(`Failed to download: HTTP ${response.statusCode}`);
        fs.unlink(binaryPath, () => {}); // Delete partial file
        process.exit(1);
      }

      response.pipe(file);

      file.on("finish", () => {
        file.close(() => {
          console.log("Download completed.");

          // Make executable on non-Windows
          if (process.platform !== "win32") {
            try {
              execSync(`chmod +x "${binaryPath}"`);
              console.log("Made binary executable.");
            } catch (e) {
              console.error("Failed to chmod binary:", e.message);
            }
          }
          console.log("yt-dlp setup successful.");
        });
      });
    })
    .on("error", (err) => {
      fs.unlink(binaryPath, () => {});
      console.error("Error downloading file:", err.message);
      process.exit(1);
    });
} else {
  console.log("yt-dlp binary already exists.");
}
