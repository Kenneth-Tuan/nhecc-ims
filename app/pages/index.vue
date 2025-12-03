<script setup lang="ts">
import { TEXTS } from "~/constants/texts";

definePageMeta({
  layout: "dashboard",
});
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-morandi-blue-50 to-church-primary-50 dark:from-morandi-blue-950 dark:to-morandi-blue-900"
  >
    <!-- Hero Section -->
    <section class="relative overflow-hidden">
      <div
        class="absolute inset-0 bg-gradient-to-r from-morandi-blue-600/10 to-church-primary-600/10"
      ></div>
      <div
        class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-20"
      >
        <div class="text-center">
          <h1
            class="text-4xl font-bold tracking-tight text-morandi-blue-900 dark:text-morandi-blue-100 sm:text-5xl md:text-6xl"
          >
            <span class="block">{{ TEXTS.hero.title }}</span>
            <span
              class="block text-church-primary-600 dark:text-church-primary-400"
              >{{ TEXTS.hero.subtitle }}</span
            >
          </h1>
          <p
            class="mx-auto mt-6 max-w-2xl text-lg leading-8 text-morandi-blue-700 dark:text-morandi-blue-300"
          >
            {{ TEXTS.hero.description }}
          </p>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <UButton
              size="lg"
              class="px-8 py-3 bg-church-primary-600 hover:bg-church-primary-700"
              icon="i-heroicons-rocket-launch"
            >
              {{ TEXTS.hero.ctaPrimary }}
            </UButton>
            <UButton
              variant="ghost"
              size="lg"
              icon="i-heroicons-play-circle"
              class="px-8 py-3 text-morandi-blue-700 hover:text-church-primary-600 dark:text-morandi-blue-300"
            >
              {{ TEXTS.hero.ctaSecondary }}
            </UButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 sm:py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2
            class="text-3xl font-bold tracking-tight text-morandi-blue-900 dark:text-morandi-blue-100 sm:text-4xl"
          >
            {{ TEXTS.features.title }}
          </h2>
          <p
            class="mt-4 text-lg leading-6 text-morandi-blue-700 dark:text-morandi-blue-300"
          >
            {{ TEXTS.features.subtitle }}
          </p>
        </div>

        <div class="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <!-- 卓越兒童發展園地 -->
          <div
            class="bg-white dark:bg-morandi-blue-800 rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-morandi-blue-100 dark:border-morandi-blue-700"
          >
            <div class="mb-6">
              <div
                class="bg-church-primary-100 dark:bg-church-primary-900/30 w-16 h-16 rounded-xl flex items-center justify-center"
              >
                <UIcon
                  name="i-heroicons-sparkles"
                  class="w-8 h-8 text-church-primary-600 dark:text-church-primary-400"
                />
              </div>
            </div>
            <h3
              class="text-xl font-semibold text-morandi-blue-900 dark:text-morandi-blue-100 mb-3"
            >
              {{ TEXTS.features.items.children.title }}
            </h3>
            <p
              class="text-morandi-blue-700 dark:text-morandi-blue-300 leading-relaxed"
            >
              {{ TEXTS.features.items.children.description }}
            </p>
          </div>

          <!-- 敬拜服事管理 -->
          <div
            class="bg-white dark:bg-morandi-blue-800 rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-morandi-blue-100 dark:border-morandi-blue-700"
          >
            <div class="mb-6">
              <div
                class="bg-morandi-blue-100 dark:bg-morandi-blue-900/30 w-16 h-16 rounded-xl flex items-center justify-center"
              >
                <UIcon
                  name="i-heroicons-musical-note"
                  class="w-8 h-8 text-morandi-blue-600 dark:text-morandi-blue-400"
                />
              </div>
            </div>
            <h3
              class="text-xl font-semibold text-morandi-blue-900 dark:text-morandi-blue-100 mb-3"
            >
              {{ TEXTS.features.items.worship.title }}
            </h3>
            <p
              class="text-morandi-blue-700 dark:text-morandi-blue-300 leading-relaxed"
            >
              {{ TEXTS.features.items.worship.description }}
            </p>
          </div>

          <!-- 青年事工管理 -->
          <div
            class="bg-white dark:bg-morandi-blue-800 rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-morandi-blue-100 dark:border-morandi-blue-700"
          >
            <div class="mb-6">
              <div
                class="bg-church-primary-100 dark:bg-church-primary-900/30 w-16 h-16 rounded-xl flex items-center justify-center"
              >
                <UIcon
                  name="i-heroicons-user-group"
                  class="w-8 h-8 text-church-primary-600 dark:text-church-primary-400"
                />
              </div>
            </div>
            <h3
              class="text-xl font-semibold text-morandi-blue-900 dark:text-morandi-blue-100 mb-3"
            >
              {{ TEXTS.features.items.youth.title }}
            </h3>
            <p
              class="text-morandi-blue-700 dark:text-morandi-blue-300 leading-relaxed"
            >
              {{ TEXTS.features.items.youth.description }}
            </p>
          </div>

          <!-- 場地租借系統 -->
          <div
            class="bg-white dark:bg-morandi-blue-800 rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-morandi-blue-100 dark:border-morandi-blue-700"
          >
            <div class="mb-6">
              <div
                class="bg-morandi-blue-100 dark:bg-morandi-blue-900/30 w-16 h-16 rounded-xl flex items-center justify-center"
              >
                <UIcon
                  name="i-heroicons-building-office"
                  class="w-8 h-8 text-morandi-blue-600 dark:text-morandi-blue-400"
                />
              </div>
            </div>
            <h3
              class="text-xl font-semibold text-morandi-blue-900 dark:text-morandi-blue-100 mb-3"
            >
              {{ TEXTS.features.items.venue.title }}
            </h3>
            <p
              class="text-morandi-blue-700 dark:text-morandi-blue-300 leading-relaxed"
            >
              {{ TEXTS.features.items.venue.description }}
            </p>
          </div>

          <!-- 門徒牧養系統 -->
          <div
            class="bg-white dark:bg-morandi-blue-800 rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-morandi-blue-100 dark:border-morandi-blue-700"
          >
            <div class="mb-6">
              <div
                class="bg-church-primary-100 dark:bg-church-primary-900/30 w-16 h-16 rounded-xl flex items-center justify-center"
              >
                <UIcon
                  name="i-heroicons-book-open"
                  class="w-8 h-8 text-church-primary-600 dark:text-church-primary-400"
                />
              </div>
            </div>
            <h3
              class="text-xl font-semibold text-morandi-blue-900 dark:text-morandi-blue-100 mb-3"
            >
              {{ TEXTS.features.items.ministry.title }}
            </h3>
            <p
              class="text-morandi-blue-700 dark:text-morandi-blue-300 leading-relaxed"
            >
              {{ TEXTS.features.items.ministry.description }}
            </p>
          </div>

          <!-- 媒體管理平台 -->
          <div
            class="bg-white dark:bg-morandi-blue-800 rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-morandi-blue-100 dark:border-morandi-blue-700"
          >
            <div class="mb-6">
              <div
                class="bg-morandi-blue-100 dark:bg-morandi-blue-900/30 w-16 h-16 rounded-xl flex items-center justify-center"
              >
                <UIcon
                  name="i-heroicons-video-camera"
                  class="w-8 h-8 text-morandi-blue-600 dark:text-morandi-blue-400"
                />
              </div>
            </div>
            <h3
              class="text-xl font-semibold text-morandi-blue-900 dark:text-morandi-blue-100 mb-3"
            >
              {{ TEXTS.features.items.media.title }}
            </h3>
            <p
              class="text-morandi-blue-700 dark:text-morandi-blue-300 leading-relaxed"
            >
              {{ TEXTS.features.items.media.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section
      class="bg-white dark:bg-morandi-blue-800 py-16 sm:py-24 border-t border-morandi-blue-100 dark:border-morandi-blue-700"
    >
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div class="text-center">
            <div
              class="text-3xl font-bold text-church-primary-600 dark:text-church-primary-400"
            >
              6+
            </div>
            <div
              class="mt-2 text-sm font-medium text-morandi-blue-600 dark:text-morandi-blue-400"
            >
              {{ TEXTS.stats.modules }}
            </div>
          </div>
          <div class="text-center">
            <div
              class="text-3xl font-bold text-morandi-blue-600 dark:text-morandi-blue-400"
            >
              100%
            </div>
            <div
              class="mt-2 text-sm font-medium text-morandi-blue-600 dark:text-morandi-blue-400"
            >
              {{ TEXTS.stats.integration }}
            </div>
          </div>
          <div class="text-center">
            <div
              class="text-3xl font-bold text-church-primary-600 dark:text-church-primary-400"
            >
              24/7
            </div>
            <div
              class="mt-2 text-sm font-medium text-morandi-blue-600 dark:text-morandi-blue-400"
            >
              {{ TEXTS.stats.availability }}
            </div>
          </div>
          <div class="text-center">
            <div
              class="text-3xl font-bold text-morandi-blue-600 dark:text-morandi-blue-400"
            >
              ∞
            </div>
            <div
              class="mt-2 text-sm font-medium text-morandi-blue-600 dark:text-morandi-blue-400"
            >
              {{ TEXTS.stats.growth }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-church-primary-600 dark:bg-church-primary-800">
      <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {{ TEXTS.cta.title }}
          </h2>
          <p
            class="mx-auto mt-6 max-w-xl text-lg leading-8 text-church-primary-100"
          >
            {{ TEXTS.cta.description }}
          </p>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <UButton
              variant="solid"
              color="neutral"
              size="lg"
              class="px-8 py-3 bg-white text-church-primary-600 hover:bg-morandi-blue-50"
              icon="i-heroicons-arrow-right"
            >
              {{ TEXTS.cta.start }}
            </UButton>
            <UButton
              variant="outline"
              color="neutral"
              size="lg"
              class="px-8 py-3 border-white text-white hover:bg-white hover:text-church-primary-600"
            >
              {{ TEXTS.cta.contact }}
            </UButton>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
