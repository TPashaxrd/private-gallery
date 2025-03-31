export type GalleryType = "pictures" | "videos" | "all";

export interface MediaItem {
  id: number;
  title: string;
  url: string;
  type: "picture" | "video";
  createdAt: string;
}

export interface GalleryResponse {
  data: MediaItem[];
  error?: string;
}
