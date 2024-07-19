import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Search from '@/pages/Search.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/search', name: 'SearchRates', component: Search }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
