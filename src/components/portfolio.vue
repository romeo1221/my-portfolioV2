<template>
  <div class="app">
    <header :class="{ hide: hideNavbar, scrolled: isScrolled }">
      <transition name="fade-slide">
        <h1 v-if="showTitle" class="logo">{{ typedTitle }}</h1>
      </transition>
      <div class="menu-toggle" @click="toggleMenu">
        <span :class="{ open: menuOpen }"></span>
        <span :class="{ open: menuOpen }"></span>
        <span :class="{ open: menuOpen }"></span>
      </div>
      <nav :class="{ open: menuOpen }">
        <router-link
          to="/about"
          @click.native="menuOpen = false"
          class="nav-link"
        >
          <span class="nav-text">About</span>
          <span class="nav-hover-effect"></span>
        </router-link>
        <router-link
          to="/projects"
          @click.native="menuOpen = false"
          class="nav-link"
        >
          <span class="nav-text">Projects</span>
          <span class="nav-hover-effect"></span>
        </router-link>
        <router-link
          to="/skills"
          @click.native="menuOpen = false"
          class="nav-link"
        >
          <span class="nav-text">Skills</span>
          <span class="nav-hover-effect"></span>
        </router-link>
        <router-link
          to="/contact"
          @click.native="menuOpen = false"
          class="nav-link"
        >
          <span class="nav-text">Contact</span>
          <span class="nav-hover-effect"></span>
        </router-link>
      </nav>
    </header>

    <!-- Hero section -->
    <section id="hero">
      <div class="hero-content">
        <h1>Hello, <span></span></h1>
        <h1>Welcome to <span></span></h1>
        <h1>My Portfolio<span></span></h1>
        <a href="#contact" type="button" class="cta">Contact me!</a>
      </div>
    </section>

    <main>
      <About />
      <Project />
      <Skill />
      <Contact />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import About from "./about.vue";
import Contact from "./contact.vue";
import Project from "./projects.vue";
import Skill from "./skills.vue";

const menuOpen = ref(false);
const showTitle = ref(false);
const typedTitle = ref("");
const fullTitle = "Romeo's Portfolio V2";
const hideNavbar = ref(false);
const isScrolled = ref(false);

let lastScrollTop = 0;

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}

onMounted(() => {
  // Typewriter effect
  showTitle.value = true;
  let i = 0;
  function typeWriter() {
    if (i < fullTitle.length) {
      typedTitle.value += fullTitle.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  }
  typeWriter();

  // Scroll effects
  window.addEventListener("scroll", () => {
    const st = window.pageYOffset || document.documentElement.scrollTop;

    // Add background blur when scrolled
    isScrolled.value = st > 50;

    // Optional: Hide navbar on scroll down
    // if (st > lastScrollTop && st > 100) {
    //   hideNavbar.value = true;
    // } else {
    //   hideNavbar.value = false;
    // }
    // lastScrollTop = st <= 0 ? 0 : st;
  });
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");

html {
  scroll-behavior: smooth;
}

html,
body {
  margin: 0;
  padding: 0;
  background: #000;
  color: #fff;
  font-family: "Inter", sans-serif;
  width: 100%;
  min-height: 100%;
}

* {
  box-sizing: border-box;
}

/* Header */
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(10, 10, 10, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 50px;
  z-index: 999;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

header.scrolled {
  background: rgba(10, 10, 10, 0.95);
  padding: 15px 50px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

header.hide {
  transform: translateY(-100%);
}

/* Logo animation */
.logo {
  font-size: 1.5em;
  letter-spacing: 1px;
  margin: 0;
  background: linear-gradient(135deg, #fff 0%, #aaa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  animation: logoSlideIn 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes logoSlideIn {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Navigation */
nav {
  display: flex;
  gap: 10px;
  transition: all 0.3s ease;
}

.nav-link {
  color: #f2f2f2;
  text-decoration: none;
  font-size: 1em;
  font-weight: 500;
  position: relative;
  padding: 10px 20px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 8px;
  animation: navLinkFadeIn 0.6s ease-out backwards;
}

.nav-link:nth-child(1) {
  animation-delay: 0.1s;
}
.nav-link:nth-child(2) {
  animation-delay: 0.2s;
}
.nav-link:nth-child(3) {
  animation-delay: 0.3s;
}
.nav-link:nth-child(4) {
  animation-delay: 0.4s;
}

@keyframes navLinkFadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.nav-text {
  position: relative;
  z-index: 2;
  transition: color 0.3s ease;
}

/* Hover effect background */
.nav-hover-effect {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(105, 97, 155, 0.2),
    rgba(27, 17, 112, 0.2)
  );
  transition: left 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1;
  border-radius: 8px;
}

.nav-link:hover .nav-hover-effect {
  left: 0;
}

.nav-link:hover {
  color: #cee0eb;
  background: rgba(255, 255, 255, 0.05);
  transform: translateY(-2px);
}

.nav-link:hover .nav-text {
  text-shadow: 0 0 20px rgba(0, 225, 255, 0.5);
}

/* Active link indicator */
.nav-link::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  width: 80%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #f3f3ee, transparent);
  transition: transform 0.3s ease;
}

.nav-link:hover::before {
  transform: translateX(-50%) scaleX(1);
}

/* Hamburger menu */
.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 28px;
  height: 20px;
  cursor: pointer;
  z-index: 1001;
}

.menu-toggle span {
  display: block;
  height: 3px;
  width: 100%;
  background: linear-gradient(90deg, #f2f2f2, #442675);
  border-radius: 3px;
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  box-shadow: 0 2px 10px rgba(255, 255, 0, 0.3);
}

.menu-toggle:hover span {
  background: linear-gradient(90deg, #473d9b, #f2f2f2);
}

.menu-toggle span.open:nth-child(1) {
  transform: rotate(45deg) translate(7px, 7px);
}
.menu-toggle span.open:nth-child(2) {
  opacity: 0;
  transform: translateX(20px);
}
.menu-toggle span.open:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -7px);
}

/* Hero section */
#hero {
  /* background: url("me.PNG") no-repeat; */
  background-size: cover;
  background-position: top center;
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
#hero::after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0);
  opacity: 0.7;
  z-index: -1;
}
#hero .hero-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  margin-top: 100px;
}

#hero h1 {
  margin-top: 10px;
  margin-bottom: 10px;
  display: block;
  width: fit-content;
  font-size: 4rem;
  position: relative;
  color: transparent;
  animation: text_reveal 0.5s ease forwards;
}
#hero h1:nth-child(1) {
  animation-delay: 1s;
}
#hero h1:nth-child(2) {
  animation-delay: 2s;
}
#hero h1:nth-child(3) {
  animation: text_reveal_name 0.5s ease forwards;
  animation-delay: 3s;
}
#hero h1 span {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 0;
  background-color: crimson;
  animation: text_reveal_box 1s ease;
}
#hero h1:nth-child(1) span {
  animation-delay: 0.5s;
}
#hero h1:nth-child(2) span {
  animation-delay: 1.5s;
}
#hero h1:nth-child(3) span {
  animation-delay: 2.5s;
}
.cta {
  display: inline-block;
  padding: 10px 30px;
  color: white;
  background-color: transparent;
  border: 2px solid crimson;
  font-size: 2rem;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  margin-top: 30px;
  text-decoration: none;
  transition: all 0.3s ease;
}
.cta:hover {
  color: white;
  background-color: crimson;
  box-shadow: 0 0 30px rgba(220, 20, 60, 0.6);
  transform: translateY(-3px);
}

/* Hero animations */
@keyframes text_reveal_box {
  50% {
    width: 100%;
    left: 0;
  }
  100% {
    width: 0;
    left: 100%;
  }
}
@keyframes text_reveal {
  100% {
    color: white;
  }
}
@keyframes text_reveal_name {
  100% {
    color: crimson;
    font-weight: 500;
  }
}

/* Fade slide transition */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.5s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* Mobile nav */
@media (max-width: 768px) {
  header {
    padding: 15px 20px;
  }

  .logo {
    font-size: 1.2em;
  }

  .menu-toggle {
    display: flex;
  }

  nav {
    position: absolute;
    top: 70px;
    right: 20px;
    flex-direction: column;
    background: rgba(10, 10, 10, 0.98);
    backdrop-filter: blur(20px);
    width: 200px;
    padding: 20px;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    transform: translateY(-20px) scale(0.95);
    opacity: 0;
    pointer-events: none;
    transition: all 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  }

  nav.open {
    transform: translateY(0) scale(1);
    opacity: 1;
    pointer-events: auto;
  }

  .nav-link {
    margin: 5px 0;
    padding: 12px 15px;
  }

  #hero {
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 0 20px;
  }

  #hero .hero-content {
    margin-top: 0;
    margin-left: 0;
    align-items: center;
    width: 100%;
  }

  #hero h1 {
    font-size: 2.5rem;
    text-align: center;
  }

  .cta {
    font-size: 1.5rem;
    padding: 8px 20px;
  }
}

/* iPhone 12 Pro and similar devices (390px - 428px) */
@media (max-width: 428px) {
  header {
    padding: 12px 16px;
  }

  .logo {
    font-size: 1em;
    max-width: 60%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  nav {
    top: 60px;
    right: 16px;
    width: calc(100vw - 32px);
    max-width: 280px;
  }

  #hero {
    min-height: 100vh;
    min-height: 100dvh; /* Dynamic viewport height for mobile browsers */
    padding: 0 16px;
  }

  #hero .hero-content {
    max-width: 100%;
  }

  #hero h1 {
    font-size: 2rem;
    margin-top: 8px;
    margin-bottom: 8px;
    word-wrap: break-word;
  }

  .cta {
    font-size: 1.2rem;
    padding: 10px 24px;
    margin-top: 20px;
    white-space: nowrap;
  }
}

/* Extra small devices (iPhone SE, etc.) */
@media (max-width: 375px) {
  .logo {
    font-size: 0.9em;
  }

  #hero h1 {
    font-size: 1.75rem;
  }

  .cta {
    font-size: 1rem;
    padding: 8px 20px;
  }
}
</style>
