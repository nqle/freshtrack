import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: "FreshTrack",
        short_name: "FreshTrack",
        description: "A simple app to track when perishables go bad",
        icons: [
          {
            src: "icon-192x192.png",
            type: "image/png",
            sizes: "192x192",
          },
          {
            src: "icon-512x512.png",
            type: "image/png",
            sizes: "512x512",
          },
        ],
        start_url: "/freshtrack/",
        display: "standalone",
        background_color: "#000000",
        theme_color: "#111111",
      },
    }),
  ],
  base: "/freshtrack/",
});
