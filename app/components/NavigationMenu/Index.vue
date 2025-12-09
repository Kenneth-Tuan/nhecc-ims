<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const { isCollapsed } = useSidebar();
const open = ref(false);

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
      onClick: () => {
        open.value = true;
      },
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
      link: 'flex flex-col',
      root: 'w-full flex items-center justify-center',
      list: 'w-full'
    }"
  />

  <UDrawer
    v-model:open="open"
    title="Drawer with footer"
    description="This is useful when you want a form in a Drawer."
    :ui="{ container: 'max-w-xl mx-auto' }"
  >
    <template #body>
      <Placeholder class="h-48" />
    </template>

    <template #footer>
      <div class="flex justify-between items-center">
        <UUser
          name="Kenneth Tuan"
          description="Software Engineer"
          :avatar="{
            src: 'https://i.pravatar.cc/150?u=john-doe',
          }"
          :chip="{
            color: 'primary',
            position: 'top-right',
          }"
        />

        <div class="flex items-center gap-2">
          <ColorModeButton />
          <UTooltip text="登出" :kbds="['meta', 'G']">
            <UButton
              icon="material-symbols:logout"
              color="neutral"
              variant="ghost"
            />
          </UTooltip>
        </div>
      </div>
    </template>
  </UDrawer>
</template>
