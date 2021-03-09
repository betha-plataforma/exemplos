import Vue from 'vue'
import VueRouter from 'vue-router'

import Menu1 from '../views/Menu1.vue'
import Menu2 from '../views/Menu2.vue'
import Menu3 from '../views/Menu3.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'menu1',
    component: Menu1
  },
  {
    path: '/menu2',
    name: 'menu2',
    component: Menu2
  },
  {
    path: '/menu3',
    name: 'menu3',
    component: Menu3
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
