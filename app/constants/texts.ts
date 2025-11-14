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
    subtitle: "NHECC Integrated Management System",
    description:
      "Create a culture of blessing, discipleship, evangelism, and mission. Become a church of disciples and missionaries. Integrate church management to improve service efficiency and quality.",
    ctaPrimary: "開始使用",
    ctaSecondary: "了解更多",
  },

  // 功能模組
  features: {
    title: "Church Ministry Management System",
    subtitle:
      "Integrate multiple church management functions, providing a one-stop solution",
    items: {
      children: {
        title: "Children Development Garden",
        description:
          "Raise children who are joyful, disciplined, loving, and seeking truth. Develop their potential and shine with excellence in the active learning process.",
      },
      worship: {
        title: "Worship Service Management",
        description:
          "Song, hymn, and worship service management, including event creation and complete management system, supporting Sunday worship and special gatherings",
      },
      youth: {
        title: "Youth Ministry Management",
        description:
          "Planning, member management, training course arrangement and tracking system for YOF and YAM",
      },
      venue: {
        title: "Venue Rental System",
        description:
          "Wende and Bihu halls' venue reservation, rental management, scheduling, and equipment usage tracking system",
      },
      ministry: {
        title: "Discipleship Ministry System",
        description:
          "Daily manna meditation, discipleship course management, pastoral care records, and spiritual growth tracking system",
      },
      media: {
        title: "Media Management Platform",
        description:
          "Sunday message, fire prayer meeting video content management, supporting online viewing and content sharing features",
      },
      warehouse: {
        title: "Warehouse Management System",
        description:
          "Object information recording and management, including asset overview, inventory tracking, equipment maintenance records, and complete warehouse management features",
      },
    },
  },

  // 統計數據
  stats: {
    modules: "Modules", 
    integration: "Integration",
    availability: "24/7 Service",
    growth: "Growth Potential",
  },

  // 行動呼籲區塊
  cta: {
    title: "Start Using NHECC Integrated Management System",
    description: "Join us, experience efficient church ministry management, and make your service more effective",
    start: "Start Now",
    contact: "Contact Us",
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
