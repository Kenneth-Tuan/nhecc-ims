<script setup lang="ts">
// Design D: Soft & Rounded (Neumorphism-inspired)
// Focus: Extreme roundness, soft shadows, cozy feel

import HomeHeader from '../HomeHeader.vue'
import HomeHero from '../HomeHero.vue'
import HomeQuickActions from '../HomeQuickActions.vue'
import HomeStats from '../HomeStats.vue'
</script>

<template>
  <div class="space-y-8 pb-24 md:pb-0 bg-[#F0F2F5] dark:bg-[#18181b] min-h-screen -mx-4 px-6 pt-6">
    <!-- Header -->
    <div class="bg-[#F0F2F5] dark:bg-[#18181b] p-4 rounded-[30px] shadow-[-10px_-10px_30px_#FFFFFF,10px_10px_30px_#D1D9E6] dark:shadow-[-5px_-5px_15px_#27272a,5px_5px_15px_#09090b]">
      <HomeHeader />
    </div>

    <!-- Hero -->
    <div class="bg-[#F0F2F5] dark:bg-[#18181b] p-2 rounded-[30px] shadow-[inset_-5px_-5px_15px_#FFFFFF,inset_5px_5px_15px_#D1D9E6] dark:shadow-[inset_-2px_-2px_10px_#27272a,inset_2px_2px_10px_#09090b]">
      <HomeHero />
    </div>
    
    <!-- Actions -->
    <div>
      <h3 class="text-center text-lg font-bold text-neutral-500 mb-6 tracking-widest">MENU</h3>
      <div class="p-4 rounded-[40px] bg-[#F0F2F5] dark:bg-[#18181b] shadow-[-10px_-10px_30px_#FFFFFF,10px_10px_30px_#D1D9E6] dark:shadow-[-5px_-5px_15px_#27272a,5px_5px_15px_#09090b]">
        <HomeQuickActions />
      </div>
    </div>

    <!-- Stats -->
    <div class="bg-[#F0F2F5] dark:bg-[#18181b] p-6 rounded-[30px] shadow-[-10px_-10px_30px_#FFFFFF,10px_10px_30px_#D1D9E6] dark:shadow-[-5px_-5px_15px_#27272a,5px_5px_15px_#09090b]">
      <HomeStats />
    </div>
  </div>
</template>

