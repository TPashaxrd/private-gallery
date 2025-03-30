import { Router } from "express";
import { UploadController } from "../controllers/upload.controller";
import { upload } from "../services/upload.service";
import { checkApiKey } from "../middleware/auth.middleware";

const router = Router();
const uploadController = new UploadController();

router.use(checkApiKey);

router.post(
  "/upload/picture",
  upload.single("picture"),
  uploadController.uploadSingle.bind(uploadController)
);
router.post(
  "/upload/video",
  upload.single("video"),
  uploadController.uploadSingle.bind(uploadController)
);

router.post(
  "/upload/pictures",
  upload.array("pictures", 10),
  uploadController.uploadMultiple.bind(uploadController)
);
router.post(
  "/upload/videos",
  upload.array("videos", 5),
  uploadController.uploadMultiple.bind(uploadController)
);

router.post(
  "/upload/mixed",
  upload.fields([
    { name: "pictures", maxCount: 10 },
    { name: "videos", maxCount: 5 },
  ]),
  uploadController.uploadMultiple.bind(uploadController)
);

export default router;
