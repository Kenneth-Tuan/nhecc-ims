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
        <div class="hidden md:block w-full">
          <DashboardNavbar />
          <!-- <UDashboardToolbar>
          <UNavigationMenu :items="items" highlight class="flex-1" />
        </UDashboardToolbar> -->
        </div>
      </template>

      <template #body>
        <slot />
      </template>

      <template #footer>
        <div class="block md:hidden w-full">
          <NavigationMenu />
        </div>
      </template>
    </UDashboardPanel>
  </UDashboardGroup>
</template>

<style scoped></style>
