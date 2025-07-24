/**
 * NHECC 基督教內湖行道會 整合管理系統
 * 文字內容統一管理
 */

export const TEXTS = {
  // 導航菜單
  nav: {
    home: "首頁",
    about: "關於教會",
    services: "教會事工",
    ministry: "門徒牧養",
    warehouse: "倉儲管理",
    contact: "聯絡我們",
    features: "功能介紹",
  },

  // 主標題區塊
  hero: {
    title: "NHECC",
    subtitle: "基督教內湖行道會 整合管理系統",
    description:
      "建立祝福、門徒、福音、宣教的文化，成為門徒、宣教的教會。整合教會各項事工管理，提升服事效率與品質。",
    ctaPrimary: "開始使用",
    ctaSecondary: "了解更多",
  },

  // 功能模組
  features: {
    title: "教會事工管理系統",
    subtitle: "整合多種教會管理功能，提供一站式解決方案",
    items: {
      children: {
        title: "卓越兒童發展園地",
        description:
          "培養歡樂、自律、仁愛與找尋真理的孩子，在主動學習過程中發揮潛能與卓越的光芒",
      },
      worship: {
        title: "敬拜服事管理",
        description:
          "詩歌、歌譜管理以及敬拜服事事件的建立和完整管理系統，支援主日崇拜與特殊聚會",
      },
      youth: {
        title: "青年事工管理",
        description:
          "青橄欖 YOF 與社青 YAM 的活動規劃、成員管理、門訓課程安排與追蹤系統",
      },
      venue: {
        title: "場地租借系統",
        description:
          "文德堂與碧湖堂的場地預約、租借管理、時程安排與設備使用追蹤系統",
      },
      ministry: {
        title: "門徒牧養系統",
        description:
          "每日嗎哪靈修、門訓課程管理、牧養關懷記錄與屬靈成長追蹤系統",
      },
      media: {
        title: "媒體管理平台",
        description:
          "主日信息、烈火禱告會影音內容管理，支援線上觀看與內容分享功能",
      },
      warehouse: {
        title: "倉儲管理系統",
        description:
          "物件資訊紀錄與管理，包含資產總覽、庫存追蹤、設備維護記錄等完整倉儲管理功能",
      },
    },
  },

  // 統計數據
  stats: {
    modules: "功能模組",
    integration: "整合度",
    availability: "全天候服務",
    growth: "成長潛力",
  },

  // 行動呼籲區塊
  cta: {
    title: "立即開始使用 NHECC 整合管理系統",
    description: "加入我們，體驗高效的教會事工管理，讓服事更有果效",
    start: "立即開始",
    contact: "聯絡我們",
  },

  // 頁尾資訊
  footer: {
    description:
      "基督教內湖行道會整合管理系統，致力於建立祝福、門徒、福音、宣教的文化",
    quickLinks: "快速連結",
    contact: "聯絡資訊",
    locations: {
      wende: "文德堂",
      bihu: "碧湖堂",
    },
    copyright: "© 2024 基督教內湖行道會. 保留所有權利。",
  },

  // 關於頁面
  about: {
    title: "關於基督教內湖行道會",
    subtitle: "建立祝福、門徒、福音、宣教的文化",
    vision: {
      title: "教會異象",
      content: "成為門徒、宣教的教會，建立祝福、門徒、福音、宣教的文化",
    },
    mission: {
      title: "教會使命",
      content:
        "透過整合管理系統，提升教會各項事工的效率與品質，讓每個弟兄姊妹都能在主裡發揮恩賜",
    },
    values: {
      title: "核心價值",
      blessing: "祝福 - 成為他人的祝福",
      discipleship: "門徒 - 培育門徒生命",
      evangelism: "福音 - 廣傳福音信息",
      mission: "宣教 - 參與大使命",
    },
  },

  // 聯絡資訊
  contact: {
    title: "聯絡我們",
    subtitle: "歡迎與我們聯繫，一同參與神國事工",
    info: {
      email: "neihuecc@gmail.com",
      wendePhone: "(02)2657-9428",
      bihuPhone: "(02)2627-1019",
      address: "台北市內湖區",
    },
  },
} as const;

// 導出類型，方便 TypeScript 使用
export type TextsType = typeof TEXTS;
