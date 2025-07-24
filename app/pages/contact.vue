<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <!-- Page Header -->
      <div class="text-center mb-16">
        <h1
          class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl"
        >
          聯絡我們
        </h1>
        <p
          class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
        >
          準備開始您的數位轉型之旅？我們的專業團隊隨時準備為您提供客製化的解決方案。
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <!-- Contact Information -->
        <div class="lg:col-span-1">
          <div
            class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg h-fit"
          >
            <h2
              class="text-2xl font-bold text-gray-900 dark:text-white mb-6"
            >
              聯絡資訊
            </h2>

            <div class="space-y-6">
              <!-- Phone -->
              <div class="flex items-start space-x-4">
                <div
                  class="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg"
                >
                  <UIcon
                    name="i-heroicons-phone"
                    class="w-6 h-6 text-blue-600 dark:text-blue-400"
                  />
                </div>
                <div>
                  <h3
                    class="font-semibold text-gray-900 dark:text-white"
                  >
                    電話
                  </h3>
                  <p class="text-gray-600 dark:text-gray-300">
                    +886-2-1234-5678
                  </p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    週一至週五 9:00-18:00
                  </p>
                </div>
              </div>

              <!-- Email -->
              <div class="flex items-start space-x-4">
                <div
                  class="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg"
                >
                  <UIcon
                    name="i-heroicons-envelope"
                    class="w-6 h-6 text-green-600 dark:text-green-400"
                  />
                </div>
                <div>
                  <h3
                    class="font-semibold text-gray-900 dark:text-white"
                  >
                    電子郵件
                  </h3>
                  <p class="text-gray-600 dark:text-gray-300">
                    info@nhecc.org
                  </p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    24小時內回覆
                  </p>
                </div>
              </div>

              <!-- Address -->
              <div class="flex items-start space-x-4">
                <div
                  class="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg"
                >
                  <UIcon
                    name="i-heroicons-map-pin"
                    class="w-6 h-6 text-purple-600 dark:text-purple-400"
                  />
                </div>
                <div>
                  <h3
                    class="font-semibold text-gray-900 dark:text-white"
                  >
                    地址
                  </h3>
                  <p class="text-gray-600 dark:text-gray-300">
                    台北市信義區信義路五段150號
                  </p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    歡迎預約參訪
                  </p>
                </div>
              </div>

              <!-- Working Hours -->
              <div class="flex items-start space-x-4">
                <div
                  class="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-lg"
                >
                  <UIcon
                    name="i-heroicons-clock"
                    class="w-6 h-6 text-orange-600 dark:text-orange-400"
                  />
                </div>
                <div>
                  <h3
                    class="font-semibold text-gray-900 dark:text-white"
                  >
                    營業時間
                  </h3>
                  <p class="text-gray-600 dark:text-gray-300">
                    週一至週五 9:00-18:00
                  </p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    週末及國定假日休息
                  </p>
                </div>
              </div>
            </div>

            <!-- Social Links -->
            <div
              class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700"
            >
              <h3
                class="font-semibold text-gray-900 dark:text-white mb-4"
              >
                追蹤我們
              </h3>
              <div class="flex space-x-4">
                <a
                  href="#"
                  class="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <UIcon
                    name="i-heroicons-chat-bubble-left-ellipsis"
                    class="w-5 h-5"
                  />
                </a>
                <a
                  href="#"
                  class="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <UIcon name="i-heroicons-phone" class="w-5 h-5" />
                </a>
                <a
                  href="#"
                  class="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <UIcon name="i-heroicons-envelope" class="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="lg:col-span-2">
          <div
            class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
          >
            <h2
              class="text-2xl font-bold text-gray-900 dark:text-white mb-6"
            >
              發送訊息
            </h2>

            <form class="space-y-6">
              <!-- Name and Email -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    for="name"
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    姓名 *
                  </label>
                  <input
                    type="text"
                    id="name"
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="請輸入您的姓名"
                    required
                  />
                </div>
                <div>
                  <label
                    for="email"
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    電子郵件 *
                  </label>
                  <input
                    type="email"
                    id="email"
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              <!-- Company and Phone -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    for="company"
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    公司/組織
                  </label>
                  <input
                    type="text"
                    id="company"
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="請輸入公司或組織名稱"
                  />
                </div>
                <div>
                  <label
                    for="phone"
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    聯絡電話
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="0912-345-678"
                  />
                </div>
              </div>

              <!-- Subject -->
              <div>
                <label
                  for="subject"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  主旨 *
                </label>
                <select
                  id="subject"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  required
                >
                  <option value="">請選擇諮詢類型</option>
                  <option value="demo">產品展示</option>
                  <option value="pricing">價格諮詢</option>
                  <option value="technical">技術支援</option>
                  <option value="partnership">合作提案</option>
                  <option value="other">其他</option>
                </select>
              </div>

              <!-- Message -->
              <div>
                <label
                  for="message"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  訊息內容 *
                </label>
                <textarea
                  id="message"
                  rows="6"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                  placeholder="請詳細描述您的需求或問題，我們會盡快為您回覆..."
                  required
                ></textarea>
              </div>

              <!-- Privacy Agreement -->
              <div class="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="privacy"
                  class="mt-1 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                  required
                />
                <label
                  for="privacy"
                  class="text-sm text-gray-600 dark:text-gray-300"
                >
                  我同意 NHECC
                  蒐集、處理及利用我所提供的個人資料，僅供聯絡及服務目的使用。*
                </label>
              </div>

              <!-- Submit Button -->
              <div class="flex justify-end">
                <UButton
                  type="submit"
                  size="lg"
                  icon="i-heroicons-paper-airplane"
                  class="px-8 py-3"
                >
                  發送訊息
                </UButton>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="mt-16">
        <div class="text-center mb-12">
          <h2
            class="text-3xl font-bold text-gray-900 dark:text-white"
          >
            常見問題
          </h2>
          <p class="mt-4 text-lg text-gray-600 dark:text-gray-300">
            快速找到您需要的答案
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md"
          >
            <h3
              class="font-semibold text-gray-900 dark:text-white mb-3"
            >
              系統可以客製化嗎？
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              是的，我們提供完全客製化的解決方案，可以根據您的具體需求調整功能模組和介面設計。
            </p>
          </div>

          <div
            class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md"
          >
            <h3
              class="font-semibold text-gray-900 dark:text-white mb-3"
            >
              實施需要多長時間？
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              依據系統複雜度而定，通常在2-6個月內完成。我們會在初期評估後提供詳細的實施時程表。
            </p>
          </div>

          <div
            class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md"
          >
            <h3
              class="font-semibold text-gray-900 dark:text-white mb-3"
            >
              提供哪些技術支援？
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              我們提供24/7技術支援、定期系統維護、教育訓練以及持續的功能更新服務。
            </p>
          </div>

          <div
            class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md"
          >
            <h3
              class="font-semibold text-gray-900 dark:text-white mb-3"
            >
              可以先試用系統嗎？
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              當然可以！我們提供免費的系統展示和30天試用期，讓您充分了解系統功能。
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "聯絡我們 - NHECC Integration Management System",
  description:
    "準備開始您的數位轉型之旅？聯絡我們的專業團隊，獲得客製化的整合管理系統解決方案",
});
</script>
