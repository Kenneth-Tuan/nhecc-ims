<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const items: NavigationMenuItem[][] = [
  [
    {
      label: "General",
      icon: "i-lucide-user",
      active: true,
    },
    {
      label: "Members",
      icon: "i-lucide-users",
    },
    {
      label: "Notifications",
      icon: "i-lucide-bell",
    },
  ],
  [
    {
      label: "Documentation",
      icon: "i-lucide-book-open",
      to: "https://ui.nuxt.com/docs",
      target: "_blank",
    },
    {
      label: "Help & Feedback",
      icon: "i-lucide-help-circle",
      to: "https://github.com/nuxt/ui/issues",
      target: "_blank",
    },
  ],
];
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
