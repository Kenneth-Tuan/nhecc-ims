<script setup lang="ts">
import DesignA from "~/components/home/designs/DesignA.vue";
import DesignB from "~/components/home/designs/DesignB.vue";
import DesignC from "~/components/home/designs/DesignC.vue";
import DesignD from "~/components/home/designs/DesignD.vue";
import DesignE from "~/components/home/designs/DesignE.vue";

definePageMeta({
  layout: "dashboard",
});

// A/B Test State
const currentDesign = useState("ab-test-design", () => "A");
const designs = [
  { id: "A", name: "極簡乾淨 (Minimal)", component: DesignA },
  { id: "B", name: "卡片設計 (Material)", component: DesignB },
  { id: "C", name: "毛玻璃 (Glass)", component: DesignC },
  { id: "D", name: "擬態風格 (Soft)", component: DesignD },
  { id: "E", name: "高對比 (Accessibility)", component: DesignE },
];

const currentComponent = computed(() => {
  return (
    designs.find((d) => d.id === currentDesign.value)?.component || DesignA
  );
});
</script>

<template>
  <div class="relative">
    <!-- A/B Testing Switcher (Floating) -->
    <div
      class="fixed bottom-24 right-4 z-50 flex flex-col gap-2 bg-black/80 backdrop-blur-md p-3 rounded-xl shadow-2xl border border-white/20"
    >
      <div class="text-xs text-white/70 font-bold mb-1 px-1">
        設計風格切換 (A/B Test)
      </div>
      <div class="flex flex-wrap gap-2 max-w-[200px]">
        <button
          v-for="design in designs"
          :key="design.id"
          @click="currentDesign = design.id"
          class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
          :class="
            currentDesign === design.id
              ? 'bg-primary text-primary-foreground shadow-lg scale-105'
              : 'bg-white/10 text-white hover:bg-white/20'
          "
        >
          {{ design.id }}
        </button>
      </div>
      <div class="text-[10px] text-white/50 text-center mt-1">
        {{ designs.find((d) => d.id === currentDesign)?.name }}
      </div>
    </div>

    <!-- Render Selected Design -->
    <component :is="currentComponent" />
  </div>
</template>
