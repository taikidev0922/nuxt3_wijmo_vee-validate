<script setup lang="ts">
const { logout } = useSanctumAuth();
definePageMeta({
  middleware: ["sanctum:auth"],
});
</script>
<template>
  <div>
    <p>Some default layout content shared across all pages</p>
    <Button text="logout" @click="logout" />
    <slot />
  </div>
</template>
