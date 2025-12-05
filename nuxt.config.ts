import tailwindcss from "@tailwindcss/vite";
import pkg from './package.json'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
  },
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["./app/assets/css/main.css"],
  ui: {
    colorMode: true,
  },
  modules: ["@nuxt/image", "@nuxt/ui", "motion-v/nuxt"],
  vite: {
    plugins: [tailwindcss()],
  },
  devServer: {
    port: 3000,
    https: true,
  },
  runtimeConfig: {
    public: {
      NUXT_LIFF_ID: process.env.NUXT_LIFF_ID,
      NUXT_LINE_CHANNEL_ID: process.env.NUXT_LINE_CHANNEL_ID,
      VERSION: pkg.version || "0.1.0",
    },
  },
});
