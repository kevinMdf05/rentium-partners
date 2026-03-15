import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Rentium Partners — Gestion immobilière d'excellence",
    short_name: "Rentium",
    description:
      "Gestion comptable et fiscale sur mesure pour investisseurs LMNP et SCI à l'IR.",
    start_url: "/",
    display: "standalone",
    background_color: "#080808",
    theme_color: "#080808",
    orientation: "portrait-primary",
    categories: ["finance", "business"],
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
