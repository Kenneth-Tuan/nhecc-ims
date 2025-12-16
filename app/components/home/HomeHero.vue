<script setup lang="ts">
import dayjs from 'dayjs'

const { getIcon } = useIconStyle();
// Mock next class data
const nextClass = ref({
  id: 1,
  name: '新約概論',
  session: '第三堂',
  time: dayjs().add(1, 'day').hour(19).minute(30).toDate(), // Tomorrow 19:30
  location: '201 教室',
  isToday: false
})

// Computed for display
const timeDisplay = computed(() => {
  const date = dayjs(nextClass.value.time)
  const today = dayjs()
  
  let prefix = ''
  if (date.isSame(today, 'day')) {
    prefix = '今天'
  } else if (date.isSame(today.add(1, 'day'), 'day')) {
    prefix = '明天'
  } else {
    prefix = date.format('MM/DD (dd)')
  }
  
  return `${prefix} ${date.format('HH:mm')}`
})

const statusColor = computed(() => {
  return nextClass.value.isToday ? 'primary' : 'neutral'
})
</script>

<template>
  <div class="mb-6">
    <div class="flex items-center justify-between mb-2">
      <h2 class="text-lg font-semibold text-muted-foreground">下一堂課</h2>
      <UBadge :color="statusColor" variant="subtle" size="md">
        {{ nextClass.isToday ? '即將開始' : '已報名' }}
      </UBadge>
    </div>
    
    <UCard 
      :ui="{ 
        body: 'p-6',
        ring: nextClass.isToday ? 'ring-2 ring-primary' : ''
      }"
      class="transition-all hover:shadow-md active:scale-[0.99]"
    >
      <div class="flex flex-col gap-4">
        <div>
          <h3 class="text-3xl font-bold text-foreground mb-1">
            {{ nextClass.name }}
          </h3>
          <p class="text-xl text-muted-foreground">
            {{ nextClass.session }}
          </p>
        </div>
        
        <USeparator />
        
        <div class="space-y-3">
          <div class="flex items-center gap-3 text-xl">
            <UIcon :name="getIcon('clock')" class="w-6 h-6 text-primary" />
            <span class="font-medium">{{ timeDisplay }}</span>
          </div>
          
          <div class="flex items-center gap-3 text-xl">
            <UIcon :name="getIcon('map-pin')" class="w-6 h-6 text-primary" />
            <span>{{ nextClass.location }}</span>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>

