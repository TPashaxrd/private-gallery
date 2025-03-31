import { promises as fs } from "fs";
import { MediaItem, GalleryType } from "../types/gallery.types";
import { config } from "../config/config";

export class GalleryService {
  async getGallery(type: GalleryType): Promise<MediaItem[]> {
    try {
      if (type === "all") {
        const [picturesData, videosData] = await Promise.all([
          fs.readFile(config.picturesJsonPath, "utf8"),
          fs.readFile(config.videosJsonPath, "utf8"),
        ]);

        const pictures = JSON.parse(picturesData);
        const videos = JSON.parse(videosData);

        return [...pictures, ...videos].sort((a, b) => b.id - a.id);
      }

      const filePath =
        type === "pictures" ? config.picturesJsonPath : config.videosJsonPath;
      const data = await fs.readFile(filePath, "utf8");
      return JSON.parse(data);
    } catch (error) {
      throw new Error(
        `Error reading ${type} gallery: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  async downloadAll(): Promise<Buffer> {
    try {
      const archiver = require("archiver");
      const zip = archiver("zip", {
        zlib: { level: 9 },
      });

      const pictures = await fs.readdir(config.picturesPath);
      for (const picture of pictures) {
        const filePath = `${config.picturesPath}/${picture}`;
        zip.file(filePath, { name: `pictures/${picture}` });
      }

      const videos = await fs.readdir(config.videosPath);
      for (const video of videos) {
        const filePath = `${config.videosPath}/${video}`;
        zip.file(filePath, { name: `videos/${video}` });
      }

      const chunks: Buffer[] = [];
      zip.on("data", (chunk: Buffer) => chunks.push(chunk));

      return new Promise((resolve, reject) => {
        zip.on("end", () => resolve(Buffer.concat(chunks)));
        zip.on("error", reject);
        zip.finalize();
      });
    } catch (error) {
      throw new Error(
        `Error creating zip: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }
}
