<template>
  <section id="about">
    <div class="about-container">
      <div class="about-img">
        <img :src="abt" alt="About Me" />
      </div>
      <div class="about-text">
        <div class="vertical-label">
          <div class="line"></div>
          <a href="#skills" class="more-about-link">MORE ABOUT</a>
        </div>
        <h1 class="main-heading">
          A Passionate <br />
          Software Developer
        </h1>
        <p class="description">
          Motivated and detail-oriented fresh graduate with a solid foundation
          in computer science and hands-on experience in developing projects
          using modern technologies. Skilled in programming, problem-solving,
          and collaborating in team environments. Eager to apply academic
          knowledge to real-world challenges, grow professionally, and
          contribute to innovative solutions in the tech industry.
        </p>
        <div class="button-group">
          <!-- <a href="#projects" class="cta primary">See Projects</a> -->
          <a href="Romeo Resume (4).pdf" target="_blank" class="cta secondary"
            >Resume</a
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import abt from "../assets/abt.jpg";
</script>

<style scoped>
#about {
  background-color: rgba(0, 0, 0, 0);
  padding: 80px 20px;
  position: relative;
  z-index: 1;
  min-height: 100vh;
}

.about-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  gap: 30px;
}

.about-img {
  width: 100%;
  max-width: 288px;
  display: flex;
  justify-content: center;
}

.about-img img {
  width: 100%;
  height: 384px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  display: block;
}

.about-text {
  width: 100%;
  max-width: 600px;
  text-align: center;
  position: relative;
}

.about-text p{
  text-align: justify;
}

.vertical-label {
  margin-left: -30px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: -24px;
  font-size: 0.875rem;
  letter-spacing: 0.15rem;
  color: #ffffff;
}

.vertical-label .line {
  width: 64px;
  height: 2px;
  background-color: #ffffff;
}

.main-heading {
  font-size: 1.875rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 20px;
  margin-top: 0;
  margin-left: 20px;
  padding-left: 40px;
  color: #ffffff;
}

.description {
  color: #d1d5db;
  margin-bottom: 24px;
  font-size: 0.875rem;
  line-height: 1.6;
  max-width: 672px;
  margin-left: auto;
  margin-right: auto;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
}

.about-text .cta {
  display: inline-block;
  padding: 10px 16px;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: none;
  letter-spacing: 0.05rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  text-decoration: none;
  text-align: center;
}

.cta.primary {
  background-color: crimson;
  color: #ffffff;
  border: 2px solid crimson;
}

.cta.primary:hover {
  background-color: rgba(220, 20, 60, 0.8);
}

.cta.secondary {
  background-color: transparent;
  color: #ffffff;
  border: 2px solid crimson;
}

.cta.secondary:hover {
  background-color: rgba(220, 20, 60, 0.1);
}

/* Mobile devices (iPhone 14 Pro and similar) */
@media (max-width: 767px) {
  #about {
    padding: 60px 16px;
    min-height: auto;
  }

  .about-container {
    gap: 24px;
  }

  .about-img {
    max-width: 240px;
  }

  .about-img img {
    height: 320px;
    border-radius: 12px;
  }

  .about-text {
    max-width: 100%;
    padding: 0 8px;
  }

  .about-text p {
    max-width: 100%;
    text-align: justify;
  }

  .vertical-label {
    top: -40px;
    font-size: 0.75rem;
    letter-spacing: 0.1rem;
  }

  .more-about-link {
    margin-top: 30px;
    font-size: 20px;
    text-align: left;
    white-space: nowrap; /* prevents wrapping */
    color: crimson;
  }

  .vertical-label .line {
    width: 48px;
    margin-top: 15px;
  }

  .main-heading {
    font-size: 1.75rem;
    margin-left: 0;
    padding-left: 20px;
    margin-bottom: 16px;
    margin-top: 20px;
  }

  .description {
    font-size: 0.8125rem;
    line-height: 1.5;
    margin-bottom: 20px;
    padding: 0 4px;
  }

  .button-group {
    gap: 12px;
  }

  .about-text .cta {
    padding: 12px 20px;
    font-size: 0.8125rem;
  }
}

/* Tablet and Desktop layout */
@media (min-width: 768px) {
  #about {
    padding: 64px 24px;
    display: flex;
    align-items: center;
  }

  .about-container {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 32px;
  }

  .about-img {
    width: 41.666667%;
    max-width: none;
    display: flex;
    justify-content: flex-end;
  }

  .about-img img {
    width: 320px;
    height: 384px;
  }

  .about-text {
    width: 58.333333%;
    max-width: none;
    text-align: left;
    position: relative;
  }

  .vertical-label {
    position: absolute;
    left: -64px;
    top: 24px;
    transform: rotate(-90deg);
    transform-origin: center;
    justify-content: flex-start;
  }

  .main-heading {
    font-size: 3rem;
    padding-left: 0;
  }

  .description {
    font-size: 1rem;
    margin-left: 0;
    margin-right: 0;
  }

  .button-group {
    flex-direction: row;
    justify-content: flex-start;
  }
}

@media (min-width: 1024px) {
  .about-img img {
    width: 384px;
  }

  .vertical-label {
    top: 0;
  }
}
</style>
