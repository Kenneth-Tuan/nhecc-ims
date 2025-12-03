<script setup lang="ts">
const route = useRoute();

definePageMeta({
  layout: "default",
});

// const { data: page } = await useAsyncData(route.path, () => {
//   return queryCollection('docs').path(route.path).first()
// })

// const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
//   return queryCollectionItemSurroundings('content', route.path)
// })
</script>

<template>
  <UPage>
    <!-- <UPageHeader :title="page.title" :description="page.description" /> -->

    <template #left>
      <NavigationMenu />
    </template>

    <UPageBody> test </UPageBody>
  </UPage>
</template>
