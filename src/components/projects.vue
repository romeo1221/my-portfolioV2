<template>
  <section id="projects">
    <div class="projects container">
      <div class="projects-header">
        <h1 class="section-title">My <span>Project</span></h1>
      </div>

      <div class="all-projects" v-if="projects.length">
        <div
          class="project-row"
          v-for="(project, index) in projects"
          :key="project.id"
          :class="{
            reverse: index % 2 === 1,
            visible: visibleProjects[index],
          }"
          :ref="(el) => setProjectRef(el, index)"
        >
          <div class="project-image">
            <div class="card-outer">
              <div class="card-inner">
                <img
                  :src="project.picture_url"
                  alt="Project Image"
                  @click="openModal(project)"
                />
              </div>
            </div>
          </div>

          <div class="project-content">
            <div class="project-info">
              <h2 class="project-title">{{ project.title }}</h2>
              <div class="project-desc">
                {{ project.description }}
              </div>
              <div class="project-actions">
                <a
                  v-if="project.project_file_url"
                  :href="project.project_file_url"
                  target="_blank"
                  class="download-link"
                >
                  Download Project File
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="no-projects">
        <p>No projects yet.</p>
      </div>

      <!-- Modal -->
      <div v-if="showModal" class="modal-overlay">
        <div class="modal-content">
          <!-- Close Button -->
          <button @click="closeModal" class="close-btn">✕</button>

          <div class="modal-body">
            <!-- Fixed Image Frame -->
            <div
              style="
                width: 350px;
                height: 250px;
                background: #374151;
                border-radius: 8px;
                overflow: hidden;
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <img
                :src="selectedProject.picture_url"
                alt="Preview"
                style="max-width: 100%; max-height: 100%; object-fit: contain"
              />
            </div>

            <!-- Description -->
            <p style="margin-top: 15px; font-size: 1rem; color: #d1d5db">
              {{ selectedProject?.description }}
            </p>

            <!-- Buttons -->
            <div style="margin-top: 20px; display: flex; gap: 10px">
              <button
                @click="downloadImage"
                style="
                  padding: 10px 16px;
                  background: #2563eb;
                  color: white;
                  border-radius: 6px;
                  cursor: pointer;
                  border: none;
                "
              >
                Download
              </button>
              <button
                @click="closeModal"
                style="
                  padding: 10px 16px;
                  background: #6b7280;
                  color: white;
                  border-radius: 6px;
                  cursor: pointer;
                  border: none;
                "
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";

const projects = ref([
  {
    id: 1,
    title: "BEEP",
    description:
      "We developed BEEP, a system for the Laoag-Batac-Paoay Transportation Group Inc. It manages bus operators, drivers, and schedules while letting users check bus availability. The system supports creating, reading, updating, and deleting records, with a user-friendly interface for efficient management and real-time updates.",
    picture_url:
      "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
    // project_file_url: "#download-ecommerce",
  },
  {
    id: 2,
    title: "Web Dev E-commerce",
    description:
      "Our final project is a coffee shop website made by our team of three. It has user and admin pages where customers can order products and manage their profiles, while admins handle product availability. The site also includes a shopping cart and login/logout features.",
    picture_url:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
  },
  {
    id: 3,
    title: "THESIS",
    description:
      "My thesis focuses on using TinyBERT, a lightweight transformer model, for sarcasm detection in text. The goal is to improve accuracy in identifying sarcastic expressions by fine-tuning TinyBERT and comparing its performance with other models. This research highlights applications in sentiment analysis, online communication, and intelligent systems.",
    picture_url:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop",
    // project_file_url: "#download-taskapp",
  },
  {
    id: 4,
    title: "Nutri-Iloco",
    description:
      "Nutri Iloco is a mobile application concept that uses image processing to detect the nutritional content of local Ilocano dishes. For this project, we focused on the UI/UX design, creating an intuitive and user-friendly interface that helps users track food intake, promote healthy eating habits, and support awareness of traditional cuisine through technology.",
    picture_url:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop",
    // project_file_url: "#download-taskapp",
  },
  {
    id: 5,
    title: "CuddleBOT emotional Chatbot",
    description:
      "CuddleBOT is an emotional chatbot concept designed to provide users with a comforting and engaging conversational experience. For this project, we focused on the UI/UX design, creating a friendly and empathetic interface that supports emotional well-being and enhances user interaction.",
    picture_url:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop",
    // project_file_url: "#download-taskapp",
  },
]);

const selectedProject = ref(null);
const showModal = ref(false);
const visibleProjects = ref({});
const projectRefs = ref([]);

// Set project ref for intersection observer
const setProjectRef = (el, index) => {
  if (el) {
    projectRefs.value[index] = el;
  }
};

// ---- MODAL LOGIC ----
const openModal = (project) => {
  selectedProject.value = project;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  selectedProject.value = null;
};

const downloadImage = () => {
  if (!selectedProject.value?.picture_url) return;

  const link = document.createElement("a");
  link.href = selectedProject.value.picture_url;
  link.download = "project-image.jpg";
  link.click();
};

const setupScrollAnimation = () => {
  const observerOptions = {
    threshold: 0.1, // Trigger when 10% of element is visible
    rootMargin: "50px 0px -50px 0px", // Start animation slightly before element enters viewport
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const index = parseInt(entry.target.dataset.index);
      if (entry.isIntersecting) {
        // Add a slight delay for staggered effect
        setTimeout(() => {
          visibleProjects.value[index] = true;
        }, index * 100); // 100ms delay between each project
      }
    });
  }, observerOptions);

  // Observe each project element
  projectRefs.value.forEach((el, index) => {
    if (el) {
      el.dataset.index = index;
      observer.observe(el);
    }
  });

  return observer;
};

const setup3DEffect = () => {
  const outers = document.querySelectorAll(".card-outer");

  outers.forEach((outer) => {
    const inner = outer.querySelector(".card-inner");
    let raf = null;

    const onMove = (e) => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = outer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const maxAngle = 25;

        const rotateX = ((centerY - y) / centerY) * maxAngle;
        const rotateY = ((x - centerX) / centerX) * maxAngle;

        inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0) scale(1.05)`;
        outer.style.boxShadow = `${-rotateY * 2}px ${
          rotateX * 2
        }px 30px rgba(0,0,0,0.3)`;
      });
    };

    const onEnter = () => {
      inner.style.transition = "transform 0.18s cubic-bezier(.2,.9,.3,1)";
      outer.style.transition = "box-shadow 0.2s ease";
    };

    const onLeave = () => {
      if (raf) cancelAnimationFrame(raf);
      inner.style.transition = "transform 0.5s cubic-bezier(.2,.9,.3,1)";
      inner.style.transform =
        "rotateX(0deg) rotateY(0deg) translateZ(0) scale(1)";
      outer.style.boxShadow = "0 8px 25px rgba(0,0,0,0.2)";
    };

    outer.addEventListener("mousemove", onMove);
    outer.addEventListener("mouseenter", onEnter);
    outer.addEventListener("mouseleave", onLeave);
  });
};

onMounted(async () => {
  await nextTick();
  setup3DEffect();

  // Setup scroll-based animations after projects are loaded
  setTimeout(() => {
    setupScrollAnimation();
  }, 100);
});
</script>

<style scoped>
/* ---------- General ---------- */
#projects .projects {
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px;
}

#projects .projects-header h1 {
  text-align: center;
  margin-bottom: 60px;
  font-size: 3.6rem;
}

.section-title span {
  color: crimson;
}

/* ---------- Zigzag Layout ---------- */
.all-projects {
  display: flex;
  flex-direction: column;
  gap: 80px;
}

.project-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.project-row.visible {
  opacity: 1;
  transform: translateY(0);
}

.project-row.reverse {
  direction: rtl;
}

.project-row.reverse .project-content {
  direction: ltr;
  text-align: left;
}

/* ---------- Image Section ---------- */
.project-image {
  perspective: 2000px;
  -webkit-perspective: 2000px;
}

.card-outer {
  perspective: 2000px;
  -webkit-perspective: 2000px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.card-inner {
  filter: drop-shadow(0 6px 8px rgba(159, 143, 247, 0.637));
  transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  height: 300px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  will-change: transform;
}

.card-inner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}

.card-outer:hover .card-inner {
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
}

/* ---------- Content Section ---------- */
.project-content {
  padding: 40px 20px;
}

.project-info {
  max-width: 500px;
}

.project-title {
  font-size: 2.2rem;
  color: #fff;
  margin: 0 0 20px;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, crimson 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
}

.project-desc {
  font-size: 1.1rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 30px;
  text-align: justify;
}

.project-actions {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.download-link {
  display: inline-block;
  padding: 12px 24px;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  font-size: 0.95rem;
  background: linear-gradient(135deg, crimson, #dc2626);
  color: white;
}

.download-link:hover {
  background: linear-gradient(135deg, #dc2626, #b91c1c);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(220, 38, 38, 0.4);
}

/* ---------- Animations ---------- */
.project-row .project-image {
  transform: translateX(-30px);
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s;
}

.project-row.reverse .project-image {
  transform: translateX(30px);
}

.project-row .project-content {
  transform: translateX(30px);
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s;
}

.project-row.reverse .project-content {
  transform: translateX(-30px);
}

.project-row.visible .project-image,
.project-row.visible .project-content {
  transform: translateX(0);
  opacity: 1;
}

/* ---------- Responsive Design ---------- */
@media (max-width: 768px) {
  .project-row {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }

  .project-row.reverse {
    direction: ltr;
  }

  .project-row.reverse .project-content {
    text-align: center;
  }

  .card-inner {
    height: 250px;
    margin: 0 auto;
    max-width: 400px;
  }

  .project-title {
    font-size: 1.8rem;
  }

  .project-desc {
    font-size: 1rem;
  }

  .all-projects {
    gap: 60px;
  }
}

@media (max-width: 480px) {
  .project-actions {
    flex-direction: column;
    align-items: center;
  }

  .download-link {
    width: 100%;
    text-align: center;
    max-width: 250px;
  }

  .project-title {
    font-size: 1.5rem;
  }
}

/* No projects */
.no-projects {
  text-align: center;
  font-size: 1.3rem;
  color: crimson;
  margin-top: 50px;
}

/* Modal styles remain the same */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-content {
  background: #1f2937;
  color: white;
  border-radius: 12px;
  width: 600px;
  height: 400px;
  padding: 20px;
  text-align: center;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.modal-body {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  font-size: 2rem;
  color: white;
  cursor: pointer;
}
</style>
