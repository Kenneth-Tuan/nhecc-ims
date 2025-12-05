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
    title: "內湖行道會",
    subtitle: "整合管理系統",
    description:
      "建立祝福、門徒、福音、宣教的文化。成為門徒與宣教士的教會。整合教會管理，提升事工效率與品質。",
    ctaPrimary: "立即開始",
    ctaSecondary: "了解更多",
  },

  // 功能模組
  features: {
    title: "教會事工管理系統",
    subtitle:
      "整合多項教會管理功能，提供一站式解決方案",
    items: {
      children: {
        title: "卓越兒童發展園地",
        description:
          "養育喜樂、紀律、愛人、求真理的兒童。在主動學習過程中，發展潛能，活出卓越。",
      },
      worship: {
        title: "敬拜服事管理",
        description:
          "詩歌、聖詩與敬拜服事管理，包含活動建立與完整管理系統，支援主日崇拜與特別聚會",
      },
      youth: {
        title: "青年事工管理",
        description:
          "YOF 與 YAM 的活動規劃、成員管理、培訓課程安排與追蹤系統",
      },
      venue: {
        title: "場地租借系統",
        description:
          "文德與碧湖會堂的場地預約、租借管理、排程安排與設備使用追蹤系統",
      },
      ministry: {
        title: "門徒牧養系統",
        description:
          "每日嗎哪靈修、門徒課程管理、牧養關懷紀錄與靈命成長追蹤系統",
      },
      media: {
        title: "媒體管理平台",
        description:
          "主日信息、烈火禱告會影片內容管理，支援線上觀看與內容分享功能",
      },
      warehouse: {
        title: "倉儲管理系統",
        description:
          "物品資料登錄與管理，包含資產總覽、庫存追蹤、設備維護紀錄與完整倉儲管理功能",
      },
    },
  },

  // 統計數據
  stats: {
    modules: "核心模組",
    integration: "系統整合",
    availability: "全天候服務",
    growth: "成長潛力",
  },

  // 行動呼籲區塊
  cta: {
    title: "開始使用整合管理系統",
    description: "加入我們，體驗高效的教會事工管理，讓服事更加得力",
    start: "立即開始",
    contact: "聯絡我們",
  },

  // 頁尾資訊
  footer: {
    description:
      "NHECC Integrated Management System,致力于建立祝福、门徒、福音、宣教的文化",
    quickLinks: "Quick Links",
    contact: "Contact Information",
    locations: {
      wende: "Wende Hall",
      bihu: "Bihu Hall",
    },
    copyright: "© 2024 NHECC. All rights reserved.",
  },

  // 關於頁面
  about: {
    title: "About NHECC",
    subtitle: "Create a culture of blessing, discipleship, evangelism, and mission",
    vision: {
      title: "Church Vision",
      content: "Become a church of disciples and missionaries, create a culture of blessing, discipleship, evangelism, and mission",
    },
    mission: {
      title: "Church Mission",
      content:
        "Through integrated management system, improve the efficiency and quality of church ministries, so that every brother and sister can发挥恩赐 in the Lord",
    },
    values: {
      title: "Core Values",
      blessing: "Blessing - Become a blessing to others",
      discipleship: "Discipleship - Develop discipleship",
      evangelism: "Evangelism - Spread the gospel information",
      mission: "Mission - Participate in the great commission",
    },
  },

  // 聯絡資訊
  contact: {
    title: "Contact Us",
    subtitle: "Welcome to contact us, join us in the work of the神國事工",
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
