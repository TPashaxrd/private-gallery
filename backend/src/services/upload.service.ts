import multer from "multer";
import path from "path";
import { promises as fs } from "fs";
import { config } from "../config/config";

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const isVideo = file.fieldname === "video" || file.fieldname === "videos";
    const uploadDir = isVideo ? config.videosPath : config.picturesPath;
    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileType =
      file.fieldname === "video" || file.fieldname === "videos"
        ? "video"
        : "picture";
    cb(null, fileType + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (
  req: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const isVideo = file.fieldname === "video" || file.fieldname === "videos";

  if (isVideo) {
    if (file.mimetype.startsWith("video/")) {
      cb(null, true);
    } else {
      cb(new Error("Sadece video dosyaları yüklenebilir!"));
    }
  } else {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Sadece resim dosyaları yüklenebilir!"));
    }
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
});

export async function updateJsonFile(
  type: "pictures" | "videos",
  newItem: any
) {
  const filePath = type.startsWith("picture")
    ? config.picturesJsonPath
    : config.videosJsonPath;
  try {
    let items = [];
    try {
      const data = await fs.readFile(filePath, "utf8");
      items = JSON.parse(data);
    } catch {
      items = [];
    }

    items.push(newItem);

    await fs.writeFile(filePath, JSON.stringify(items, null, 2));

    return items;
  } catch (error) {
    throw new Error(
      `Error updating ${type} JSON file: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
