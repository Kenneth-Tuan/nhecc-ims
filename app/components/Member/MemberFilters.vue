<script setup lang="ts">
import type { Role, SmallGroup } from "~/types/member";

interface Props {
  roles: Role[];
  smallGroups: SmallGroup[];
  modelValue: {
    search?: string;
    roleId?: string;
    smallGroupId?: string;
  };
}

interface Emits {
  (e: "update:modelValue", value: Props["modelValue"]): void;
  (e: "clear"): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// Local state
const localFilters = ref({
  search: props.modelValue.search || "",
  roleId: props.modelValue.roleId || "",
  smallGroupId: props.modelValue.smallGroupId || "",
});

// Watch for external changes
watch(
  () => props.modelValue,
  (newValue) => {
    localFilters.value = {
      search: newValue.search || "",
      roleId: newValue.roleId || "",
      smallGroupId: newValue.smallGroupId || "",
    };
  },
  { deep: true }
);

// Emit changes
const updateFilters = () => {
  emit("update:modelValue", { ...localFilters.value });
};

// Clear filters
const clearFilters = () => {
  localFilters.value = {
    search: "",
    roleId: "",
    smallGroupId: "",
  };
  emit("clear");
};

// Role options
const roleOptions = computed(() => [
  { label: "全部角色", value: "" },
  ...props.roles.map((role) => ({
    label: role.name,
    value: role.id,
  })),
]);

// Small group options
const smallGroupOptions = computed(() => [
  { label: "全部小組", value: "" },
  ...props.smallGroups.map((group) => ({
    label: group.name,
    value: group.id,
  })),
]);

// Check if any filter is active
const hasActiveFilters = computed(() => {
  return !!(
    localFilters.value.search ||
    localFilters.value.roleId ||
    localFilters.value.smallGroupId
  );
});
</script>

<template>
  <UCard>
    <div class="flex flex-col sm:flex-row gap-4">
      <!-- Search Input -->
      <div class="flex-1">
        <UInput
          v-model="localFilters.search"
          placeholder="搜尋姓名或 Email..."
          icon="i-lucide-search"
          @update:model-value="updateFilters"
        />
      </div>

      <!-- Role Filter -->
      <div class="w-full sm:w-48">
        <USelect
          v-model="localFilters.roleId"
          :options="roleOptions"
          placeholder="選擇角色"
          icon="i-lucide-shield"
          @update:model-value="updateFilters"
        />
      </div>

      <!-- Small Group Filter -->
      <div class="w-full sm:w-48">
        <USelect
          v-model="localFilters.smallGroupId"
          :options="smallGroupOptions"
          placeholder="選擇小組"
          icon="i-lucide-users"
          @update:model-value="updateFilters"
        />
      </div>

      <!-- Clear Button -->
      <UButton
        v-if="hasActiveFilters"
        color="neutral"
        variant="outline"
        icon="i-lucide-x"
        @click="clearFilters"
      >
        清除
      </UButton>
    </div>
  </UCard>
</template>
