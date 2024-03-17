<script setup lang="ts">
defineProps({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "black",
  },
  size: {
    type: String,
    default: "20px",
  },
});
</script>
<template>
  <Icon :name="name" :size="size" :color="color" />
</template>
