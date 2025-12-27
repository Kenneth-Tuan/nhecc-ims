# Docker Development Environment for NHECC-IMS

這份指南將協助您使用 Docker 在本地開發 NHECC-IMS 專案。

## 專案概述

- **框架**: Nuxt 4 (Vue 3)
- **語言**: TypeScript
- **套件管理**: Yarn (Berry/v2+)
- **埠口**: 3000

## 前置需求

- Docker Desktop 或 Docker Engine
- Docker Compose V2

## 快速開始

### 1. 設置環境變數

複製 `.env.example` 為 `.env` 並填入必要的設定 (如 LINE LIFF ID)：

```bash
cp .env.example .env
```

### 2. 啟動開發環境

```bash
docker-compose up --build
```

首次啟動可能需要幾分鐘來下載 Docker 映像檔並安裝依賴。

### 3. 開發

- **網頁預覽**: [https://localhost:3000](https://localhost:3000)
  - 注意：由於 `nuxt.config.ts` 啟用了 HTTPS，請使用 `https://` 訪問。瀏覽器可能會顯示不安全警告（因為是自簽署憑證），請選擇繼續訪問。
- **檔案同步**: 專案目錄已掛載至容器，您在本地的程式碼變更會自動觸發熱重載 (HMR)。

### 4. 停止環境

```bash
Ctrl+C
# 或者在另一個終端機執行
docker-compose down
```

## 常見問題與疑難排解

### Yarn Berry 與 Corepack

本專案使用 Yarn Berry。Dockerfile 已包含 `corepack enable` 指令來啟用對應的套件管理器支援。

### 埠口衝突

如果埠口 3000 已被佔用，請修改 `docker-compose.yml` 中的 `ports` 設定：

```yaml
ports:
  - "3001:3000" # 將本地 3001 映射到容器 3000
```

### 依賴安裝問題

如果遇到 `node_modules` 相關錯誤，可以嘗試重新建立容器：

```bash
docker-compose down -v
docker-compose up --build
```

容器內的 `node_modules` 是獨立的，不會干擾您本地的 `node_modules` (如果有的話)。

### HTTPS / SSL

開發伺服器預設配置為 `https: true` (在 `nuxt.config.ts` 中)。在 Docker 環境中，您可能需要接受自簽署憑證，或者如果遇到連線問題，可以在本地開發時暫時設為 false，或確保 Docker 網路配置正確允許 HTTPS 流量。
注意：本 Docker 配置主要針對 HTTP 訪問 (3000 埠)，若 Nuxt 強制 HTTPS，可能需要調整 `nuxt.config.ts` 或使用反向代理。
(目前 `Dockerfile` 健康檢查檢查 http://localhost:3000/)

## 指令參考

- **進入容器 Shell**:
  ```bash
  docker-compose exec nhecc-ims sh
  ```

- **查看日誌**:
  ```bash
  docker-compose logs -f
  ```

