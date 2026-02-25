import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Profile from '@/views/Profile.vue'
import ProfileHome from '@/views/ProfileHome.vue'

const routes = [
  {
    path: '/',
    component: HomeView,
  },
  {
    path: '/home',
    redirect: '/', // 访问 /home 时自动跳转到 /
  },
  {
    path: '/profile',
    component: Profile,
    children: [
      {
        path: 'home',
        component: ProfileHome,
      },
    ],

  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
