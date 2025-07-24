import { Client, Databases, Account, Storage } from "appwrite";

// Appwrite 配置 - 使用 Vite 環境變數
const APPWRITE_ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1";
const APPWRITE_PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID || "";
const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID || "";
const APPWRITE_COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID || "";

// 檢查環境變數
if (!APPWRITE_PROJECT_ID) {
  console.error("❌ VITE_APPWRITE_PROJECT_ID 未設定");
  console.error("請在 env/.env.development 檔案中設定你的 Appwrite 專案 ID");
}

if (!APPWRITE_DATABASE_ID) {
  console.error("❌ VITE_APPWRITE_DATABASE_ID 未設定");
  console.error("請在 env/.env.development 檔案中設定你的 Appwrite 資料庫 ID");
}

if (!APPWRITE_COLLECTION_ID) {
  console.error("❌ VITE_APPWRITE_COLLECTION_ID 未設定");
  console.error("請在 env/.env.development 檔案中設定你的 Appwrite 集合 ID");
}

// 建立 Appwrite 客戶端
const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID);

// 初始化服務
export const databases = new Databases(client);
export const account = new Account(client);
export const storage = new Storage(client);

// 資料庫和集合 ID
export const DATABASE_ID = APPWRITE_DATABASE_ID;
export const COLLECTION_ID = APPWRITE_COLLECTION_ID;

// 匯出配置檢查函數
export function validateAppwriteConfig() {
  const errors = [];
  
  if (!APPWRITE_PROJECT_ID) {
    errors.push("VITE_APPWRITE_PROJECT_ID 未設定");
  }
  
  if (!APPWRITE_DATABASE_ID) {
    errors.push("VITE_APPWRITE_DATABASE_ID 未設定");
  }
  
  if (!APPWRITE_COLLECTION_ID) {
    errors.push("VITE_APPWRITE_COLLECTION_ID 未設定");
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    config: {
      endpoint: APPWRITE_ENDPOINT,
      projectId: APPWRITE_PROJECT_ID,
      databaseId: APPWRITE_DATABASE_ID,
      collectionId: APPWRITE_COLLECTION_ID,
    }
  };
}
