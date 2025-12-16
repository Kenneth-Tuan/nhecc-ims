<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

import DesignA from "~/components/home/designs/DesignA.vue";
import DesignB from "~/components/home/designs/DesignB.vue";
import DesignC from "~/components/home/designs/DesignC.vue";
import DesignD from "~/components/home/designs/DesignD.vue";
import DesignE from "~/components/home/designs/DesignE.vue";

const { isCollapsed } = useSidebar();
const { getIcon } = useIconStyle();
const open = ref(false);

const items = computed<NavigationMenuItem[][]>(() => [
  [
    {
      label: "首頁",
      icon: getIcon("home"),
      to: "/",
      active: true,
    },
    {
      label: "裝備",
      icon: getIcon("shield-check"),
      active: false,
    },
    {
      label: "牧養",
      icon: getIcon("book-open"),
      active: false,
    },
    {
      label: "我的",
      icon: getIcon("box"),
      active: false,
    },
    {
      label: "更多",
      icon: getIcon("ellipsis"),
      active: false,
      onClick: () => {
        open.value = true;
      },
    },
  ],
]);

// A/B Test State
const currentDesign = useState("ab-test-design", () => "A");

const designs = [
  { id: "A", name: "極簡乾淨 (Minimal)", component: DesignA },
  { id: "B", name: "卡片設計 (Material)", component: DesignB },
  { id: "C", name: "毛玻璃 (Glass)", component: DesignC },
  { id: "D", name: "擬態風格 (Soft)", component: DesignD },
  { id: "E", name: "高對比 (Accessibility)", component: DesignE },
];

const currentComponent = useState("current-component", () => DesignA);

const onClickDesign = (id: string) => {
  currentDesign.value = id;
  currentComponent.value = designs.find((d) => d.id === id)?.component || DesignA;
};
</script>

<template>
  <UNavigationMenu
    :collapsed="isCollapsed"
    highlight
    highlight-color="primary"
    orientation="horizontal"
    color="neutral"
    variant="link"
    :items="items"
    class="w-full h-full"
    :ui="{
      link: 'flex flex-col justify-center items-center',
      root: 'w-full flex items-center justify-center [&>div]:w-full',
      list: 'w-full justify-between',
    }"
  />

  <UDrawer
    v-model:open="open"
    title="Drawer with footer"
    description="This is useful when you want a form in a Drawer."
    :ui="{ container: 'max-w-xl mx-auto' }"
  >
    <template #body>
    <!-- A/B Testing Switcher (Floating) -->
    <div
      class="bottom-24 right-4 z-50 flex flex-col gap-2 bg-black/80 backdrop-blur-md p-3 rounded-xl shadow-2xl border border-white/20"
    >
      <div class="text-xs text-white/70 font-bold mb-1 px-1">
        設計風格切換 (A/B Test)
      </div>
      <div class="flex flex-wrap gap-2 max-w-[200px]">
        <button
          v-for="design in designs"
          :key="design.id"
          @click="onClickDesign(design.id)"
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
    </template>

    <template #footer>
      <div class="flex justify-between items-center">
        <UUser
          to="/"
          name="Kenneth Tuan"
          description="Software Engineer"
          :avatar="{
            src: 'https://i.pravatar.cc/150?u=john-doe',
          }"
          :chip="{
            color: 'primary',
            position: 'top-right',
          }"
        />

        <div class="flex items-center gap-2">
          <IconStyleButton />
          <BorderStyleButton />
          <ColorModeButton />
          <UTooltip text="登出" :kbds="['meta', 'G']">
            <UButton
              icon="material-symbols:logout"
              color="neutral"
              variant="ghost"
            />
          </UTooltip>
        </div>
      </div>
    </template>
  </UDrawer>
</template>
