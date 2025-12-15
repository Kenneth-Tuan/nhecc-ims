<script setup lang="ts">
// Design B: Card-based Material Design
// Focus: Shadows, depth, contained sections

import HomeHeader from '../HomeHeader.vue'
import HomeHero from '../HomeHero.vue'
import HomeQuickActions from '../HomeQuickActions.vue'
import HomeStats from '../HomeStats.vue'
</script>

<template>
  <div class="space-y-6 pb-24 md:pb-0 bg-neutral-50 dark:bg-neutral-950 min-h-screen -mx-4 px-4 pt-4">
    <!-- Card container for Header -->
    <div class="bg-white dark:bg-neutral-900 rounded-2xl p-4 shadow-sm border border-neutral-100 dark:border-neutral-800">
      <HomeHeader />
    </div>

    <!-- Hero Card with elevation -->
    <div class="transform translate-y-0 hover:-translate-y-1 transition-transform duration-300">
      <HomeHero />
    </div>
    
    <!-- Actions Section -->
    <div class="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-sm border border-neutral-100 dark:border-neutral-800">
      <h3 class="text-xl font-bold text-foreground mb-6 border-l-4 border-primary pl-3">常用功能</h3>
      <HomeQuickActions />
    </div>

    <!-- Stats Section -->
    <div class="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-sm border border-neutral-100 dark:border-neutral-800">
      <HomeStats />
    </div>
  </div>
</template>

