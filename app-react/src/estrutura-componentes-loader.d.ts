declare module '@betha-plataforma/estrutura-componentes/loader/index.es2017.mjs' {
  export function applyPolyfills(): Promise<void>

  export function defineCustomElements(
    win?: Window,
    opts?: import('@betha-plataforma/estrutura-componentes/loader').CustomElementsDefineOptions,
  ): Promise<void>
}
