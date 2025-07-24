<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <!-- Page Header -->
      <div class="text-center mb-16">
        <h1
          class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl"
        >
          系統功能介紹
        </h1>
        <p
          class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
        >
          深入了解 NHECC Integration Management System
          的各項強大功能，為您的組織提供全方位的管理解決方案。
        </p>
      </div>

      <!-- Features Grid -->
      <div class="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <!-- 倉儲管理系統 -->
        <div
          class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
        >
          <div class="flex items-center mb-6">
            <div
              class="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl"
            >
              <UIcon
                name="i-heroicons-cube"
                class="w-8 h-8 text-blue-600 dark:text-blue-400"
              />
            </div>
            <h2
              class="ml-4 text-2xl font-bold text-gray-900 dark:text-white"
            >
              倉儲管理系統
            </h2>
          </div>
          <p class="text-gray-600 dark:text-gray-300 mb-6">
            完整的物件資訊紀錄與追蹤管理，提升倉儲效率與精確度。包含庫存管理、物品分類、出入庫記錄等功能。
          </p>
          <ul
            class="space-y-2 text-sm text-gray-600 dark:text-gray-300"
          >
            <li class="flex items-center">
              <UIcon
                name="i-heroicons-check"
                class="w-4 h-4 text-green-500 mr-2"
              />
              即時庫存追蹤
            </li>
            <li class="flex items-center">
              <UIcon
                name="i-heroicons-check"
                class="w-4 h-4 text-green-500 mr-2"
              />
              智能分類管理
            </li>
            <li class="flex items-center">
              <UIcon
                name="i-heroicons-check"
                class="w-4 h-4 text-green-500 mr-2"
              />
              出入庫記錄
            </li>
          </ul>
        </div>

        <!-- 敬拜服事管理 -->
        <div
          class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
        >
          <div class="flex items-center mb-6">
            <div
              class="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-xl"
            >
              <UIcon
                name="i-heroicons-musical-note"
                class="w-8 h-8 text-purple-600 dark:text-purple-400"
              />
            </div>
            <h2
              class="ml-4 text-2xl font-bold text-gray-900 dark:text-white"
            >
              敬拜服事管理
            </h2>
          </div>
          <p class="text-gray-600 dark:text-gray-300 mb-6">
            詩歌、歌譜管理以及敬拜服事事件的建立和完整管理系統，支援多種檔案格式與搜尋功能。
          </p>
          <ul
            class="space-y-2 text-sm text-gray-600 dark:text-gray-300"
          >
            <li class="flex items-center">
              <UIcon
                name="i-heroicons-check"
                class="w-4 h-4 text-green-500 mr-2"
              />
              詩歌資料庫管理
            </li>
            <li class="flex items-center">
              <UIcon
                name="i-heroicons-check"
                class="w-4 h-4 text-green-500 mr-2"
              />
              服事排程安排
            </li>
            <li class="flex items-center">
              <UIcon
                name="i-heroicons-check"
                class="w-4 h-4 text-green-500 mr-2"
              />
              多媒體支援
            </li>
          </ul>
        </div>

        <!-- 蒙特梭利教室系統 -->
        <div
          class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
        >
          <div class="flex items-center mb-6">
            <div
              class="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl"
            >
              <UIcon
                name="i-heroicons-academic-cap"
                class="w-8 h-8 text-green-600 dark:text-green-400"
              />
            </div>
            <h2
              class="ml-4 text-2xl font-bold text-gray-900 dark:text-white"
            >
              蒙特梭利教室系統
            </h2>
          </div>
          <p class="text-gray-600 dark:text-gray-300 mb-6">
            教室管理、學生紀錄、教師管理、排課系統及收費管理，完整的教育機構管理解決方案。
          </p>
          <ul
            class="space-y-2 text-sm text-gray-600 dark:text-gray-300"
          >
            <li class="flex items-center">
              <UIcon
                name="i-heroicons-check"
                class="w-4 h-4 text-green-500 mr-2"
              />
              學生資料管理
            </li>
            <li class="flex items-center">
              <UIcon
                name="i-heroicons-check"
                class="w-4 h-4 text-green-500 mr-2"
              />
              智能排課系統
            </li>
            <li class="flex items-center">
              <UIcon
                name="i-heroicons-check"
                class="w-4 h-4 text-green-500 mr-2"
              />
              收費管理
            </li>
          </ul>
        </div>

        <!-- 場地租借系統 -->
        <div
          class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
        >
          <div class="flex items-center mb-6">
            <div
              class="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-xl"
            >
              <UIcon
                name="i-heroicons-building-office"
                class="w-8 h-8 text-orange-600 dark:text-orange-400"
              />
            </div>
            <h2
              class="ml-4 text-2xl font-bold text-gray-900 dark:text-white"
            >
              場地租借系統
            </h2>
          </div>
          <p class="text-gray-600 dark:text-gray-300 mb-6">
            場地預約、租借管理及使用狀況追蹤的完整解決方案，支援線上預約與付款功能。
          </p>
          <ul
            class="space-y-2 text-sm text-gray-600 dark:text-gray-300"
          >
            <li class="flex items-center">
              <UIcon
                name="i-heroicons-check"
                class="w-4 h-4 text-green-500 mr-2"
              />
              線上預約系統
            </li>
            <li class="flex items-center">
              <UIcon
                name="i-heroicons-check"
                class="w-4 h-4 text-green-500 mr-2"
              />
              使用狀況追蹤
            </li>
            <li class="flex items-center">
              <UIcon
                name="i-heroicons-check"
                class="w-4 h-4 text-green-500 mr-2"
              />
              自動化計費
            </li>
          </ul>
        </div>

        <!-- 智慧農場管理 -->
        <div
          class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
        >
          <div class="flex items-center mb-6">
            <div
              class="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-xl"
            >
              <UIcon
                name="i-heroicons-beaker"
                class="w-8 h-8 text-emerald-600 dark:text-emerald-400"
              />
            </div>
            <h2
              class="ml-4 text-2xl font-bold text-gray-900 dark:text-white"
            >
              智慧農場管理
            </h2>
          </div>
          <p class="text-gray-600 dark:text-gray-300 mb-6">
            結合 IoT 感測器與 AI
            技術的現代化農場管理系統，實現精準農業與自動化監控。
          </p>
          <ul
            class="space-y-2 text-sm text-gray-600 dark:text-gray-300"
          >
            <li class="flex items-center">
              <UIcon
                name="i-heroicons-check"
                class="w-4 h-4 text-green-500 mr-2"
              />
              IoT 感測器監控
            </li>
            <li class="flex items-center">
              <UIcon
                name="i-heroicons-check"
                class="w-4 h-4 text-green-500 mr-2"
              />
              AI 智能分析
            </li>
            <li class="flex items-center">
              <UIcon
                name="i-heroicons-check"
                class="w-4 h-4 text-green-500 mr-2"
              />
              自動化控制
            </li>
          </ul>
        </div>

        <!-- 影音上架功能 -->
        <div
          class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
        >
          <div class="flex items-center mb-6">
            <div
              class="bg-red-100 dark:bg-red-900/30 p-3 rounded-xl"
            >
              <UIcon
                name="i-heroicons-video-camera"
                class="w-8 h-8 text-red-600 dark:text-red-400"
              />
            </div>
            <h2
              class="ml-4 text-2xl font-bold text-gray-900 dark:text-white"
            >
              影音上架功能
            </h2>
          </div>
          <p class="text-gray-600 dark:text-gray-300 mb-6">
            支援 YouTube、Spotify
            等多平台的影音內容管理與發布，提供一站式媒體管理解決方案。
          </p>
          <ul
            class="space-y-2 text-sm text-gray-600 dark:text-gray-300"
          >
            <li class="flex items-center">
              <UIcon
                name="i-heroicons-check"
                class="w-4 h-4 text-green-500 mr-2"
              />
              多平台發布
            </li>
            <li class="flex items-center">
              <UIcon
                name="i-heroicons-check"
                class="w-4 h-4 text-green-500 mr-2"
              />
              內容管理
            </li>
            <li class="flex items-center">
              <UIcon
                name="i-heroicons-check"
                class="w-4 h-4 text-green-500 mr-2"
              />
              自動化上傳
            </li>
          </ul>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="mt-16 text-center">
        <div class="bg-blue-600 dark:bg-blue-800 rounded-3xl p-12">
          <h2 class="text-3xl font-bold text-white mb-4">
            準備體驗完整功能？
          </h2>
          <p class="text-blue-100 mb-8 max-w-2xl mx-auto">
            立即聯絡我們，了解如何根據您的需求客製化 NHECC Integration
            Management System
          </p>
          <UButton
            size="lg"
            variant="solid"
            color="neutral"
            class="px-8 py-3 bg-white text-blue-600 hover:bg-gray-50"
            icon="i-heroicons-phone"
            to="/contact"
          >
            聯絡我們
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "系統功能介紹 - NHECC Integration Management System",
  description:
    "深入了解 NHECC IMS 的六大核心功能：倉儲管理、敬拜服事、蒙特梭利教室、場地租借、智慧農場及影音上架功能",
});
</script>
