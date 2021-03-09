import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { applyPolyfills, defineCustomElements } from '@betha-plataforma/estrutura-componentes/loader';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));

/**
 * https://github.com/ionic-team/stencil/blob/master/src/client/polyfills/index.js
 */
applyPolyfills().then(() => {
  defineCustomElements(window);
});
