<script setup lang="ts">
import { zh_tw } from "@nuxt/ui/locale";
const colorMode = useColorMode();

const color = computed(() =>
  colorMode.value === "dark" ? "#020618" : "white"
);

useHead({
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { key: "theme-color", name: "theme-color", content: color },
  ],
  link: [{ rel: "icon", href: "/NHECC_ICON-01.png" }],
  htmlAttrs: {
    lang: "en",
  },
});

useSeoMeta({
  titleTemplate: "NHECC",
  ogImage: "/NHECC_ICON-01.png",
  twitterImage: "/NHECC_ICON-01.png",
  twitterCard: "summary_large_image",
});

// 取得全域 loading 狀態
const isAuthLoading = useState("isAuthLoading", () => true);
</script>

<template>
  <UApp
    :locale="zh_tw"
    :toaster="{
      position: 'top-right',
    }"
  >
    <!-- 全域 Loading 遮罩 -->
    <div
      v-if="isAuthLoading"
      class="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-gray-900"
    >
      <!-- 這裡可以放您的 Logo 或 Spinner -->
      <UIcon
        name="i-lucide-loader-2"
        class="w-10 h-10 animate-spin text-primary"
      />
    </div>

    <!-- 只有當 loading 結束後，才渲染路由內容 -->
    <div v-else>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>

    <!-- <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="navigation"
        shortcut="meta_k"
        :links="navLinks"
        :fuse="{ resultLimit: 42 }"
      />
    </ClientOnly> -->
  </UApp>
</template>
