<template>
  <div class="max-w-7xl mx-auto p-6 space-y-6">
    <!-- 頁面標題 -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">資產總覽</h1>
        <p class="text-gray-600 mt-1">倉儲管理系統 - 資產資訊紀錄</p>
      </div>
      <UButton
        icon="i-heroicons-plus"
        size="lg"
        color="primary"
        variant="solid"
      >
        新增資產
      </UButton>
    </div>

    <!-- 搜尋和篩選區域 -->
    <UCard>
      <div class="space-y-4">
        <!-- 搜尋列 -->
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="flex-1">
            <UInput
              v-model="searchQuery"
              placeholder="搜尋資產名稱、序號、位置、供應商..."
              icon="i-heroicons-magnifying-glass"
              size="lg"
            />
          </div>
          <UButton
            @click="resetFilters"
            variant="outline"
            size="lg"
            icon="i-heroicons-x-mark"
          >
            清除篩選
          </UButton>
        </div>

        <!-- 篩選器 -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <USelectMenu
            v-model="selectedStatus"
            :options="statusOptions"
            placeholder="選擇狀態"
            searchable
          />
          <USelectMenu
            v-model="selectedLocation"
            :options="locationOptions"
            placeholder="選擇位置"
            searchable
          />
          <USelectMenu
            v-model="selectedSupplier"
            :options="supplierOptions"
            placeholder="選擇供應商"
            searchable
          />
          <USelectMenu
            v-model="selectedTags"
            :options="tagOptions"
            multiple
            placeholder="選擇標籤"
            searchable
          />
        </div>
      </div>
    </UCard>

    <!-- 資產統計卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">總資產數</p>
            <p class="text-2xl font-bold text-gray-900">{{ totalAssets }}</p>
          </div>
          <UIcon name="i-heroicons-archive-box" class="w-8 h-8 text-blue-500" />
        </div>
      </UCard>
      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">正常使用</p>
            <p class="text-2xl font-bold text-green-600">{{ activeAssets }}</p>
          </div>
          <UIcon
            name="i-heroicons-check-circle"
            class="w-8 h-8 text-green-500"
          />
        </div>
      </UCard>
      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">維修中</p>
            <p class="text-2xl font-bold text-yellow-600">
              {{ maintenanceAssets }}
            </p>
          </div>
          <UIcon
            name="i-heroicons-wrench-screwdriver"
            class="w-8 h-8 text-yellow-500"
          />
        </div>
      </UCard>
      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">已損壞</p>
            <p class="text-2xl font-bold text-red-600">{{ damagedAssets }}</p>
          </div>
          <UIcon
            name="i-heroicons-exclamation-triangle"
            class="w-8 h-8 text-red-500"
          />
        </div>
      </UCard>
    </div>

    <!-- 資產表格 -->
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold">資產列表</h3>
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-600">
              顯示 {{ displayRangeText }} / 共 {{ filteredTotal }} 筆
            </span>
          </div>
        </div>
      </template>

      <!-- 載入狀態 -->
      <div v-if="warehouseStore.isLoading" class="flex justify-center py-8">
        <UIcon
          name="i-heroicons-arrow-path"
          class="w-8 h-8 animate-spin text-primary-500"
        />
      </div>

      <!-- 資產表格 -->
      <div v-else class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-200">
              <th
                v-for="column in tableColumns"
                :key="column.key"
                class="text-left py-3 px-4 font-medium text-gray-900 cursor-pointer hover:bg-gray-50"
                @click="handleSort(column.key)"
              >
                <div class="flex items-center gap-2">
                  {{ column.label }}
                  <UIcon
                    v-if="sortField === column.key"
                    :name="
                      sortDirection === 'asc'
                        ? 'i-heroicons-chevron-up'
                        : 'i-heroicons-chevron-down'
                    "
                    class="w-4 h-4"
                  />
                </div>
              </th>
              <th class="text-left py-3 px-4 font-medium text-gray-900">
                操作
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="asset in displayedAssets"
              :key="asset.id"
              class="border-b border-gray-100 hover:bg-gray-50"
            >
              <td class="py-3 px-4">
                <div class="font-medium text-gray-900">{{ asset.name }}</div>
                <div class="text-sm text-gray-500">{{ asset.id }}</div>
              </td>
              <td class="py-3 px-4">
                <span class="text-sm text-gray-900">{{
                  asset.serialNumber
                }}</span>
              </td>
              <td class="py-3 px-4">
                <UBadge :color="getStatusColor(asset.status)" variant="subtle">
                  {{ getStatusLabel(asset.status) }}
                </UBadge>
              </td>
              <td class="py-3 px-4">
                <span class="text-sm text-gray-900">{{
                  asset.location || "-"
                }}</span>
              </td>
              <td class="py-3 px-4">
                <span class="text-sm text-gray-900">{{
                  asset.supplier || "-"
                }}</span>
              </td>
              <td class="py-3 px-4">
                <span class="text-sm text-gray-900">
                  {{
                    asset.purchasePrice
                      ? formatCurrency(asset.purchasePrice)
                      : "-"
                  }}
                </span>
              </td>
              <td class="py-3 px-4">
                <span class="text-sm text-gray-900">{{ asset.quantity }}</span>
              </td>
              <td class="py-3 px-4">
                <span class="text-sm text-gray-900">
                  {{
                    asset.purchaseDate ? formatDate(asset.purchaseDate) : "-"
                  }}
                </span>
              </td>
              <td class="py-3 px-4">
                <div class="flex items-center gap-2">
                  <UButton
                    icon="i-heroicons-eye"
                    size="sm"
                    variant="ghost"
                    color="gray"
                    @click="viewAsset(asset)"
                  />
                  <UButton
                    icon="i-heroicons-pencil"
                    size="sm"
                    variant="ghost"
                    color="gray"
                    @click="editAsset(asset)"
                  />
                  <UButton
                    icon="i-heroicons-trash"
                    size="sm"
                    variant="ghost"
                    color="red"
                    @click="deleteAsset(asset)"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 分頁 -->
      <template #footer>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-600">每頁顯示</span>
            <USelectMenu
              v-model="pageSize"
              :options="pageSizeOptions"
              class="w-20"
            />
            <span class="text-sm text-gray-600">筆</span>
          </div>
          <UPagination
            v-model="currentPage"
            :page-count="pageSize"
            :total="filteredTotal"
            :ui="{
              wrapper: 'flex items-center gap-1',
              rounded: '!rounded-md',
              default: {
                size: 'sm',
              },
            }"
          />
        </div>
      </template>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import type { Asset } from "~/models/asset";
import { AssetStatus } from "~/models/asset";

// 設定頁面標題
useHead({
  title: "資產總覽 - 倉儲管理系統",
});

// Store
const warehouseStore = useWarehouseStore();

// 響應式資料
const searchQuery = ref("");
const selectedStatus = ref<AssetStatus | null>(null);
const selectedLocation = ref<string | null>(null);
const selectedSupplier = ref<string | null>(null);
const selectedTags = ref<string[]>([]);
const currentPage = ref(1);
const pageSize = ref(20);
const sortField = ref<keyof Asset>("name");
const sortDirection = ref<"asc" | "desc">("asc");

// 表格欄位定義
const tableColumns = [
  { key: "name", label: "資產名稱" },
  { key: "serialNumber", label: "序號" },
  { key: "status", label: "狀態" },
  { key: "location", label: "位置" },
  { key: "supplier", label: "供應商" },
  { key: "purchasePrice", label: "購買價格" },
  { key: "quantity", label: "數量" },
  { key: "purchaseDate", label: "購買日期" },
];

// 每頁筆數選項
const pageSizeOptions = [
  { label: "10", value: 10 },
  { label: "20", value: 20 },
  { label: "50", value: 50 },
  { label: "100", value: 100 },
];

// 狀態選項
const statusOptions = computed(() => [
  { label: "全部狀態", value: null },
  { label: "正常使用", value: AssetStatus.ACTIVE },
  { label: "停用", value: AssetStatus.INACTIVE },
  { label: "維修中", value: AssetStatus.MAINTENANCE },
  { label: "已損壞", value: AssetStatus.DAMAGED },
  { label: "已報廢", value: AssetStatus.DISPOSED },
]);

// 位置選項
const locationOptions = computed(() => [
  { label: "全部位置", value: null },
  ...warehouseStore.uniqueLocations.map((location) => ({
    label: location,
    value: location,
  })),
]);

// 供應商選項
const supplierOptions = computed(() => [
  { label: "全部供應商", value: null },
  ...warehouseStore.uniqueSuppliers.map((supplier) => ({
    label: supplier,
    value: supplier,
  })),
]);

// 標籤選項
const tagOptions = computed(() =>
  warehouseStore.allTags.map((tag) => ({
    label: tag,
    value: tag,
  }))
);

// 計算屬性
const totalAssets = computed(() => warehouseStore.assets.length);
const activeAssets = computed(
  () =>
    warehouseStore.assets.filter((asset) => asset.status === AssetStatus.ACTIVE)
      .length
);
const maintenanceAssets = computed(
  () =>
    warehouseStore.assets.filter(
      (asset) => asset.status === AssetStatus.MAINTENANCE
    ).length
);
const damagedAssets = computed(
  () =>
    warehouseStore.assets.filter(
      (asset) => asset.status === AssetStatus.DAMAGED
    ).length
);

const displayedAssets = computed(() => warehouseStore.paginatedAssets);
const filteredTotal = computed(() => warehouseStore.filteredAssets.length);

const displayRangeText = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value + 1;
  const end = Math.min(start + pageSize.value - 1, filteredTotal.value);
  return `${start}-${end}`;
});

// 監聽器
watch(
  [
    searchQuery,
    selectedStatus,
    selectedLocation,
    selectedSupplier,
    selectedTags,
  ],
  () => {
    warehouseStore.updateSearchParams({
      search: searchQuery.value || undefined,
      status: selectedStatus.value || undefined,
      location: selectedLocation.value || undefined,
      supplier: selectedSupplier.value || undefined,
      tags: selectedTags.value.length > 0 ? selectedTags.value : undefined,
    });
  }
);

watch([currentPage, pageSize], () => {
  warehouseStore.updatePagination({
    page: currentPage.value,
    pageSize: pageSize.value,
  });
});

watch([sortField, sortDirection], () => {
  warehouseStore.updateSortOption({
    field: sortField.value,
    direction: sortDirection.value,
  });
});

// 方法
function resetFilters() {
  searchQuery.value = "";
  selectedStatus.value = null;
  selectedLocation.value = null;
  selectedSupplier.value = null;
  selectedTags.value = [];
  warehouseStore.resetSearch();
}

function handleSort(field: keyof Asset) {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    sortField.value = field;
    sortDirection.value = "asc";
  }
}

function getStatusColor(status: AssetStatus): string {
  switch (status) {
    case AssetStatus.ACTIVE:
      return "green";
    case AssetStatus.INACTIVE:
      return "gray";
    case AssetStatus.MAINTENANCE:
      return "yellow";
    case AssetStatus.DAMAGED:
      return "red";
    case AssetStatus.DISPOSED:
      return "red";
    default:
      return "gray";
  }
}

function getStatusLabel(status: AssetStatus): string {
  switch (status) {
    case AssetStatus.ACTIVE:
      return "正常使用";
    case AssetStatus.INACTIVE:
      return "停用";
    case AssetStatus.MAINTENANCE:
      return "維修中";
    case AssetStatus.DAMAGED:
      return "已損壞";
    case AssetStatus.DISPOSED:
      return "已報廢";
    default:
      return "未知";
  }
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("zh-TW", {
    style: "currency",
    currency: "TWD",
  }).format(amount);
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("zh-TW").format(date);
}

function viewAsset(asset: Asset) {
  // 查看資產詳情
  console.log("查看資產:", asset);
}

function editAsset(asset: Asset) {
  // 編輯資產
  console.log("編輯資產:", asset);
}

function deleteAsset(asset: Asset) {
  // 刪除資產
  console.log("刪除資產:", asset);
}

// 載入資料
onMounted(async () => {
  await warehouseStore.loadAssets();
});
</script>
