import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/views/layouts/DefaultLayout.vue'
import BlankLayout from '@/views/layouts/BlankLayout.vue'
import { isLogin } from '@/utils/auth.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          redirect: 'home',
        },
        {
          path: '/home',
          name: 'pages-home',
          component: () => import('@/views/pages/HomeVue.vue'),
        },
        {
          path: 'space/apps',
          name: 'space-apps-list',
          component: () => import('@/views/space/apps/ListView.vue'),
        },
      ],
    },
    {
      path: '/',
      component: BlankLayout,
      children: [
        {
          path: 'auth/login',
          name: 'auth-login',
          component: () => import('@/views/auth/LoginView.vue'),
        },
      ],
    },
  ],
})

// TODO:路由导航守卫待完善
router.beforeEach(async (to, from) => {
  console.log(!isLogin() + ',' + (to.name != 'auth-login'))
  if (!isLogin() && to.name != 'auth-login') {
    console.log('hhh ')
    return { path: '/auth/login' }
  }
})

export default router
