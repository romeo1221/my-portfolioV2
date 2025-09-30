<template>
  <section id="skills" ref="skillsSection">
    <h1 class="section-title">About My Skills & Journey</h1>

    <!-- Tab Navigation -->
    <div class="tab-navigation">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        class="tab-box"
        :class="{ active: activeTab === index, visible: tabsVisible[index] }"
        @click="setActiveTab(index)"
        ref="tabRefs"
      >
        <div class="tab-icon">{{ tab.icon }}</div>
        <h3 class="tab-title">{{ tab.title }}</h3>
        <p class="tab-description">{{ tab.description }}</p>
      </div>
    </div>

    <!-- Content Area -->
    <div class="content-area">
      <div v-if="activeTab === null" class="no-selection">
        <p class="no-selection-text">👆 Select a tab above to explore</p>
      </div>

      <Transition name="slide-fade" mode="out-in">
        <!-- Technical Skills -->
        <div v-if="activeTab === 0" key="skills" class="content-section">
          <div class="skill-categories">
            <div
              v-for="(category, catIndex) in skillCategories"
              :key="catIndex"
              class="skill-category"
              :class="{ visible: categoriesVisible[catIndex] }"
              ref="categoryRefs"
            >
              <div class="category-header">
                <div class="category-icon">{{ category.icon }}</div>
                <h3 class="category-title">{{ category.title }}</h3>
              </div>
              <div class="category-skills">
                <div
                  v-for="(skill, skillIndex) in category.skills"
                  :key="skillIndex"
                  class="skill-item"
                >
                  <div
                    v-if="skill.icon.startsWith('http')"
                    class="skill-icon-wrapper"
                  >
                    <img
                      :src="skill.icon"
                      :alt="skill.name + ' icon'"
                      class="skill-icon"
                    />
                  </div>
                  <div v-else class="skill-emoji-wrapper">
                    <div class="skill-emoji">{{ skill.icon }}</div>
                  </div>
                  <span class="skill-name">{{ skill.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Hobbies & Interests -->
        <div v-else-if="activeTab === 1" key="hobbies" class="content-section">
          <div class="hobbies-grid">
            <div
              v-for="(hobby, index) in hobbies"
              :key="index"
              class="hobby-item"
              :class="{ visible: hobbiesVisible[index] }"
              ref="hobbyRefs"
            >
              <div class="hobby-icon">{{ hobby.icon }}</div>
              <h3 class="hobby-name">{{ hobby.name }}</h3>
              <p class="hobby-description">{{ hobby.description }}</p>
            </div>
          </div>
        </div>

        <!-- Achievements & Certificates -->
        <div
          v-else-if="activeTab === 2"
          key="achievements"
          class="content-section"
        >
          <div class="achievements-grid">
            <div
              v-for="(achievement, index) in achievements"
              :key="index"
              class="achievement-badge"
              :class="{ visible: achievementsVisible[index] }"
              ref="achievementRefs"
            >
              <div class="badge-icon">{{ achievement.icon }}</div>
              <div class="badge-content">
                <h3 class="badge-title">{{ achievement.title }}</h3>
                <p class="badge-description">{{ achievement.description }}</p>
                <span class="badge-year">{{ achievement.year }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Developer Timeline -->
        <div v-else-if="activeTab === 3" key="timeline" class="content-section">
          <div class="timeline">
            <div
              v-for="(milestone, index) in timeline"
              :key="index"
              class="timeline-item"
              :class="{ visible: timelineVisible[index] }"
              ref="timelineRefs"
            >
              <div class="timeline-marker"></div>
              <div class="timeline-content">
                <div class="timeline-year">{{ milestone.year }}</div>
                <h3 class="timeline-title">{{ milestone.title }}</h3>
                <p class="timeline-description">{{ milestone.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from "vue";

const activeTab = ref(null);
const tabsVisible = ref([]);
const categoriesVisible = ref([]);
const hobbiesVisible = ref([]);
const achievementsVisible = ref([]);
const timelineVisible = ref([]);

const tabRefs = ref([]);
const categoryRefs = ref([]);
const hobbyRefs = ref([]);
const achievementRefs = ref([]);
const timelineRefs = ref([]);

const tabs = [
  {
    title: "Technical Skills",
    icon: "💻",
    description: "Programming languages, frameworks & tools I use",
  },
  {
    title: "Hobbies & Interests",
    icon: "🎯",
    description: "What I enjoy doing outside of coding",
  },
  {
    title: "Achievements & Certificates",
    icon: "🏆",
    description: "My accomplishments and certifications",
  },
  {
    title: "My Developer Journey",
    icon: "🚀",
    description: "Timeline of my growth as a developer",
  },
];

const skillCategories = [
  {
    title: "Frontend Skills",
    icon: "🎨",
    skills: [
      {
        name: "HTML5",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
      },
      {
        name: "CSS3",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
      },
      {
        name: "JavaScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
      },
      {
        name: "Vue.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg",
      },
    ],
  },
  {
    title: "Backend Skills",
    icon: "⚙️",
    skills: [
      {
        name: "PHP",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg",
      },
      {
        name: "Laravel",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg",
      },
      {
        name: "Node.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
      },
    ],
  },
  {
    title: "Programming Languages",
    icon: "💻",
    skills: [
      {
        name: "Python",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
      },
      {
        name: "C++",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
      },
      {
        name: "Java",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
      },
      {
        name: "TypeScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg",
      },
    ],
  },
  {
    title: "Databases",
    icon: "🗄️",
    skills: [
      {
        name: "MySQL",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
      },
      {
        name: "SQLite",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg",
      },
    ],
  },
  {
    title: "Technical Tools",
    icon: "🛠️",
    skills: [
      {
        name: "Git",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
      },
      {
        name: "Docker",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
      },
      {
        name: "VS Code",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg",
      },
      {
        name: "Figma",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
      },
      {
        name: "DBeaver",
        icon: "https://dbeaver.io/wp-content/uploads/2015/09/beaver-head.png",
      },
    ],
  },
  {
    title: "Soft Skills",
    icon: "🧠",
    skills: [
      {
        name: "Problem Solving",
        icon: "🔍",
      },
      {
        name: "Team Collaboration",
        icon: "👥",
      },
      {
        name: "Project Management",
        icon: "📋",
      },
      {
        name: "Communication",
        icon: "💬",
      },
      {
        name: "Critical Thinking",
        icon: "🎯",
      },
      {
        name: "Adaptability",
        icon: "🔄",
      },
    ],
  },
];

const hobbies = [
  {
    name: "Gaming",
    icon: "🎮",
    description: "Exploring virtual worlds and problem-solving through games",
  },
  {
    name: "Music",
    icon: "🎵",
    description: "Playing instruments and discovering new artists",
  },

  {
    name: "Reading",
    icon: "📚",
    description: "Diving into tech blogs, fiction, and non-fiction books",
  },

  {
    name: "Learning",
    icon: "📚",
    description: "Always exploring new technologies and programming languages",
  },
];

const achievements = [
  {
    title: "Laravel Certification",
    description: "Completed Computer Science course",
    year: "2025",
    icon: "🎓",
  },
];

const timeline = [
  {
    year: "2021",
    title: "Started Programming Journey",
    description: "Began learning Basic Programming fundamentals",
  },
  {
    year: "2022",
    title: "Backend Development",
    description: "Dove into PHP and MySQL, built first dynamic websites",
  },
  {
    year: "2023",
    title: "Full-Stack Projects",
    description: "Built complete applications from database to frontend",
  },
  {
    year: "2024",
    title: "Deep Learning Model Development",
    description:
      "Trained, validated, and deployed a cutting-edge deep learning model for image classification.",
  },
  {
    year: "2025",
    title: "Thesis project & Portfolio Launch",
    description: "Passed the Thesis defense & Created this portfolio and actively seeking opportunities",
  },
];

const setActiveTab = (index) => {
  activeTab.value = index;

  // Trigger animations immediately when tab is clicked
  if (index === 0 && categoriesVisible.value.length === 0) {
    // Technical Skills - first time clicked
    skillCategories.forEach((_, i) => {
      setTimeout(() => {
        categoriesVisible.value = [...categoriesVisible.value];
        categoriesVisible.value[i] = true;
      }, i * 150);
    });
  } else if (index === 1 && hobbiesVisible.value.length === 0) {
    // Hobbies - first time clicked
    hobbies.forEach((_, i) => {
      setTimeout(() => {
        hobbiesVisible.value = [...hobbiesVisible.value];
        hobbiesVisible.value[i] = true;
      }, i * 150);
    });
  } else if (index === 2 && achievementsVisible.value.length === 0) {
    // Achievements - first time clicked
    achievements.forEach((_, i) => {
      setTimeout(() => {
        achievementsVisible.value = [...achievementsVisible.value];
        achievementsVisible.value[i] = true;
      }, i * 150);
    });
  } else if (index === 3 && timelineVisible.value.length === 0) {
    // Timeline - first time clicked
    timeline.forEach((_, i) => {
      setTimeout(() => {
        timelineVisible.value = [...timelineVisible.value];
        timelineVisible.value[i] = true;
      }, i * 150);
    });
  }
};

const setupScrollObserver = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = parseInt(entry.target.dataset.index);
        const type = entry.target.dataset.type;

        setTimeout(() => {
          if (type === "tab") {
            tabsVisible.value = [...tabsVisible.value];
            tabsVisible.value[index] = true;
          } else if (type === "category") {
            categoriesVisible.value = [...categoriesVisible.value];
            categoriesVisible.value[index] = true;
          } else if (type === "hobby") {
            hobbiesVisible.value = [...hobbiesVisible.value];
            hobbiesVisible.value[index] = true;
          } else if (type === "achievement") {
            achievementsVisible.value = [...achievementsVisible.value];
            achievementsVisible.value[index] = true;
          } else if (type === "timeline") {
            timelineVisible.value = [...timelineVisible.value];
            timelineVisible.value[index] = true;
          }
        }, index * 100);
      }
    });
  }, observerOptions);

  return observer;
};

const observeElements = (observer) => {
  // Observe tabs
  tabRefs.value.forEach((el, index) => {
    if (el) {
      el.dataset.index = index;
      el.dataset.type = "tab";
      observer.observe(el);
    }
  });

  // Observe categories
  categoryRefs.value.forEach((el, index) => {
    if (el) {
      el.dataset.index = index;
      el.dataset.type = "category";
      observer.observe(el);
    }
  });

  // Observe hobbies
  hobbyRefs.value.forEach((el, index) => {
    if (el) {
      el.dataset.index = index;
      el.dataset.type = "hobby";
      observer.observe(el);
    }
  });

  // Observe achievements
  achievementRefs.value.forEach((el, index) => {
    if (el) {
      el.dataset.index = index;
      el.dataset.type = "achievement";
      observer.observe(el);
    }
  });

  // Observe timeline
  timelineRefs.value.forEach((el, index) => {
    if (el) {
      el.dataset.index = index;
      el.dataset.type = "timeline";
      observer.observe(el);
    }
  });
};

let observer = null;

onMounted(() => {
  observer = setupScrollObserver();
  observeElements(observer);

  // Initialize all content as hidden - no tab active by default
  categoriesVisible.value = [];
  hobbiesVisible.value = [];
  achievementsVisible.value = [];
  timelineVisible.value = [];
});

watch(activeTab, async (newTab) => {
  // Reset visibility first
  categoriesVisible.value = [];
  hobbiesVisible.value = [];
  achievementsVisible.value = [];
  timelineVisible.value = [];

  await nextTick();

  // Trigger animations with staggered delays
  setTimeout(() => {
    if (newTab === 0) {
      // Technical Skills
      skillCategories.forEach((_, index) => {
        setTimeout(() => {
          categoriesVisible.value = [...categoriesVisible.value];
          categoriesVisible.value[index] = true;
        }, index * 150);
      });
    } else if (newTab === 1) {
      // Hobbies
      hobbies.forEach((_, index) => {
        setTimeout(() => {
          hobbiesVisible.value = [...hobbiesVisible.value];
          hobbiesVisible.value[index] = true;
        }, index * 150);
      });
    } else if (newTab === 2) {
      // Achievements
      achievements.forEach((_, index) => {
        setTimeout(() => {
          achievementsVisible.value = [...achievementsVisible.value];
          achievementsVisible.value[index] = true;
        }, index * 150);
      });
    } else if (newTab === 3) {
      // Timeline
      timeline.forEach((_, index) => {
        setTimeout(() => {
          timelineVisible.value = [...timelineVisible.value];
          timelineVisible.value[index] = true;
        }, index * 150);
      });
    }
  }, 100);

  if (observer) {
    observeElements(observer);
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<style scoped>
#skills {
  width: 100%;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0);
  color: white;
  padding: 100px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.section-title {
  font-size: 3rem;
  margin-bottom: 60px;
  text-align: center;
}

/* Tab Navigation */
.tab-navigation {
  display: flex;
  gap: 25px;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 50px;
}

.tab-box {
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 30px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(50px) rotateX(-15deg);
  transform-style: preserve-3d;
}

.tab-box:nth-child(1) {
  transform: translateX(-100px) translateY(50px) rotateY(20deg);
}

.tab-box:nth-child(2) {
  transform: translateX(100px) translateY(50px) rotateY(-20deg);
}

.tab-box:nth-child(3) {
  transform: translateX(-100px) translateY(50px) rotateY(20deg);
}

.tab-box:nth-child(4) {
  transform: translateX(100px) translateY(50px) rotateY(-20deg);
}

.tab-box.visible {
  opacity: 1;
  transform: translateX(0) translateY(0) rotateX(0) rotateY(0);
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.tab-box::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(220, 20, 60, 0.1),
    transparent
  );
  transition: left 0.5s ease;
}

.tab-box:hover::before {
  left: 100%;
}

.tab-box:hover {
  transform: translateY(-8px) scale(1.02);
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(220, 20, 60, 0.5);
  box-shadow: 0 15px 35px rgba(220, 20, 60, 0.2);
}

.tab-box.active {
  background: rgba(220, 20, 60, 0.15);
  border-color: #dc143c;
  transform: translateY(-5px);
  box-shadow: 0 12px 25px rgba(220, 20, 60, 0.3);
}

.tab-icon {
  font-size: 3rem;
  margin-bottom: 15px;
  display: block;
}

.tab-title {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: white;
}

.tab-box.active .tab-title {
  color: #dc143c;
}

.tab-description {
  font-size: 0.95rem;
  opacity: 0.8;
  line-height: 1.5;
}

/* Content Area */
.content-area {
  width: 100%;
  max-width: 1200px;
  min-height: 500px;
}

.no-selection {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}

.no-selection-text {
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
}

.content-section {
  width: 100%;
}

/* Slide Fade Transition */
.slide-fade-enter-active {
  transition: all 0.6s ease;
}

.slide-fade-leave-active {
  transition: all 0.4s ease;
}

.slide-fade-enter-from {
  transform: translateX(30px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(-30px);
  opacity: 0;
}

/* Skill Categories */
.skill-categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  width: 100%;
}

.skill-category {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 25px;
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  opacity: 0;
  transform-style: preserve-3d;
}

.skill-category:nth-child(odd) {
  transform: translateX(-100px) rotateY(25deg) scale(0.8);
}

.skill-category:nth-child(even) {
  transform: translateX(100px) rotateY(-25deg) scale(0.8);
}

.skill-category.visible {
  opacity: 1;
  transform: translateX(0) rotateY(0) scale(1);
}

.skill-category:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(220, 20, 60, 0.3);
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 10px 25px rgba(220, 20, 60, 0.1);
}

.category-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid rgba(220, 20, 60, 0.2);
}

.category-icon {
  font-size: 2rem;
  margin-right: 15px;
}

.category-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #dc143c;
  margin: 0;
}

.category-skills {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 15px;
}

.skill-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 10px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.skill-item:hover {
  transform: translateY(-3px) scale(1.05);
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(220, 20, 60, 0.4);
  box-shadow: 0 5px 15px rgba(220, 20, 60, 0.15);
}

.skill-icon-wrapper {
  width: 45px;
  height: 45px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 8px;
  padding: 6px;
}

.skill-icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.skill-emoji-wrapper {
  width: 45px;
  height: 45px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(220, 20, 60, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(220, 20, 60, 0.2);
}

.skill-emoji {
  font-size: 1.8rem;
}

.skill-name {
  font-weight: 600;
  font-size: 0.9rem;
  text-align: center;
  line-height: 1.2;
}

/* Hobbies Grid */
.hobbies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.hobby-item {
  background: rgba(220, 20, 60, 0.1);
  border-radius: 15px;
  padding: 30px;
  text-align: center;
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  border: 1px solid rgba(220, 20, 60, 0.3);
  opacity: 0;
  transform-style: preserve-3d;
}

.hobby-item:nth-child(1) {
  transform: translateY(-100px) rotateX(45deg);
}

.hobby-item:nth-child(2) {
  transform: translateY(100px) rotateX(-45deg);
}

.hobby-item:nth-child(3) {
  transform: translateX(-100px) rotateZ(15deg);
}

.hobby-item:nth-child(4) {
  transform: translateX(100px) rotateZ(-15deg);
}

.hobby-item:nth-child(5) {
  transform: scale(0.5) translateY(-80px);
}

.hobby-item:nth-child(6) {
  transform: scale(0.5) translateY(80px);
}

.hobby-item.visible {
  opacity: 1;
  transform: translateX(0) translateY(0) rotateX(0) rotateZ(0) scale(1);
}

.hobby-item:hover {
  transform: translateY(-8px) scale(1.03);
  background: rgba(220, 20, 60, 0.2);
  box-shadow: 0 10px 25px rgba(220, 20, 60, 0.2);
}

.hobby-icon {
  font-size: 3.5rem;
  margin-bottom: 20px;
}

.hobby-name {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: #dc143c;
}

.hobby-description {
  font-size: 1rem;
  line-height: 1.6;
  opacity: 0.9;
}

/* Achievements Grid */
.achievements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 25px;
}

.achievement-badge {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 25px;
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  opacity: 0;
  transform-style: preserve-3d;
}

.achievement-badge:nth-child(odd) {
  transform: translateX(-150px) rotateY(30deg);
}

.achievement-badge:nth-child(even) {
  transform: translateX(150px) rotateY(-30deg);
}

.achievement-badge.visible {
  opacity: 1;
  transform: translateX(0) rotateY(0);
}

.achievement-badge:hover {
  transform: translateY(-8px) scale(1.02);
  background: rgba(255, 255, 255, 0.1);
  border-color: #dc143c;
  box-shadow: 0 10px 25px rgba(220, 20, 60, 0.2);
}

.badge-icon {
  font-size: 3rem;
  margin-right: 25px;
  flex-shrink: 0;
}

.badge-content {
  flex: 1;
}

.badge-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: #dc143c;
}

.badge-description {
  font-size: 1rem;
  margin-bottom: 10px;
  opacity: 0.9;
  line-height: 1.5;
}

.badge-year {
  font-size: 0.9rem;
  opacity: 0.7;
  font-style: italic;
}

/* Timeline */
.timeline {
  position: relative;
  padding-left: 40px;
  max-width: 800px;
  margin: 0 auto;
}

.timeline::before {
  content: "";
  position: absolute;
  left: 20px;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(to bottom, #dc143c, rgba(220, 20, 60, 0.5));
}

.timeline-item {
  position: relative;
  margin-bottom: 50px;
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.timeline-item:nth-child(odd) {
  transform: translateX(-80px) rotateZ(-5deg);
}

.timeline-item:nth-child(even) {
  transform: translateX(80px) rotateZ(5deg);
}

.timeline-item.visible {
  opacity: 1;
  transform: translateX(0) rotateZ(0);
}

.timeline-marker {
  position: absolute;
  left: -46px;
  top: 8px;
  width: 16px;
  height: 16px;
  background: #dc143c;
  border-radius: 50%;
  border: 4px solid rgba(0, 0, 0, 0.8);
  box-shadow: 0 0 15px rgba(220, 20, 60, 0.5);
}

.timeline-content {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 25px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.4s ease;
}

.timeline-content:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(10px);
  border-color: #dc143c;
  box-shadow: 0 10px 25px rgba(220, 20, 60, 0.2);
}

.timeline-year {
  display: inline-block;
  background: #dc143c;
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 700;
  margin-bottom: 15px;
}

.timeline-title {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 12px;
}

.timeline-description {
  font-size: 1rem;
  opacity: 0.9;
  line-height: 1.6;
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .section-title {
    font-size: 2.5rem;
    margin-bottom: 40px;
  }

  .tab-navigation {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .tab-box {
    padding: 25px 15px;
  }

  /* Simplify mobile animations */
  .tab-box:nth-child(1),
  .tab-box:nth-child(2),
  .tab-box:nth-child(3),
  .tab-box:nth-child(4) {
    transform: translateY(50px) scale(0.9);
  }

  .tab-box.visible {
    transform: translateY(0) scale(1);
  }

  .tab-icon {
    font-size: 2.5rem;
    margin-bottom: 12px;
  }

  .tab-title {
    font-size: 1.2rem;
  }

  .tab-description {
    font-size: 0.9rem;
  }

  .skill-categories {
    grid-template-columns: 1fr;
    gap: 25px;
  }

  .skill-category {
    padding: 20px;
  }

  .skill-category:nth-child(odd),
  .skill-category:nth-child(even) {
    transform: translateY(50px) scale(0.9);
  }

  .skill-category.visible {
    transform: translateY(0) scale(1);
  }

  .category-header {
    margin-bottom: 15px;
    padding-bottom: 12px;
  }

  .category-icon {
    font-size: 1.7rem;
    margin-right: 12px;
  }

  .category-title {
    font-size: 1.2rem;
  }

  .category-skills {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 12px;
  }

  .skill-item {
    padding: 12px 8px;
  }

  .skill-icon-wrapper,
  .skill-emoji-wrapper {
    width: 40px;
    height: 40px;
    margin-bottom: 8px;
  }

  .skill-emoji {
    font-size: 1.5rem;
  }

  .skill-name {
    font-size: 0.85rem;
  }

  .hobbies-grid,
  .achievements-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .hobby-item {
    padding: 25px 20px;
  }

  .hobby-item:nth-child(1),
  .hobby-item:nth-child(2),
  .hobby-item:nth-child(3),
  .hobby-item:nth-child(4),
  .hobby-item:nth-child(5),
  .hobby-item:nth-child(6) {
    transform: translateY(50px) scale(0.9);
  }

  .hobby-item.visible {
    transform: translateY(0) scale(1);
  }

  .achievement-badge {
    padding: 20px;
  }

  .achievement-badge:nth-child(odd),
  .achievement-badge:nth-child(even) {
    transform: translateY(50px) scale(0.9);
  }

  .achievement-badge.visible {
    transform: translateY(0) scale(1);
  }

  .badge-icon {
    font-size: 2.5rem;
    margin-right: 20px;
  }

  .timeline {
    padding-left: 30px;
  }

  .timeline-marker {
    left: -38px;
    width: 14px;
    height: 14px;
  }

  .timeline-content {
    padding: 20px;
  }

  .timeline-item:nth-child(odd),
  .timeline-item:nth-child(even) {
    transform: translateY(50px);
  }

  .timeline-item.visible {
    transform: translateY(0);
  }

  .timeline-content:hover {
    transform: translateX(5px);
  }
}
</style>
