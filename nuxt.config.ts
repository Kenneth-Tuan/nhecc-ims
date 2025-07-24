// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: [
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/test-utils",
    "@nuxt/ui",
    "@unocss/nuxt",
    "@nuxt/icon",
    "@nuxt/fonts",
    "@nuxtjs/color-mode",
    "@nuxt/telemetry",
    "@nuxt/devtools",
    "pinia-plugin-persistedstate",
    "@nuxtjs/i18n",
    "@nuxtjs/mdc",
    "@dargmuesli/nuxt-cookie-control",
    "nuxt-qrcode",
    "@vee-validate/nuxt",
    "@formkit/auto-animate",
  ],
  unocss: {
    nuxtLayers: true,
  },
});