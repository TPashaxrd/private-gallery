import { Request, Response, NextFunction } from "express";
import { config } from "../config/config";

export const checkApiKey = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    return res.status(401).json({
      success: false,
      error: "API key gerekli",
    });
  }

  if (apiKey !== config.apiKey) {
    return res.status(403).json({
      success: false,
      error: "Geçersiz API key",
    });
  }

  next();
};
