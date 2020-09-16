import Vue from 'vue'
import App from './App.vue'
import router from './router'

// Material Design Icons
import '@mdi/font/scss/materialdesignicons.scss';

// Componentes menu
import '@betha-plataforma/estrutura-componentes/dist/estrutura-componentes/estrutura-componentes.css';
import '@betha-plataforma/estrutura-componentes/dist/collection/assets/fonts.css';

import { applyPolyfills, defineCustomElements } from '@betha-plataforma/estrutura-componentes/loader';

Vue.config.productionTip = false

// Diz para o Vue ignorar todos os componentes definidos com o prefixo "bth-"
Vue.config.ignoredElements = [/bth-\w*/];

/**
 * https://github.com/ionic-team/stencil/blob/master/src/client/polyfills/index.js
 */
applyPolyfills().then(() => {
  defineCustomElements(window);
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
