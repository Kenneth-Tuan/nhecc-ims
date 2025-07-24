# Appwrite 整合說明

## 概述

本專案已整合 Appwrite 作為後端服務，用於資產管理系統的資料儲存和 API 服務。

## 架構

### 服務層 (Services)

- `app/services/appwrite.ts` - Appwrite 基礎配置和客戶端初始化
- `app/services/assetApi.ts` - 資產相關的 API 服務

### 狀態管理 (Stores)

- `app/stores/warehouse.ts` - 已更新為使用 Appwrite API

## 環境變數配置

請在專案根目錄建立 `.env` 檔案，並設定以下環境變數：

```env
NUXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NUXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
NUXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
NUXT_PUBLIC_APPWRITE_COLLECTION_ID=your_collection_id
```

## Appwrite 資料庫設定

### 資料庫結構

在 Appwrite 中建立以下資料庫結構：

#### 集合 (Collection): `assets`

| 欄位名稱           | 類型     | 必填 | 說明                                                    |
| ------------------ | -------- | ---- | ------------------------------------------------------- |
| name               | string   | ✓    | 資產名稱                                                |
| note               | string   |      | 備註                                                    |
| purchaseDate       | string   |      | 購買日期 (ISO 格式)                                     |
| location           | string   |      | 存放位置                                                |
| supplier           | string   |      | 供應商                                                  |
| purchasePrice      | number   |      | 購買價格                                                |
| warrantyExpiry     | string   |      | 保固到期日 (ISO 格式)                                   |
| serialNumber       | string   | ✓    | 序號                                                    |
| lastInspectionDate | string   |      | 最後檢查日期 (ISO 格式)                                 |
| status             | string   | ✓    | 狀態 (active, inactive, maintenance, damaged, disposed) |
| tags               | string[] |      | 標籤陣列                                                |
| quantity           | number   | ✓    | 數量                                                    |

### 權限設定

建議設定以下權限：

- **讀取權限**: 所有使用者
- **建立權限**: 已認證使用者
- **更新權限**: 已認證使用者
- **刪除權限**: 已認證使用者

## API 功能

### 資產管理

- `getAssets()` - 取得資產列表（支援搜尋、篩選、分頁、排序）
- `createAsset()` - 建立新資產
- `updateAsset()` - 更新資產
- `deleteAsset()` - 刪除資產

### 搜尋和篩選

支援以下搜尋條件：

- 關鍵字搜尋（名稱、序號）
- 狀態篩選
- 位置篩選
- 供應商篩選

### 分頁和排序

- 支援分頁功能
- 支援多欄位排序

## 使用方式

### 在 Store 中使用

```typescript
import { useWarehouseStore } from "~/stores/warehouse";

const warehouseStore = useWarehouseStore();

// 載入資產
await warehouseStore.loadAssets();

// 建立資產
await warehouseStore.createAsset({
  name: "新資產",
  serialNumber: "SN001",
  status: AssetStatus.ACTIVE,
  quantity: 1,
});

// 更新資產
await warehouseStore.updateAsset("asset-id", {
  name: "更新後的資產名稱",
});

// 刪除資產
await warehouseStore.deleteAsset("asset-id");
```

### 在組件中使用

```vue
<script setup>
import { useWarehouseStore } from "~/stores/warehouse";

const warehouseStore = useWarehouseStore();

// 在組件掛載時載入資料
onMounted(async () => {
  await warehouseStore.loadAssets();
});
</script>
```

## 錯誤處理

所有 API 呼叫都包含適當的錯誤處理：

```typescript
try {
  await warehouseStore.loadAssets();
} catch (error) {
  console.error("載入資產失敗:", error);
  // 處理錯誤邏輯
}
```

## 注意事項

1. 確保 Appwrite 專案已正確設定
2. 檢查環境變數是否正確配置
3. 確認資料庫集合結構符合預期
4. 測試所有 CRUD 操作功能

## 未來擴展

- 加入檔案上傳功能（使用 Appwrite Storage）
- 實作使用者認證系統
- 加入即時更新功能（使用 Appwrite Realtime）
- 實作資料備份和還原功能
