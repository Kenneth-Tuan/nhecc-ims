<script setup lang="ts">
// Design A: Minimalist & Clean (Refined version of the current design)
// Focus: Whitespace, typography, clear hierarchy

import HomeHeader from '../HomeHeader.vue'
import HomeHero from '../HomeHero.vue'
import HomeQuickActions from '../HomeQuickActions.vue'
import HomeStats from '../HomeStats.vue'
</script>

<template>
  <div class="space-y-8 pb-24 md:pb-0">
    <!-- Design A Specific Layout -->
    <div class="space-y-6">
      <HomeHeader />
      <HomeHero />
    </div>
    
    <div>
      <h3 class="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4 pl-1">快速行動</h3>
      <HomeQuickActions />
    </div>

    <div>
      <HomeStats />
    </div>
  </div>
</template>

