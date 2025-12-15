<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});
</script>

<template>
  <div class="space-y-6 pb-24 md:pb-0">
    <!-- Header: Greeting & Identity -->
    <HomeHeader />

    <!-- Hero: Next Class -->
    <HomeHero />

    <!-- Quick Actions: Big Buttons -->
    <HomeQuickActions />

    <!-- My Progress / Stats -->
    <HomeStats />

    <!-- Mobile Bottom Spacer handled by layout padding usually, but added pb-24 just in case -->
  </div>
</template>
