<template>
  <div>
    <!-- 匯入按鈕 -->
    <UButton
      icon="i-heroicons-document-arrow-up"
      size="lg"
      color="primary"
      variant="outline"
      @click="openFileDialog"
      :loading="isProcessing"
      :disabled="isProcessing"
    >
      {{ isProcessing ? "處理中..." : "Excel 匯入" }}
    </UButton>

    <!-- 隱藏的檔案輸入 -->
    <input
      ref="fileInput"
      type="file"
      accept=".xlsx,.xls,.csv"
      class="hidden"
      @change="handleFileSelect"
    />

    <!-- 匯入進度 Modal -->
    <UModal v-model:open="showProgressModal" :closable="!isProcessing">
      <template #content>
        <UCard>
          <template #header>
            <div class="flex items-center gap-3">
              <UIcon
                name="i-heroicons-document-arrow-up"
                class="w-6 h-6 text-primary-500"
              />
              <h3 class="text-lg font-semibold">Excel 匯入進度</h3>
            </div>
          </template>

          <div class="space-y-4">
            <!-- 進度資訊 -->
            <div v-if="importProgress.total > 0" class="space-y-2">
              <div class="flex justify-between text-sm">
                <span>處理進度</span>
                <span
                  >{{ importProgress.processed }} /
                  {{ importProgress.total }}</span
                >
              </div>
              <UProgress
                :value="(importProgress.processed / importProgress.total) * 100"
                class="w-full"
              />
            </div>

            <!-- 狀態訊息 -->
            <div
              v-if="importStatus"
              class="p-3 rounded-md"
              :class="importStatusClass"
            >
              <p class="text-sm">{{ importStatus }}</p>
            </div>

            <!-- 錯誤列表 -->
            <div v-if="importErrors.length > 0" class="space-y-2">
              <h4 class="text-sm font-medium text-gray-900">匯入錯誤：</h4>
              <div class="max-h-40 overflow-y-auto space-y-1">
                <div
                  v-for="(error, index) in importErrors"
                  :key="index"
                  class="text-xs text-red-600 bg-red-50 p-2 rounded"
                >
                  第 {{ error.row }} 行：{{ error.message }}
                </div>
              </div>
            </div>

            <!-- 成功列表 -->
            <div v-if="importSuccesses.length > 0" class="space-y-2">
              <h4 class="text-sm font-medium text-gray-900">
                成功匯入 {{ importSuccesses.length }} 筆資料：
              </h4>
              <div class="max-h-40 overflow-y-auto space-y-1">
                <div
                  v-for="(success, index) in importSuccesses"
                  :key="index"
                  class="text-xs text-green-600 bg-green-50 p-2 rounded"
                >
                  {{ success.name }} ({{ success.serialNumber }})
                </div>
              </div>
            </div>
          </div>

          <template #footer>
            <div class="flex justify-end gap-3">
              <UButton
                v-if="!isProcessing"
                variant="outline"
                @click="closeProgressModal"
              >
                關閉
              </UButton>
              <UButton
                v-if="isProcessing"
                color="error"
                variant="outline"
                @click="cancelImport"
              >
                取消匯入
              </UButton>
            </div>
          </template>
        </UCard>
      </template>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import * as XLSX from "xlsx";
import type { Asset } from "~/models/asset";
import { AssetStatus } from "~/models/asset";
import { parseDate } from "~/utils/dateHelper";

interface ImportError {
  row: number;
  message: string;
}

interface ImportSuccess {
  name: string;
  serialNumber: string;
}

interface ImportProgress {
  processed: number;
  total: number;
}

// Store
const warehouseStore = useWarehouseStore();

// Refs
const fileInput = ref<HTMLInputElement | null>(null);
const showProgressModal = ref(false);
const isProcessing = ref(false);
const importProgress = ref<ImportProgress>({ processed: 0, total: 0 });
const importStatus = ref("");
const importErrors = ref<ImportError[]>([]);
const importSuccesses = ref<ImportSuccess[]>([]);
const cancelFlag = ref(false);

// Toast notification
const toast = useToast();

// Computed
const importStatusClass = computed(() => {
  if (
    importStatus.value.includes("錯誤") ||
    importStatus.value.includes("失敗")
  ) {
    return "bg-red-50 text-red-800 border border-red-200";
  }
  if (
    importStatus.value.includes("完成") ||
    importStatus.value.includes("成功")
  ) {
    return "bg-green-50 text-green-800 border border-green-200";
  }
  return "bg-blue-50 text-blue-800 border border-blue-200";
});

// Methods
function openFileDialog() {
  fileInput.value?.click();
}

function handleFileSelect(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (!file) return;

  // 驗證檔案格式
  const allowedTypes = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
    "application/vnd.ms-excel", // .xls
    "text/csv", // .csv
  ];

  const allowedExtensions = [".xlsx", ".xls", ".csv"];
  const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();

  if (
    !allowedTypes.includes(file.type) &&
    !allowedExtensions.includes(fileExtension)
  ) {
    toast.add({
      title: "匯入失敗",
      description: "檔案格式僅限 .xlsx、.xls、.csv",
      color: "error",
    });
    return;
  }

  // 開始處理檔案
  processExcelFile(file);

  // 清空輸入，允許重複選擇同一檔案
  target.value = "";
}

async function processExcelFile(file: File) {
  isProcessing.value = true;
  showProgressModal.value = true;
  cancelFlag.value = false;

  // 重置進度
  importProgress.value = { processed: 0, total: 0 };
  importErrors.value = [];
  importSuccesses.value = [];
  importStatus.value = "正在讀取檔案...";

  try {
    // 讀取檔案
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: "buffer" });

    // 取得第一個工作表
    const sheetName = workbook.SheetNames[0];
    if (!sheetName) {
      throw new Error("Excel 檔案中沒有找到工作表");
    }
    const worksheet = workbook.Sheets[sheetName];
    if (!worksheet) {
      throw new Error("無法讀取工作表內容");
    }

    // 轉換為 JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
    }) as unknown[][];

    if (!jsonData || jsonData.length < 2) {
      throw new Error("Excel 檔案內容不足，至少需要標題行和一筆資料");
    }

    // 解析標題行並建立欄位映射
    const headers = jsonData[0] as string[];
    const fieldMapping = createFieldMapping(headers);

    importStatus.value = "正在解析資料...";

    // 處理資料行
    const dataRows = jsonData.slice(1);
    importProgress.value.total = dataRows.length;

    for (let i = 0; i < dataRows.length; i++) {
      if (cancelFlag.value) {
        importStatus.value = "匯入已取消";
        break;
      }

      const row = dataRows[i];
      if (!row) continue;
      const rowNumber = i + 2; // Excel 行號從 1 開始，加上標題行

      try {
        await processRow(row as unknown[], fieldMapping, rowNumber);
        importProgress.value.processed++;
      } catch (error) {
        importErrors.value.push({
          row: rowNumber,
          message: error instanceof Error ? error.message : "未知錯誤",
        });
        importProgress.value.processed++;
      }

      // 模擬處理延遲，避免 UI 阻塞
      if (i % 10 === 0) {
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
    }

    if (!cancelFlag.value) {
      const successCount = importSuccesses.value.length;
      const errorCount = importErrors.value.length;

      if (successCount > 0) {
        importStatus.value = `匯入完成！成功：${successCount} 筆，失敗：${errorCount} 筆`;

        // 重新載入資產列表
        await warehouseStore.loadAssets();

        toast.add({
          title: "匯入完成",
          description: `成功匯入 ${successCount} 筆資產`,
          color: "success",
        });
      } else {
        importStatus.value = "匯入失敗，沒有有效的資料";
      }
    }
  } catch (error) {
    importStatus.value = `檔案處理錯誤：${error instanceof Error ? error.message : "未知錯誤"}`;
    toast.add({
      title: "匯入失敗",
      description: error instanceof Error ? error.message : "檔案處理發生錯誤",
      color: "error",
    });
  } finally {
    isProcessing.value = false;
  }
}

function createFieldMapping(headers: string[]): Record<string, number> {
  const mapping: Record<string, number> = {};

  headers.forEach((header, index) => {
    const normalizedHeader = header?.toString().trim();

    // 根據您提供的圖片，建立欄位映射
    switch (normalizedHeader) {
      case "編號":
        mapping.serialNumber = index;
        break;
      case "品項":
        mapping.name = index;
        break;
      case "採購日期":
        mapping.purchaseDate = index;
        break;
      case "保固日期止":
        mapping.warrantyExpiry = index;
        break;
      case "放置地點":
        mapping.location = index;
        break;
      case "財產管理人":
        mapping.propertyManager = index;
        break;
      case "備註":
        mapping.note = index;
        break;
    }
  });

  return mapping;
}

async function processRow(
  row: unknown[],
  fieldMapping: Record<string, number>,
  _rowNumber: number
) {
  // 檢查必要欄位
  const serialNumberIndex = fieldMapping.serialNumber;
  const nameIndex = fieldMapping.name;

  const serialNumber =
    serialNumberIndex !== undefined
      ? row[serialNumberIndex]?.toString().trim()
      : "";
  const name = nameIndex !== undefined ? row[nameIndex]?.toString().trim() : "";

  if (!serialNumber && !name) {
    // 如果編號和品項都沒有，跳過這一行
    return;
  }

  if (!serialNumber) {
    throw new Error("編號為必填欄位");
  }

  if (!name) {
    throw new Error("品項為必填欄位");
  }

  // 檢查編號是否已存在
  const existingAsset = warehouseStore.assets.find(
    (asset) => asset.serialNumber === serialNumber
  );
  if (existingAsset) {
    throw new Error(`編號 ${serialNumber} 已存在`);
  }

  // 建立資產資料
  const assetData: Omit<Asset, "id"> = {
    name,
    serialNumber,
    status: AssetStatus.ACTIVE,
    quantity: 1,
    location: getFieldValue(row, fieldMapping.location),
    propertyManager: getFieldValue(row, fieldMapping.propertyManager),
    note: getFieldValue(row, fieldMapping.note),
    purchaseDate: parseDate(getFieldValue(row, fieldMapping.purchaseDate)),
    warrantyExpiry: parseDate(getFieldValue(row, fieldMapping.warrantyExpiry)),
    // 其他欄位使用預設值
    supplier: undefined,
    purchasePrice: undefined,
    lastInspectionDate: undefined,
    tags: undefined,
  };

  // 創建資產
  const createdAsset = await warehouseStore.createAsset(assetData);

  importSuccesses.value.push({
    name: createdAsset.name,
    serialNumber: createdAsset.serialNumber,
  });
}

function getFieldValue(
  row: unknown[],
  index: number | undefined
): string | undefined {
  if (index === undefined || !row[index]) return undefined;
  const value = row[index]?.toString().trim();
  return value || undefined;
}

function cancelImport() {
  cancelFlag.value = true;
  importStatus.value = "正在取消匯入...";
}

function closeProgressModal() {
  showProgressModal.value = false;

  // 清空狀態
  setTimeout(() => {
    importProgress.value = { processed: 0, total: 0 };
    importErrors.value = [];
    importSuccesses.value = [];
    importStatus.value = "";
  }, 300);
}
</script>
