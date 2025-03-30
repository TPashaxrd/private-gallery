import { Request, Response } from "express";
import { GalleryService } from "../services/gallery.service";
import { GalleryType, GalleryResponse } from "../types/gallery.types";

export class GalleryController {
  private galleryService: GalleryService;

  constructor() {
    this.galleryService = new GalleryService();
  }

  async getGallery(req: Request, res: Response): Promise<void> {
    try {
      const { type } = req.query as { type: GalleryType };

      if (!type || !["pictures", "videos"].includes(type)) {
        res.status(400).json({
          data: [],
          error: 'Invalid gallery type. Use "pictures" or "videos".',
        } as GalleryResponse);
        return;
      }

      const data = await this.galleryService.getGallery(type);
      res.json({ data } as GalleryResponse);
    } catch (error) {
      res.status(500).json({
        data: [],
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      } as GalleryResponse);
    }
  }
}
