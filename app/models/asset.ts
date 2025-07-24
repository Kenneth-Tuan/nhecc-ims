/**
 * 資產狀態枚舉
 */
export enum AssetStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  MAINTENANCE = "maintenance",
  DAMAGED = "damaged",
  DISPOSED = "disposed",
}

/**
 * 資產資料介面
 */
export interface Asset {
  /** 資產ID */
  id: string;
  /** 資產名稱 */
  name: string;
  /** 備註 */
  note?: string;
  /** 購買日期 */
  purchaseDate?: Date;
  /** 存放位置 */
  location?: string;
  /** 供應商 */
  supplier?: string;
  /** 購買價格 */
  purchasePrice?: number;
  /** 保固到期日 */
  warrantyExpiry?: Date;
  /** 序號 */
  serialNumber: string;
  /** 最後檢查日期 */
  lastInspectionDate?: Date;
  /** 狀態 */
  status: AssetStatus;
  /** 標籤 */
  tags?: string[];
  /** 數量 */
  quantity: number;
}

/**
 * 資產搜尋/篩選參數
 */
export interface AssetSearchParams {
  /** 搜尋關鍵字 */
  search?: string;
  /** 狀態篩選 */
  status?: AssetStatus;
  /** 位置篩選 */
  location?: string;
  /** 供應商篩選 */
  supplier?: string;
  /** 標籤篩選 */
  tags?: string[];
}

/**
 * 資產排序選項
 */
export interface AssetSortOption {
  /** 排序欄位 */
  field: keyof Asset;
  /** 排序方向 */
  direction: "asc" | "desc";
}

/**
 * 分頁參數
 */
export interface PaginationParams {
  /** 當前頁數 */
  page: number;
  /** 每頁筆數 */
  pageSize: number;
}
