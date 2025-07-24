# 環境變數設定指南

## 問題說明

如果你看到類似這樣的 API 請求：

```
https://cloud.appwrite.io/v1/databases//collections//documents
```

這表示你的環境變數沒有正確設定，資料庫 ID 和集合 ID 都是空的。

## 解決步驟

### 1. 建立 .env 檔案

在專案根目錄建立 `.env` 檔案：

```bash
touch .env
```

### 2. 設定環境變數

在 `.env` 檔案中加入以下內容：

```env
# Appwrite 配置
NUXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NUXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id_here
NUXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id_here
NUXT_PUBLIC_APPWRITE_COLLECTION_ID=your_collection_id_here
```

### 3. 取得 Appwrite 專案資訊

#### 專案 ID (Project ID)

1. 登入 [Appwrite Console](https://cloud.appwrite.io/)
2. 選擇你的專案
3. 在專案設定中找到 "Project ID"

#### 資料庫 ID (Database ID)

1. 在 Appwrite Console 中進入 "Databases"
2. 選擇或建立你的資料庫
3. 複製資料庫 ID

#### 集合 ID (Collection ID)

1. 在資料庫中選擇或建立 "assets" 集合
2. 複製集合 ID

### 4. 重新啟動開發伺服器

```bash
npm run dev
# 或
yarn dev
```

### 5. 檢查控制台輸出

重新啟動後，你應該會在瀏覽器控制台看到：

- 如果配置正確：沒有錯誤訊息
- 如果配置錯誤：會顯示具體的錯誤訊息

## 範例 .env 檔案

```env
# Appwrite 配置
NUXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NUXT_PUBLIC_APPWRITE_PROJECT_ID=64f8a1b2c3d4e5f6a7b8c9d0
NUXT_PUBLIC_APPWRITE_DATABASE_ID=64f8a1b2c3d4e5f6a7b8c9d1
NUXT_PUBLIC_APPWRITE_COLLECTION_ID=64f8a1b2c3d4e5f6a7b8c9d2
```

## 驗證設定

設定完成後，API 請求應該變成：

```
https://cloud.appwrite.io/v1/databases/64f8a1b2c3d4e5f6a7b8c9d1/collections/64f8a1b2c3d4e5f6a7b8c9d2/documents
```

## 注意事項

1. **不要提交 .env 檔案到 Git**
   - `.env` 檔案應該已經在 `.gitignore` 中
   - 只提交 `.env.example` 作為範例

2. **環境變數名稱**
   - 必須以 `NUXT_PUBLIC_` 開頭
   - 這樣 Nuxt 才能在客戶端使用

3. **重新啟動**
   - 修改 `.env` 檔案後必須重新啟動開發伺服器
   - 環境變數不會熱重載

## 常見問題

### Q: 為什麼看不到 .env 檔案？

A: `.env` 檔案可能被隱藏了，使用 `ls -la` 查看所有檔案。

### Q: 設定後還是顯示空 ID？

A: 檢查環境變數名稱是否正確，確保沒有多餘的空格。

### Q: 如何確認環境變數已載入？

A: 在瀏覽器控制台查看是否有配置錯誤訊息。
