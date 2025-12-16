<script setup lang="ts">

definePageMeta({
  layout: "dashboard",
});

const currentComponent = useState("current-component");
</script>

<template>
  <div class="relative">
    <component :is="currentComponent" />
  </div>
</template>
