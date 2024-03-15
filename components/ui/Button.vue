<script setup lang="ts">
defineProps({
  text: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["click"]);
const onClick = () => {
  emit("click");
};
</script>
<template>
  <button
    class="bg-blue-500 text-white px-4 py-2 rounded-md m-1"
    @click="onClick"
  >
    {{ text }}
  </button>
</template>
