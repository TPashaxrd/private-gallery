import { Router } from "express";
import { getGallery, downloadAll } from "../controllers/gallery.controller";

const router = Router();

router.get("/gallery", getGallery);
router.get("/gallery/download", downloadAll);

export default router;
