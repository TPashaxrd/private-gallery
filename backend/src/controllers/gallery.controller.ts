import { Request, Response } from "express";
import { GalleryService } from "../services/gallery.service";
import { GalleryType, GalleryResponse } from "../types/gallery.types";

const galleryService = new GalleryService();

export const getGallery = async (req: Request, res: Response) => {
  try {
    const type = (req.query.type as GalleryType) || "pictures";
    const items = await galleryService.getGallery(type);
    res.json({ success: true, items });
  } catch (error) {
    res.status(500).json({
      success: false,
      error:
        error instanceof Error ? error.message : "Bilinmeyen bir hata oluştu",
    });
  }
};

export const downloadAll = async (req: Request, res: Response) => {
  try {
    const zipBuffer = await galleryService.downloadAll();

    res.setHeader("Content-Type", "application/zip");
    res.setHeader("Content-Disposition", "attachment; filename=gallery.zip");
    res.setHeader("Content-Length", zipBuffer.length);

    res.send(zipBuffer);
  } catch (error) {
    res.status(500).json({
      success: false,
      error:
        error instanceof Error ? error.message : "Bilinmeyen bir hata oluştu",
    });
  }
};
