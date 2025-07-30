# 場地租借系統 API 設計

本 API 設計基於 `analysis.md` 中的現有系統分析，定義了將場地租借功能整合到 Appwrite 後端的 RESTful API。API 將支援申請提交、狀態查詢、審核等功能。使用 JWT 認證，錯誤碼遵循 HTTP 標準。所有端點前綴為 `/api/venue`。

## 1. 資料模型 (Appwrite Collections)

- **Venues** (場地)：
  - id: string (auto)
  - name: string (e.g., "文德-主堂")
  - equipment: array<string> (e.g., ["投影機", "音響系統"])
  - capacity: integer
- **Bookings** (預約)：
  - id: string (auto)
  - applicantName: string
  - applicantPhone: string
  - startDate: datetime
  - endDate: datetime
  - startTime: string
  - endTime: string
  - estimatedPeople: integer
  - cycle: array<string> (e.g., ["週一", "每週"])
  - venueId: string (relation to Venues)
  - equipment: array<string>
  - unit: string (e.g., "牧區+小組名")
  - purpose: string
  - responsibleName: string
  - responsiblePhone: string
  - status: string (pending/approved/rejected)
  - createdAt: datetime
- **Users** (使用者，擴展現有)：
  - role: string (applicant/admin)

## 2. API 端點

### 認證

- 所有端點需 JWT token (從 Appwrite auth 取得)。

### 申請相關

- **POST /bookings**：提交申請。
  - Body: { applicantName, applicantPhone, startDate, ... } (參考 analysis.md 欄位)
  - Response: 201 { id, message: "申請已提交" }
  - 驗證：自動檢查衝突、時間限制 (4小時/2個月)。

- **GET /bookings**：查詢申請列表（分頁）。
  - Query: ?status=pending&page=1&limit=10
  - Response: 200 { bookings: array, total: integer }

- **GET /bookings/:id**：查詢單一申請。
  - Response: 200 { booking details }

### 狀態查詢

- **GET /venues/status**：查詢場地狀態（日曆視圖資料）。
  - Query: ?venueId=xxx&date=2025-01-01
  - Response: 200 { venues: array with bookings }

### 審核相關 (僅 admin)

- **PATCH /bookings/:id**：更新申請狀態。
  - Body: { status: "approved", notes: string }
  - Response: 200 { updated booking }

### 其他

- **GET /venues**：列出所有場地。
  - Response: 200 { venues: array }

## 3. 錯誤處理

- 400: 無效輸入 (e.g., "時間超過4小時")
- 409: 衝突 (e.g., "場地已被預約")
- 401: 未授權
- 500: 伺服器錯誤

## 4. 整合注意事項

- 使用 services/venueApi.ts 封裝 API 呼叫。
- 前端使用 Pinia 快取狀態。
- 未來擴展：新增通知端點 (POST /notifications)。

此設計確保與分析一致，可直接實作。
