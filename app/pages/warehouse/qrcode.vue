<template>
  <div class="max-w-2xl mx-auto p-6 space-y-6">
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
        <div>
          <h1 class="text-3xl font-bold text-gray-900">資產 QR Code</h1>
          <p class="text-gray-600 mt-1">掃描 QR Code 查看資產詳情</p>
        </div>
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

    <!-- QR Code 內容 -->
    <div v-else-if="asset" class="space-y-6">
      <!-- 資產基本資訊 -->
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold">資產資訊</h3>
        </template>

        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h4 class="text-lg font-semibold text-gray-900">
                {{ asset.name }}
              </h4>
              <p class="text-sm text-gray-600">
                序號: {{ asset.serialNumber }}
              </p>
            </div>
            <UBadge :color="getStatusColor(asset.status)" variant="subtle">
              {{ getStatusLabel(asset.status) }}
            </UBadge>
          </div>

          <div class="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span class="text-gray-500">位置:</span>
              <span class="ml-2 text-gray-900">{{
                asset.location || "-"
              }}</span>
            </div>
            <div>
              <span class="text-gray-500">數量:</span>
              <span class="ml-2 text-gray-900">{{ asset.quantity }}</span>
            </div>
            <div>
              <span class="text-gray-500">財產管理人:</span>
              <span class="ml-2 text-gray-900">{{
                asset.propertyManager || "-"
              }}</span>
            </div>
            <div>
              <span class="text-gray-500">供應商:</span>
              <span class="ml-2 text-gray-900">{{
                asset.supplier || "-"
              }}</span>
            </div>
          </div>
        </div>
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
              @click="downloadQRCode"
            >
              下載 QR Code
            </UButton>
            <UButton
              icon="i-heroicons-printer"
              variant="outline"
              @click="printQRCode"
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

// 計算屬性
const assetId = computed(() => route.query.id as string);

// QR Code URL
const qrCodeUrl = computed(() => {
  if (!asset.value) return "";
  // 使用完整的 URL，包含域名
  const baseUrl = window.location.origin;
  return `${baseUrl}/warehouse/item?id=${asset.value.id}`;
});

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

// 下載 QR Code
function downloadQRCode() {
  // 等待下一個 tick 確保 QR Code 已經渲染
  nextTick(() => {
    const svg = qrCodeContainer.value?.querySelector("svg");
    console.log(svg);
    if (svg) {
      try {
        const blob = new Blob([svg.outerHTML], { type: "image/svg+xml" });
        console.log("test blob", blob);
        const url = URL.createObjectURL(blob);
        console.log("test url", url);
        const a = document.createElement("a");
        console.log("test a", a);
        a.href = url;
        a.download = `qrcode-${asset.value?.name || asset.value?.id || "asset"}.svg`;
        console.log("test a", a);
        a.target = "_blank";
        console.log("test a", a);
        document.body.appendChild(a);
        console.log("test a", a);
        a.click();
        console.log("test a", a);
        document.body.removeChild(a);
      } catch (error) {
        console.error("下載 QR Code 失敗:", error);
      }
    } else {
      console.warn("找不到 QR Code SVG 元素");
    }
  });
}

// 列印 QR Code
function printQRCode() {
  // 等待下一個 tick 確保 QR Code 已經渲染
  nextTick(() => {
    const svg = qrCodeContainer.value?.querySelector("svg");
    if (svg) {
      try {
        // 將 SVG 轉換為 PNG data URL
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          console.error("無法獲取 canvas context");
          return;
        }

        // 設定 canvas 尺寸
        const size = 300; // 列印用較小尺寸
        canvas.width = size;
        canvas.height = size;

        // 創建圖片元素
        const img = new Image();
        img.onload = function () {
          // 先填充白色背景
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, size, size);

          // 繪製圖片到 canvas
          ctx.drawImage(img, 0, 0, size, size);

          // 轉換為 PNG data URL 並列印
          const pngDataUrl = canvas.toDataURL("image/png");

          // 創建一個新的列印視窗
          const printWindow = window.open("", "_blank");
          if (printWindow) {
            const assetName = asset.value?.name || asset.value?.id || "asset";
            const assetSerial = asset.value?.serialNumber || "";

            printWindow.document.write(`
              <!DOCTYPE html>
              <html>
              <head>
                <title>QR Code - ${assetName}</title>
                <style>
                  body {
                    margin: 0;
                    padding: 20px;
                    font-family: Arial, sans-serif;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                  }
                  .qr-container {
                    text-align: center;
                    background: white;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                  }
                  .qr-code {
                    margin-bottom: 15px;
                  }
                  .asset-info {
                    margin-top: 15px;
                    font-size: 14px;
                    color: #666;
                  }
                  .asset-name {
                    font-weight: bold;
                    font-size: 16px;
                    margin-bottom: 5px;
                  }
                  .asset-serial {
                    font-size: 12px;
                    color: #888;
                  }
                  @media print {
                    body {
                      padding: 0;
                    }
                    .qr-container {
                      box-shadow: none;
                      border: 1px solid #ddd;
                    }
                  }
                </style>
              </head>
              <body>
                <div class="qr-container">
                  <div class="qr-code">
                    <img src="${pngDataUrl}" alt="QR Code" style="width: 200px; height: 200px;">
                  </div>
                  <div class="asset-info">
                    <div class="asset-name">${assetName}</div>
                    <div class="asset-serial">序號: ${assetSerial}</div>
                  </div>
                </div>
              </body>
              </html>
            `);

            printWindow.document.close();
            printWindow.focus();

            // 等待圖片載入完成後列印
            printWindow.onload = function () {
              printWindow.print();
              printWindow.close();
            };
          }
        };

        // 將 SVG 轉換為 data URL，確保 SVG 有正確的命名空間
        const svgWithNamespace = svgData.includes("xmlns")
          ? svgData
          : svgData.replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"');

        const svgDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgWithNamespace)}`;
        img.src = svgDataUrl;
      } catch (error) {
        console.error("列印 QR Code 失敗:", error);
      }
    } else {
      console.warn("找不到 QR Code SVG 元素");
    }
  });
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
