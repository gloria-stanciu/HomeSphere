import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/auth',
      name: 'Auth',
      component: () => import('./views/Auth.vue'),
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('./views/Dashboard.vue'),
      meta: {
        protected: true,
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.meta.protected) {
    try {
      const token = localStorage.getItem('token')
      if (token) {
        next()
      } else {
        next('/auth')
      }
    } catch (err) {
      next('/auth')
    }
  } else {
    next()
  }
})

export default router
