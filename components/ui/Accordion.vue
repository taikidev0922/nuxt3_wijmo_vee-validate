<script setup lang="ts">
defineProps({
  title: String,
});
const isCardOpen = ref(true);
const toggleSearch = () => {
  isCardOpen.value = !isCardOpen.value;
};
</script>
<template>
  <section class="border p-1 rounded-sm my-2 border-gray-400 bg-white">
    <div class="flex mb-1">
      <h2 class="text-sm text-gray-500">{{ title }}</h2>
      <button class="flex items-center" @click="toggleSearch">
        <Icon :name="`mdi:chevron-${isCardOpen ? 'up' : 'down'}`" />
      </button>
    </div>
    <div v-show="isCardOpen" class="px-1">
      <slot />
    </div>
  </section>
</template>
