import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Anchal India",
    short_name: "Anchal India",
    description: "Complete automotive solutions from India to the world.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0757c9",
    icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
