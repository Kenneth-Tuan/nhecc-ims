<script setup lang="ts">
import { ref, computed } from "vue";

// Use Nuxt's color mode
const colorMode = useColorMode();

const toggleDarkMode = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};

// User data
const user = ref({
  name: "Sister Mary",
  title: "Deaconess",
  avatar:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCoMKD60XagGJV6T0Qs7HwOrNF9ZeseqPpTHwZ-7oE63FruhWVjtGSpxONG_lShUuhxQTUZCwNCPaZidU53J3j5UqoeM_OY3KfBjjFCJ81f5hBTXR8YMeCVSshwMfV4g46wWqh-PQmT2el6jq_gJf4kpKf-opV23QlNlk4etzpJBaCYfOmvvnj-dmVe5Pd1VowhcvvXNI0UMTs_dvLp8_hOkLJKV9IZwWOSQ9rMz9j8HXUxSAHUFxuCU9ENmetCvFYWSEEvUO3ThDw",
});

// Daily verse data
const dailyVerse = ref({
  // text: '"For I know the plans I have for you..."',
  text: '"For I know the plans..."', // Shortened for mobile fit if needed
  fullText: '"For I know the plans I have for you..."',
  reference: "Jeremiah 29:11",
  image:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCtWYuEGHg-pfa4iHRwLpv5-2GgwyhQ7uhj5JuyCkPo99G6sUm-Ls1HT5OWKuGwY-xXNkVLaIjFG3yUYNByd_AAs9hP1-0fzM3OIK5h52kFOecWxhwCdcsxh7h-c5maH85-C50Y4zfB0I3nAsbJD7cFQnc1jjN79oKp2WRMMpAy3A3k_G5PUt6bgNgp00lrkgy2R9wwQFYlum0sNsYSG54gaZIRRsNB1WWYb_9KVowkvxMk7QX7tngF-gVymJUTsYMu1WVW6Q0rBKQ",
});

// Quick actions data
const quickActions = ref([
  { id: "give", label: "Give", icon: "heart-handshake", filled: false },
  { id: "events", label: "Events", icon: "calendar", filled: false },
  { id: "bible", label: "Bible", icon: "book-open", filled: false },
  { id: "groups", label: "Groups", icon: "users", filled: false },
]);

// Today's tasks data
const todaysTasks = ref([
  {
    id: 1,
    title: "Morning Prayer",
    time: "8:00 AM",
    location: "Sanctuary",
    icon: "clock",
    completed: false,
    priority: false,
  },
  {
    id: 2,
    title: "Choir Practice",
    time: "5:00 PM",
    location: "Music Room",
    icon: "clock",
    completed: false,
    priority: true,
  },
  {
    id: 3,
    title: "Review Lesson Plan",
    time: "",
    location: "Due Tomorrow",
    icon: "calendar-days",
    completed: false,
    priority: false,
  },
]);

// Church news data
const churchNews = ref([
  {
    id: 1,
    title: "Annual Church Picnic",
    category: "Upcoming",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBrTKAe3kpnlQhYs0pj9sUWe67wJYZ4mztWygi1TxE9oTF2qbvWWB2IlCX8w7otgzMSl8SKUN0cZVo9mMEFRp_LnEJPuHq3JqLQVrtfhyAHg7Mc__PGvUWvYHLpLCriIEyfYqLSJJ5msAWi_LsMIitJLITSFnI3OAZ2uOV2rSBJ2PcCmOiulqaz3EKlYhQeRRT0AjRUTLWeHxP45p_k0xj7qibqf5mMACsKnX3J_RxDwiDI6yRu-G8PznuYGqWeHfd5VoKSOOuQQo4",
  },
  {
    id: 2,
    title: "Food Drive Success",
    category: "Community",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBtsKAQNcCQBzefIyk47Pomq-xHN88x-v2uasFvBazFKkr2sVEM3T_L-hpcM0cp2ORbc0kDwxXklX8kkgDiwfDKEVwaNMl4wOlapkDOhI-HgK9WK5KMioPCPZbrfTD1WKzq-IW3ow8B_c4KEaIAD9Zc15A9gsH-D2HEyqm42GFAIq_b-yAxK-yDBtt1Xh6ENGkuIPQnl4Oa-iLaIEXAndbMVj_N7pYlLKWlUbLvrzpK2OVRsa03VkgOm2U9yC8yNYf3YS8jsBf6aZE",
  },
  {
    id: 3,
    title: "New Service Times",
    category: "Update",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBChw_jE1FxNb55k5D0n8B3mVaguVzcEgZI0So2zmmurvP4PZXyW2wCY0Hnq98AUlaYixl2h-wqQvQ4lfGfV51qP1TnD6sJr2HJ4eGIB6SRMj0gdVysA_-Ynepdgp3TVBeY52yTX5iNP6Hsu_ynfnHy1MIQobpK3DdtPUzhf1wkMLwnS_R0PEk5_G4Mrkt79p5HfxU_zi2k9uoOtQYeU8xfQZIY7FRLqHtHRncZsiUmRTwVMgRx47pKJs4gQyjK3uh-igiyvd_CKQA",
  },
]);

// Bottom navigation data
const bottomNav = ref([
  { id: "home", label: "Home", icon: "home", active: true },
  { id: "calendar", label: "Calendar", icon: "calendar", active: false },
  { id: "add", label: "Add", icon: "plus", active: false },
  { id: "forum", label: "Forum", icon: "message-circle", active: false },
  { id: "profile", label: "Profile", icon: "user", active: false },
]);

// Computed properties
const pendingTasksCount = computed(() => {
  return todaysTasks.value.filter((task) => !task.completed).length;
});

// Icon mapping function
const getIconName = (icon: string) => {
  const iconMap: Record<string, string> = {
    "heart-handshake": "i-lucide-heart-handshake",
    calendar: "i-lucide-calendar",
    "book-open": "i-lucide-book-open",
    users: "i-lucide-users",
    schedule: "i-lucide-clock",
    event: "i-lucide-calendar-days",
    home: "i-lucide-home",
    forum: "i-lucide-message-circle",
    person: "i-lucide-user",
    add: "i-lucide-plus",
    clock: "i-lucide-clock",
    "calendar-days": "i-lucide-calendar-days",
    plus: "i-lucide-plus",
    "message-circle": "i-lucide-message-circle",
    user: "i-lucide-user",
  };
  return iconMap[icon] || `i-lucide-${icon}`;
};

// Methods
const handleActionClick = (action: any) => {
  console.log("Action clicked:", action.id);
  navigateTo({ id: action.id });
};

const toggleTask = (task: any) => {
  // Logic handled by v-model mostly, but we can log
  console.log("Task toggled:", task.id, task.completed);
};

const seeAllNews = () => {
  navigateTo({ id: "news" });
};

const navigateTo = (navItem: any) => {
  console.log("Navigate to:", navItem.id);

  if (navItem.id !== "add") {
    bottomNav.value.forEach((item) => {
      item.active = item.id === navItem.id;
    });
  }

  const router = useRouter();
  // Simple router match for demo
  router.push(`/${navItem.id === "home" ? "" : navItem.id}`);
};

// Page meta
definePageMeta({
  title: "NHECC Church Dashboard",
  layout: "dashboard",
});
</script>

<template>
  <div
    class="min-h-screen bg-background text-foreground font-display antialiased pb-32 transition-colors duration-300"
  >
    <!-- Header -->
    <header class="px-6 pt-12 pb-6 flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div class="relative">
          <UAvatar
            :src="user.avatar"
            :alt="user.name"
            size="2xl"
            class="ring-2 ring-background shadow-soft-sm"
            imgClass="object-cover"
          />
          <div
            class="absolute bottom-0 right-0 size-3.5 bg-green-500 border-2 border-background rounded-full"
          ></div>
        </div>
        <div class="flex flex-col">
          <h2
            class="text-sm font-semibold text-muted-foreground uppercase tracking-wide"
          >
            {{ user.title }}
          </h2>
          <h1 class="text-2xl font-bold leading-tight">
            {{ user.name }}
          </h1>
        </div>
      </div>

      <UButton
        icon="i-lucide-bell"
        color="gray"
        variant="ghost"
        class="rounded-full shadow-soft-sm bg-card dark:bg-card hover:bg-muted dark:hover:bg-muted p-3"
        :ui="{ rounded: 'rounded-full' }"
      >
        <!-- <template #trailing>
          <span
            class="absolute top-2.5 right-2.5 size-2.5 bg-red-500 rounded-full border-2 border-card"
          ></span>
        </template> -->
      </UButton>
    </header>

    <!-- Hero Section -->
    <section class="px-5 mt-2">
      <div
        class="relative w-full overflow-hidden rounded-2xl shadow-soft dark:shadow-soft-dark group border border-border"
      >
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"
        ></div>
        <div
          class="h-52 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          :style="{ backgroundImage: `url(${dailyVerse.image})` }"
        ></div>
        <div class="absolute bottom-0 left-0 right-0 p-6 z-20">
          <div class="flex items-center gap-2 mb-2">
            <UIcon name="i-lucide-quote" class="text-primary text-xl" />
            <span
              class="text-white/90 text-xs font-bold uppercase tracking-widest"
              >Daily Verse</span
            >
          </div>
          <p class="text-white text-2xl font-bold leading-snug mb-1">
            {{ dailyVerse.fullText }}
          </p>
          <p class="text-primary text-base font-semibold mt-2">
            {{ dailyVerse.reference }}
          </p>
        </div>
      </div>
    </section>

    <!-- Quick Actions -->
    <section class="px-5 mt-8">
      <div class="grid grid-cols-4 gap-4">
        <button
          v-for="action in quickActions"
          :key="action.id"
          class="flex flex-col items-center gap-2 group"
          @click="handleActionClick(action)"
        >
          <div
            class="size-16 rounded-2xl bg-card flex items-center justify-center shadow-soft-sm dark:shadow-none group-active:scale-95 transition-all border border-border"
          >
            <UIcon
              :name="getIconName(action.icon)"
              class="text-primary text-3xl"
              :class="{ 'fill-current': action.filled }"
            />
          </div>
          <span class="text-xs font-semibold text-muted-foreground">{{
            action.label
          }}</span>
        </button>
      </div>
    </section>

    <!-- Today's Focus -->
    <section class="px-5 mt-10">
      <div class="flex items-center justify-between mb-5 px-1">
        <h2 class="text-2xl font-bold tracking-tight">Today's Focus</h2>
        <UBadge
          color="white"
          variant="solid"
          class="font-bold text-muted-foreground shadow-sm border border-border"
        >
          {{ pendingTasksCount }} Pending
        </UBadge>
      </div>
      <div class="flex flex-col gap-4">
        <div
          v-for="task in todaysTasks"
          :key="task.id"
          class="relative flex items-center gap-4 p-5 rounded-2xl bg-card shadow-soft dark:shadow-soft-dark border border-border cursor-pointer group active:scale-[0.98] transition-all"
          @click="task.completed = !task.completed"
        >
          <div class="relative flex items-center" @click.stop>
            <UCheckbox v-model="task.completed" color="primary" />
          </div>
          <div class="flex-1">
            <p
              class="text-lg font-bold transition-all duration-300"
              :class="
                task.completed
                  ? 'text-muted-foreground line-through'
                  : 'text-foreground'
              "
            >
              {{ task.title }}
            </p>
            <div class="flex items-center gap-2 mt-1">
              <UIcon
                :name="getIconName(task.icon)"
                class="text-muted-foreground text-sm"
              />
              <p class="text-sm text-muted-foreground">
                <span v-if="task.time">{{ task.time }} • </span
                >{{ task.location }}
              </p>
            </div>
          </div>
          <div
            v-if="task.priority"
            class="px-3 py-1 bg-primary/20 rounded-full border border-primary/20"
          >
            <p class="text-xs font-bold text-primary">Priority</p>
          </div>
          <div
            v-else
            class="size-8 rounded-full bg-muted/50 flex items-center justify-center"
          >
            <UIcon
              name="i-lucide-chevron-right"
              class="text-muted-foreground text-xl"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Church News -->
    <section class="mt-10 mb-6">
      <div class="flex items-center justify-between px-6 mb-5">
        <h2 class="text-xl font-bold">Church News</h2>
        <UButton
          variant="link"
          color="primary"
          :padded="false"
          label="See All"
          class="font-bold hover:text-yellow-400"
          @click="seeAllNews"
        />
      </div>
      <div
        class="flex overflow-x-auto gap-4 px-5 pb-6 no-scrollbar snap-x snap-mandatory"
      >
        <div
          v-for="news in churchNews"
          :key="news.id"
          class="snap-start shrink-0 w-72 rounded-2xl bg-card shadow-soft dark:shadow-soft-dark overflow-hidden flex flex-col relative border border-border"
        >
          <div
            class="h-32 bg-cover bg-center"
            :style="{ backgroundImage: `url(${news.image})` }"
          ></div>
          <div class="p-4 flex-1 flex flex-col justify-center">
            <p
              class="text-xs text-primary font-bold uppercase mb-1 tracking-wider"
            >
              {{ news.category }}
            </p>
            <h3 class="font-bold text-lg">
              {{ news.title }}
            </h3>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
