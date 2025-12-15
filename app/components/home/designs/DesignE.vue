<script setup lang="ts">
// Design E: High Contrast & Accessibility Focused
// Focus: Legibility, big tap targets, distinct borders

import HomeHeader from '../HomeHeader.vue'
import HomeHero from '../HomeHero.vue'
import HomeQuickActions from '../HomeQuickActions.vue'
import HomeStats from '../HomeStats.vue'
</script>

<template>
  <div class="space-y-8 pb-24 md:pb-0 bg-yellow-50 dark:bg-zinc-950 min-h-screen -mx-4 px-4 pt-4 font-sans">
    <!-- Header -->
    <div class="border-b-4 border-black dark:border-white pb-4">
      <HomeHeader />
    </div>

    <!-- Hero -->
    <div class="bg-white dark:bg-black border-4 border-black dark:border-white rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] p-4">
      <HomeHero />
    </div>
    
    <!-- Actions -->
    <div>
      <h3 class="text-2xl font-black text-black dark:text-white mb-4 uppercase">快速操作</h3>
      <div class="bg-white dark:bg-black border-4 border-black dark:border-white rounded-none p-4">
        <HomeQuickActions />
      </div>
    </div>

    <!-- Stats -->
    <div class="bg-white dark:bg-black border-4 border-black dark:border-white rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] p-4">
      <HomeStats />
    </div>
  </div>
</template>

