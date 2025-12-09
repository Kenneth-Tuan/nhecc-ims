<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const { isCollapsed } = useSidebar();

const items = ref<NavigationMenuItem[][]>([
  [
    {
      label: "首頁",
      icon: "i-lucide-home",
      to: "/",
      active: true,
    },
    {
      label: "裝備",
      icon: "i-lucide-shield-check",
      active: false,
    },
    {
      label: "牧養",
      icon: "i-lucide-book-open",
      active: false,
    },
    {
      label: "我的",
      icon: "i-lucide-box",
      active: false,
    },
    {
      label: "更多",
      icon: "i-lucide-ellipsis",
      active: false,
    },
  ],
  //   [
  //     {
  //       label: "GitHub",
  //       icon: "i-simple-icons-github",
  //       badge: "3.8k",
  //       to: "https://github.com/nuxt/ui",
  //       target: "_blank",
  //     },
  //     {
  //       label: "Help",
  //       icon: "i-lucide-circle-help",
  //       disabled: true,
  //     },
  //   ],
]);
</script>

<template>
  <UNavigationMenu
    :collapsed="isCollapsed"
    highlight
    highlight-color="primary"
    orientation="horizontal"
    color="neutral"
    variant="link"
    :items="items"
    class="w-full h-full"
    :ui="{
      link: 'flex flex-col'
    }"
  />
</template>
