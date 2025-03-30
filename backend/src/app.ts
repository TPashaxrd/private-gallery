import express from "express";
import cors from "cors";
import path from "path";
import galleryRoutes from "./routes/gallery.routes";
import { config } from "./config/config";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/videos", express.static(config.videosPath));
app.use("/pictures", express.static(config.picturesPath));

app.use("/api", galleryRoutes);

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({
      data: [],
      error: "Internal Server Error",
    });
  }
);

export default app;
