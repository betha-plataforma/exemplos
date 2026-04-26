<template>
  <bth-app ref="appRef" menu-vertical="">
    <bth-marca-produto ref="brandRef" slot="menu_marca_produto"></bth-marca-produto>

    <bth-utilitarios ref="utilitiesRef" slot="menu_ferramentas"></bth-utilitarios>
    <bth-ajuda slot="menu_ferramentas"></bth-ajuda>
    <bth-novidades ref="newsRef" slot="menu_ferramentas"></bth-novidades>
    <bth-notificacoes ref="notificationsRef" slot="menu_ferramentas"></bth-notificacoes>
    <bth-conta-usuario ref="accountRef" slot="menu_ferramentas"></bth-conta-usuario>

    <main slot="container_aplicacao" class="container-fluid px-3 mt-2">
      <RouterView />
    </main>
  </bth-app>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterView, useRouter, useRoute } from 'vue-router'
import { AUTHORIZATION, MENU_OPTIONS, MENU_ROUTE_ALIASES, UTILITY_OPTIONS } from '@/data/examples'
import type { IdentificadorOpcaoMenu } from '@betha-plataforma/estrutura-componentes/dist/types/components/app/app.interfaces'
import type { AuthorizationConfig } from '@betha-plataforma/estrutura-componentes/dist/types/global/interfaces'

const appRef = ref<HTMLBthAppElement | null>(null)
const brandRef = ref<HTMLBthMarcaProdutoElement | null>(null)
const accountRef = ref<HTMLBthContaUsuarioElement | null>(null)
const utilitiesRef = ref<HTMLBthUtilitariosElement | null>(null)
const notificationsRef = ref<HTMLBthNotificacoesElement | null>(null)
const newsRef = ref<HTMLBthNovidadesElement | null>(null)

const router = useRouter()
const route = useRoute()

const authorizationConfig: AuthorizationConfig = {
  getAuthorization: () => AUTHORIZATION,
  handleUnauthorizedAccess: () =>
    new Promise((resolve) => {
      window.setTimeout(resolve, 3500)
    }),
}

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

const cleanupFns: Array<() => void> = []

onMounted(() => {
  const app = appRef.value
  const brand = brandRef.value
  const account = accountRef.value
  const utilities = utilitiesRef.value
  const notifications = notificationsRef.value
  const news = newsRef.value

  // bth-app: menu selection event + route state
  if (app) {
    const handleMenuSelection = (event: Event) => {
      const detail = (event as CustomEvent).detail as { rota?: string }
      const menuRoute = String(detail?.rota ?? '')
      if (menuRoute) router.push(menuRoute)
    }

    let appDisposed = false
    const configureRouteState = async () => {
      await whenCustomElementDefined('bth-app')
      if (appDisposed) return
      app.menuVertical = true
      app.opcoes = route.path === '/contexto' ? [] : MENU_OPTIONS
      const activeMenuId = findActiveMenuId(route.path)
      if (activeMenuId && typeof app.setMenuAtivo === 'function') {
        app.setMenuAtivo(activeMenuId)
      }
    }

    app.addEventListener('opcaoMenuSelecionada', handleMenuSelection)
    configureRouteState()

    const unsubscribeRouter = router.afterEach((to) => {
      if (!appRef.value) return
      appRef.value.opcoes = to.path === '/contexto' ? [] : MENU_OPTIONS
      const menuId = findActiveMenuId(to.path)
      if (menuId && typeof appRef.value.setMenuAtivo === 'function') {
        appRef.value.setMenuAtivo(menuId)
      }
    })

    cleanupFns.push(() => {
      appDisposed = true
      app.removeEventListener('opcaoMenuSelecionada', handleMenuSelection)
      unsubscribeRouter()
    })
  }

  // bth-marca-produto
  if (brand) {
    let disposed = false
    const configure = async () => {
      await whenCustomElementDefined('bth-marca-produto')
      if (disposed) return
      brand.produto = 'Vue'
      brand.exibirProdutos = true
      brand.authorization = authorizationConfig
    }
    configure()
    cleanupFns.push(() => { disposed = true })
  }

  // bth-conta-usuario
  if (account) {
    const handleLogout = () => {
      console.debug('O usuário realizou a ação de logout no componente de conta do usuário')
    }

    let disposed = false
    const configure = async () => {
      await whenCustomElementDefined('bth-conta-usuario')
      if (disposed) return
      account.usuario = 'lorem.ipsum'
      account.nome = 'Lorem Ipsum'
      account.fotoUrl = 'https://picsum.photos/80/80'
    }

    account.addEventListener('logout', handleLogout)
    configure()
    cleanupFns.push(() => {
      disposed = true
      account.removeEventListener('logout', handleLogout)
    })
  }

  // bth-utilitarios
  if (utilities) {
    const handleUtilitySelection = (event: Event) => {
      const detail = (event as CustomEvent).detail as { rota?: string }
      const utilRoute = String(detail?.rota ?? '')
      if (!utilRoute) return
      if (isAbsoluteUrl(utilRoute)) {
        window.open(utilRoute, '_blank', 'noopener,noreferrer')
        return
      }
      router.push(utilRoute)
    }

    let disposed = false
    const configure = async () => {
      await whenCustomElementDefined('bth-utilitarios')
      if (disposed) return
      utilities.utilitarios = UTILITY_OPTIONS
    }

    utilities.addEventListener('opcaoUtilitarioSelecionada', handleUtilitySelection)
    configure()
    cleanupFns.push(() => {
      disposed = true
      utilities.removeEventListener('opcaoUtilitarioSelecionada', handleUtilitySelection)
    })
  }

  // bth-notificacoes
  if (notifications) {
    const handleLinkedNotification = (event: Event) => {
      const detail = (event as CustomEvent).detail
      console.log('Nova mensagem obtida no componente de notificações', detail)
    }

    let disposed = false
    const configure = async () => {
      await whenCustomElementDefined('bth-notificacoes')
      if (disposed) return
      notifications.authorization = authorizationConfig
    }

    notifications.addEventListener('novaNotificacaoComLink', handleLinkedNotification)
    configure()
    cleanupFns.push(() => {
      disposed = true
      notifications.removeEventListener('novaNotificacaoComLink', handleLinkedNotification)
    })
  }

  // bth-novidades
  if (news) {
    let disposed = false
    const configure = async () => {
      await whenCustomElementDefined('bth-novidades')
      if (disposed) return
      news.authorization = authorizationConfig
    }
    configure()
    cleanupFns.push(() => { disposed = true })
  }
})

onUnmounted(() => {
  cleanupFns.forEach((fn) => fn())
  cleanupFns.length = 0
})
</script>
