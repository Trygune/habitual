import type { MetadataRoute } from "next";

const manifest = (): MetadataRoute.Manifest => ({
  id: "/",
  name: "Habitual",
  short_name: "Habitual",
  icons: [
    {
      src: "/icons/web-app-manifest-192x192.png",
      sizes: "192x192",
      type: "image/png",
      purpose: "maskable",
    },
    {
      src: "/icons/web-app-manifest-512x512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "any",
    },
  ],
  theme_color: "#f8f8f6",
  background_color: "#f8f8f6",
  start_url: "/",
  display: "standalone",
  orientation: "portrait",
});

export default manifest;
