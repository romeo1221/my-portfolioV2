<template>
  <div id="app">
    <!-- Global particle background -->
    <Particles />

    <!-- All routed pages on top -->
    <router-view />
  </div>
</template>

<script setup>
import Particles from "./components/Particles.vue";
</script>

<style>
#app {
  position: relative;
  z-index: 1; /* ensures routed content is above particles */
}
</style>
