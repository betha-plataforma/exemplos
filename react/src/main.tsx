import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@mdi/font/css/materialdesignicons.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@betha-plataforma/theme-bootstrap5/dist/theme-bootstrap5.min.css'
import '@betha-plataforma/estrutura-componentes/dist/estrutura-componentes/estrutura-componentes.css'
import './index.css'
import App from './App'
import {
  applyPolyfills,
  defineCustomElements,
} from '@betha-plataforma/estrutura-componentes/loader/index.es2017.mjs'

applyPolyfills().then(() => {
  defineCustomElements(window)
  return defineCustomElements(window)
})

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element #root was not found')
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
