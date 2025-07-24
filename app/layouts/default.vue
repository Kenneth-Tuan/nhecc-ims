<template>
  <div class="min-h-screen bg-morandi-blue-50 dark:bg-morandi-blue-950">
    <!-- Navigation -->
    <nav
      class="bg-white dark:bg-morandi-blue-900 shadow-sm border-b border-morandi-blue-200 dark:border-morandi-blue-700"
    >
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <!-- Logo -->
            <div class="flex items-center space-x-2">
              <UIcon
                name="i-heroicons-building-library"
                class="w-8 h-8 text-church-primary-600"
              />
              <span
                class="text-xl font-bold text-morandi-blue-900 dark:text-morandi-blue-100"
                >NHECC IMS</span
              >
            </div>
          </div>

          <!-- Navigation items -->
          <div class="hidden md:flex items-center space-x-8">
            <NuxtLink
              to="/"
              class="text-morandi-blue-700 dark:text-morandi-blue-300 hover:text-church-primary-600 dark:hover:text-church-primary-400 transition-colors"
            >
              {{ TEXTS.nav.home }}
            </NuxtLink>
            <NuxtLink
              to="/features"
              class="text-morandi-blue-700 dark:text-morandi-blue-300 hover:text-church-primary-600 dark:hover:text-church-primary-400 transition-colors"
            >
              {{ TEXTS.nav.features }}
            </NuxtLink>
            <NuxtLink
              to="/about"
              class="text-morandi-blue-700 dark:text-morandi-blue-300 hover:text-church-primary-600 dark:hover:text-church-primary-400 transition-colors"
            >
              {{ TEXTS.nav.about }}
            </NuxtLink>
            <NuxtLink
              to="/contact"
              class="text-morandi-blue-700 dark:text-morandi-blue-300 hover:text-church-primary-600 dark:hover:text-church-primary-400 transition-colors"
            >
              {{ TEXTS.nav.contact }}
            </NuxtLink>
          </div>

          <!-- Theme toggle and mobile menu -->
          <div class="flex items-center space-x-4">
            <!-- 使用 ClientOnly 避免 hydration mismatch -->
            <ClientOnly>
              <UButton
                :icon="isDark ? 'i-heroicons-sun' : 'i-heroicons-moon'"
                color="gray"
                variant="ghost"
                aria-label="Toggle theme"
                @click="isDark = !isDark"
              />
            </ClientOnly>

            <!-- Mobile menu button -->
            <UButton
              icon="i-heroicons-bars-3"
              color="gray"
              variant="ghost"
              class="md:hidden"
              @click="isMenuOpen = !isMenuOpen"
            />
          </div>
        </div>

        <!-- Mobile menu -->
        <div
          v-show="isMenuOpen"
          class="md:hidden py-4 border-t border-morandi-blue-200 dark:border-morandi-blue-700"
        >
          <div class="space-y-2">
            <NuxtLink
              to="/"
              class="block px-3 py-2 text-morandi-blue-700 dark:text-morandi-blue-300 hover:text-church-primary-600 dark:hover:text-church-primary-400 transition-colors"
              @click="isMenuOpen = false"
            >
              {{ TEXTS.nav.home }}
            </NuxtLink>
            <NuxtLink
              to="/features"
              class="block px-3 py-2 text-morandi-blue-700 dark:text-morandi-blue-300 hover:text-church-primary-600 dark:hover:text-church-primary-400 transition-colors"
              @click="isMenuOpen = false"
            >
              {{ TEXTS.nav.features }}
            </NuxtLink>
            <NuxtLink
              to="/about"
              class="block px-3 py-2 text-morandi-blue-700 dark:text-morandi-blue-300 hover:text-church-primary-600 dark:hover:text-church-primary-400 transition-colors"
              @click="isMenuOpen = false"
            >
              {{ TEXTS.nav.about }}
            </NuxtLink>
            <NuxtLink
              to="/contact"
              class="block px-3 py-2 text-morandi-blue-700 dark:text-morandi-blue-300 hover:text-church-primary-600 dark:hover:text-church-primary-400 transition-colors"
              @click="isMenuOpen = false"
            >
              {{ TEXTS.nav.contact }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main content -->
    <main>
      <slot />
    </main>

    <!-- Footer -->
    <footer
      class="bg-morandi-blue-100 dark:bg-morandi-blue-800 border-t border-morandi-blue-200 dark:border-morandi-blue-700"
    >
      <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Company info -->
          <div class="col-span-1 md:col-span-2">
            <div class="flex items-center space-x-2 mb-4">
              <UIcon
                name="i-heroicons-building-library"
                class="w-6 h-6 text-church-primary-600"
              />
              <span
                class="text-lg font-bold text-morandi-blue-900 dark:text-morandi-blue-100"
                >NHECC IMS</span
              >
            </div>
            <p
              class="text-morandi-blue-700 dark:text-morandi-blue-400 max-w-md"
            >
              {{ TEXTS.footer.description }}
            </p>
          </div>

          <!-- Quick links -->
          <div>
            <h3
              class="text-sm font-semibold text-morandi-blue-900 dark:text-morandi-blue-100 uppercase tracking-wider mb-4"
            >
              {{ TEXTS.footer.quickLinks }}
            </h3>
            <ul class="space-y-2">
              <li>
                <NuxtLink
                  to="/"
                  class="text-morandi-blue-700 dark:text-morandi-blue-400 hover:text-church-primary-600 dark:hover:text-church-primary-400 transition-colors"
                >
                  {{ TEXTS.nav.home }}
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/features"
                  class="text-morandi-blue-700 dark:text-morandi-blue-400 hover:text-church-primary-600 dark:hover:text-church-primary-400 transition-colors"
                >
                  {{ TEXTS.nav.features }}
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/about"
                  class="text-morandi-blue-700 dark:text-morandi-blue-400 hover:text-church-primary-600 dark:hover:text-church-primary-400 transition-colors"
                >
                  {{ TEXTS.nav.about }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Contact info -->
          <div>
            <h3
              class="text-sm font-semibold text-morandi-blue-900 dark:text-morandi-blue-100 uppercase tracking-wider mb-4"
            >
              {{ TEXTS.footer.contact }}
            </h3>
            <ul class="space-y-2">
              <li class="text-morandi-blue-700 dark:text-morandi-blue-400">
                <UIcon
                  name="i-heroicons-envelope"
                  class="w-4 h-4 inline mr-2"
                />
                {{ TEXTS.contact.info.email }}
              </li>
              <li class="text-morandi-blue-700 dark:text-morandi-blue-400">
                <div class="mb-1">
                  <UIcon name="i-heroicons-phone" class="w-4 h-4 inline mr-2" />
                  {{ TEXTS.footer.locations.wende }}:
                  {{ TEXTS.contact.info.wendePhone }}
                </div>
                <div class="ml-6">
                  {{ TEXTS.footer.locations.bihu }}:
                  {{ TEXTS.contact.info.bihuPhone }}
                </div>
              </li>
              <li class="text-morandi-blue-700 dark:text-morandi-blue-400">
                <UIcon name="i-heroicons-map-pin" class="w-4 h-4 inline mr-2" />
                {{ TEXTS.contact.info.address }}
              </li>
            </ul>
          </div>
        </div>

        <div
          class="mt-8 pt-8 border-t border-morandi-blue-200 dark:border-morandi-blue-700"
        >
          <p
            class="text-center text-morandi-blue-600 dark:text-morandi-blue-400 text-sm"
          >
            {{ TEXTS.footer.copyright }}
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { TEXTS } from "~/constants/texts";

const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});

const isMenuOpen = ref(false);
</script>
