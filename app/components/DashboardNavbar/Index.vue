<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const { getIcon } = useIconStyle();

const items = computed<NavigationMenuItem[][]>(() => [
  [
    {
      label: "General",
      icon: getIcon("user"),
      active: true,
    },
    {
      label: "Members",
      icon: getIcon("users"),
    },
    {
      label: "Notifications",
      icon: getIcon("bell"),
    },
  ],
  [
    {
      label: "Documentation",
      icon: getIcon("book-open"),
      to: "https://ui.nuxt.com/docs",
      target: "_blank",
    },
    {
      label: "Help & Feedback",
      icon: getIcon("help-circle"),
      to: "https://github.com/nuxt/ui/issues",
      target: "_blank",
    },
  ],
]);
</script>

<template>
  <UDashboardNavbar :toggle="false">
    <template #leading>
      <NuxtLink to="/" class="flex items-center gap-2 w-fit text-nowrap">
        <img src="/NHECC_ICON-01.png" alt="NHECC" class="w-10 h-10" />
      </NuxtLink>
    </template>

    <template #trailing>
      <UNavigationMenu :items="items" highlight class="flex-1" />
    </template>

    <template #right>
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
    </template>
  </UDashboardNavbar>
</template>
