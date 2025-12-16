<script setup lang="ts">
const { getIcon } = useIconStyle();
interface User {
  name: string;
  roles: ("student" | "teacher")[];
}

// Shared state for demo purposes to sync with Header
const user = useState("demo-user", () => ({
  name: "王大明",
  roles: ["student"] as ("student" | "teacher")[],
}));

// Define action types
type ActionType = "check-in" | "roll-call" | "leave" | "search" | "my-courses";

const allActions = computed(() => [
  {
    id: "roll-call",
    label: "上課點名", // Teacher only (scan others)
    icon: getIcon("qr-code"),
    to: "/roll-call",
    color: "primary" as const,
    variant: "solid" as const,
    requiredRoles: ["teacher"],
  },
  {
    id: "check-in",
    label: "上課簽到", // Student only (show QR code or scan class code)
    icon: getIcon("scan-qrcode"),
    to: "/check-in",
    color: "primary" as const,
    variant: "solid" as const,
    requiredRoles: ["student"],
  },
  {
    id: "leave",
    label: "我要請假",
    icon: getIcon("calendar-x"),
    to: "/leave",
    color: "error" as const,
    variant: "soft" as const,
    requiredRoles: ["student", "teacher"],
  },
  {
    id: "search",
    label: "找課程",
    icon: getIcon("search"),
    to: "/courses",
    color: "neutral" as const,
    variant: "outline" as const,
    requiredRoles: ["student", "teacher"],
  },
  {
    id: "my-courses",
    label: "我的課程",
    icon: getIcon("book-open"),
    to: "/my-courses",
    color: "neutral" as const,
    variant: "subtle" as const,
    requiredRoles: ["student", "teacher"],
  },
]);

// Computed: Check if user has ANY of the required roles for an action
const displayedActions = computed(() => {
  return allActions.value.filter((action) => {
    // If the action requires specific roles, check if the user has at least one of them
    return action.requiredRoles.some((role) =>
      user.value.roles.includes(role as "student" | "teacher")
    );
  });
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
