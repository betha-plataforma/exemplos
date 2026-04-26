import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  AUTHORIZATION,
  MENU_OPTIONS,
  MENU_ROUTE_ALIASES,
  UTILITY_OPTIONS,
} from './data/examples'
import type {
  IdentificadorOpcaoMenu,
  OpcaoMenuSelecionadaEvent,
} from '@betha-plataforma/estrutura-componentes/dist/types/components/app/app.interfaces'
import type { NotificacaoComLinkEvent } from '@betha-plataforma/estrutura-componentes/dist/types/components/notificacoes/notificacoes.interfaces'
import type { OpcaoUtilitarioSelecionadaEvent } from '@betha-plataforma/estrutura-componentes/dist/types/components/utilitarios/utilitarios.interfaces'
import type { AuthorizationConfig } from '@betha-plataforma/estrutura-componentes/dist/types/global/interfaces'
import { AppRoutes } from './AppRoutes'

function isAbsoluteUrl(text: string) {
  try {
    new URL(text)
    return true
  } catch {
    return false
  }
}

function matchesRoute(currentRoute: string, menuRoute: string) {
  if (menuRoute === '/') {
    return currentRoute === '/'
  }

  return currentRoute === menuRoute || currentRoute.startsWith(`${menuRoute}/`)
}

function findActiveMenuId(pathname: string): IdentificadorOpcaoMenu | undefined {
  for (const [menuId, aliases] of Object.entries(MENU_ROUTE_ALIASES)) {
    if (aliases.some((alias) => matchesRoute(pathname, alias))) {
      return menuId
    }
  }

  return undefined
}

function whenCustomElementDefined(tagName: keyof HTMLElementTagNameMap): Promise<unknown> {
  if (!window.customElements?.whenDefined) {
    return Promise.resolve()
  }

  return window.customElements.whenDefined(tagName)
}

export function AppShell() {
  const appRef = useRef<HTMLBthAppElement | null>(null)
  const brandRef = useRef<HTMLBthMarcaProdutoElement | null>(null)
  const accountRef = useRef<HTMLBthContaUsuarioElement | null>(null)
  const utilitiesRef = useRef<HTMLBthUtilitariosElement | null>(null)
  const notificationsRef = useRef<HTMLBthNotificacoesElement | null>(null)
  const newsRef = useRef<HTMLBthNovidadesElement | null>(null)
  const navigate = useNavigate()
  const location = useLocation()

  const authorizationConfig = useMemo<AuthorizationConfig>(
    () => ({
      getAuthorization: () => AUTHORIZATION,
      handleUnauthorizedAccess: () =>
        new Promise((resolve) => {
          window.setTimeout(resolve, 3500)
        }),
    }),
    [],
  )

  const handleMenuSelection = useCallback(
    (event: Event) => {
      const { detail } = event as CustomEvent<OpcaoMenuSelecionadaEvent>
      const route = String(detail?.rota ?? '')

      if (route) {
        navigate(route)
      }
    },
    [navigate],
  )

  const handleUtilitySelection = useCallback(
    (event: Event) => {
      const { detail } = event as CustomEvent<OpcaoUtilitarioSelecionadaEvent>
      const route = String(detail?.rota ?? '')

      if (!route) {
        return
      }

      if (isAbsoluteUrl(route)) {
        window.open(route, '_blank', 'noopener,noreferrer')
        return
      }

      navigate(route)
    },
    [navigate],
  )

  const handleLogout = useCallback(() => {
    console.debug('O usuário realizou a ação de logout no componente de conta do usuário')
  }, [])

  const handleLinkedNotification = useCallback((event: Event) => {
    const { detail } = event as CustomEvent<NotificacaoComLinkEvent>
    console.log('Nova mensagem obtida no componente de notificações', detail)
  }, [])

  useEffect(() => {
    const app = appRef.current

    if (!app) {
      return undefined
    }

    app.addEventListener('opcaoMenuSelecionada', handleMenuSelection)

    return () => {
      app.removeEventListener('opcaoMenuSelecionada', handleMenuSelection)
    }
  }, [handleMenuSelection])

  useEffect(() => {
    const app = appRef.current
    let disposed = false

    if (!app) {
      return undefined
    }

    const configureRouteState = async () => {
      await whenCustomElementDefined('bth-app')

      if (disposed) {
        return
      }

      app.menuVertical = true
      app.opcoes = location.pathname === '/contexto' ? [] : MENU_OPTIONS

      const activeMenuId = findActiveMenuId(location.pathname)

      if (activeMenuId && typeof app.setMenuAtivo === 'function') {
        app.setMenuAtivo(activeMenuId)
      }
    }

    configureRouteState()

    return () => {
      disposed = true
    }
  }, [location.pathname])

  useEffect(() => {
    const brand = brandRef.current
    let disposed = false

    if (!brand) {
      return undefined
    }

    const configureBrand = async () => {
      await whenCustomElementDefined('bth-marca-produto')

      if (disposed) {
        return
      }

      brand.produto = 'React'
      brand.exibirProdutos = true
      brand.authorization = authorizationConfig
    }

    configureBrand()

    return () => {
      disposed = true
    }
  }, [authorizationConfig])

  useEffect(() => {
    const account = accountRef.current
    let disposed = false

    if (!account) {
      return undefined
    }

    account.addEventListener('logout', handleLogout)

    const configureAccount = async () => {
      await whenCustomElementDefined('bth-conta-usuario')

      if (disposed) {
        return
      }

      account.usuario = 'lorem.ipsum'
      account.nome = 'Lorem Ipsum'
      account.fotoUrl = 'https://placeimg.com/80/80/animals'
    }

    configureAccount()

    return () => {
      disposed = true
      account.removeEventListener('logout', handleLogout)
    }
  }, [handleLogout])

  useEffect(() => {
    const utilities = utilitiesRef.current
    let disposed = false

    if (!utilities) {
      return undefined
    }

    utilities.addEventListener('opcaoUtilitarioSelecionada', handleUtilitySelection)

    const configureUtilities = async () => {
      await whenCustomElementDefined('bth-utilitarios')

      if (disposed) {
        return
      }

      utilities.utilitarios = UTILITY_OPTIONS
    }

    configureUtilities()

    return () => {
      disposed = true
      utilities.removeEventListener('opcaoUtilitarioSelecionada', handleUtilitySelection)
    }
  }, [handleUtilitySelection])

  useEffect(() => {
    const notifications = notificationsRef.current
    let disposed = false

    if (!notifications) {
      return undefined
    }

    notifications.addEventListener('novaNotificacaoComLink', handleLinkedNotification)

    const configureNotifications = async () => {
      await whenCustomElementDefined('bth-notificacoes')

      if (disposed) {
        return
      }

      notifications.authorization = authorizationConfig
    }

    configureNotifications()

    return () => {
      disposed = true
      notifications.removeEventListener('novaNotificacaoComLink', handleLinkedNotification)
    }
  }, [authorizationConfig, handleLinkedNotification])

  useEffect(() => {
    const news = newsRef.current
    let disposed = false

    if (!news) {
      return undefined
    }

    const configureNews = async () => {
      await whenCustomElementDefined('bth-novidades')

      if (disposed) {
        return
      }

      news.authorization = authorizationConfig
    }

    configureNews()

    return () => {
      disposed = true
    }
  }, [authorizationConfig])

  return (
    <bth-app ref={appRef} menu-vertical="">
      <bth-marca-produto ref={brandRef} slot="menu_marca_produto"></bth-marca-produto>

      <bth-utilitarios ref={utilitiesRef} slot="menu_ferramentas"></bth-utilitarios>
      <bth-ajuda slot="menu_ferramentas"></bth-ajuda>
      <bth-novidades ref={newsRef} slot="menu_ferramentas"></bth-novidades>
      <bth-notificacoes ref={notificationsRef} slot="menu_ferramentas"></bth-notificacoes>
      <bth-conta-usuario ref={accountRef} slot="menu_ferramentas"></bth-conta-usuario>

      <main slot="container_aplicacao" className="container-fluid px-3 mt-2">
        <AppRoutes />
      </main>
    </bth-app>
  )
}
