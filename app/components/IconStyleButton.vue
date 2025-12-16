<template>
  <ClientOnly>
    <UTooltip :text="tooltipText">
      <UButton
        :icon="currentIcon"
        color="neutral"
        variant="ghost"
        aria-label="Toggle icon style"
        @click="toggleIconStyle"
      />
    </UTooltip>
    <template #fallback>
      <div class="w-8 h-8" />
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
const { iconStyle, toggleIconStyle } = useIconStyle()

const currentIcon = computed(() => 
  iconStyle.value === 'line' ? 'i-lucide-star' : 'i-heroicons-star-solid'
)

const tooltipText = computed(() => 
  iconStyle.value === 'line' ? 'Switch to Solid Icons' : 'Switch to Line Icons'
)
</script>

