import { createRouter, createWebHashHistory } from "vue-router";
import Portfolio from "../components/Portfolio.vue";

const routes = [
  { path: "/", component: Portfolio },
  { path: "/about", component: Portfolio },
  { path: "/projects", component: Portfolio },
  { path: "/skills", component: Portfolio },
  { path: "/contact", component: Portfolio },
];

const router = createRouter({
  history: createWebHashHistory(), // hash mode for GitHub Pages
  routes,
  scrollBehavior(to) {
    // Scroll to section based on route
    const sectionMap = {
      "/about": "about",
      "/projects": "projects",
      "/skills": "skills",
      "/contact": "contact",
    };

    const sectionId = sectionMap[to.path];
    if (sectionId) {
      const el = document.getElementById(sectionId);
      if (el) {
        return {
          el: `#${sectionId}`,
          behavior: "smooth",
        };
      }
    }

    return { top: 0 }; // default scroll to top
  },
});

export default router;
