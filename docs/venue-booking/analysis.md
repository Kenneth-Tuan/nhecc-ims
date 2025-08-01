# 場地租借系統分析與統整

以下是根據提供的資料（場地登記使用辦法 [https://www.neihuecc.org/space/booking-1]、場地登記表單 [https://docs.google.com/forms/d/e/1FAIpQLSc-EV9Q7xR4QsnHLvrje66zDggZKzXhP5uxvNQyW538sEQVTw/viewform] 和場地使用情況 [https://docs.google.com/spreadsheets/d/1LzuMW9AiEmM_mHvx6ZlNq3O8P1_b4F3Sq6oes8TnqOo/edit?gid=1230302595#gid=1230302595]）進行的詳細分析和統整。重點涵蓋現有使用流程、表單欄位以及場地狀態顯示方式。這將作為後續系統重構的參考基礎，便於整合到目前專案中。

## 1. 現有使用流程

現有系統主要依賴 Google Form 進行申請、行政辦公室審核，以及 Google Spreadsheet 追蹤狀態。流程強調優先教會事工使用，並有明確的資格和限制。詳細步驟如下：

### 主要步驟：

1. **資格確認**：
   - 申請者必須是**牧者**、**小組長**、**事工主責**或經以上同工指定的代理人。
   - 場地目前僅開放教會事工範圍內使用。個人特殊需求需經過區牧同意後提出申請。
   - 開放使用對象包括：辦公室同工例行運作、服事相關預備與影音錄製、牧者約談、家庭事工輔導、事工會議、牧區聚會/小組聚會、上一期音樂課程補課等。

2. **申請提交**：
   - 申請者填寫**教會場地借用表單**（Google Form）。
   - 需提供詳細資訊，包括日期、時間、場地、設備、使用單位等。
   - 申請後，需等待行政辦公室審核通過並通知，方可使用。
   - 若需確認申請結果，可進入**內湖行道會 Line@**，輸入「OOO(申請人中文姓名)場地申請」，由同工聯絡。

3. **場地可用性檢查**：
   - 申請前或後，可查看**教會場地登記使用狀態**（Google Spreadsheet），了解各空間的使用狀況、所屬牧區/事工單位及用途。
   - 這有助於避免衝突。

4. **審核與優先權**：
   - 行政辦公室審核申請。
   - 優先讓教會崇拜、課程、小組、事工相關活動與會議使用。
   - 個人需求申請通過後，若遇教會事工需要，該場地將優先讓教會事工使用（個人申請可能被調整或取消）。
   - 教會不收取場地費用，但基於用途考量，個人需求無法保證有場地可用。

5. **使用限制**：
   - **時間限制**：單一空間限用4小時（如需超過，請先聯繫行政辦公室）。
   - **週期限制**：單一空間週期性使用限2個月（如需超過，請先聯繫行政辦公室）。
   - **使用後責任**：使用完畢需負責還原、清潔場地。負責人需負責準備、還原、清潔。

6. **其他注意事項**：
   - 好牧人莊園場地借用需另洽特定聯絡人（莊萬永弟兄，電話/LINE ID 提供）。
   - 系統強調共同維護神的家，鼓勵忠心服事。

### 潛在痛點（供重構參考）：

- 依賴手動審核和 Line@ 查詢，可能效率低。
- Google 工具雖然方便，但不易整合到自有系統，且資料可能分散。
- 缺乏自動衝突檢測或即時通知。

## 2. 表單欄位

表單為 Google Form，標記為必填的欄位以 \* 表示。欄位設計簡單但全面，涵蓋申請人資訊、使用細節和負責人。以下是完整欄位清單：

- **申請人姓名\***：輸入完整中文姓名（例如：王小明）。
- **申請人手機\***：輸入數字格式的手機號碼（例如：0970123123，勿加符號）。
- **開始使用日期\***：選擇日期（MM/DD/YYYY），單一空間週期性使用限2個月。
- **結束使用日期\***：選擇日期（MM/DD/YYYY）。
- **開始使用時間\***：選擇時間（HH:MM AM/PM），單一空間限用4小時。
- **結束使用時間\***：選擇時間（HH:MM AM/PM）。
- **預估使用人數\***：輸入數字。
- **使用週期**（選填，多選）：選項包括週一、週二、週三、週四、週五、週六、主日，以及每週/第一週/第二週/第三週/第四週/第五週。如果只是單次借用，可不填。
- **若使用場地為"多次"但"非週期性"，請註明使用日期**（選填）：輸入特定日期。
- **使用場地\***（下拉選單，必填）：選項包括：
  - 文德-教室1+2【設備：電視、投影機、白板】
  - 文德-副堂 (含教室3)【設備：鍵盤、爵士鼓、樂器音箱、音響系統、投影機、白板】
  - 文德-接待室 (原行政辦公室)
  - 文德-主堂【設備：電鋼琴、鍵盤、爵士鼓、吉他音箱、貝斯音箱、音響系統、投影機、電視】
  - 文德-親子室【設備：鋼琴、音響系統、投影機】
  - 文德-教室4 (原媒體室)【設備：白板】
  - 文德-練團室【設備：電鋼琴、鍵盤、爵士鼓、吉他音箱、貝斯音箱、音響系統、投影機】
  - 文德-禱告室1(原大禱)
  - 碧湖-B1教室【設備：白板】
  - 碧湖-B1大廳【設備：音響系統、電腦、投影機、投影幕】
  - 碧湖-B2教室【設備：白板】
  - 碧湖-B2會堂【設備：電鋼琴、爵士鼓、音響系統、電腦、投影機、投影幕】
- **使用設備\***（多選，必填）：選項包括：
  - 不需借用任何設備
  - 投影機
  - 音響設備
  - 桌上型電腦
  - 筆記型電腦
  - 舞台燈光
  - 導播機
  - 藍芽喇叭
  - Other:（自訂輸入）
  - 注意：需主動與行政辦公室確認細節。
- **使用單位\***：輸入牧區+小組名、或事工名（個人用途需先告知小組長/牧者/主責）。
- **使用用途\***：簡短說明（如活動名稱、小組、開會、練團、協談、洽公、其他）。
- **負責人姓名\***：輸入完整中文姓名。
- **負責人手機\***：輸入數字格式的手機號碼。

表單開頭有警示說明和開放使用對象列表。

## 3. 場地狀態顯示方式

- **工具**：使用 Google Spreadsheet，標題為「教會各空間登記使用狀態表(2025年1月~)」。
- **顯示結構**：
  - 表格格式，涵蓋多個欄位（內容顯示為省略，但從描述推斷包括日期、週期、場地、使用者、用途等）。
  - 時間範圍：從2025年1月開始，追蹤週一到主日的使用狀態。
  - 可能有欄位如 A、B 等，顯示詳細的日曆式或列表式記錄（例如：週一週二... 主日）。
  - 用戶可查看以了解各空間的使用狀況、所屬單位及用途。
- **存取**：外部分享，允許查看但可能需登入 Google 帳戶。
- **功能**：用於查閱使用狀態，避免衝突；不支援即時編輯或自動更新（依賴手動維護）。

### 重構建議：

- 在新系統中，可將 Spreadsheet 替換為資料庫（如 Appwrite 整合），提供即時查詢和自動衝突檢測。
- 整合到 Nuxt.js 專案中，可建立專屬頁面（如 pages/venue-booking/）來顯示日曆視圖和申請表單。

此分析檔案可作為起點，後續可在這個資料夾中添加更多文件，如重構計劃或 API 設計。
