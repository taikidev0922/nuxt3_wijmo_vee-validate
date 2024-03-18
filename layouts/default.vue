<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
const { logout } = useSanctumAuth();
const { isLoading } = useLoading();
const isDrawerOpen = ref(false);

function toggleDrawer() {
  isDrawerOpen.value = !isDrawerOpen.value;
}

function closeDrawer() {
  isDrawerOpen.value = false;
}

onMounted(() => {
  window.addEventListener("click", closeDrawer);
});

onUnmounted(() => {
  window.removeEventListener("click", closeDrawer);
});
</script>
<template>
  <div class="bg-slate-100 h-full absolute w-full">
    <div
      v-if="isLoading"
      class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center"
    >
      <div class="text-white font-bold text-xl animate-pulse">Loading...</div>
    </div>
    <header class="bg-gray-800 text-white flex justify-between items-center">
      <button @click.stop="toggleDrawer" class="p-2">
        <Icon name="mdi:menu" color="white" size="30" />
      </button>
      <p class="text-xl">test</p>
      <Button text="logout" @click="logout">
        <Icon name="mdi:logout" color="white" size="30" />
      </Button>
    </header>
    <aside
      :class="`${isDrawerOpen ? 'w-60' : 'w-0'} absolute h-full bg-gray-800 z-50 transition-all duration-500 overflow-hidden`"
      @click.stop
      self
    >
      <nav class="pl-2">
        <ul>
          <li>
            <NuxtLink to="/" class="hover:text-gray-300 text-white"
              >Home</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="/villages" class="hover:text-gray-300 text-white"
              >村</NuxtLink
            >
          </li>
        </ul>
      </nav>
    </aside>
    <main
      :class="`${isDrawerOpen ? 'ml-60' : ''} transition-all duration-500 px-4 pt-2`"
    >
      <slot />
    </main>
  </div>
</template>
