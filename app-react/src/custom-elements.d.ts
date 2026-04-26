import type { JSX as BethaJSX } from '@betha-plataforma/estrutura-componentes'
import type { DetailedHTMLProps, HTMLAttributes } from 'react'

type CustomElementProps<TElement extends HTMLElement, TProps extends object> = Omit<
  DetailedHTMLProps<HTMLAttributes<TElement>, TElement>,
  keyof TProps
> &
  Partial<TProps>

type BthAppProps = CustomElementProps<HTMLBthAppElement, BethaJSX.BthApp> & {
  'menu-vertical'?: string
}

type BthSelecaoContextoProps = CustomElementProps<
  HTMLBthSelecaoContextoElement,
  BethaJSX.BthSelecaoContexto
> & {
  'placeholder-pesquisa'?: string
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'bth-app': BthAppProps
      'bth-marca-produto': CustomElementProps<
        HTMLBthMarcaProdutoElement,
        BethaJSX.BthMarcaProduto
      >
      'bth-utilitarios': CustomElementProps<HTMLBthUtilitariosElement, BethaJSX.BthUtilitarios>
      'bth-ajuda': CustomElementProps<HTMLBthAjudaElement, BethaJSX.BthAjuda>
      'bth-novidades': CustomElementProps<HTMLBthNovidadesElement, BethaJSX.BthNovidades>
      'bth-notificacoes': CustomElementProps<HTMLBthNotificacoesElement, BethaJSX.BthNotificacoes>
      'bth-conta-usuario': CustomElementProps<
        HTMLBthContaUsuarioElement,
        BethaJSX.BthContaUsuario
      >
      'bth-selecao-contexto': BthSelecaoContextoProps
    }
  }
}
