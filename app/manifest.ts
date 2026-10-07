import type { MetadataRoute } from "next";

const manifest = (): MetadataRoute.Manifest => ({
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
  theme_color: "#FFFFFF",
  background_color: "#FFFFFF",
  start_url: "/",
  display: "standalone",
  orientation: "portrait",
});

export default manifest;
