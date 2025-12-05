<script setup lang="ts">
import type { NuxtError } from "#app";

definePageMeta({
  layout: "default",
});

defineProps({
  error: {
    type: Object as PropType<NuxtError>,
    required: true,
  },
});

useHead({
  htmlAttrs: {
    lang: "en",
  },
});

useSeoMeta({
  title: "Page not found",
  description: "We are sorry but this page could not be found.",
});
</script>

<template>
  <UApp>
    <NuxtLayout>
      <UError :error="error" />
    </NuxtLayout>

    <!-- <ClientOnly>
      <LazyUContentSearch
        :files="files"
        shortcut="meta_k"
        :navigation="navigation"
        :links="navLinks"
        :fuse="{ resultLimit: 42 }"
      />
    </ClientOnly> -->

    <UToaster />
  </UApp>
</template>
