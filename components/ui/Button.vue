<script setup lang="ts">
defineProps({
  text: {
    type: String,
  },
  color: {
    type: String,
  },
});

const emit = defineEmits(["click"]);
const onClick = () => {
  emit("click");
};
</script>
<template>
  <button
    :class="`${color} text-white px-4 py-2 rounded-md m-1`"
    @click="onClick"
  >
    <slot />
    {{ text }}
  </button>
</template>
