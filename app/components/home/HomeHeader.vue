<script setup lang="ts">
// Mock user data - in real app this comes from auth store
// Shared state for demo purposes to sync with QuickActions
// Changed roles to be an array to support multiple roles
const user = useState("demo-user", () => ({
  name: "王大明",
  roles: ["student"] as ("student" | "teacher")[],
}));

const roleLabel = computed(() => {
  const roles = [];
  if (user.value.roles.includes("student")) roles.push("學員");
  if (user.value.roles.includes("teacher")) roles.push("老師");
  return roles.join(" / ");
});

const handleSwitchIdentity = () => {
  // Cycle through states: Student -> Teacher -> Both -> Student
  const currentRoles = user.value.roles;

  if (currentRoles.length === 1 && currentRoles[0] === "student") {
    // Switch to Teacher
    user.value.roles = ["teacher"];
    user.value.name = "李牧師";
  } else if (currentRoles.length === 1 && currentRoles[0] === "teacher") {
    // Switch to Both
    user.value.roles = ["student", "teacher"];
    user.value.name = "陳區長 (身兼)";
  } else {
    // Back to Student
    user.value.roles = ["student"];
    user.value.name = "王大明";
  }
};
</script>

<template>
  <div class="flex items-center justify-between py-4">
    <div class="flex flex-col">
      <span class="text-lg text-muted-foreground">平安，</span>
      <h1 class="text-2xl font-bold text-foreground">
        {{ user.name }}
        <span class="text-sm font-normal text-muted-foreground"
          >({{ roleLabel }})</span
        >
      </h1>
    </div>

    <UButton
      icon="i-lucide-users"
      size="lg"
      color="neutral"
      variant="ghost"
      aria-label="切換身份 (測試用)"
      @click="handleSwitchIdentity"
    >
      切換
    </UButton>
  </div>
</template>
