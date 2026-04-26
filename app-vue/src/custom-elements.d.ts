import type { JSX as BethaJSX } from '@betha-plataforma/estrutura-componentes'

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    'bth-app': BethaJSX.BthApp & { 'menu-vertical'?: string | boolean }
    'bth-marca-produto': BethaJSX.BthMarcaProduto
    'bth-utilitarios': BethaJSX.BthUtilitarios
    'bth-ajuda': BethaJSX.BthAjuda
    'bth-novidades': BethaJSX.BthNovidades
    'bth-notificacoes': BethaJSX.BthNotificacoes
    'bth-conta-usuario': BethaJSX.BthContaUsuario
    'bth-selecao-contexto': BethaJSX.BthSelecaoContexto & { 'placeholder-pesquisa'?: string }
  }
}

export {}
