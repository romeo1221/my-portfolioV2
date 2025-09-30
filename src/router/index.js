import { createRouter, createWebHashHistory } from "vue-router";
import Portfolio from "../components/Portfolio.vue";
import About from "../components/About.vue";
import Projects from "../components/Projects.vue";
import Skills from "../components/Skills.vue";
import Contact from "../components/Contact.vue";

const routes = [
  { path: "/", component: Portfolio }, // 👈 replaced Hero with Portfolio
  { path: "/about", component: About },
  { path: "/projects", component: Projects },
  { path: "/skills", component: Skills },
  { path: "/contact", component: Contact },
];

const router = createRouter({
  history: createWebHashHistory(), // ← changed from createWebHistory()
  routes,
});

export default router;
