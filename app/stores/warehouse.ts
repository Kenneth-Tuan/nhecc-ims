import { defineStore } from "pinia";
import type {
  Asset,
  AssetSearchParams,
  AssetSortOption,
  PaginationParams,
} from "~/models/asset";
import { AssetStatus } from "~/models/asset";
import { AssetApiService } from "~/services/assetApi";

interface WarehouseState {
  /** 資產列表 */
  assets: Asset[];
  /** 載入狀態 */
  isLoading: boolean;
  /** 搜尋參數 */
  searchParams: AssetSearchParams;
  /** 排序選項 */
  sortOption: AssetSortOption;
  /** 分頁參數 */
  pagination: PaginationParams;
  /** 總筆數 */
  totalCount: number;
}

export const useWarehouseStore = defineStore("warehouse", {
  state: (): WarehouseState => ({
    assets: [],
    isLoading: false,
    searchParams: {},
    sortOption: {
      field: "name",
      direction: "asc",
    },
    pagination: {
      page: 1,
      pageSize: 20,
    },
    totalCount: 0,
  }),

  getters: {
    /**
     * 篩選和排序後的資產列表
     */
    filteredAssets: (state): Asset[] => {
      let filtered = [...state.assets];

      // 搜尋篩選
      if (state.searchParams.search) {
        const searchTerm = state.searchParams.search.toLowerCase();
        filtered = filtered.filter(
          (asset) =>
            asset.name.toLowerCase().includes(searchTerm) ||
            asset.serialNumber.toLowerCase().includes(searchTerm) ||
            asset.note?.toLowerCase().includes(searchTerm) ||
            asset.location?.toLowerCase().includes(searchTerm) ||
            asset.supplier?.toLowerCase().includes(searchTerm) ||
            asset.propertyManager?.toLowerCase().includes(searchTerm)
        );
      }

      // 狀態篩選
      if (state.searchParams.status) {
        filtered = filtered.filter(
          (asset) => asset.status === state.searchParams.status
        );
      }

      // 位置篩選
      if (state.searchParams.location) {
        filtered = filtered.filter(
          (asset) => asset.location === state.searchParams.location
        );
      }

      // 供應商篩選
      if (state.searchParams.supplier) {
        filtered = filtered.filter(
          (asset) => asset.supplier === state.searchParams.supplier
        );
      }

      // 財產管理人篩選
      if (state.searchParams.propertyManager) {
        filtered = filtered.filter(
          (asset) =>
            asset.propertyManager === state.searchParams.propertyManager
        );
      }

      // 標籤篩選
      if (state.searchParams.tags && state.searchParams.tags.length > 0) {
        filtered = filtered.filter((asset) =>
          asset.tags?.some((tag) => state.searchParams.tags?.includes(tag))
        );
      }

      // 排序
      filtered.sort((a, b) => {
        const aValue = a[state.sortOption.field];
        const bValue = b[state.sortOption.field];

        if (aValue === undefined && bValue === undefined) return 0;
        if (aValue === undefined) return 1;
        if (bValue === undefined) return -1;

        let comparison = 0;
        if (aValue < bValue) comparison = -1;
        if (aValue > bValue) comparison = 1;

        return state.sortOption.direction === "desc" ? -comparison : comparison;
      });

      return filtered;
    },

    /**
     * 分頁後的資產列表
     */
    paginatedAssets(): Asset[] {
      const filtered = this.filteredAssets;
      const startIndex = (this.pagination.page - 1) * this.pagination.pageSize;
      const endIndex = startIndex + this.pagination.pageSize;
      return filtered.slice(startIndex, endIndex);
    },

    /**
     * 總頁數
     */
    totalPages(): number {
      return Math.ceil(this.filteredAssets.length / this.pagination.pageSize);
    },

    /**
     * 唯一的位置列表
     */
    uniqueLocations: (state): string[] => {
      const locations = state.assets
        .map((asset) => asset.location)
        .filter((location): location is string => Boolean(location));
      return [...new Set(locations)].sort();
    },

    /**
     * 唯一的供應商列表
     */
    uniqueSuppliers: (state): string[] => {
      const suppliers = state.assets
        .map((asset) => asset.supplier)
        .filter((supplier): supplier is string => Boolean(supplier));
      return [...new Set(suppliers)].sort();
    },

    /**
     * 所有標籤列表
     */
    allTags: (state): string[] => {
      const tags = state.assets.flatMap((asset) => asset.tags || []);
      return [...new Set(tags)].sort();
    },

    /**
     * 唯一的財產管理人列表
     */
    uniquePropertyManagers: (state): string[] => {
      const propertyManagers = state.assets
        .map((asset) => asset.propertyManager)
        .filter((manager): manager is string => Boolean(manager));
      return [...new Set(propertyManagers)].sort();
    },
  },

  actions: {
    /**
     * 載入資產資料
     */
    async loadAssets() {
      this.isLoading = true;
      try {
        const result = await AssetApiService.getAssets({
          searchParams: this.searchParams,
          pagination: this.pagination,
          sortField: this.sortOption.field,
          sortDirection: this.sortOption.direction,
        });

        this.assets = result.documents;
        this.totalCount = result.total;
      } catch (error) {
        console.error("載入資產資料失敗:", error);
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    /**
     * 建立新資產
     */
    async createAsset(assetData: Omit<Asset, "id">) {
      try {
        const newAsset = await AssetApiService.createAsset(assetData);
        this.assets.unshift(newAsset);
        this.totalCount++;
        return newAsset;
      } catch (error) {
        console.error("建立資產失敗:", error);
        throw error;
      }
    },

    /**
     * 更新資產
     */
    async updateAsset(id: string, assetData: Partial<Asset>) {
      try {
        const updatedAsset = await AssetApiService.updateAsset(id, assetData);
        const index = this.assets.findIndex((asset) => asset.id === id);
        if (index !== -1) {
          this.assets[index] = updatedAsset;
        }
        return updatedAsset;
      } catch (error) {
        console.error("更新資產失敗:", error);
        throw error;
      }
    },

    /**
     * 刪除資產
     */
    async deleteAsset(id: string) {
      try {
        await AssetApiService.deleteAsset(id);
        this.assets = this.assets.filter((asset) => asset.id !== id);
        this.totalCount--;
      } catch (error) {
        console.error("刪除資產失敗:", error);
        throw error;
      }
    },

    /**
     * 更新搜尋參數
     */
    updateSearchParams(params: Partial<AssetSearchParams>) {
      this.searchParams = { ...this.searchParams, ...params };
      this.pagination.page = 1; // 重置到第一頁
    },

    /**
     * 更新排序選項
     */
    updateSortOption(sortOption: AssetSortOption) {
      this.sortOption = sortOption;
    },

    /**
     * 更新分頁參數
     */
    updatePagination(params: Partial<PaginationParams>) {
      this.pagination = { ...this.pagination, ...params };
    },

    /**
     * 重置搜尋
     */
    resetSearch() {
      this.searchParams = {};
      this.pagination.page = 1;
    },
  },
});

/**
 * 生成模擬資產資料
 */
function _generateMockAssets(): Asset[] {
  const mockAssets: Asset[] = [];
  const locations = ["倉庫A", "倉庫B", "辦公室", "教室1", "教室2", "廚房"];
  const suppliers = ["供應商A", "供應商B", "供應商C", "廠商D"];
  const propertyManagers = ["李一民", "王小明", "張美玲", "陳志強", "林雅婷"];
  const tagOptions = ["電子設備", "傢俱", "教學用品", "辦公用品", "廚房設備"];
  const statuses = Object.values(AssetStatus);

  for (let i = 1; i <= 50; i++) {
    const asset: Asset = {
      id: `asset-${i.toString().padStart(3, "0")}`,
      name: `資產項目 ${i}`,
      note: i % 3 === 0 ? `備註內容 ${i}` : undefined,
      purchaseDate: new Date(
        2020 + Math.floor(Math.random() * 4),
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28)
      ),
      location: locations[Math.floor(Math.random() * locations.length)],
      supplier: suppliers[Math.floor(Math.random() * suppliers.length)],
      propertyManager:
        propertyManagers[Math.floor(Math.random() * propertyManagers.length)],
      purchasePrice: Math.floor(Math.random() * 50000) + 1000,
      warrantyExpiry: new Date(
        2024 + Math.floor(Math.random() * 3),
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28)
      ),
      serialNumber: `SN${i.toString().padStart(6, "0")}`,
      lastInspectionDate: new Date(
        2024,
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28)
      ),
      status: statuses[
        Math.floor(Math.random() * statuses.length)
      ] as AssetStatus,
      tags:
        Math.random() > 0.5
          ? [tagOptions[Math.floor(Math.random() * tagOptions.length)]!]
          : [],
      quantity: Math.floor(Math.random() * 10) + 1,
    };
    mockAssets.push(asset);
  }

  return mockAssets;
}
