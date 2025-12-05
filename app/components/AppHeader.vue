<script setup lang="ts">
const { isCollapsed, toggle } = useSidebar();

const menuActionIcon = computed(() => {
  return isCollapsed.value
    ? "material-symbols:arrow-menu-open"
    : "material-symbols:menu-open";
});

const loginActionIcon = computed(() => {
  return true ? "material-symbols:login" : "material-symbols:logout";
});

const loginActionLabel = computed(() => {
  return true ? "登入" : "登出";
});
</script>

<template>
  <UHeader :ui="{}">
    <template #left>
      <!-- <UButton
        :icon="menuActionIcon"
        size="md"
        color="primary"
        variant="link"
        @click="toggle"
      /> -->

      <NuxtLink to="/" class="flex items-center gap-2 w-fit text-nowrap">
        <img src="/NHECC_ICON-01.png" alt="NHECC" class="w-10 h-10" />
        <h1 class="text-2xl font-bold">NHECC Integrated Management System</h1>
      </NuxtLink>
    </template>

    <template #right>
      <ColorModeButton />

      <UTooltip :text="loginActionLabel" :kbds="['meta', 'G']">
        <UButton :icon="loginActionIcon" color="neutral" variant="ghost" />
      </UTooltip>
    </template>
  </UHeader>
</template>
