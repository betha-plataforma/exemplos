import '@mdi/font/css/materialdesignicons.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@betha-plataforma/theme-bootstrap5/dist/theme-bootstrap5.min.css'
import '@betha-plataforma/estrutura-componentes/dist/estrutura-componentes/estrutura-componentes.css'
import './assets/main.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import { createApp } from 'vue'
import {
  applyPolyfills,
  defineCustomElements,
} from '@betha-plataforma/estrutura-componentes/loader/index.es2017.mjs'
import App from './App.vue'
import router from './router'

applyPolyfills().then(() => {
  defineCustomElements(window)
})

const app = createApp(App)
app.use(router)
app.mount('#app')
