import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Profile from '@/views/Profile.vue'
import ProfileHome from '@/views/ProfileHome.vue'
import Test from '@/views/Test.vue'
import ProfileOther from '@/views/ProfileOther.vue'

const routes = [
  {
    path: '/',
    component: HomeView,
  },
  {
    path: '/home',
    name: 'Home',
    redirect: '/', // 访问 /home 时自动跳转到 /
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    // 当访问 /profile 时，重定向到名为 ProfileHome 的子路由
    redirect: { name: 'ProfileHome' },
    children: [
      {
        path: 'home',
        name: 'ProfileHome',
        component: ProfileHome,
      },
      {
        path: 'other',
        name: 'ProfileOther',
        component: ProfileOther,
      },
    ],
  },
  {
    path: '/test',
    component: Test,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
