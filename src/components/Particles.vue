<template>
  <div class="particles-bg">
    <div
      v-for="(particle, index) in particles"
      :key="index"
      class="circle-container"
      :style="particle.containerStyle"
    >
      <div class="circle" :style="particle.circleStyle"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

function random(min, max) {
  return Math.random() * (max - min) + min;
}

// Adjust particle count based on screen size
function getParticleCount() {
  const width = window.innerWidth;
  if (width <= 428) return 40; // iPhone 12 Pro and smaller
  if (width <= 768) return 60; // Tablets
  return 100; // Desktop
}

// Adjust particle size based on screen size
function getParticleSize() {
  const width = window.innerWidth;
  if (width <= 428) {
    return { min: 3, max: 8 }; // Smaller particles for mobile
  }
  if (width <= 768) {
    return { min: 4, max: 10 };
  }
  return { min: 5, max: 12 }; // Desktop
}

const particles = ref([]);

function initParticles() {
  const tempParticles = [];
  const PARTICLE_COUNT = getParticleCount();
  const { min: sizeMin, max: sizeMax } = getParticleSize();

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const size = random(sizeMin, sizeMax);
    const startX = random(0, 100);
    const startY = random(100, 120);
    const endX = random(0, 100);
    const endY = random(-20, -60);
    const duration = random(7, 12);
    const delay = random(0, 10);

    const containerStyle = {
      width: `${size}px`,
      height: `${size}px`,
      animation: `move-${i} ${duration}s linear ${delay}s infinite`,
      position: "absolute",
      top: "0",
      left: "0",
    };

    const circleStyle = {
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      mixBlendMode: "screen",
      backgroundImage:
        "radial-gradient(hsl(180, 100%, 80%), hsl(180,100%,80%) 10%, hsla(180,100%,80%,0) 56%)",
      animation: `fade-frames 0.2s infinite, scale-frames 2s infinite`,
      animationDelay: `${random(0, 4)}s`,
    };

    // Add dynamic keyframes for upward movement
    const styleSheet = document.styleSheets[0];
    const keyframes = `
      @keyframes move-${i} {
        0% { transform: translate3d(${startX}vw, ${startY}vh, 0); }
        100% { transform: translate3d(${endX}vw, ${endY}vh, 0); }
      }
    `;
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

    tempParticles.push({ containerStyle, circleStyle });
  }
  particles.value = tempParticles;
}

onMounted(() => {
  initParticles();

  // Optional: Reinitialize on resize (with debounce)
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // Clear old particles and reinitialize
      particles.value = [];
      setTimeout(initParticles, 50);
    }, 500);
  });
});
</script>

<style scoped>
.particles-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1; /* behind everything */
  background-image: radial-gradient(#021027, #000000);
  overflow: hidden;
}

.circle-container {
  transform: translateY(-10vh);
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  will-change: transform;
}

.circle {
  will-change: transform, opacity;
}

@keyframes fade-frames {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
  100% {
    opacity: 1;
  }
}

@keyframes scale-frames {
  0% {
    transform: scale3d(0.4, 0.4, 1);
  }
  50% {
    transform: scale3d(2.2, 2.2, 1);
  }
  100% {
    transform: scale3d(0.4, 0.4, 1);
  }
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .particles-bg {
    /* Slightly reduce opacity on mobile for better readability */
    opacity: 0.9;
  }
}

@media (max-width: 428px) {
  .particles-bg {
    /* Further reduce on small screens */
    opacity: 0.85;
  }

  @keyframes scale-frames {
    0% {
      transform: scale3d(0.3, 0.3, 1);
    }
    50% {
      transform: scale3d(1.8, 1.8, 1);
    }
    100% {
      transform: scale3d(0.3, 0.3, 1);
    }
  }
}

/* Performance optimization for low-end devices */
@media (prefers-reduced-motion: reduce) {
  .circle-container,
  .circle {
    animation: none !important;
  }

  .particles-bg {
    background-image: radial-gradient(#021027, #000000);
  }
}
</style>
