import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store';

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
    component: () => import('../views/Novels.vue'),
    meta: {authRoute: true}
  },
  {
    path: '/add-novel',
    name: 'AddNovel',
    component: () => import('../views/AddNovel.vue'),
    meta: {authRoute: true}
  },
  {
    path: '/novel/:id',
    name: 'Novel',
    component: () => import('../views/Novel.vue'),
    meta: {authRoute: true}
  },
  {
    path: '/novel/edit/:id',
    name: 'EditNovel',
    component: () => import('../views/EditNovel.vue'),
    meta: {authRoute: true}
  },
  {
    path: '/novels/search',
    name: 'Search',
    component: () => import('../views/Search.vue'),
    meta: {authRoute: true}
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  }
];


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const authRoute = to.matched.some(item => item.meta.authRoute);

  if(authRoute && store.state.isLoggedIn === false) {
    next({name: 'Login'});
  } else {
    next();
  }
});

export default router
