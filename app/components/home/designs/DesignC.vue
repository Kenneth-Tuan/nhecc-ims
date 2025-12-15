<script setup lang="ts">
// Design C: Modern Glassmorphism
// Focus: Gradients, blur effects, transparency

import HomeHeader from '../HomeHeader.vue'
import HomeHero from '../HomeHero.vue'
import HomeQuickActions from '../HomeQuickActions.vue'
import HomeStats from '../HomeStats.vue'
</script>

<template>
  <div class="relative min-h-screen -mx-4 px-4 pb-24 md:pb-0 overflow-hidden">
    <!-- Ambient Background Blobs -->
    <div class="absolute top-0 left-0 w-64 h-64 bg-primary-400/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
    <div class="absolute top-1/3 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl translate-x-1/3 pointer-events-none"></div>
    <div class="absolute bottom-0 left-1/4 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl pointer-events-none"></div>

    <div class="relative z-10 space-y-8 pt-4">
      <!-- Header with backdrop blur -->
      <div class="bg-white/60 dark:bg-neutral-900/60 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-lg">
        <HomeHeader />
      </div>

      <!-- Hero with gradient border -->
      <div class="p-[1px] rounded-2xl bg-gradient-to-br from-primary-400 via-purple-400 to-blue-400">
        <div class="bg-white/80 dark:bg-neutral-900/90 backdrop-blur-sm rounded-2xl p-1 h-full">
          <HomeHero />
        </div>
      </div>
      
      <!-- Actions -->
      <div class="bg-white/40 dark:bg-neutral-900/40 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-xl">
        <h3 class="text-lg font-semibold text-foreground/80 mb-4 flex items-center gap-2">
          <UIcon name="i-lucide-zap" class="w-5 h-5 text-yellow-500" />
          快捷功能
        </h3>
        <HomeQuickActions />
      </div>

      <!-- Stats -->
      <div class="bg-white/40 dark:bg-neutral-900/40 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-xl">
        <HomeStats />
      </div>
    </div>
  </div>
</template>

