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
  <UDashboardGroup direction="horizontal">
    <DashboardSidebar />
    <UDashboardPanel>
      <template #header>
        <DashboardNavbar />
        <!-- <UDashboardToolbar>
          <UNavigationMenu :items="items" highlight class="flex-1" />
        </UDashboardToolbar> -->
      </template>

      <template #body>
        <slot />
      </template>
    </UDashboardPanel>
  </UDashboardGroup>
</template>

<style scoped></style>
