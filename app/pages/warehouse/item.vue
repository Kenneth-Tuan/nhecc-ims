<template>
  <div class="max-w-4xl mx-auto p-6 space-y-6">
    <!-- 頁面標題和返回按鈕 -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <UButton
          icon="i-heroicons-arrow-left"
          variant="ghost"
          color="neutral"
          @click="goBack"
        >
          返回列表
        </UButton>
      </div>
    </div>

    <!-- 載入狀態 -->
    <div v-if="isLoading" class="flex justify-center py-12">
      <UIcon
        name="i-heroicons-arrow-path"
        class="w-8 h-8 animate-spin text-primary-500"
      />
    </div>

    <!-- 錯誤狀態 -->
    <UCard v-else-if="error" class="text-center py-12">
      <UIcon
        name="i-heroicons-exclamation-triangle"
        class="w-12 h-12 text-red-500 mx-auto mb-4"
      />
      <h3 class="text-lg font-semibold text-gray-900 mb-2">載入失敗</h3>
      <p class="text-gray-600 mb-4">{{ error }}</p>
      <UButton @click="loadAsset" color="primary"> 重新載入 </UButton>
    </UCard>

    <!-- 資產詳情內容 -->
    <div v-else-if="asset" class="space-y-6">
      <!-- 基本資訊卡片 -->
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold">基本資訊</h3>
        </template>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-500 mb-1"
                >資產名稱</label
              >
              <p class="text-lg font-semibold text-gray-900">
                {{ asset.name }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-500 mb-1"
                >序號</label
              >
              <p class="text-lg text-gray-900">{{ asset.serialNumber }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-500 mb-1"
                >狀態</label
              >
              <UBadge
                :color="getStatusColor(asset.status)"
                variant="subtle"
                class="text-sm"
              >
                {{ getStatusLabel(asset.status) }}
              </UBadge>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-500 mb-1"
                >數量</label
              >
              <p class="text-lg text-gray-900">{{ asset.quantity }}</p>
            </div>

            <div v-if="asset.tags && asset.tags.length > 0">
              <label class="block text-sm font-medium text-gray-500 mb-1"
                >標籤</label
              >
              <div class="flex flex-wrap gap-2">
                <UBadge
                  v-for="tag in asset.tags"
                  :key="tag"
                  color="primary"
                  variant="subtle"
                >
                  {{ tag }}
                </UBadge>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-500 mb-1"
                >位置</label
              >
              <p class="text-lg text-gray-900">{{ asset.location || "-" }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-500 mb-1"
                >供應商</label
              >
              <p class="text-lg text-gray-900">{{ asset.supplier || "-" }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-500 mb-1"
                >財產管理人</label
              >
              <p class="text-lg text-gray-900">
                {{ asset.propertyManager || "-" }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-500 mb-1"
                >購買價格</label
              >
              <p class="text-lg text-gray-900">
                {{
                  asset.purchasePrice
                    ? formatCurrency(asset.purchasePrice)
                    : "-"
                }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-500 mb-1"
                >資產 ID</label
              >
              <p class="text-sm text-gray-600 font-mono">{{ asset.id }}</p>
            </div>
          </div>
        </div>
      </UCard>

      <!-- 日期資訊卡片 -->
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold">日期資訊</h3>
        </template>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-500 mb-1"
              >購買日期</label
            >
            <p class="text-lg text-gray-900">
              {{ asset.purchaseDate ? formatDate(asset.purchaseDate) : "-" }}
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-500 mb-1"
              >保固到期日</label
            >
            <p class="text-lg text-gray-900">
              {{
                asset.warrantyExpiry ? formatDate(asset.warrantyExpiry) : "-"
              }}
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-500 mb-1"
              >最後檢查日期</label
            >
            <p class="text-lg text-gray-900">
              {{
                asset.lastInspectionDate
                  ? formatDate(asset.lastInspectionDate)
                  : "-"
              }}
            </p>
          </div>
        </div>
      </UCard>

      <!-- 備註卡片 -->
      <UCard v-if="asset.note">
        <template #header>
          <h3 class="text-lg font-semibold">備註</h3>
        </template>

        <p class="text-gray-900 whitespace-pre-wrap">{{ asset.note }}</p>
      </UCard>

      <!-- QR Code 顯示區域 -->
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold">QR Code</h3>
        </template>

        <div class="flex flex-col items-center space-y-6">
          <!-- QR Code 圖片 -->
          <div class="bg-white p-4 shadow-sm w-64 h-64" ref="qrCodeContainer">
            <Qrcode :value="qrCodeUrl" />
          </div>

          <!-- 下載按鈕 -->
          <div class="flex items-center gap-3">
            <UButton
              icon="i-heroicons-arrow-down-tray"
              color="primary"
              @click="handleDownloadQRCode"
            >
              下載 QR Code
            </UButton>
            <UButton
              icon="i-heroicons-printer"
              variant="outline"
              @click="handlePrintQRCode"
            >
              列印 QR Code
            </UButton>
          </div>

          <!-- URL 資訊 -->
          <div class="text-center">
            <p class="text-sm text-gray-500 mb-2">
              掃描此 QR Code 可查看完整資產詳情
            </p>
            <p class="text-xs text-gray-400 font-mono break-all">
              {{ qrCodeUrl }}
            </p>
          </div>
        </div>
      </UCard>

      <!-- 使用說明 -->
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold">使用說明</h3>
        </template>

        <div class="space-y-3 text-sm text-gray-600">
          <div class="flex items-start gap-3">
            <UIcon
              name="i-heroicons-information-circle"
              class="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0"
            />
            <p>使用手機相機或 QR Code 掃描器掃描上方條碼</p>
          </div>
          <div class="flex items-start gap-3">
            <UIcon
              name="i-heroicons-information-circle"
              class="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0"
            />
            <p>掃描後將自動開啟資產詳情頁面</p>
          </div>
          <div class="flex items-start gap-3">
            <UIcon
              name="i-heroicons-information-circle"
              class="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0"
            />
            <p>可下載或列印 QR Code 貼在實體資產上</p>
          </div>
        </div>
      </UCard>
    </div>

    <!-- 資產不存在 -->
    <UCard v-else class="text-center py-12">
      <UIcon
        name="i-heroicons-archive-box"
        class="w-12 h-12 text-gray-400 mx-auto mb-4"
      />
      <h3 class="text-lg font-semibold text-gray-900 mb-2">資產不存在</h3>
      <p class="text-gray-600 mb-4">
        找不到指定的資產，可能已被刪除或 ID 不正確
      </p>
      <UButton @click="goBack" color="primary"> 返回列表 </UButton>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import type { Asset } from "~/models/asset";
import { AssetStatus } from "~/models/asset";

// 路由參數
const route = useRoute();
const router = useRouter();

// Store
const warehouseStore = useWarehouseStore();

// 響應式資料
const asset = ref<Asset | null>(null);
const isLoading = ref(false);
const error = ref<string | null>(null);
const qrCodeContainer = ref<HTMLElement | null>(null);

// QR Code composable
const { downloadQRCode, printQRCode, generateQRCodeUrl } = useQRCode();

// 計算屬性
const assetId = computed(() => route.query.id as string);

// QR Code URL
const qrCodeUrl = computed(() => generateQRCodeUrl(asset.value));

// 載入資產資料
async function loadAsset() {
  if (!assetId.value) {
    error.value = "缺少資產 ID";
    return;
  }

  isLoading.value = true;
  error.value = null;

  try {
    // 先從 store 中查找資產
    const foundAsset = warehouseStore.assets.find(
      (a) => a.id === assetId.value
    );

    if (foundAsset) {
      asset.value = foundAsset;
    } else {
      // 如果 store 中沒有，嘗試從 API 載入
      await warehouseStore.loadAssets();
      const reloadedAsset = warehouseStore.assets.find(
        (a) => a.id === assetId.value
      );

      if (reloadedAsset) {
        asset.value = reloadedAsset;
      } else {
        error.value = "找不到指定的資產";
      }
    }
  } catch (err) {
    console.error("載入資產失敗:", err);
    error.value = "載入資產時發生錯誤";
  } finally {
    isLoading.value = false;
  }
}

// 返回列表
function goBack() {
  router.push("/warehouse");
}

// QR Code 相關方法
function handleDownloadQRCode() {
  downloadQRCode(qrCodeContainer.value, asset.value);
}

function handlePrintQRCode() {
  printQRCode(qrCodeContainer.value, asset.value);
}

// 工具函數
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

// 頁面載入時執行
onMounted(() => {
  loadAsset();
});

// 監聽路由變化
watch(
  () => route.query.id,
  () => {
    if (route.query.id) {
      loadAsset();
    }
  }
);
</script>
