import { resolve } from "path";

function pathResolve(dir: string) {
  return resolve(__dirname, dir);
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "NHECC - IMS | 基督教內湖行道會 - 整合管理系統",
      meta: [{ name: "description", content: "基督教內湖行道會 整合管理系統" }],
      link: [{ rel: "icon", type: "image/png", href: "/NHECC_ICON-01.png" }],
    },
  },
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: [
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/test-utils",
    "@nuxt/ui",
    "@pinia/nuxt",
    "@nuxtjs/mdc",
    "@dargmuesli/nuxt-cookie-control",
    "nuxt-qrcode",
    "@vee-validate/nuxt",
    "@formkit/auto-animate",
  ],

  css: ["~/assets/css/main.css"],

  vite: {
    envDir: pathResolve("./env"),
  },

  qrcode: {
    options: {
      variant: "pixelated",
      radius: 1,
      blackColor: "currentColor", // 'var(--ui-text-highlighted)' if you are using `@nuxt/ui` v3
      whiteColor: "transparent", // 'var(--ui-bg)'
    },
  },
});
