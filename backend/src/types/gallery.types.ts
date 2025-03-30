export interface MediaItem {
  id: number;
  title: string;
  url: string;
}

export type GalleryType = "pictures" | "videos";

export interface GalleryResponse {
  data: MediaItem[];
  error?: string;
}
