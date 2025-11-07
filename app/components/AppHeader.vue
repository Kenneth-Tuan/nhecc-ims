<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

defineProps<{
  links: NavigationMenuItem[];
}>();

const active = ref("0");

defineShortcuts({
  1: () => {
    active.value = "0";
  },
  2: () => {
    active.value = "1";
  },
  3: () => {
    active.value = "2";
  },
});
</script>

<template>
  <div
    class="fixed top-2 sm:top-4 mx-auto left-1/2 transform -translate-x-1/2 z-10"
  >
    <UNavigationMenu
      v-model="active"
      :items="links"
      variant="link"
      color="neutral"
      class="bg-muted/80 backdrop-blur-sm rounded-full px-2 sm:px-4 border border-muted/50 shadow-lg shadow-neutral-950/5"
      :ui="{
        link: 'px-2 py-1',
        linkLeadingIcon: '',
      }"
    >
      <template #list-leading>
        <NuxtLink to="/">
          <img src="/NHECC_ICON-01.png" alt="NHECC" class="w-10 h-10" />
        </NuxtLink>
      </template>

      <template #list-trailing>
        <ColorModeButton />
      </template>
    </UNavigationMenu>
  </div>
</template>
