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

const PARTICLE_COUNT = 100;
const particles = ref([]);

onMounted(() => {
    const tempParticles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const size = random(5, 12);
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
</style>
