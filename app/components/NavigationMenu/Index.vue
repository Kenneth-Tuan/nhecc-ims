<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const { isCollapsed } = useSidebar();
const { getIcon } = useIconStyle();
const open = ref(false);

const items = computed<NavigationMenuItem[][]>(() => [
  [
    {
      label: "首頁",
      icon: getIcon("home"),
      to: "/",
      active: true,
    },
    {
      label: "裝備",
      icon: getIcon("shield-check"),
      active: false,
    },
    {
      label: "牧養",
      icon: getIcon("book-open"),
      active: false,
    },
    {
      label: "我的",
      icon: getIcon("box"),
      active: false,
    },
    {
      label: "更多",
      icon: getIcon("ellipsis"),
      active: false,
      onClick: () => {
        open.value = true;
      },
    },
  ],
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
    class="w-full h-full shadow-soft dark:shadow-soft-dark bg-background/95 dark:bg-surface-dark/95 backdrop-blur-sm"
    :ui="{
      link: 'flex flex-col justify-center items-center',
      root: 'w-full flex items-center justify-center [&>div]:w-full',
      list: 'w-full justify-between',
    }"
  />

  <UDrawer
    v-model:open="open"
    title="Drawer with footer"
    description="This is useful when you want a form in a Drawer."
    :ui="{ container: 'max-w-xl mx-auto' }"
  >
    <template #body> </template>

    <template #footer>
      <div class="flex justify-between items-center">
        <UUser
          to="/"
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
          <IconStyleButton />
          <BorderStyleButton />
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
