<script setup lang="ts">
import type { Member } from "~/types/member";
import dayjs from "dayjs";

interface Props {
  members: Member[];
  loading?: boolean;
}

interface Emits {
  (e: "view", member: Member): void;
  (e: "edit", member: Member): void;
  (e: "delete", member: Member): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// Table columns definition
const columns = [
  {
    accessorKey: "name",
    label: "姓名",
    sortable: true,
  },
  {
    accessorKey: "email",
    label: "Email",
  },
  {
    accessorKey: "phone",
    label: "電話",
  },
  {
    accessorKey: "roleName",
    label: "角色",
  },
  {
    accessorKey: "smallGroupName",
    label: "小組",
  },
  {
    accessorKey: "joinDate",
    label: "加入日期",
  },
  {
    accessorKey: "actions",
    label: "操作",
  },
];

// Format date
const formatDate = (dateString?: string) => {
  if (!dateString) return "-";
  return dayjs(dateString).format("YYYY/MM/DD");
};

// Row actions
const actions = (row: Member) => [
  [
    {
      label: "檢視",
      icon: "i-lucide-eye",
      click: () => emit("view", row),
    },
    {
      label: "編輯",
      icon: "i-lucide-pencil",
      click: () => emit("edit", row),
    },
  ],
  [
    {
      label: "刪除",
      icon: "i-lucide-trash-2",
      click: () => emit("delete", row),
      color: "error" as const,
    },
  ],
];
</script>

<template>
  <UCard>
    <UTable
      :columns="columns"
      :rows="members"
      :loading="loading"
      :empty-state="{
        icon: 'i-lucide-users',
        label: '尚無會友資料',
        description: '點擊上方「新增會友」按鈕來建立第一筆會友資料',
      }"
    >
      <template #name-data="{ row }">
        <div class="flex items-center gap-3">
          <UAvatar
            :src="row.original.avatar"
            :alt="row.original.name"
            size="sm"
          />
          <button
            class="font-medium text-primary hover:underline text-left"
            @click="emit('view', row.original)"
          >
            {{ row.original.name }}
          </button>
        </div>
      </template>

      <template #email-data="{ row }">
        <span class="text-muted">{{ row.original.email }}</span>
      </template>

      <template #phone-data="{ row }">
        <span class="text-muted">{{ row.original.phone || "-" }}</span>
      </template>

      <template #roleName-data="{ row }">
        <UBadge
          :color="
            row.original.roleId === 'pastor' || row.original.roleId === 'elder'
              ? 'primary'
              : 'neutral'
          "
          variant="subtle"
        >
          {{ row.original.roleName || "-" }}
        </UBadge>
      </template>

      <template #smallGroupName-data="{ row }">
        <span class="text-sm">{{ row.original.smallGroupName || "-" }}</span>
      </template>

      <template #joinDate-data="{ row }">
        <span class="text-sm text-muted">{{
          formatDate(row.original.joinDate)
        }}</span>
      </template>

      <template #actions-data="{ row }">
        <UDropdownMenu :items="actions(row.original)">
          <UButton
            color="neutral"
            variant="ghost"
            icon="i-lucide-more-horizontal"
            size="sm"
          />
        </UDropdownMenu>
      </template>
    </UTable>
  </UCard>
</template>
