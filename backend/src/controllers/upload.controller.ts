import { Request, Response } from "express";
import { upload, updateJsonFile } from "../services/upload.service";

export class UploadController {
  async uploadSingle(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          error: "Dosya yüklenemedi",
        });
      }

      const isVideo =
        req.file.fieldname === "video" || req.file.fieldname === "videos";
      const fileType = isVideo ? "videos" : "pictures";
      const newItem = {
        id: Date.now(),
        title: req.body.title || req.file.originalname,
        url: `http://localhost:${process.env.PORT || 5001}/${fileType}/${
          req.file.filename
        }`,
      };

      await updateJsonFile(fileType, newItem);

      res.status(201).json({
        success: true,
        data: newItem,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Dosya yükleme hatası",
      });
    }
  }

  async uploadMultiple(req: Request, res: Response) {
    try {
      if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
        return res.status(400).json({
          success: false,
          error: "Dosyalar yüklenemedi",
        });
      }

      const files = req.files as Express.Multer.File[];
      const uploadedItems = [];

      for (const file of files) {
        const isVideo =
          file.fieldname === "video" || file.fieldname === "videos";
        const fileType = isVideo ? "videos" : "pictures";
        const newItem = {
          id: Date.now() + Math.random(),
          title: req.body[`title_${file.fieldname}`] || file.originalname,
          url: `http://localhost:${process.env.PORT || 5001}/${fileType}/${
            file.filename
          }`,
        };

        await updateJsonFile(fileType, newItem);
        uploadedItems.push(newItem);
      }

      res.status(201).json({
        success: true,
        data: uploadedItems,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Dosya yükleme hatası",
      });
    }
  }
}
