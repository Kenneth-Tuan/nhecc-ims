# NHECC IMS Docker 部署指南

## 檔案說明

本專案已配置完整的 Docker 支援，包含以下檔案：

- `Dockerfile` - 多階段構建配置
- `.dockerignore` - Docker 建置忽略檔案
- `docker-compose.yml` - 開發環境配置
- `docker-compose.prod.yml` - 生產環境配置
- `.env.example` - 環境變數範例

## 快速開始

### 1. 環境變數設定

```bash
# 複製環境變數範例檔案
cp .env.example .env

# 編輯 .env 檔案，填入實際的環境變數值
# 特別是 LINE 相關的配置
```

### 2. 開發環境

```bash
# 啟動開發環境（支援熱重載）
docker-compose up --build

# 或者在背景執行
docker-compose up -d --build
```

應用程式將在 http://localhost:3000 上運行。

### 3. 生產環境

```bash
# 建置並啟動生產環境
docker-compose -f docker-compose.prod.yml up --build -d
```

應用程式將在 http://localhost:80 上運行。

## 建置特點

### 多階段構建
- **Development**: 包含所有開發工具，支援熱重載
- **Builder**: 優化生產建置階段
- **Production**: 最小化運行環境，使用非 root 用戶

### 安全考量
- 使用 `dumb-init` 正確處理信號
- 非 root 用戶運行生產容器
- 最小化生產鏡像大小

### 系統依賴
- 包含編譯 native Node.js 模組所需的所有系統庫
- 支援 Sharp 圖像處理和檔案監視器
- 完整的編譯工具鏈 (gcc, make, python3)

## 環境變數

請確保在 `.env` 檔案中設定以下變數：

```bash
NUXT_LINE_CHANNEL_ID=your_line_channel_id
NUXT_LIFF_ID=your_liff_id
```

## 故障排除

### 建置問題
```bash
# 清除 Docker 快取
docker system prune -f

# 重新建置
docker-compose build --no-cache
```

### Native 模組建置失敗
如果遇到 `must be built because it never has been before` 錯誤：
```bash
# 檢查是否有必要的系統依賴
docker run --rm node:20-alpine apk add --no-cache \
    python3 make g++ git libc6-compat vips-dev

# 或者使用測試 Dockerfile
docker build -f Dockerfile.test -t nhecc-ims-test .
```

### 權限問題
```bash
# 確保檔案權限正確
chmod 644 .env
```

### 端口衝突
如果 3000 或 80 端口被佔用，請修改 `docker-compose.yml` 中的端口映射。

## 進階配置

### 添加資料庫

取消註釋 `docker-compose.yml` 中的 database service，並配置相關環境變數。

### 自定義建置

修改 `Dockerfile` 中的 Node.js 版本或其他配置以符合你的需求。

---

如有問題，請參考 [Docker 官方文件](https://docs.docker.com/) 或 [Nuxt Docker 指南](https://nuxt.com/docs/getting-started/deployment#docker)。
