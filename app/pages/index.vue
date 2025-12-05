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
    <section class="relative overflow-hidden pb-16 pt-24 sm:pb-32 sm:pt-40">
      <div
        class="absolute inset-0 bg-gradient-to-r from-morandi-blue-600/10 to-church-primary-600/10"
      ></div>
      <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1
            class="text-5xl font-bold tracking-tight text-morandi-blue-900 dark:text-morandi-blue-100 sm:text-6xl md:text-7xl lg:text-8xl"
          >
            <span class="block mb-2">{{ TEXTS.hero.title }}</span>
            <span
              class="block text-church-primary-600 dark:text-church-primary-400"
              >{{ TEXTS.hero.subtitle }}</span
            >
          </h1>
          <p
            class="mx-auto mt-8 max-w-2xl text-xl leading-8 text-morandi-blue-700 dark:text-morandi-blue-300 sm:text-2xl"
          >
            {{ TEXTS.hero.description }}
          </p>
          <div
            class="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-x-8"
          >
            <UButton
              size="xl"
              class="w-full justify-center px-8 py-4 text-xl sm:w-auto"
              color="primary"
              variant="solid"
              icon="i-heroicons-rocket-launch"
            >
              {{ TEXTS.hero.ctaPrimary }}
            </UButton>
            <UButton
              size="xl"
              variant="ghost"
              icon="i-heroicons-play-circle"
              class="w-full justify-center px-8 py-4 text-xl text-morandi-blue-700 hover:text-church-primary-600 dark:text-morandi-blue-300 sm:w-auto"
            >
              {{ TEXTS.hero.ctaSecondary }}
            </UButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 sm:py-32">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2
            class="text-4xl font-bold tracking-tight text-morandi-blue-900 dark:text-morandi-blue-100 sm:text-5xl"
          >
            {{ TEXTS.features.title }}
          </h2>
          <p
            class="mt-6 text-xl leading-8 text-morandi-blue-700 dark:text-morandi-blue-300"
          >
            {{ TEXTS.features.subtitle }}
          </p>
        </div>

        <div class="mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          <!-- 卓越兒童發展園地 -->
          <div
            class="group relative rounded-3xl bg-white p-8 shadow-lg transition-all hover:-translate-y-2 hover:shadow-xl dark:bg-morandi-blue-800 border border-morandi-blue-100 dark:border-morandi-blue-700"
          >
            <div class="mb-8 inline-block rounded-2xl bg-church-primary-100 p-4 dark:bg-church-primary-900/30">
              <UIcon
                name="i-heroicons-sparkles"
                class="h-10 w-10 text-church-primary-600 dark:text-church-primary-400"
                aria-hidden="true"
              />
            </div>
            <h3
              class="text-2xl font-bold text-morandi-blue-900 dark:text-morandi-blue-100 mb-4"
            >
              {{ TEXTS.features.items.children.title }}
            </h3>
            <p
              class="text-lg leading-relaxed text-morandi-blue-700 dark:text-morandi-blue-300"
            >
              {{ TEXTS.features.items.children.description }}
            </p>
          </div>

          <!-- 敬拜服事管理 -->
          <div
            class="group relative rounded-3xl bg-white p-8 shadow-lg transition-all hover:-translate-y-2 hover:shadow-xl dark:bg-morandi-blue-800 border border-morandi-blue-100 dark:border-morandi-blue-700"
          >
            <div class="mb-8 inline-block rounded-2xl bg-morandi-blue-100 p-4 dark:bg-morandi-blue-900/30">
              <UIcon
                name="i-heroicons-musical-note"
                class="h-10 w-10 text-morandi-blue-600 dark:text-morandi-blue-400"
                aria-hidden="true"
              />
            </div>
            <h3
              class="text-2xl font-bold text-morandi-blue-900 dark:text-morandi-blue-100 mb-4"
            >
              {{ TEXTS.features.items.worship.title }}
            </h3>
            <p
              class="text-lg leading-relaxed text-morandi-blue-700 dark:text-morandi-blue-300"
            >
              {{ TEXTS.features.items.worship.description }}
            </p>
          </div>

          <!-- 青年事工管理 -->
          <div
            class="group relative rounded-3xl bg-white p-8 shadow-lg transition-all hover:-translate-y-2 hover:shadow-xl dark:bg-morandi-blue-800 border border-morandi-blue-100 dark:border-morandi-blue-700"
          >
            <div class="mb-8 inline-block rounded-2xl bg-church-primary-100 p-4 dark:bg-church-primary-900/30">
              <UIcon
                name="i-heroicons-user-group"
                class="h-10 w-10 text-church-primary-600 dark:text-church-primary-400"
                aria-hidden="true"
              />
            </div>
            <h3
              class="text-2xl font-bold text-morandi-blue-900 dark:text-morandi-blue-100 mb-4"
            >
              {{ TEXTS.features.items.youth.title }}
            </h3>
            <p
              class="text-lg leading-relaxed text-morandi-blue-700 dark:text-morandi-blue-300"
            >
              {{ TEXTS.features.items.youth.description }}
            </p>
          </div>

          <!-- 場地租借系統 -->
          <div
            class="group relative rounded-3xl bg-white p-8 shadow-lg transition-all hover:-translate-y-2 hover:shadow-xl dark:bg-morandi-blue-800 border border-morandi-blue-100 dark:border-morandi-blue-700"
          >
            <div class="mb-8 inline-block rounded-2xl bg-morandi-blue-100 p-4 dark:bg-morandi-blue-900/30">
              <UIcon
                name="i-heroicons-building-office"
                class="h-10 w-10 text-morandi-blue-600 dark:text-morandi-blue-400"
                aria-hidden="true"
              />
            </div>
            <h3
              class="text-2xl font-bold text-morandi-blue-900 dark:text-morandi-blue-100 mb-4"
            >
              {{ TEXTS.features.items.venue.title }}
            </h3>
            <p
              class="text-lg leading-relaxed text-morandi-blue-700 dark:text-morandi-blue-300"
            >
              {{ TEXTS.features.items.venue.description }}
            </p>
          </div>

          <!-- 門徒牧養系統 -->
          <div
            class="group relative rounded-3xl bg-white p-8 shadow-lg transition-all hover:-translate-y-2 hover:shadow-xl dark:bg-morandi-blue-800 border border-morandi-blue-100 dark:border-morandi-blue-700"
          >
            <div class="mb-8 inline-block rounded-2xl bg-church-primary-100 p-4 dark:bg-church-primary-900/30">
              <UIcon
                name="i-heroicons-book-open"
                class="h-10 w-10 text-church-primary-600 dark:text-church-primary-400"
                aria-hidden="true"
              />
            </div>
            <h3
              class="text-2xl font-bold text-morandi-blue-900 dark:text-morandi-blue-100 mb-4"
            >
              {{ TEXTS.features.items.ministry.title }}
            </h3>
            <p
              class="text-lg leading-relaxed text-morandi-blue-700 dark:text-morandi-blue-300"
            >
              {{ TEXTS.features.items.ministry.description }}
            </p>
          </div>

          <!-- 媒體管理平台 -->
          <div
            class="group relative rounded-3xl bg-white p-8 shadow-lg transition-all hover:-translate-y-2 hover:shadow-xl dark:bg-morandi-blue-800 border border-morandi-blue-100 dark:border-morandi-blue-700"
          >
            <div class="mb-8 inline-block rounded-2xl bg-morandi-blue-100 p-4 dark:bg-morandi-blue-900/30">
              <UIcon
                name="i-heroicons-video-camera"
                class="h-10 w-10 text-morandi-blue-600 dark:text-morandi-blue-400"
                aria-hidden="true"
              />
            </div>
            <h3
              class="text-2xl font-bold text-morandi-blue-900 dark:text-morandi-blue-100 mb-4"
            >
              {{ TEXTS.features.items.media.title }}
            </h3>
            <p
              class="text-lg leading-relaxed text-morandi-blue-700 dark:text-morandi-blue-300"
            >
              {{ TEXTS.features.items.media.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section
      class="bg-white py-24 dark:bg-morandi-blue-800 border-t border-morandi-blue-100 dark:border-morandi-blue-700"
    >
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 gap-x-8 gap-y-16 lg:grid-cols-4">
          <div class="text-center">
            <div
              class="text-5xl font-bold tracking-tight text-church-primary-600 dark:text-church-primary-400 sm:text-6xl"
            >
              6+
            </div>
            <div
              class="mt-4 text-xl font-medium text-morandi-blue-600 dark:text-morandi-blue-400"
            >
              {{ TEXTS.stats.modules }}
            </div>
          </div>
          <div class="text-center">
            <div
              class="text-5xl font-bold tracking-tight text-morandi-blue-600 dark:text-morandi-blue-400 sm:text-6xl"
            >
              100%
            </div>
            <div
              class="mt-4 text-xl font-medium text-morandi-blue-600 dark:text-morandi-blue-400"
            >
              {{ TEXTS.stats.integration }}
            </div>
          </div>
          <div class="text-center">
            <div
              class="text-5xl font-bold tracking-tight text-church-primary-600 dark:text-church-primary-400 sm:text-6xl"
            >
              24/7
            </div>
            <div
              class="mt-4 text-xl font-medium text-morandi-blue-600 dark:text-morandi-blue-400"
            >
              {{ TEXTS.stats.availability }}
            </div>
          </div>
          <div class="text-center">
            <div
              class="text-5xl font-bold tracking-tight text-morandi-blue-600 dark:text-morandi-blue-400 sm:text-6xl"
            >
              ∞
            </div>
            <div
              class="mt-4 text-xl font-medium text-morandi-blue-600 dark:text-morandi-blue-400"
            >
              {{ TEXTS.stats.growth }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-church-primary-600 py-24 dark:bg-church-primary-800">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {{ TEXTS.cta.title }}
          </h2>
          <p class="mx-auto mt-8 max-w-2xl text-xl leading-8 text-church-primary-100">
            {{ TEXTS.cta.description }}
          </p>
          <div class="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-x-8">
            <UButton
              variant="solid"
              color="white"
              size="xl"
              class="w-full justify-center px-8 py-4 text-xl text-church-primary-600 hover:bg-morandi-blue-50 sm:w-auto"
              icon="i-heroicons-arrow-right"
            >
              {{ TEXTS.cta.start }}
            </UButton>
            <UButton
              variant="outline"
              color="white"
              size="xl"
              class="w-full justify-center border-white px-8 py-4 text-xl text-white hover:bg-white hover:text-church-primary-600 sm:w-auto"
            >
              {{ TEXTS.cta.contact }}
            </UButton>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
