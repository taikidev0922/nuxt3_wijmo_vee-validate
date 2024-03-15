<template>
  <div class="top-page">
    <h1>Welcome to Our Website</h1>
    <p>Explore our features and enjoy your stay.</p>
    <nuxt-link to="/login">Login</nuxt-link> |
    <nuxt-link to="/register">Register</nuxt-link>
  </div>
</template>

<script setup lang="ts">
// Script setup block is empty for now
</script>

<style scoped>
.top-page {
  text-align: center;
  margin-top: 50px;
}
</style>
