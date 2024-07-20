import { createRouter, createWebHistory, RouterOptions } from 'vue-router'
import Home from '@/pages/Home.vue'
import Edit from '@/pages/Edit.vue'
import Search from '@/pages/Search.vue'
import Modified from '@/pages/Modified.vue'

const routes: RouterOptions['routes'] = [
  { path: '/', name: 'Home', component: Home },
  { path: '/modified', name: 'Modified', component: Modified },
  { path: '/search', name: 'Search', component: Search },
  { path: '/edit/:slug', name: 'Edit', component: Edit }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
