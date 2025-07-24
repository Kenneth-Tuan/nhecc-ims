<template>
  <div class="min-h-screen bg-morandi-blue-50 dark:bg-morandi-blue-950">
    <!-- Page Header -->
    <section
      class="bg-white dark:bg-morandi-blue-900 py-16 border-b border-morandi-blue-200 dark:border-morandi-blue-700"
    >
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1
            class="text-4xl font-bold tracking-tight text-morandi-blue-900 dark:text-morandi-blue-100 sm:text-5xl"
          >
            {{ TEXTS.about.title }}
          </h1>
          <p
            class="mt-6 text-lg leading-8 text-morandi-blue-700 dark:text-morandi-blue-300 max-w-3xl mx-auto"
          >
            {{ TEXTS.about.subtitle }}
          </p>
        </div>
      </div>
    </section>

    <!-- Church Vision -->
    <section class="py-16 sm:py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2
              class="text-3xl font-bold text-morandi-blue-900 dark:text-morandi-blue-100 mb-6"
            >
              {{ TEXTS.about.vision.title }}
            </h2>
            <p
              class="text-lg text-morandi-blue-700 dark:text-morandi-blue-300 leading-relaxed mb-8"
            >
              {{ TEXTS.about.vision.content }}
            </p>

            <h3
              class="text-2xl font-semibold text-morandi-blue-900 dark:text-morandi-blue-100 mb-6"
            >
              {{ TEXTS.about.mission.title }}
            </h3>
            <p
              class="text-lg text-morandi-blue-700 dark:text-morandi-blue-300 leading-relaxed"
            >
              {{ TEXTS.about.mission.content }}
            </p>
          </div>

          <div
            class="bg-white dark:bg-morandi-blue-800 rounded-2xl p-8 shadow-lg border border-morandi-blue-100 dark:border-morandi-blue-700"
          >
            <h3
              class="text-2xl font-semibold text-morandi-blue-900 dark:text-morandi-blue-100 mb-6"
            >
              {{ TEXTS.about.values.title }}
            </h3>
            <div class="space-y-4">
              <div class="flex items-start space-x-3">
                <UIcon
                  name="i-heroicons-heart"
                  class="w-6 h-6 text-church-primary-600 mt-1"
                />
                <p class="text-morandi-blue-700 dark:text-morandi-blue-300">
                  {{ TEXTS.about.values.blessing }}
                </p>
              </div>
              <div class="flex items-start space-x-3">
                <UIcon
                  name="i-heroicons-academic-cap"
                  class="w-6 h-6 text-church-primary-600 mt-1"
                />
                <p class="text-morandi-blue-700 dark:text-morandi-blue-300">
                  {{ TEXTS.about.values.discipleship }}
                </p>
              </div>
              <div class="flex items-start space-x-3">
                <UIcon
                  name="i-heroicons-megaphone"
                  class="w-6 h-6 text-church-primary-600 mt-1"
                />
                <p class="text-morandi-blue-700 dark:text-morandi-blue-300">
                  {{ TEXTS.about.values.evangelism }}
                </p>
              </div>
              <div class="flex items-start space-x-3">
                <UIcon
                  name="i-heroicons-globe-americas"
                  class="w-6 h-6 text-church-primary-600 mt-1"
                />
                <p class="text-morandi-blue-700 dark:text-morandi-blue-300">
                  {{ TEXTS.about.values.mission }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Information -->
    <section
      class="bg-white dark:bg-morandi-blue-800 py-16 border-t border-morandi-blue-100 dark:border-morandi-blue-700"
    >
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2
            class="text-3xl font-bold text-morandi-blue-900 dark:text-morandi-blue-100 mb-4"
          >
            {{ TEXTS.contact.title }}
          </h2>
          <p class="text-lg text-morandi-blue-700 dark:text-morandi-blue-300">
            {{ TEXTS.contact.subtitle }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Wende Hall -->
          <div
            class="bg-morandi-blue-50 dark:bg-morandi-blue-900 rounded-xl p-6"
          >
            <h3
              class="text-xl font-semibold text-morandi-blue-900 dark:text-morandi-blue-100 mb-4"
            >
              {{ TEXTS.footer.locations.wende }}
            </h3>
            <div class="space-y-3">
              <div class="flex items-center space-x-3">
                <UIcon
                  name="i-heroicons-phone"
                  class="w-5 h-5 text-church-primary-600"
                />
                <span
                  class="text-morandi-blue-700 dark:text-morandi-blue-300"
                  >{{ TEXTS.contact.info.wendePhone }}</span
                >
              </div>
              <div class="flex items-center space-x-3">
                <UIcon
                  name="i-heroicons-map-pin"
                  class="w-5 h-5 text-church-primary-600"
                />
                <span
                  class="text-morandi-blue-700 dark:text-morandi-blue-300"
                  >{{ TEXTS.contact.info.address }}</span
                >
              </div>
            </div>
          </div>

          <!-- Bihu Hall -->
          <div
            class="bg-morandi-blue-50 dark:bg-morandi-blue-900 rounded-xl p-6"
          >
            <h3
              class="text-xl font-semibold text-morandi-blue-900 dark:text-morandi-blue-100 mb-4"
            >
              {{ TEXTS.footer.locations.bihu }}
            </h3>
            <div class="space-y-3">
              <div class="flex items-center space-x-3">
                <UIcon
                  name="i-heroicons-phone"
                  class="w-5 h-5 text-church-primary-600"
                />
                <span
                  class="text-morandi-blue-700 dark:text-morandi-blue-300"
                  >{{ TEXTS.contact.info.bihuPhone }}</span
                >
              </div>
              <div class="flex items-center space-x-3">
                <UIcon
                  name="i-heroicons-map-pin"
                  class="w-5 h-5 text-church-primary-600"
                />
                <span
                  class="text-morandi-blue-700 dark:text-morandi-blue-300"
                  >{{ TEXTS.contact.info.address }}</span
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Email Contact -->
        <div class="mt-8 text-center">
          <div
            class="inline-flex items-center space-x-3 bg-church-primary-50 dark:bg-church-primary-900/30 rounded-xl px-6 py-4"
          >
            <UIcon
              name="i-heroicons-envelope"
              class="w-6 h-6 text-church-primary-600"
            />
            <span
              class="text-lg font-medium text-church-primary-700 dark:text-church-primary-300"
            >
              {{ TEXTS.contact.info.email }}
            </span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { TEXTS } from "~/constants/texts";

// SEO Meta
useHead({
  title: TEXTS.about.title + " - NHECC IMS",
  meta: [{ name: "description", content: TEXTS.about.subtitle }],
});
</script>
