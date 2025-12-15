<script setup lang="ts">
// Mock user data - in real app this comes from auth store
// Shared state for demo purposes to sync with QuickActions
const user = useState("demo-user", () => ({
  name: "王大明",
  role: "student" as "student" | "teacher",
}));

const roleLabel = computed(() =>
  user.value.role === "student" ? "學員" : "老師"
);

const handleSwitchIdentity = () => {
  // Simple toggle for demo
  user.value.role = user.value.role === "student" ? "teacher" : "student";
  user.value.name = user.value.role === "student" ? "王大明" : "李牧師";
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
