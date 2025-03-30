import { promises as fs } from "fs";
import { MediaItem, GalleryType } from "../types/gallery.types";
import { config } from "../config/config";

export class GalleryService {
  async getGallery(type: GalleryType): Promise<MediaItem[]> {
    try {
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
}
