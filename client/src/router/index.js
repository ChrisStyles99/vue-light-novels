import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/novels',
    name: 'Novels',
    component: () => import('../views/Novels.vue')
  },
  {
    path: '/add-novel',
    name: 'AddNovel',
    component: () => import('../views/AddNovel.vue')
  },
  {
    path: '/novel/:id',
    name: 'Novel',
    component: () => import('../views/Novel.vue')
  },
  {
    path: '/novel/edit/:id',
    name: 'EditNovel',
    component: () => import('../views/EditNovel.vue')
  },
  {
    path: '/novels/search',
    name: 'Search',
    component: () => import('../views/Search.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
