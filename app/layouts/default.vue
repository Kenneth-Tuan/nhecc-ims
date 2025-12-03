<script setup lang="ts"></script>

<template>
  <AppHeader :links="navLinks" />

  <UPage>
    <UPageBody>
      <UMain>
        <UDashboardGroup>
          <UDashboardSidebar />

          <slot />
        </UDashboardGroup>
      </UMain>
    </UPageBody>

    <UPageFooter>
      <AppFooter />
    </UPageFooter>
  </UPage>
</template>
