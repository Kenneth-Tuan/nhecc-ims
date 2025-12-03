<script setup lang="ts"></script>

<template>
  <AppHeader :links="navLinks" />

  <UPage>
    <template #left>
      <NavigationMenu />
    </template>

    <UPageBody>
      <UMain>
        <slot />
      </UMain>
    </UPageBody>

    <UPageFooter>
      <AppFooter />
    </UPageFooter>
  </UPage>
</template>
