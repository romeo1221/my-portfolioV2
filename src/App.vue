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
import { onMounted } from "vue";

onMounted(() => {
  // Set viewport height CSS variable for mobile browsers
  const setVH = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  setVH();

  // Update on resize and orientation change
  window.addEventListener("resize", setVH);
  window.addEventListener("orientationchange", setVH);
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");

/* CSS Variables for responsive design */
:root {
  --vh: 1vh;
  --header-height: 70px;
}

/* Reset and base styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* Prevent horizontal scroll on mobile */
  overflow-x: hidden;
}

body {
  margin: 0;
  padding: 0;
  background: #000;
  color: #fff;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  width: 100%;
  min-height: 100vh;
  /* Use custom property for mobile viewport */
  min-height: calc(var(--vh, 1vh) * 100);
  overflow-x: hidden;
  position: relative;
}

#app {
  position: relative;
  z-index: 1;
  width: 100%;
  min-height: 100vh;
  min-height: calc(var(--vh, 1vh) * 100);
  overflow-x: hidden;
}

/* Prevent text selection on buttons and interactive elements */
button,
a {
  -webkit-tap-highlight-color: transparent;
  user-select: none;
}

/* Improve touch targets on mobile */
@media (max-width: 768px) {
  a,
  button,
  input,
  select,
  textarea {
    min-height: 44px;
    min-width: 44px;
  }
}

/* iPhone 12 Pro specific optimizations */
@media (max-width: 428px) {
  :root {
    --header-height: 60px;
  }

  body {
    /* Prevent zoom on input focus */
    -webkit-text-size-adjust: 100%;
  }

  /* Optimize scrolling performance */
  * {
    -webkit-overflow-scrolling: touch;
  }
}

/* Safe area handling for notched devices */
@supports (padding: max(0px)) {
  body {
    padding-left: max(0px, env(safe-area-inset-left));
    padding-right: max(0px, env(safe-area-inset-right));
    padding-bottom: max(0px, env(safe-area-inset-bottom));
  }
}

/* Landscape mode optimization for mobile */
@media (max-width: 768px) and (orientation: landscape) {
  body {
    min-height: 100vh;
  }

  #app {
    min-height: 100vh;
  }
}

/* Performance optimizations */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Dark mode support (optional) */
@media (prefers-color-scheme: dark) {
  body {
    color-scheme: dark;
  }
}

/* Loading state optimization */
#app {
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
}

/* Smooth font rendering */
body {
  text-rendering: optimizeLegibility;
  font-feature-settings: "kern" 1;
}

/* Scrollbar styling for webkit browsers */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #0a0a0a;
}

::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Mobile scrollbar */
@media (max-width: 768px) {
  ::-webkit-scrollbar {
    width: 4px;
  }
}
</style>
