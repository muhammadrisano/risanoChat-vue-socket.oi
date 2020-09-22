import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import Home from '../views/Home.vue'
import Room from '../views/main/room/Room.vue'
import Main from '../views/main/index.vue'
import Auth from '../views/auth/Auth.vue'
import Login from '../views/auth/login/login.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/main',
    name: 'Main',
    component: Main,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'room',
        name: 'Room',
        component: Room
      }
    ]
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    meta: { requiresVisitor: true },
    children: [
      {
        path: 'login',
        name: 'Login',
        component: Login
      }
    ]
  },

  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters['auth/isLogin']) {
      next({
        // path: '/login'
        name: 'Login'
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters['auth/isLogin']) {
      next({
        // path: '/main'
        name: 'Room'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
