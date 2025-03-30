import { Router } from "express";
import { GalleryController } from "../controllers/gallery.controller";

const router = Router();
const galleryController = new GalleryController();

router.get("/gallery", galleryController.getGallery.bind(galleryController));

export default router;
