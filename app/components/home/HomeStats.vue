<script setup lang="ts">
// Mock progress data
const courseProgress = ref([
  {
    id: 1,
    name: '新約概論',
    totalSessions: 12,
    attendedSessions: 8,
    progress: 66,
    nextSession: '12/20 (三)'
  },
  {
    id: 2,
    name: '受洗班',
    totalSessions: 4,
    attendedSessions: 1,
    progress: 25,
    nextSession: '12/17 (日)'
  }
])
</script>

<template>
  <div class="space-y-4 mb-8">
    <div class="flex items-center justify-between">
      <h2 class="text-lg font-semibold text-muted-foreground">我的學習進度</h2>
      <UButton to="/my-courses" variant="link" color="neutral" class="p-0">
        查看全部
      </UButton>
    </div>

    <UCard 
      v-for="course in courseProgress" 
      :key="course.id"
      class="transition-all hover:shadow-sm"
      :ui="{ body: 'p-4 sm:p-5' }"
    >
      <div class="flex flex-col gap-3">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="font-bold text-lg">{{ course.name }}</h3>
            <p class="text-sm text-muted-foreground">
              下堂課：{{ course.nextSession }}
            </p>
          </div>
          <UBadge color="primary" variant="subtle">
            出席 {{ course.attendedSessions }}/{{ course.totalSessions }}
          </UBadge>
        </div>

        <div class="space-y-1">
          <UProgress :model-value="course.progress" color="primary" size="lg" />
          <p class="text-right text-xs text-muted-foreground">
            完成度 {{ course.progress }}%
          </p>
        </div>
      </div>
    </UCard>
  </div>
</template>

