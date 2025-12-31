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

// 取得全域 loading 狀態 - 優化初始化
const isAuthLoading = useState("isAuthLoading", () => {
  // SSR 時直接設為 false，避免 SSR/Client 不一致
  // if (import.meta.server) {
  //   return false;
  // }
  // 客戶端時，根據是否有 cookie 決定
  const isLoggedIn_dev = useCookie("isLoggedIn_dev");
  return !isLoggedIn_dev.value;
});
</script>

<template>
  <UApp
    :locale="zh_tw"
    :toaster="{
      position: 'top-right',
    }"
  >
    <!-- 全域 Loading 遮罩 - 只在真正需要時顯示 -->
    <Transition name="fade">
      <div
        v-if="isAuthLoading"
        class="fixed inset-0 z-[9999] flex items-center justify-center bg-nhecc-orange-50 dark:bg-stone-950 transition-colors duration-300"
      >
        <!-- 這裡可以放您的 Logo 或 Spinner -->
        <UIcon
          name="i-lucide-loader-2"
          class="w-10 h-10 animate-spin text-nhecc-orange-500 dark:text-nhecc-orange-400"
        />
      </div>
    </Transition>

    <!-- 主要內容 - 使用 Transition 避免閃爍 -->
    <Transition name="fade">
      <div v-show="!isAuthLoading">
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </div>
    </Transition>
  </UApp>
</template>

<style>
/* 淡入淡出動畫 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
