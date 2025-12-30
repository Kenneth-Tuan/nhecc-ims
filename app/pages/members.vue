<script setup lang="ts">
import type { Member, MemberFormData } from "~/types/member";

definePageMeta({
  layout: "dashboard",
  title: "會友管理",
});

useHead({
  title: "會友管理 - NHECC",
});

// Use member management composable
const {
  members,
  roles,
  smallGroups,
  isLoading,
  isSubmitting,
  totalMembers,
  currentPage,
  pageSize,
  totalPages,
  filters,
  loadMembers,
  createMember,
  updateMember,
  deleteMember,
  loadRoles,
  loadSmallGroups,
  updateFilters,
  clearFilters,
  changePage,
} = useMemberManagement();

// Modal states
const isFormModalOpen = ref(false);
const isDetailModalOpen = ref(false);
const selectedMember = ref<Member | null>(null);
const isEditMode = ref(false);

// Delete confirmation
const isDeleteDialogOpen = ref(false);
const memberToDelete = ref<Member | null>(null);

// Initialize data
onMounted(async () => {
  await Promise.all([loadMembers(), loadRoles(), loadSmallGroups()]);
});

// Open create form
const openCreateForm = () => {
  selectedMember.value = null;
  isEditMode.value = false;
  isFormModalOpen.value = true;
};

// Open edit form
const openEditForm = (member: Member) => {
  selectedMember.value = member;
  isEditMode.value = true;
  isFormModalOpen.value = true;
  isDetailModalOpen.value = false; // Close detail modal if open
};

// Open detail view
const openDetailView = (member: Member) => {
  selectedMember.value = member;
  isDetailModalOpen.value = true;
};

// Handle form submit
const handleFormSubmit = async (data: MemberFormData) => {
  try {
    if (isEditMode.value && selectedMember.value) {
      await updateMember(selectedMember.value.id, data);
    } else {
      await createMember(data);
    }
    isFormModalOpen.value = false;
    selectedMember.value = null;
  } catch (error) {
    // Error handling is done in the composable
  }
};

// Handle delete
const openDeleteConfirmation = (member: Member) => {
  memberToDelete.value = member;
  isDeleteDialogOpen.value = true;
  isDetailModalOpen.value = false; // Close detail modal if open
};

const confirmDelete = async () => {
  if (memberToDelete.value) {
    await deleteMember(memberToDelete.value.id, memberToDelete.value.name);
    isDeleteDialogOpen.value = false;
    memberToDelete.value = null;
  }
};

// Handle filter changes
const handleFilterChange = async (newFilters: typeof filters.value) => {
  await updateFilters(newFilters);
};

const handleClearFilters = async () => {
  await clearFilters();
};

// Handle pagination
const handlePageChange = async (page: number) => {
  await changePage(page);
};
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div
      class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
    >
      <div>
        <h1 class="text-2xl font-bold">會友管理</h1>
        <p class="text-muted mt-1">管理教會會友資料、角色與小組分配</p>
      </div>
      <UButton icon="i-lucide-user-plus" size="lg" @click="openCreateForm">
        新增會友
      </UButton>
    </div>

    <!-- Filters -->
    <MemberFilters
      v-model="filters"
      :roles="roles"
      :small-groups="smallGroups"
      @clear="handleClearFilters"
    />

    <!-- Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <UCard>
        <div class="flex items-center gap-4">
          <div class="p-3 rounded-lg bg-primary/10">
            <UIcon name="i-lucide-users" class="w-6 h-6 text-primary" />
          </div>
          <div>
            <div class="text-2xl font-bold">
              {{ totalMembers }}
            </div>
            <div class="text-sm text-muted">總會友數</div>
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center gap-4">
          <div class="p-3 rounded-lg bg-primary/10">
            <UIcon name="i-lucide-shield" class="w-6 h-6 text-primary" />
          </div>
          <div>
            <div class="text-2xl font-bold">
              {{ roles.length }}
            </div>
            <div class="text-sm text-muted">角色類型</div>
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center gap-4">
          <div class="p-3 rounded-lg bg-primary/10">
            <UIcon name="i-lucide-users-round" class="w-6 h-6 text-primary" />
          </div>
          <div>
            <div class="text-2xl font-bold">
              {{ smallGroups.length }}
            </div>
            <div class="text-sm text-muted">小組數量</div>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Member Table -->
    <MemberTable
      :members="members"
      :loading="isLoading"
      @view="openDetailView"
      @edit="openEditForm"
      @delete="openDeleteConfirmation"
    />

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="flex justify-center">
      <UPagination
        v-model:page="currentPage"
        :total="totalMembers"
        :page-size="pageSize"
        show-first
        show-last
        @update:page="handlePageChange"
      />
    </div>

    <!-- Form Modal -->
    <UModal
      v-model:open="isFormModalOpen"
      :title="isEditMode ? '編輯會友' : '新增會友'"
      :close-button="{ icon: 'i-lucide-x', color: 'neutral', variant: 'ghost' }"
      size="xl"
    >
      <template #body>
        <MemberForm
          :member="selectedMember"
          :roles="roles"
          :small-groups="smallGroups"
          :members="members"
          :loading="isSubmitting"
          @submit="handleFormSubmit"
          @cancel="isFormModalOpen = false"
        />
      </template>
    </UModal>

    <!-- Detail Modal -->
    <MemberDetailModal
      v-model:open="isDetailModalOpen"
      :member="selectedMember"
      @edit="openEditForm"
      @delete="openDeleteConfirmation"
    />

    <!-- Delete Confirmation Dialog -->
    <UModal
      v-model:open="isDeleteDialogOpen"
      title="確認刪除"
      :close-button="{ icon: 'i-lucide-x', color: 'neutral', variant: 'ghost' }"
    >
      <template #body>
        <div class="flex items-start gap-3">
          <div class="p-2 rounded-lg bg-red-500/10">
            <UIcon
              name="i-lucide-alert-triangle"
              class="w-6 h-6 text-red-500"
            />
          </div>
          <div class="flex-1">
            <p class="font-medium">
              確定要刪除會友「{{ memberToDelete?.name }}」嗎？
            </p>
            <p class="text-sm text-muted mt-1">
              此操作無法復原，會友的所有資料將被永久刪除。
            </p>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end gap-3 pt-4">
          <UButton
            color="neutral"
            variant="outline"
            @click="isDeleteDialogOpen = false"
          >
            取消
          </UButton>
          <UButton color="error" :loading="isSubmitting" @click="confirmDelete">
            確認刪除
          </UButton>
        </div>
      </template>
    </UModal>
  </div>
</template>
