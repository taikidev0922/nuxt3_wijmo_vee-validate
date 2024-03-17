<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
const { logout } = useSanctumAuth();
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
  <div>
    <header class="bg-gray-800 text-white flex justify-between items-center">
      <button @click.stop="toggleDrawer" class="p-2">
        <Button>
          <div icon="bars" />
        </Button>
      </button>
      <p class="text-xl">サンプル販売管理システム</p>
      <Button text="logout" @click="logout">
        <div icon="sign-out-alt" />
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
            <NuxtLink to="/" class="hover:text-gray-300">Home</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/villages" class="hover:text-gray-300">村</NuxtLink>
          </li>
        </ul>
      </nav>
    </aside>
    <main
      :class="`${isDrawerOpen ? 'ml-60' : ''} transition-all duration-500 p-4`"
    >
      <slot />
    </main>
  </div>
</template>
