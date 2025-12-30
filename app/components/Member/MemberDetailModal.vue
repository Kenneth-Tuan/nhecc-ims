<script setup lang="ts">
import type { Member } from "~/types/member";
import dayjs from "dayjs";

interface Props {
  member: Member | null;
}

interface Emits {
  (e: "edit", member: Member): void;
  (e: "delete", member: Member): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// Use defineModel for two-way binding
const isOpen = defineModel<boolean>("open", { default: false });

// Handle close
const handleClose = () => {
  isOpen.value = false;
};

// Format date
const formatDate = (dateString?: string) => {
  if (!dateString) return "-";
  return dayjs(dateString).format("YYYY年MM月DD日");
};

// Detail sections
const personalInfo = computed(() => {
  if (!props.member) return [];
  return [
    { label: "姓名", value: props.member.name, icon: "i-lucide-user" },
    { label: "Email", value: props.member.email, icon: "i-lucide-mail" },
    { label: "電話", value: props.member.phone || "-", icon: "i-lucide-phone" },
    {
      label: "住址",
      value: props.member.address || "-",
      icon: "i-lucide-map-pin",
    },
  ];
});

const churchInfo = computed(() => {
  if (!props.member) return [];
  return [
    {
      label: "角色",
      value: props.member.roleName || "-",
      icon: "i-lucide-shield",
    },
    {
      label: "小組",
      value: props.member.smallGroupName || "-",
      icon: "i-lucide-users",
    },
    {
      label: "出生年月日",
      value: formatDate(props.member.birthDate),
      icon: "i-lucide-cake",
    },
    {
      label: "受洗年月日",
      value: formatDate(props.member.baptismDate),
      icon: "i-lucide-droplet",
    },
    {
      label: "加入教會時間",
      value: formatDate(props.member.joinDate),
      icon: "i-lucide-calendar",
    },
  ];
});

const trainingCourses = computed(() => props.member?.trainingCourses || []);
</script>

<template>
  <UModal
    v-model:open="isOpen"
    :title="`會友資料 - ${member?.name || ''}`"
    :close-button="{ icon: 'i-lucide-x', color: 'neutral', variant: 'ghost' }"
    @close="handleClose"
  >
    <div v-if="member" class="space-y-6">
      <!-- Avatar and Basic Info -->
      <div class="flex flex-col items-center gap-4 pb-6 border-b border-muted">
        <UAvatar :src="member.avatar" :alt="member.name" size="2xl" />
        <div class="text-center">
          <h3 class="text-xl font-semibold">
            {{ member.name }}
          </h3>
          <p class="text-sm text-muted">
            {{ member.email }}
          </p>
        </div>
      </div>

      <!-- Personal Information -->
      <div class="space-y-3">
        <h4 class="text-sm font-semibold text-muted uppercase tracking-wide">
          個人資料
        </h4>
        <div class="grid gap-3">
          <div
            v-for="item in personalInfo"
            :key="item.label"
            class="flex items-start gap-3 p-3 rounded-lg bg-muted/20"
          >
            <UIcon :name="item.icon" class="w-5 h-5 mt-0.5 text-primary" />
            <div class="flex-1 min-w-0">
              <div class="text-xs text-muted mb-1">
                {{ item.label }}
              </div>
              <div class="text-sm font-medium wrap-break-word">
                {{ item.value }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Church Information -->
      <div class="space-y-3">
        <h4 class="text-sm font-semibold text-muted uppercase tracking-wide">
          教會資料
        </h4>
        <div class="grid gap-3">
          <div
            v-for="item in churchInfo"
            :key="item.label"
            class="flex items-start gap-3 p-3 rounded-lg bg-muted/20"
          >
            <UIcon :name="item.icon" class="w-5 h-5 mt-0.5 text-primary" />
            <div class="flex-1 min-w-0">
              <div class="text-xs text-muted mb-1">
                {{ item.label }}
              </div>
              <div class="text-sm font-medium">
                {{ item.value }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Training Courses -->
      <div v-if="trainingCourses.length > 0" class="space-y-3">
        <h4 class="text-sm font-semibold text-muted uppercase tracking-wide">
          裝備課程結業紀錄
        </h4>
        <div class="space-y-2">
          <div
            v-for="course in trainingCourses"
            :key="course.courseId"
            class="flex items-center justify-between p-3 rounded-lg bg-muted/20"
          >
            <div class="flex items-center gap-3">
              <UIcon
                name="i-lucide-graduation-cap"
                class="w-5 h-5 text-primary"
              />
              <span class="font-medium">{{ course.courseName }}</span>
            </div>
            <span class="text-sm text-muted">
              {{ formatDate(course.completionDate) }}
            </span>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-6 text-muted">
        <UIcon
          name="i-lucide-graduation-cap"
          class="w-12 h-12 mx-auto mb-2 opacity-50"
        />
        <p class="text-sm">尚無裝備課程結業紀錄</p>
      </div>

      <!-- Actions -->
      <div class="flex gap-3 pt-4 border-t border-muted">
        <UButton
          color="primary"
          variant="outline"
          icon="i-lucide-pencil"
          class="flex-1"
          @click="emit('edit', member)"
        >
          編輯
        </UButton>
        <UButton
          color="error"
          variant="outline"
          icon="i-lucide-trash-2"
          class="flex-1"
          @click="emit('delete', member)"
        >
          刪除
        </UButton>
      </div>
    </div>
  </UModal>
</template>
