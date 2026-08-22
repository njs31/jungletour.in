// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  output: "server",
  site: "https://jungletour.in",
  session: false,
  adapter: cloudflare({
    imageService: "passthrough",
  }),
  integrations: [react()],
  vite: {
    envPrefix: ["PUBLIC_", "NEXT_PUBLIC_", "SITE_"],
    resolve: {
      alias: {
        "next/link": "/src/shims/next-link.tsx",
        "next/image": "/src/shims/next-image.tsx",
        "next/navigation": "/src/shims/next-navigation.tsx",
      },
    },
  },
});
