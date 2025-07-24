# Vite 環境變數設定指南 (Nuxt3)

## 概述

根據 [Nuxt3配置入門](https://hackmd.io/@Yan06/SJgkRrhej) 文章，本專案使用 Vite 的環境變數管理方式。

## 目錄結構

```
env/
├── .env.development    # 開發環境變數
├── .env.production     # 生產環境變數
└── env.d.ts           # TypeScript 類型定義
```

## 環境變數配置

### 開發環境 (env/.env.development)

```env
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=67e7a2d5003583431131
VITE_APPWRITE_DATABASE_ID=67e7a339003e31649226
VITE_APPWRITE_COLLECTION_ID=67e7a347002e6e9e0659
```

### 生產環境 (env/.env.production)

```env
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=67e7a2d5003583431131
VITE_APPWRITE_DATABASE_ID=67e7a339003e31649226
VITE_APPWRITE_COLLECTION_ID=67e7a347002e6e9e0659
```

## Nuxt 配置

在 `nuxt.config.ts` 中設定：

```typescript
import { resolve } from 'path'

function pathResolve(dir: string) {
  return resolve(__dirname, dir)
}

export default defineNuxtConfig({
  // ... 其他配置
  
  vite: {
    envDir: pathResolve('./env'),
  },
});
```

## TypeScript 支援

在 `env/env.d.ts` 中定義類型：

```typescript
interface ImportMetaEnv {
  readonly VITE_APPWRITE_ENDPOINT: string
  readonly VITE_APPWRITE_PROJECT_ID: string
  readonly VITE_APPWRITE_DATABASE_ID: string
  readonly VITE_APPWRITE_COLLECTION_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

## 使用方式

### 在組件中使用

```typescript
// 直接使用 import.meta.env
console.log(import.meta.env.VITE_APPWRITE_PROJECT_ID)

// 或者使用檢查工具
import { checkEnvironmentVariables } from '~/utils/env-check'

// 檢查環境變數
checkEnvironmentVariables()
```

### 在服務中使用

```typescript
// app/services/appwrite.ts
const APPWRITE_PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID
```

## 重要注意事項

1. **環境變數名稱**：必須以 `VITE_` 開頭
2. **檔案位置**：必須放在 `env/` 目錄下
3. **重新啟動**：修改環境變數後必須重新啟動開發伺服器
4. **類型安全**：確保在 `env.d.ts` 中定義所有環境變數的類型

## 驗證設定

重新啟動開發伺服器後，在瀏覽器控制台執行：

```javascript
import { checkEnvironmentVariables } from '~/utils/env-check'
checkEnvironmentVariables()
```

應該會看到所有環境變數都已正確設定。

## 與舊方法的差異

| 項目 | 舊方法 (.env) | 新方法 (env/) |
|------|---------------|---------------|
| 檔案位置 | 專案根目錄 | env/ 目錄 |
| 環境變數前綴 | NUXT_PUBLIC_ | VITE_ |
| 讀取方式 | process.env | import.meta.env |
| 類型支援 | 需要額外配置 | 自動支援 |
| 多環境支援 | 手動管理 | 自動根據模式選擇 |

## 參考資料

- [Nuxt3配置入門](https://hackmd.io/@Yan06/SJgkRrhej)
- [Vite 環境變數文檔](https://cn.vitejs.dev/guide/env-and-mode.html#env-files)
