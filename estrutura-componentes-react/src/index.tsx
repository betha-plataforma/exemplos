import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import '@betha-plataforma/theme-bootstrap4/dist/theme-bootstrap4.css';
import '@betha-plataforma/estrutura-componentes/dist/estrutura-componentes/estrutura-componentes.css';
import '@betha-plataforma/estrutura-componentes/dist/collection/assets/fonts.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { applyPolyfills, defineCustomElements } from '@betha-plataforma/estrutura-componentes/loader';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

applyPolyfills().then(() => {
  defineCustomElements(window);
});

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'bth-app': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,
      'bth-utilitarios': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,
      'bth-marca-produto': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,
      'bth-ajuda': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,
      'bth-novidades': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,
      'bth-notificacoes': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,
      'bth-conta-usuario': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
    }
  }
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
