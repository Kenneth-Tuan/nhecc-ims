<template>
  <div class="max-w-7xl mx-auto p-6 space-y-6">
    <!-- 頁面標題 -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">資產總覽</h1>
        <p class="text-gray-600 mt-1">倉儲管理系統 - 資產資訊紀錄</p>
      </div>
      <div class="flex items-center gap-3">
        <ExcelImport />
        <UButton
          icon="i-heroicons-plus"
          size="lg"
          color="primary"
          variant="solid"
          @click="openCreateModal"
        >
          新增資產
        </UButton>
      </div>
    </div>

    <!-- 搜尋和篩選區域 -->
    <UCard>
      <div class="space-y-4">
        <!-- 搜尋列 -->
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="flex-1">
            <UInput
              v-model="searchQuery"
              placeholder="搜尋資產名稱、序號、位置、供應商、財產管理人..."
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
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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
            v-model="selectedPropertyManager"
            :options="propertyManagerOptions"
            placeholder="選擇財產管理人"
            searchable
          />
          <USelectMenu
            v-model="selectedTags"
            :options="filterTagOptions"
            multiple
            placeholder="選擇標籤"
            searchable
          />
        </div>
      </div>
    </UCard>

    <!-- 資產統計卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <UCard class="cursor-pointer hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">總資產數</p>
            <p class="text-2xl font-bold text-gray-900">{{ totalAssets }}</p>
          </div>
          <UIcon name="i-heroicons-archive-box" class="w-8 h-8 text-blue-500" />
        </div>
      </UCard>
      <UCard class="cursor-pointer hover:shadow-md transition-shadow">
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
      <UCard class="cursor-pointer hover:shadow-md transition-shadow">
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
      <UCard class="cursor-pointer hover:shadow-md transition-shadow">
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
                class="text-left py-3 px-4 font-medium text-gray-900 cursor-pointer hover:bg-gray-50 transition-colors"
                @click="handleSort(column.key as keyof Asset)"
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
              class="border-b border-gray-100 hover:bg-gray-50 transition-colors"
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
                <span class="text-sm text-gray-900">{{
                  asset.propertyManager || "-"
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
                    color="neutral"
                    @click="viewAsset(asset)"
                  />
                  <UButton
                    icon="i-heroicons-qr-code"
                    size="sm"
                    variant="ghost"
                    color="primary"
                    @click="generateQRCode(asset)"
                  />
                  <UButton
                    icon="i-heroicons-pencil"
                    size="sm"
                    variant="ghost"
                    color="neutral"
                    @click="editAsset(asset)"
                  />
                  <UButton
                    icon="i-heroicons-trash"
                    size="sm"
                    variant="ghost"
                    color="error"
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
          />
        </div>
      </template>
    </UCard>

    <!-- 資產表單 Modal -->
    <UModal v-model:open="showAssetModal" class="max-w-4xl">
      <template #content>
        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold">
                {{ isEditing ? "編輯資產" : "新增資產" }}
              </h3>
              <UButton
                icon="i-heroicons-x-mark"
                color="neutral"
                variant="ghost"
                size="sm"
                @click="closeModal"
              />
            </div>
          </template>

          <form @submit.prevent="handleSubmit" class="space-y-4">
            <!-- 第一行：資產名稱、序號、狀態 -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  資產名稱 <span class="text-red-500">*</span>
                </label>
                <UInput
                  v-model="form.name"
                  placeholder="請輸入資產名稱"
                  :maxlength="AssetColumnMaxWidth.name"
                  :error="errors.name"
                />
                <p v-if="errors.name" class="mt-1 text-sm text-red-600">
                  {{ errors.name }}
                </p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  序號 <span class="text-red-500">*</span>
                </label>
                <UInput
                  v-model="form.serialNumber"
                  placeholder="請輸入序號"
                  :maxlength="AssetColumnMaxWidth.serialNumber"
                  :error="errors.serialNumber"
                />
                <p v-if="errors.serialNumber" class="mt-1 text-sm text-red-600">
                  {{ errors.serialNumber }}
                </p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  狀態 <span class="text-red-500">*</span>
                </label>
                <USelectMenu
                  v-model="form.status"
                  :items="formStatusOptions"
                  placeholder="請選擇狀態"
                  :error="errors.status"
                  value-key="value"
                />
                <p v-if="errors.status" class="mt-1 text-sm text-red-600">
                  {{ errors.status }}
                </p>
              </div>
            </div>

            <!-- 第二行：數量、位置、供應商 -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  數量
                </label>
                <UInput
                  v-model.number="form.quantity"
                  type="number"
                  min="1"
                  placeholder="請輸入數量"
                  :error="errors.quantity"
                />
                <p v-if="errors.quantity" class="mt-1 text-sm text-red-600">
                  {{ errors.quantity }}
                </p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  位置
                </label>
                <UInput
                  v-model="form.location"
                  placeholder="請輸入位置"
                  :maxlength="AssetColumnMaxWidth.location"
                  :error="errors.location"
                />
                <p v-if="errors.location" class="mt-1 text-sm text-red-600">
                  {{ errors.location }}
                </p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  供應商
                </label>
                <UInput
                  v-model="form.supplier"
                  placeholder="請輸入供應商"
                  :maxlength="AssetColumnMaxWidth.supplier"
                  :error="errors.supplier"
                />
                <p v-if="errors.supplier" class="mt-1 text-sm text-red-600">
                  {{ errors.supplier }}
                </p>
              </div>
            </div>

            <!-- 第二行延伸：財產管理人 -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  財產管理人
                </label>
                <UInput
                  v-model="form.propertyManager"
                  placeholder="請輸入財產管理人"
                  :maxlength="AssetColumnMaxWidth.propertyManager"
                  :error="errors.propertyManager"
                  @input="validatePropertyManager"
                />
                <p
                  v-if="errors.propertyManager"
                  class="mt-1 text-sm text-red-600"
                >
                  {{ errors.propertyManager }}
                </p>
                <p class="mt-1 text-sm text-gray-500">
                  只允許輸入中文、英文和空格，最大長度 35 個字符
                </p>
              </div>
            </div>

            <!-- 第三行：購買價格、購買日期、保固到期日 -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  購買價格
                </label>
                <UInput
                  v-model.number="form.purchasePrice"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="請輸入購買價格"
                  :error="errors.purchasePrice"
                />
                <p
                  v-if="errors.purchasePrice"
                  class="mt-1 text-sm text-red-600"
                >
                  {{ errors.purchasePrice }}
                </p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  購買日期
                </label>
                <UInput
                  v-model="form.purchaseDate"
                  type="date"
                  :error="errors.purchaseDate"
                />
                <p v-if="errors.purchaseDate" class="mt-1 text-sm text-red-600">
                  {{ errors.purchaseDate }}
                </p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  保固到期日
                </label>
                <UInput
                  v-model="form.warrantyExpiry"
                  type="date"
                  :error="errors.warrantyExpiry"
                />
                <p
                  v-if="errors.warrantyExpiry"
                  class="mt-1 text-sm text-red-600"
                >
                  {{ errors.warrantyExpiry }}
                </p>
              </div>
            </div>

            <!-- 第四行：最後檢查日期、標籤 -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  最後檢查日期
                </label>
                <UInput
                  v-model="form.lastInspectionDate"
                  type="date"
                  :error="errors.lastInspectionDate"
                />
                <p
                  v-if="errors.lastInspectionDate"
                  class="mt-1 text-sm text-red-600"
                >
                  {{ errors.lastInspectionDate }}
                </p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  標籤
                </label>
                <UInputMenu
                  v-model="form.tags"
                  :items="availableTagOptions"
                  multiple
                  placeholder="請選擇或輸入標籤"
                  :error="errors.tags"
                  @keydown="handleTagKeydown"
                  @input="handleTagInput"
                />
                <p v-if="errors.tags" class="mt-1 text-sm text-red-600">
                  {{ errors.tags }}
                </p>
                <p class="mt-1 text-sm text-gray-500">
                  可選擇預設標籤或自行輸入新標籤，按 Tab 或 Enter 新增自定義標籤
                </p>
              </div>
            </div>

            <!-- 第五行：備註 (全寬) -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                備註
              </label>
              <UTextarea
                v-model="form.note"
                placeholder="請輸入備註"
                :maxlength="AssetColumnMaxWidth.note"
                :error="errors.note"
                :rows="3"
              />
              <p v-if="errors.note" class="mt-1 text-sm text-red-600">
                {{ errors.note }}
              </p>
            </div>
          </form>

          <template #footer>
            <div class="flex justify-end gap-3">
              <UButton
                variant="outline"
                @click="closeModal"
                :disabled="isSubmitting"
              >
                取消
              </UButton>
              <UButton
                color="primary"
                @click="handleSubmit"
                :loading="isSubmitting"
                :disabled="isSubmitting"
              >
                {{ isSubmitting ? "處理中..." : isEditing ? "更新" : "建立" }}
              </UButton>
            </div>
          </template>
        </UCard>
      </template>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import type { Asset } from "~/models/asset";
import { AssetStatus, AssetColumnMaxWidth } from "~/models/asset";
import { formatDateInput, parseDateInput } from "~/utils/dateHelper";

// Store
const warehouseStore = useWarehouseStore();

// 響應式資料
const searchQuery = ref("");
const selectedStatus = ref<AssetStatus | null>(null);
const selectedLocation = ref<string | null>(null);
const selectedSupplier = ref<string | null>(null);
const selectedPropertyManager = ref<string | null>(null);
const selectedTags = ref<string[]>([]);
const currentPage = ref(1);
const pageSize = ref(20);
const sortField = ref<keyof Asset>("name");
const sortDirection = ref<"asc" | "desc">("asc");

// Modal 相關
const showAssetModal = ref(false);
const selectedAsset = ref<Asset | null>(null);
const isSubmitting = ref(false);

// 表單資料
const form = ref({
  name: "",
  serialNumber: "",
  status: AssetStatus.ACTIVE as AssetStatus,
  quantity: 1,
  location: "",
  supplier: "",
  propertyManager: "",
  purchasePrice: undefined as number | undefined,
  purchaseDate: "" as string | undefined,
  warrantyExpiry: "" as string | undefined,
  lastInspectionDate: "" as string | undefined,
  note: "",
  tags: [] as string[],
});

// 表單錯誤
const errors = ref<Record<string, string>>({});

// 標籤選項
const tagOptions = ["電子設備", "教學用品", "辦公用品", "維修工具"];
const customTags = ref<string[]>([]);
const currentTagInput = ref("");

// 表單狀態選項
const formStatusOptions = [
  { label: "正常使用", value: AssetStatus.ACTIVE },
  { label: "停用", value: AssetStatus.INACTIVE },
  { label: "維修中", value: AssetStatus.MAINTENANCE },
  { label: "已損壞", value: AssetStatus.DAMAGED },
  { label: "已報廢", value: AssetStatus.DISPOSED },
];

// 表格欄位定義
const tableColumns = [
  { key: "name", label: "資產名稱" },
  { key: "serialNumber", label: "序號" },
  { key: "status", label: "狀態" },
  { key: "location", label: "位置" },
  { key: "supplier", label: "供應商" },
  { key: "propertyManager", label: "財產管理人" },
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

// 財產管理人選項
const propertyManagerOptions = computed(() => [
  { label: "全部財產管理人", value: null },
  ...warehouseStore.uniquePropertyManagers.map((manager) => ({
    label: manager,
    value: manager,
  })),
]);

// 標籤選項 (用於篩選)
const filterTagOptions = computed(() =>
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
    selectedPropertyManager,
    selectedTags,
  ],
  () => {
    warehouseStore.updateSearchParams({
      search: searchQuery.value || undefined,
      status: selectedStatus.value || undefined,
      location: selectedLocation.value || undefined,
      supplier: selectedSupplier.value || undefined,
      propertyManager: selectedPropertyManager.value || undefined,
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
  selectedPropertyManager.value = null;
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

function getStatusColor(
  status: AssetStatus
): "success" | "neutral" | "warning" | "error" {
  switch (status) {
    case AssetStatus.ACTIVE:
      return "success";
    case AssetStatus.INACTIVE:
      return "neutral";
    case AssetStatus.MAINTENANCE:
      return "warning";
    case AssetStatus.DAMAGED:
      return "error";
    case AssetStatus.DISPOSED:
      return "error";
    default:
      return "neutral";
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
  // 導航到資產詳情頁面
  navigateTo(`/warehouse/item?id=${asset.id}`);
}

function generateQRCode(asset: Asset) {
  // 導航到 QR Code 生成頁面
  navigateTo(`/warehouse/qrcode?id=${asset.id}`);
}

function editAsset(asset: Asset) {
  selectedAsset.value = asset;
  loadAssetData(asset);
  showAssetModal.value = true;
}

function deleteAsset(asset: Asset) {
  // 刪除資產
  console.log("刪除資產:", asset);
}

// 計算屬性
const isEditing = computed(() => !!selectedAsset.value);

// 可用的標籤選項（包含預設和自定義標籤）
const availableTagOptions = computed(() => {
  // 從 warehouse store 中獲取所有資產的標籤
  const warehouseTags = warehouseStore.allTags;

  // 如果有 warehouse 標籤，使用 warehouse 標籤 + 自定義標籤
  if (warehouseTags.length > 0) {
    const allTags = [...warehouseTags, ...customTags.value];
    // 去重並排序
    return [...new Set(allTags)].sort();
  }

  // 如果沒有 warehouse 標籤，使用預設標籤 + 自定義標籤
  const allTags = [...tagOptions, ...customTags.value];
  return [...new Set(allTags)].sort();
});

// 表單驗證
function validateForm(): boolean {
  errors.value = {};

  if (!form.value.name.trim()) {
    errors.value.name = "資產名稱為必填欄位";
  } else if (form.value.name.length > AssetColumnMaxWidth.name) {
    errors.value.name = `資產名稱不能超過 ${AssetColumnMaxWidth.name} 個字元`;
  }

  if (!form.value.serialNumber.trim()) {
    errors.value.serialNumber = "序號為必填欄位";
  } else if (
    form.value.serialNumber.length > AssetColumnMaxWidth.serialNumber
  ) {
    errors.value.serialNumber = `序號不能超過 ${AssetColumnMaxWidth.serialNumber} 個字元`;
  }

  if (!form.value.status) {
    errors.value.status = "狀態為必填欄位";
  }

  if (form.value.quantity < 1) {
    errors.value.quantity = "數量必須大於 0";
  }

  if (
    form.value.location &&
    form.value.location.length > AssetColumnMaxWidth.location
  ) {
    errors.value.location = `位置不能超過 ${AssetColumnMaxWidth.location} 個字元`;
  }

  if (
    form.value.supplier &&
    form.value.supplier.length > AssetColumnMaxWidth.supplier
  ) {
    errors.value.supplier = `供應商不能超過 ${AssetColumnMaxWidth.supplier} 個字元`;
  }

  if (
    form.value.propertyManager &&
    form.value.propertyManager.length > AssetColumnMaxWidth.propertyManager
  ) {
    errors.value.propertyManager = `財產管理人不能超過 ${AssetColumnMaxWidth.propertyManager} 個字元`;
  }

  // 財產管理人格式驗證
  if (form.value.propertyManager && form.value.propertyManager.length > 0) {
    const validPattern = /^[\u4e00-\u9fa5a-zA-Z\s]+$/;
    if (!validPattern.test(form.value.propertyManager)) {
      errors.value.propertyManager = "財產管理人只能包含中文、英文和空格";
    }
  }

  if (form.value.note && form.value.note.length > AssetColumnMaxWidth.note) {
    errors.value.note = `備註不能超過 ${AssetColumnMaxWidth.note} 個字元`;
  }

  return Object.keys(errors.value).length === 0;
}

// 重置表單
function resetForm() {
  form.value = {
    name: "",
    serialNumber: "",
    status: AssetStatus.ACTIVE,
    quantity: 1,
    location: "",
    supplier: "",
    propertyManager: "",
    purchasePrice: undefined,
    purchaseDate: undefined,
    warrantyExpiry: undefined,
    lastInspectionDate: undefined,
    note: "",
    tags: [],
  };
  errors.value = {};
}

// 財產管理人驗證函數
function validatePropertyManager() {
  const value = form.value.propertyManager;
  if (value && value.length > 0) {
    // 檢查是否只包含中文、英文和空格
    const validPattern = /^[\u4e00-\u9fa5a-zA-Z\s]+$/;
    if (!validPattern.test(value)) {
      errors.value.propertyManager = "財產管理人只能包含中文、英文和空格";
    } else if (value.length > AssetColumnMaxWidth.propertyManager) {
      errors.value.propertyManager = `財產管理人不能超過 ${AssetColumnMaxWidth.propertyManager} 個字符`;
    } else {
      delete errors.value.propertyManager;
    }
  } else {
    delete errors.value.propertyManager;
  }
}

// 載入資產數據到表單
function loadAssetData(asset: Asset) {
  form.value.name = asset.name;
  form.value.serialNumber = asset.serialNumber;
  form.value.status = asset.status;
  form.value.quantity = asset.quantity;
  form.value.location = asset.location || "";
  form.value.supplier = asset.supplier || "";
  form.value.propertyManager = asset.propertyManager || "";
  form.value.purchasePrice = asset.purchasePrice;
  form.value.purchaseDate = formatDateInput(asset.purchaseDate);
  form.value.warrantyExpiry = formatDateInput(asset.warrantyExpiry);
  form.value.lastInspectionDate = formatDateInput(asset.lastInspectionDate);
  form.value.note = asset.note || "";
  form.value.tags = asset.tags || [];
}

// 表單提交
async function handleSubmit() {
  if (!validateForm()) {
    return;
  }

  isSubmitting.value = true;

  try {
    const assetData = {
      name: form.value.name.trim(),
      serialNumber: form.value.serialNumber.trim(),
      status: form.value.status,
      quantity: form.value.quantity,
      location: form.value.location.trim() || undefined,
      supplier: form.value.supplier.trim() || undefined,
      propertyManager: form.value.propertyManager.trim() || undefined,
      purchasePrice: form.value.purchasePrice,
      purchaseDate: parseDateInput(form.value.purchaseDate),
      warrantyExpiry: parseDateInput(form.value.warrantyExpiry),
      lastInspectionDate: parseDateInput(form.value.lastInspectionDate),
      note: form.value.note.trim() || undefined,
      tags: form.value.tags.length > 0 ? form.value.tags : undefined,
    };

    if (selectedAsset.value) {
      // 編輯模式
      await warehouseStore.updateAsset(selectedAsset.value.id, assetData);
    } else {
      // 新增模式
      await warehouseStore.createAsset(assetData as Omit<Asset, "id">);
    }

    // 重新載入資料
    await warehouseStore.loadAssets();

    // 關閉 Modal
    closeModal();

    // 顯示成功訊息
    const message = selectedAsset.value ? "資產更新成功" : "資產建立成功";
    console.log(message);
  } catch (error) {
    console.error("操作失敗:", error);
  } finally {
    isSubmitting.value = false;
  }
}

// 處理標籤輸入
function handleTagInput(event: Event) {
  const target = event.target as HTMLInputElement;
  currentTagInput.value = target.value;
}

// 處理標籤鍵盤事件
function handleTagKeydown(event: KeyboardEvent) {
  if (event.key === "Tab" || event.key === "Enter") {
    // event.preventDefault();

    const input = event.target as HTMLInputElement;
    const newTag = input.value.trim();

    // 檢查是否已存在於 warehouse 標籤、預設標籤或自定義標籤中
    const warehouseTags = warehouseStore.allTags;
    const isExistingTag =
      warehouseTags.includes(newTag) ||
      tagOptions.includes(newTag) ||
      customTags.value.includes(newTag);

    if (newTag && !isExistingTag) {
      // 新增自定義標籤
      customTags.value.push(newTag);

      // 如果標籤不在當前選中的標籤中，則添加
      if (!form.value.tags.includes(newTag)) {
        form.value.tags.push(newTag);
      }

      // 清空輸入框
      input.value = "";
      currentTagInput.value = "";
    }
  }
}

// 關閉 Modal
function closeModal() {
  showAssetModal.value = false;
  nextTick(() => {
    resetForm();
  });
}

// Modal 相關方法
function openCreateModal() {
  selectedAsset.value = null;
  resetForm();
  showAssetModal.value = true;
}

// 載入資料
onMounted(async () => {
  await warehouseStore.loadAssets();
});
</script>
