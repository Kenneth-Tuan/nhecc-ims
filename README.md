# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Third-Party Packages

This section lists the third-party packages used in the project, along with their functions and purposes.

### English Version

#### Dependencies:

- **@dargmuesli/nuxt-cookie-control** (v9.0.8): Manages cookie consent banners and controls in Nuxt applications, ensuring GDPR compliance.
- **@formkit/auto-animate** (v0.8.2): Provides automatic animations for Vue components, simplifying transitions without manual keyframing.
- **@nuxt/content** (v3.6.3): Enables content management in Nuxt, allowing Markdown, JSON, YAML, and CSV files to be queried like a database.
- **@nuxt/eslint** (v1.7.0): Integrates ESLint into Nuxt for code linting and quality enforcement.
- **@nuxt/image** (v1.10.0): Optimizes images in Nuxt applications, supporting lazy loading, responsive sizes, and modern formats.
- **@nuxt/scripts** (v0.11.10): Manages third-party scripts loading in Nuxt, with performance optimizations like lazy loading.
- **@nuxt/test-utils** (v3.19.2): Provides utilities for testing Nuxt applications, including Vitest integration.
- **@nuxt/ui** (v3.2.0): A collection of UI components for Nuxt, built with Headless UI and Tailwind CSS.
- **@nuxtjs/i18n** (v10.0.2): Adds internationalization (i18n) support to Nuxt, handling multi-language routing and translations.
- **@nuxtjs/mdc** (v0.17.2): Markdown compiler for Nuxt, enhancing Markdown rendering with components.
- **@pinia/nuxt** (^0.11.2): Integrates Pinia (Vue state management) with Nuxt for modular state handling.
- **@unhead/vue** (^2.0.3): Manages document head (meta tags, titles) in Vue applications.
- **@vee-validate/nuxt** (v4.15.1): Integrates VeeValidate for form validation in Nuxt.
- **eslint** (^9.0.0): JavaScript linter for identifying and reporting code patterns.
- **nuxt** (^4.0.1): The core Nuxt framework for building Vue.js applications with SSR.
- **nuxt-qrcode** (v0.4.6): Generates QR codes in Nuxt applications.
- **pinia** (^3.0.3): State management library for Vue.js, used for centralized stores.
- **pinia-plugin-persistedstate** (v4.4.1): Persists Pinia store state across page reloads.
- **typescript** (^5.6.3): Superset of JavaScript that adds static types.
- **vue** (^3.5.17): The progressive JavaScript framework for building user interfaces.
- **vue-router** (^4.5.1): Official router for Vue.js, handling client-side routing.

#### Dev Dependencies:

- **@unocss/nuxt** (^66.3.3): Integrates UnoCSS (atomic CSS engine) with Nuxt for rapid styling.
- **unocss** (^66.3.3): Utility-first CSS framework for fast and flexible styling.

### 中文版

#### 依賴套件：

- **@dargmuesli/nuxt-cookie-control** (v9.0.8)：在 Nuxt 應用中管理 Cookie 同意橫幅和控制，確保符合 GDPR 規範。
- **@formkit/auto-animate** (v0.8.2)：為 Vue 組件提供自動動畫，簡化過渡效果而無需手動關鍵幀。
- **@nuxt/content** (v3.6.3)：在 Nuxt 中啟用內容管理，允許像資料庫一樣查詢 Markdown、JSON、YAML 和 CSV 檔案。
- **@nuxt/eslint** (v1.7.0)：將 ESLint 整合到 Nuxt，用於程式碼檢查和品質強制。
- **@nuxt/image** (v1.10.0)：在 Nuxt 應用中優化圖像，支持延遲載入、響應式尺寸和現代格式。
- **@nuxt/scripts** (v0.11.10)：在 Nuxt 中管理第三方腳本載入，包含性能優化如延遲載入。
- **@nuxt/test-utils** (v3.19.2)：為測試 Nuxt 應用提供工具，包括 Vitest 整合。
- **@nuxt/ui** (v3.2.0)：Nuxt 的 UI 組件集合，基於 Headless UI 和 Tailwind CSS 建置。
- **@nuxtjs/i18n** (v10.0.2)：為 Nuxt 新增國際化 (i18n) 支持，處理多語言路由和翻譯。
- **@nuxtjs/mdc** (v0.17.2)：Nuxt 的 Markdown 編譯器，增強 Markdown 渲染並支持組件。
- **@pinia/nuxt** (^0.11.2)：將 Pinia (Vue 狀態管理) 與 Nuxt 整合，用於模組化狀態處理。
- **@unhead/vue** (^2.0.3)：在 Vue 應用中管理文件頭 (meta 標籤、標題)。
- **@vee-validate/nuxt** (v4.15.1)：將 VeeValidate 整合到 Nuxt，用於表單驗證。
- **eslint** (^9.0.0)：JavaScript 檢查器，用於識別和報告程式碼模式。
- **nuxt** (^4.0.1)：Nuxt 核心框架，用於建置具有 SSR 的 Vue.js 應用。
- **nuxt-qrcode** (v0.4.6)：在 Nuxt 應用中生成 QR 碼。
- **pinia** (^3.0.3)：Vue.js 的狀態管理庫，用於集中式儲存。
- **pinia-plugin-persistedstate** (v4.4.1)：在頁面重新載入時持久化 Pinia 儲存狀態。
- **typescript** (^5.6.3)：JavaScript 的超集，新增靜態類型。
- **vue** (^3.5.17)：漸進式 JavaScript 框架，用於建置使用者介面。
- **vue-router** (^4.5.1)：Vue.js 的官方路由器，處理客戶端路由。

#### 開發依賴套件：

- **@unocss/nuxt** (^66.3.3)：將 UnoCSS (原子 CSS 引擎) 與 Nuxt 整合，用於快速樣式設計。
- **unocss** (^66.3.3)：工具優先的 CSS 框架，用於快速且靈活的樣式設計。
