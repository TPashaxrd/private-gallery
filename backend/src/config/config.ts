import dotenv from "dotenv";
import path from "path";

dotenv.config();

const rootDir =
  process.env.NODE_ENV === "development"
    ? process.cwd()
    : path.join(process.cwd(), "dist");

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "development",

  apiPrefix: process.env.API_PREFIX || "/api",
  apiKey: process.env.API_KEY || "your-secret-key-here", // KEY

  videosPath: path.join(rootDir, "videos"),
  picturesPath: path.join(rootDir, "pictures"),
  videosJsonPath: path.join(rootDir, "videos.json"),
  picturesJsonPath: path.join(rootDir, "pictures.json"),
} as const;
