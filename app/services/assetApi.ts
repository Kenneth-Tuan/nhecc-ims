import {
  databases,
  DATABASE_ID,
  COLLECTION_ID,
  validateAppwriteConfig,
} from "./appwrite";
import type {
  Asset,
  AssetSearchParams,
  PaginationParams,
} from "~/models/asset";
import { ID, Query } from "appwrite";

export const AssetApiService = {
  /**
   * 取得資產列表
   */
  async getAssets(params: {
    searchParams?: AssetSearchParams;
    pagination?: PaginationParams;
    sortField?: string;
    sortDirection?: "asc" | "desc";
  }) {
    // 檢查配置
    const config = validateAppwriteConfig();
    if (!config.isValid) {
      throw new Error(`Appwrite 配置錯誤: ${config.errors.join(", ")}`);
    }

    try {
      const queries: string[] = [];

      // 搜尋條件
      if (params.searchParams?.search) {
        queries.push(Query.search("name", params.searchParams.search));
        queries.push(Query.search("serialNumber", params.searchParams.search));
        queries.push(
          Query.search("propertyManager", params.searchParams.search)
        );
      }

      if (params.searchParams?.status) {
        queries.push(Query.equal("status", params.searchParams.status));
      }

      if (params.searchParams?.location) {
        queries.push(Query.equal("location", params.searchParams.location));
      }

      if (params.searchParams?.supplier) {
        queries.push(Query.equal("supplier", params.searchParams.supplier));
      }

      if (params.searchParams?.propertyManager) {
        queries.push(
          Query.equal("propertyManager", params.searchParams.propertyManager)
        );
      }

      // 分頁
      const offset =
        ((params.pagination?.page || 1) - 1) *
        (params.pagination?.pageSize || 20);
      queries.push(Query.limit(params.pagination?.pageSize || 20));
      queries.push(Query.offset(offset));

      // 排序
      if (params.sortField) {
        if (params.sortDirection === "desc") {
          queries.push(Query.orderDesc(params.sortField));
        } else {
          queries.push(Query.orderAsc(params.sortField));
        }
      }

      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        queries
      );

      return {
        documents: response.documents.map((doc) =>
          AssetApiService.mapDocumentToAsset(doc)
        ),
        total: response.total,
      };
    } catch (error) {
      console.error("Error fetching assets:", error);
      throw error;
    }
  },

  /**
   * 建立新資產
   */
  async createAsset(asset: Omit<Asset, "id">) {
    try {
      const response = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        AssetApiService.mapAssetToDocument(asset)
      );

      return AssetApiService.mapDocumentToAsset(response);
    } catch (error) {
      console.error("Error creating asset:", error);
      throw error;
    }
  },

  /**
   * 更新資產
   */
  async updateAsset(id: string, asset: Partial<Asset>) {
    try {
      const response = await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        id,
        AssetApiService.mapAssetToDocument(asset)
      );

      return AssetApiService.mapDocumentToAsset(response);
    } catch (error) {
      console.error("Error updating asset:", error);
      throw error;
    }
  },

  /**
   * 刪除資產
   */
  async deleteAsset(id: string) {
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
    } catch (error) {
      console.error("Error deleting asset:", error);
      throw error;
    }
  },

  /**
   * 將 Appwrite 文件映射為 Asset 物件
   */
  mapDocumentToAsset(doc: Record<string, unknown>): Asset {
    return {
      id: doc.$id as string,
      name: doc.name as string,
      note: doc.note as string | undefined,
      purchaseDate: doc.purchaseDate
        ? new Date(doc.purchaseDate as string)
        : undefined,
      location: doc.location as string | undefined,
      supplier: doc.supplier as string | undefined,
      propertyManager: doc.propertyManager as string | undefined,
      purchasePrice: doc.purchasePrice as number | undefined,
      warrantyExpiry: doc.warrantyExpiry
        ? new Date(doc.warrantyExpiry as string)
        : undefined,
      serialNumber: doc.serialNumber as string,
      lastInspectionDate: doc.lastInspectionDate
        ? new Date(doc.lastInspectionDate as string)
        : undefined,
      status: doc.status as Asset["status"],
      tags: doc.tags as string[] | undefined,
      quantity: doc.quantity as number,
    };
  },

  /**
   * 將 Asset 物件映射為 Appwrite 文件格式
   */
  mapAssetToDocument(asset: Partial<Asset>) {
    return {
      name: asset.name,
      note: asset.note,
      purchaseDate: asset.purchaseDate?.toISOString(),
      location: asset.location,
      supplier: asset.supplier,
      propertyManager: asset.propertyManager,
      purchasePrice: asset.purchasePrice,
      warrantyExpiry: asset.warrantyExpiry?.toISOString(),
      serialNumber: asset.serialNumber,
      lastInspectionDate: asset.lastInspectionDate?.toISOString(),
      status: asset.status,
      tags: asset.tags,
      quantity: asset.quantity,
    };
  },
};
