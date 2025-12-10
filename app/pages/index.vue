<script setup lang="ts">
import { CalendarDate } from "@internationalized/date";

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
    startDateTimestamp: new Date(2025, 12, 10, 10, 0),
    endDateTimestamp: new Date(2025, 12, 10, 12, 0),
    location: "201 教室",
    description:
      "Benjamin Canacsa9df87981 2739817298379as8 df79as8d7f98as7df98a7sd9f87123asdhf",
    color: "error",
    icon: "i-lucide-calendar",
    to: "/",
  },
  {
    name: "Benjamin Canac",
    startDateTimestamp: new Date(2025, 12, 11, 10, 0),
    endDateTimestamp: new Date(2025, 12, 10, 12, 0),
    location: "201 教室",
    description:
      "Benjamin Canacsa9df87981 2739817298379as8 df79as8d7f98as7df98a7sd9f87123asdhf",
    color: "error",
    icon: "i-lucide-calendar",
    to: "/",
  },
  {
    name: "Benjamin Canac",
    startDateTimestamp: new Date(2025, 12, 12, 10, 0),
    endDateTimestamp: new Date(2025, 12, 12, 12, 0),
    location: "201 教室",
    description: "This is a test event lorem ipsum dolor sit amet",
    color: "error",
    icon: "i-lucide-calendar",
    to: "/",
  },
]);
</script>

<template>
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

  <div class="overflow-y-scroll">
    <UPageList divide>
      <UPageCard
        v-for="(event, index) in events"
        :key="index"
        variant="ghost"
        :to="event.to"
        :ui="{
          body: 'w-full min-w-0 max-w-full',
        }"
      >
        <template #body>
          <div class="grid grid-cols-[auto_1fr] gap-x-4 text-white">
            <div
              class="flex flex-col items-start gap-2 flex-1 min-w-0 max-w-full"
            >
              <p
                class="text-sm text-muted-foreground flex items-center gap-2"
              >
                <UIcon name="lucide:map-pin" />{{ event.location }}
              </p>

              <p class="text-lg font-bold line-clamp-1 min-w-0 max-w-full">
                {{ event.name }}
              </p>

              <p
                class="text-sm text-muted-foreground line-clamp-2 text-ellipsis"
              >
                {{ event.description }}
              </p>
            </div>
            <div
              class="flex flex-col text-right items-center justify-between h-full gap-2 text-sm text-muted-foreground"
            >
              <span>{{ event.startDateTimestamp.toLocaleTimeString() }}</span>
              <span>{{ event.endDateTimestamp.toLocaleTimeString() }}</span>
            </div>
          </div>
        </template>
      </UPageCard>
    </UPageList>
  </div>
</template>
