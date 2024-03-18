<script setup lang="ts">
defineProps({
  text: {
    type: String,
  },
  color: {
    type: String,
  },
  disabled: {
    type: Boolean,
  },
});

const emit = defineEmits(["click"]);
const onClick = () => {
  emit("click");
};
</script>
<template>
  <button
    :class="`${color} text-white px-4 py-1 rounded-md m-1`"
    @click="onClick"
    :disabled="disabled"
  >
    <slot />
    {{ text }}
  </button>
</template>
