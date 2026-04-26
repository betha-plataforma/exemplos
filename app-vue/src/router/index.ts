import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/visao-geral' },
    { path: '/visao-geral', component: () => import('@/pages/VisaoGeral.vue') },
    { path: '/dashboard', component: () => import('@/pages/Dashboard.vue') },
    { path: '/listagem', component: () => import('@/pages/Listagem.vue') },
    { path: '/lista-de-cards', component: () => import('@/pages/ListaDeCards.vue') },
    { path: '/timeline', component: () => import('@/pages/Timeline.vue') },
    { path: '/formulario', component: () => import('@/pages/Formulario.vue') },
    { path: '/sem-registros', component: () => import('@/pages/SemRegistros.vue') },
    { path: '/configuracoes', component: () => import('@/pages/Configuracoes.vue') },
    { path: '/wizard', component: () => import('@/pages/Wizard.vue') },
    { path: '/contexto', component: () => import('@/pages/SelecaoContexto.vue') },
    { path: '/:pathMatch(.*)*', redirect: '/visao-geral' },
  ],
})

export default router
