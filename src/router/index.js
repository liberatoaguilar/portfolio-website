import Vue from 'vue'
import VueRouter from 'vue-router'
import homeView from '../views/HomeView.vue'
import resumeView from '../views/ResumeView.vue'
import aboutView from '../views/AboutView.vue'
import projectsView from '../views/ProjectsView.vue'
import contactView from '../views/ContactView.vue'
import adminView from '../views/AdminView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: homeView
  },
  {
    path: '/resume',
    name: 'resume',
    component: resumeView
  },
  {
    path: '/about',
    name: 'about',
    component: aboutView
  },
  {
    path: '/projects',
    name: 'projects',
    component: projectsView
  },
  {
    path: '/contact',
    name: 'contact',
    component: contactView
  },
  {
    path: '/admin/:adminID',
    name: 'admin',
    component: adminView
  },
]

/* eslint-disable no-unused-vars */
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
      return { x: 0, y: 0 };
  }
});

export default router
/* eslint-disable no-unused-vars */
