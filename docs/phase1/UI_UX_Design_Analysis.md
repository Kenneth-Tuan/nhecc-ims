# UI/UX 設計分析與規範參考 (基於 Focusify 範例與 NHECC CIS)

本文件基於 "Focusify" App UI 設計圖與 **NHECC CIS 品牌識別** 進行分析，拆解其設計語言、元件庫與 UX 邏輯，作為 **NHECC-IMS** 系統開發的視覺與互動參考。

> **⚠️ 注意事項**：
> 本分析雖基於參考圖，但實際開發時需嚴格遵守專案核心原則：**包容性設計 (Inclusive Design)**。
> - 字體需放大 (Base 18px)。
> - 對比度需符合 WCAG AA。
> - 觸控區域需 >= 48px。

---

## 1. 設計語言 (Design Language)

### 1.1 色彩系統 (Color System)
系統預設為 **Light Mode (淺色模式)**，強調親和力與清晰度；並保留 **Focusify Dark Mode** 風格作為深色選項。

*   **Primary Brand Color (主色 - NHECC Red)**:
    *   **Soft Red / Coral**: 取自十字架 LOGO。
    *   *Hex*: `#FF6B6B` (Tailwind `nhecc-red-500`)。
    *   *用途*: 主要按鈕 (CTA)、重點高亮、Logo 識別。
*   **Secondary Colors (輔助色 - Shapes)**:
    *   **Teal**: `#4ECDC4` (輔助圖形、資訊提示)。
    *   **Purple**: `#A78BFA` (標籤、次要強調)。
    *   **Yellow**: `#FBBF24` (警示、獎勵)。
    *   **Green**: `#34D399` (成功、成長)。
*   **Neutral (中性色 - Light Mode)**:
    *   **Background**: 純白 `#FFFFFF` 或 極淺灰 `#F9FAFB`。
    *   **Surface**: 白色卡片 + 輕微陰影。
    *   **Text**: 深灰 `#1F2937` (Primary), 中灰 `#6B7280` (Secondary)。

### 1.2 形狀與邊角 (Shapes & Radius)
*   **Card/Container**: 採用 **大圓角 (Large Rounded Corners)**。
    *   預設 Radius: `20px` ~ `24px`。
    *   可透過全域設定切換邊角風格。
*   **Buttons**: 全圓角 (Pill shape) 或 大圓角矩形。
*   **Icons**: 建議使用 **Solid (實心)** 圖標以提升長輩辨識度，或粗線條 (2px+) 的 Outline 圖標。

---

## 2. UI 元件 (UI Elements)

### 2.1 導覽 (Navigation)
*   **Bottom Tab Bar (Mobile)** / **Sidebar (Desktop)**
    *   必須搭配文字標籤。
    *   選中狀態：主色高亮 (圖標 + 文字)。

### 2.2 按鈕 (Buttons)
*   **Primary Button**:
    *   背景主色 (Red)，白字。
    *   高度顯著 (約 50-56px)。
*   **Secondary Button**:
    *   淺色背景 (Red-50) + 主色文字。

### 2.3 輸入表單 (Forms)
*   **Input**:
    *   淺灰背景 (`#F3F4F6`) 或 白底灰框。
    *   Focus 時主色邊框。
    *   文字大小 18px+。

---

## 3. UX 邏輯與流程 (UX Logic)

### 3.1 啟動與登入
*   優先使用 Social Login (Line)。
*   手機號碼 + OTP 登入。

### 3.2 核心體驗
*   **卡片式佈局**: 資訊區塊化，避免擁擠。
*   **大字體**: 標題與重要數據放大顯示。
*   **高對比**: 淺色模式下確保文字清晰易讀。

---

## 4. 開發實作規範

### CSS 變數 (Tailwind v4)
在 `main.css` 中定義品牌色：
```css
@theme {
  --color-nhecc-red-500: oklch(0.65 0.22 25);
  /* ...其他品牌色 */
}
```

### 全域設定 (Global Settings)
*   提供 **邊框風格 (Border Style)** 切換功能：
    *   Rounded (預設): `radius: 0.625rem` (或更大)。
    *   Square: `radius: 0rem`。

### 主題切換
*   預設 Light Mode。
*   保留 Dark Mode (Focusify 風格：深灰底 + 珊瑚紅)。
