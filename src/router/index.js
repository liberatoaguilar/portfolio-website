import Vue from 'vue'
import VueRouter from 'vue-router'
import homeView from '../views/HomeView.vue'
import resumeView from '../views/ResumeView.vue'
import aboutView from '../views/AboutView.vue'
import projectsView from '../views/ProjectsView.vue'
import contactView from '../views/ContactView.vue'

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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
