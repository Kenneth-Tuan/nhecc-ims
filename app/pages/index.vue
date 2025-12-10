<script setup lang="ts">
import { CalendarDate } from "@internationalized/date";
import dayjs from "dayjs";

definePageMeta({
  layout: "dashboard",
});

const modelValue = shallowRef(new CalendarDate(2025, 12, 10));

function getColorByDate(date: Date) {
  const isWeekend = date.getDay() % 6 == 0;
  const isDayMeeting = date.getDay() % 3 == 0;

  if (isWeekend) {
    return undefined;
  }

  if (isDayMeeting) {
    return "error";
  }

  return "success";
}

const events = ref([
  {
    name: "Benjamin Canacsa9df87981 2739817298379as8 df79as8d7f98as7df98a7sd9f87123asdhf",
    startDateTimestamp: "2025-12-10T10:00:00",
    endDateTimestamp: "2025-12-10T12:00:00",
    location: "201 教室",
    description:
      "Benjamin Canacsa9df87981 2739817298379as8 df79as8d7f98as7df98a7sd9f87123asdhf",
    color: "error",
    icon: "i-lucide-calendar",
    to: "/",
  },
  {
    name: "Benjamin Canac",
    startDateTimestamp: "2025-12-11T10:00:00",
    endDateTimestamp: "2025-12-12T12:00:00",
    location: "201 教室",
    description:
      "Benjamin Canacsa9df87981 2739817298379as8 df79as8d7f98as7df98a7sd9f87123asdhf",
    color: "error",
    icon: "i-lucide-calendar",
    to: "/",
  },
  {
    name: "Benjamin Canac",
    startDateTimestamp: "2025-12-12T10:00:00",
    endDateTimestamp: "2025-12-14T12:00:00",
    location: "201 教室",
    description: "This is a test event lorem ipsum dolor sit amet",
    color: "error",
    icon: "i-lucide-calendar",
    to: "/",
  },
]);

// 計算選中日期的活動
const selectedDateEvents = computed(() => {
  const selected = dayjs(modelValue.value.toDate("UTC"));
  console.log(selected);
  return events.value.filter((event) => {
    console.log(
      dayjs(event.startDateTimestamp),
      dayjs(event.startDateTimestamp).isSame(selected, "day")
    );
    return dayjs(event.startDateTimestamp).isSame(selected, "day");
  });
});

// 今日活動統計
const today = dayjs();
const todayEvents = computed(() => {
  return events.value.filter((event) => {
    const eventDate = dayjs(event.startDateTimestamp);
    return eventDate.isSame(today, "day");
  });
});

// 格式化時間顯示
function formatTime(date: Date): string {
  const now = dayjs();
  const eventDate = dayjs(date);
  const diffTime = eventDate.diff(now, "day");
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // 如果是今天
  if (diffDays === 0) {
    return `今天 ${eventDate.format("HH:mm")}`;
  }
  // 如果是明天
  if (diffDays === 1) {
    return `明天 ${eventDate.format("HH:mm")}`;
  }
  // 如果是昨天
  if (diffDays === -1) {
    return `昨天 ${eventDate.format("HH:mm")}`;
  }

  // 其他情況顯示完整時間
  return eventDate.format("HH:mm");
}
</script>

<template>
  <!-- 頂部摘要區域 -->
  <div class="mb-4 md:mb-6 space-y-3">
    <!-- 今日活動統計 -->
    <div
      class="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border"
    >
      <div class="flex flex-col gap-1">
        <p class="text-base font-semibold">今日活動</p>
        <p class="text-sm text-muted-foreground">
          共有 {{ todayEvents.length }} 個活動
        </p>
      </div>
      <div
        class="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10"
        aria-label="今日活動數量"
      >
        <UIcon name="lucide:calendar-check" class="w-6 h-6 text-primary" />
      </div>
    </div>

    <!-- 選中日期活動預覽 -->
    <div
      v-if="selectedDateEvents.length > 0"
      class="p-4 rounded-lg bg-muted/30 border border-border"
    >
      <p class="text-sm font-medium mb-2">
        {{ modelValue.toDate("UTC").toLocaleDateString("zh-TW") }} 的活動
      </p>
      <p class="text-sm text-muted-foreground">
        共有 {{ selectedDateEvents.length }} 個活動
      </p>
    </div>
  </div>

  <!-- 日曆 -->
  <UCalendar v-model="modelValue" size="xl">
    <template #day="{ day }">
      <UChip
        :show="!!getColorByDate(day.toDate('UTC'))"
        :color="getColorByDate(day.toDate('UTC'))"
        size="2xs"
      >
        {{ day.day }}
      </UChip>
    </template>
  </UCalendar>

  <!-- 活動列表 -->
  <div class="mt-4 md:mt-6 overflow-y-auto">
    <!-- 空狀態 -->
    <div
      v-if="selectedDateEvents.length === 0"
      class="flex flex-col items-center justify-center py-12 px-4 text-center"
    >
      <UIcon
        name="lucide:calendar-x"
        class="w-16 h-16 text-muted-foreground mb-4"
        aria-hidden="true"
      />
      <p class="text-lg font-semibold mb-2">這一天沒有活動</p>
      <p class="text-sm text-muted-foreground">
        選擇其他日期查看活動，或新增一個活動
      </p>
    </div>

    <!-- 活動列表 -->
    <UPageList v-else divide>
      <UPageCard
        v-for="(event, index) in selectedDateEvents"
        :key="index"
        variant="ghost"
        :to="event.to"
        :ui="{
          body: 'w-full min-w-0 max-w-full',
        }"
      >
        <template #body>
          <div class="grid grid-cols-[1fr_auto] gap-x-4 gap-y-2">
            <div
              class="flex flex-col items-start gap-2 flex-1 min-w-0 max-w-full"
            >
              <p
                class="text-base text-muted-foreground flex items-center gap-2 min-w-0"
              >
                <UIcon
                  name="lucide:map-pin"
                  class="w-5 h-5 shrink-0"
                  aria-hidden="true"
                />
                <span class="truncate">{{ event.location }}</span>
              </p>

              <h3
                class="text-xl font-bold line-clamp-1 min-w-0 max-w-full"
                aria-label="活動名稱"
              >
                {{ event.name }}
              </h3>

              <p
                class="text-base text-muted-foreground line-clamp-2 min-w-0 max-w-full"
              >
                {{ event.description }}
              </p>
            </div>
            <div
              class="flex flex-col text-right items-end justify-start gap-2 text-base text-muted-foreground shrink-0"
            >
              <div class="flex flex-col gap-1">
                <span class="font-medium">{{
                  formatTime(event.startDateTimestamp)
                }}</span>
                <span class="text-sm">至</span>
                <span>{{ formatTime(event.endDateTimestamp) }}</span>
              </div>
            </div>
          </div>
        </template>
      </UPageCard>
    </UPageList>
  </div>
</template>
