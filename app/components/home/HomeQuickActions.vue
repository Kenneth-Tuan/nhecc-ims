<script setup lang="ts">
interface User {
  name: string;
  role: "student" | "teacher"; // Simplified role type for demo
}

// Shared state for demo purposes to sync with Header
const user = useState("demo-user", () => ({
  name: "王大明",
  role: "student" as "student" | "teacher",
}));

// Define action types
type ActionType = "check-in" | "roll-call" | "leave" | "search" | "my-courses";

const allActions = [
  {
    id: "roll-call",
    label: "上課點名", // Teacher only (scan others)
    icon: "i-lucide-qr-code",
    to: "/roll-call",
    color: "primary" as const,
    variant: "solid" as const,
    roles: ["teacher"],
  },
  {
    id: "check-in",
    label: "上課簽到", // Student only (show QR code or scan class code)
    icon: "i-lucide-scan-line",
    to: "/check-in",
    color: "primary" as const,
    variant: "solid" as const,
    roles: ["student"],
  },
  {
    id: "leave",
    label: "我要請假",
    icon: "i-lucide-calendar-x",
    to: "/leave",
    color: "error" as const,
    variant: "soft" as const,
    roles: ["student", "teacher"],
  },
  {
    id: "search",
    label: "找課程",
    icon: "i-lucide-search",
    to: "/courses",
    color: "neutral" as const,
    variant: "outline" as const,
    roles: ["student", "teacher"],
  },
  {
    id: "my-courses",
    label: "我的課程",
    icon: "i-lucide-book-open",
    to: "/my-courses",
    color: "neutral" as const,
    variant: "outline" as const,
    roles: ["student", "teacher"],
  },
];

const displayedActions = computed(() => {
  return allActions.filter((action) => action.roles.includes(user.value.role));
});
</script>

<template>
  <div class="grid grid-cols-2 gap-4 mb-8">
    <!-- Top Row: Main Actions -->
    <template v-for="action in displayedActions" :key="action.id">
      <UButton
        :to="action.to"
        :color="action.color"
        :variant="action.variant"
        class="flex flex-col items-center justify-center gap-3 h-32 text-center rounded-xl transition-transform active:scale-95"
        :class="{ 'col-span-1': true }"
      >
        <UIcon :name="action.icon" class="w-10 h-10" />
        <span class="text-xl font-bold">{{ action.label }}</span>
      </UButton>
    </template>
  </div>
</template>
