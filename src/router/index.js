import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/home-view.vue'
import StokView from '@/views/stock-view.vue'
import TrackingView from '@/views/tracking-view.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'Dashboard' },
    },
    {
      path: '/stok',
      name: 'stok',
      component: StokView,
      meta: { title: 'Stok Bahan Ajar' },
    },
    {
      path: '/tracking',
      name: 'tracking',
      component: TrackingView,
      meta: { title: 'Tracking Delivery Order' },
    },
  ],
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} - UT Bahan Ajar` : 'UT Bahan Ajar'
  next()
})

export default router
