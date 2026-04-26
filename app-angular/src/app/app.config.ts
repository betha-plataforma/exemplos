import {
  ApplicationConfig,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import {
  applyPolyfills,
  defineCustomElements,
} from '@betha-plataforma/estrutura-componentes/loader';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideAppInitializer(() => applyPolyfills().then(() => defineCustomElements())),
    provideRouter(routes),
  ],
};
