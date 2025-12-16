<template>
  <ClientOnly>
    <UButton
      :icon="currentIcon"
      color="neutral"
      variant="ghost"
      aria-label="Toggle border style"
      @click="cycleRadius"
    />
    <template #fallback>
      <div class="w-8 h-8" />
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
const radiusOptions = [
  { value: '0rem', icon: 'i-heroicons-stop', label: 'Square' },
  { value: '0.5rem', icon: 'i-lucide-square', label: 'Small Radius' }, // Lucide might not be available, fallback to heroicons
  { value: '0.75rem', icon: 'i-heroicons-stop-circle', label: 'Medium Radius' },
  { value: '1.5rem', icon: 'i-heroicons-face-smile', label: 'Large Radius' }
]

const currentIndex = ref(2) // Default to Medium (approx 0.625rem)

const currentIcon = computed(() => radiusOptions[currentIndex.value].icon)

function cycleRadius() {
  currentIndex.value = (currentIndex.value + 1) % radiusOptions.length
  const newRadius = radiusOptions[currentIndex.value].value
  
  // Set the CSS variable globally
  document.documentElement.style.setProperty('--radius', newRadius)
}
</script>

