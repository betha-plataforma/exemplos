import type {
  IdentificadorOpcaoMenu,
  OpcaoMenu,
} from '@betha-plataforma/estrutura-componentes/dist/types/components/app/app.interfaces'
import type { ItemSelecaoContexto } from '@betha-plataforma/estrutura-componentes/dist/types/components/comuns/selecao-contexto/selecao-contexto.interfaces'
import type { Utilitario } from '@betha-plataforma/estrutura-componentes/dist/types/components/utilitarios/utilitarios.interfaces'
import type { Authorization } from '@betha-plataforma/estrutura-componentes/dist/types/global/interfaces'

export type MenuRouteAliases = Record<IdentificadorOpcaoMenu, readonly string[]>

export type Principle = {
  iconClass: string
  title: string
}

export type SummaryCardData = {
  title: string
  value: string
  textClass: string
}

export type IconCardData = SummaryCardData & {
  iconClass: string
}

export type ListRecord = {
  id: number
  name: string
  complement: string
  column2: string
  column3Main: string
  column3Complement: string
  status: Exclude<ListFilter, 'Todos'>
  badgeClass: string
  avatarUrl: string
}

export type FileCardData = {
  id: number
  imageUrl: string
  title: string
}

export type TimelineGroup = {
  month: string
  day: string
  events: Array<{
    time: string
    description: string
    hasHistoryLink: boolean
  }>
}

export const AUTHORIZATION: Authorization = {
  accessId: '5e613debe191120137316351',
  accessToken: 'fbbbbffd-eeb4-4f7c-b222-8097e55e28fa',
  systemId: 78,
}

export const MENU_OPTIONS: OpcaoMenu[] = [
  {
    id: 'visao-geral',
    descricao: 'Visão geral',
    icone: 'home',
    rota: '/visao-geral',
    possuiPermissao: true,
  },
  {
    id: 'secoes',
    descricao: 'Seções',
    icone: 'book-open-page-variant',
    possuiPermissao: true,
    submenus: [
      { id: 'dashboard', descricao: 'Dashboard', rota: '/dashboard', possuiPermissao: true },
      { id: 'listagem', descricao: 'Listagem', rota: '/listagem', possuiPermissao: true },
      {
        id: 'lista-de-cards',
        descricao: 'Lista de cards',
        rota: '/lista-de-cards',
        possuiPermissao: true,
      },
      { id: 'timeline', descricao: 'Timeline', rota: '/timeline', possuiPermissao: true },
      { id: 'formulario', descricao: 'Formulário', rota: '/formulario', possuiPermissao: true },
      {
        id: 'sem-registros',
        descricao: 'Sem registros',
        rota: '/sem-registros',
        possuiPermissao: true,
      },
      {
        id: 'configuracoes',
        descricao: 'Configurações',
        rota: '/configuracoes',
        possuiPermissao: true,
      },
      { id: 'wizard', descricao: 'Wizard', rota: '/wizard', possuiPermissao: true },
    ],
  },
]

export const MENU_ROUTE_ALIASES = {
  'visao-geral': ['/', '/visao-geral'],
  dashboard: ['/dashboard'],
  listagem: ['/listagem'],
  'lista-de-cards': ['/lista-de-cards'],
  timeline: ['/timeline'],
  formulario: ['/formulario'],
  'sem-registros': ['/sem-registros'],
  configuracoes: ['/configuracoes'],
  wizard: ['/wizard'],
} satisfies MenuRouteAliases

export const UTILITY_OPTIONS: Utilitario[] = [
  {
    nome: 'Gerenciador de Acessos',
    rota: '/dashboard',
    icone: 'key-variant',
    possuiPermissao: true,
  },
  {
    nome: 'Link externo',
    rota: 'https://aws.amazon.com/pt/console/',
    icone: 'amazon',
    possuiPermissao: true,
  },
  {
    nome: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit',
    rota: '/',
    icone: 'merge',
    possuiPermissao: true,
  },
]

export const PRINCIPLES: Principle[] = [
  {
    iconClass: 'h2 mdi mdi-pinwheel-outline tx__aqua--l10 mt-5',
    title: 'Mantenha a interface simples',
  },
  {
    iconClass: 'h2 mdi mdi-bullseye-arrow tx__purple--l10 mt-5',
    title: 'Dê prioridade para o objetivo principal da tela',
  },
  {
    iconClass: 'h2 mdi mdi-baby-face-outline tx__orange--l10 mt-5',
    title: 'Utilize linguagem clara e direta',
  },
  {
    iconClass: 'h2 mdi mdi-toy-brick-outline tx__yellow--l10 mt-5',
    title: 'Mantenha o padrão entre as telas',
  },
  {
    iconClass: 'h2 mdi mdi-alert-outline tx__red--l10 mt-5',
    title: 'Alerte o usuário sobre ações críticas',
  },
  {
    iconClass: 'h2 mdi mdi-check-all tx__green--l10 mt-5',
    title: 'Informe o resultado das ações',
  },
]

export const SUMMARY_CARDS: SummaryCardData[] = [
  { title: 'Lorem Ipsum', value: '10.000,00', textClass: 'h3' },
  { title: 'Lorem Ipsum', value: '10.000,00', textClass: 'h3 text-success' },
  { title: 'Lorem Ipsum', value: '10.000,00', textClass: 'h3 text-warning' },
  { title: 'Lorem Ipsum', value: '-10.000,00', textClass: 'h3 text-danger' },
]

export const SIDE_ICON_CARDS: IconCardData[] = [
  {
    title: 'Lorem Ipsum',
    value: '10.000,00',
    textClass: 'h3',
    iconClass: 'h2 text-muted m-0 mdi mdi-chart-bar me-3',
  },
  {
    title: 'Lorem Ipsum',
    value: '10.000,00',
    textClass: 'h3',
    iconClass: 'h2 text-success m-0 mdi mdi-arrow-up me-3',
  },
  {
    title: 'Lorem Ipsum',
    value: '10.000,00',
    textClass: 'h3',
    iconClass: 'h2 text-warning m-0 mdi mdi-alert-outline me-3',
  },
  {
    title: 'Lorem Ipsum',
    value: '-10.000,00',
    textClass: 'h3',
    iconClass: 'h2 text-danger m-0 mdi mdi-arrow-down me-3',
  },
]

export const TOP_ICON_CARDS: IconCardData[] = [
  {
    title: 'Lorem Ipsum',
    value: '10.000,00',
    textClass: 'h3',
    iconClass: 'h2 text-muted mdi mdi-chart-bar',
  },
  {
    title: 'Lorem Ipsum',
    value: '10.000,00',
    textClass: 'h3',
    iconClass: 'h2 text-success mdi mdi-arrow-up',
  },
  {
    title: 'Lorem Ipsum',
    value: '10.000,00',
    textClass: 'h3',
    iconClass: 'h2 text-warning mdi mdi-alert-outline',
  },
  {
    title: 'Lorem Ipsum',
    value: '-10.000,00',
    textClass: 'h3',
    iconClass: 'h2 text-danger mdi mdi-arrow-down',
  },
]

export const LIST_FILTERS = ['Todos', 'Pago', 'Atrasado', 'Em aberto'] as const
export type ListFilter = (typeof LIST_FILTERS)[number]

export const LIST_RECORDS: ListRecord[] = [
  {
    id: 1,
    name: 'Informação principal',
    complement: 'Informação complementar',
    column2: 'Lorem ipsum',
    column3Main: 'Informação principal',
    column3Complement: 'Informação complementar',
    status: 'Pago',
    badgeClass: 'badge rounded-pill text-bg-success',
    avatarUrl: 'https://picsum.photos/id/237/80',
  },
  {
    id: 2,
    name: 'Informação principal',
    complement: 'Informação complementar',
    column2: 'Lorem ipsum',
    column3Main: 'Informação principal',
    column3Complement: 'Informação complementar',
    status: 'Atrasado',
    badgeClass: 'badge rounded-pill text-bg-danger',
    avatarUrl: 'https://picsum.photos/id/238/80',
  },
  {
    id: 3,
    name: 'Informação principal',
    complement: 'Informação complementar',
    column2: 'Lorem ipsum',
    column3Main: 'Informação principal',
    column3Complement: 'Informação complementar',
    status: 'Em aberto',
    badgeClass: 'badge rounded-pill text-bg-warning',
    avatarUrl: 'https://picsum.photos/id/239/80',
  },
]

export const CARD_AVATARS: string[] = [
  'https://picsum.photos/id/220/60',
  'https://picsum.photos/id/221/60',
  'https://picsum.photos/id/222/60',
  'https://picsum.photos/id/223/60',
]

export const FILE_CARDS: FileCardData[] = [
  { id: 1, imageUrl: 'https://picsum.photos/id/230/400/320', title: 'Este é um arquivo' },
  { id: 2, imageUrl: 'https://picsum.photos/id/231/400/320', title: 'Este é um arquivo' },
  { id: 3, imageUrl: 'https://picsum.photos/id/232/400/320', title: 'Este é um arquivo' },
  { id: 4, imageUrl: 'https://picsum.photos/id/233/400/320', title: 'Este é um arquivo' },
  { id: 5, imageUrl: 'https://picsum.photos/id/234/400/320', title: 'Este é um arquivo' },
  { id: 6, imageUrl: 'https://picsum.photos/id/235/400/320', title: 'Este é um arquivo' },
  { id: 7, imageUrl: 'https://picsum.photos/id/236/400/320', title: 'Este é um arquivo' },
  { id: 8, imageUrl: 'https://picsum.photos/id/238/400/320', title: 'Este é um arquivo' },
]

export const TIMELINE_GROUPS: TimelineGroup[] = [
  {
    month: 'Março/2021',
    day: 'Qua, 17/10',
    events: [
      {
        time: '10:30:42',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        hasHistoryLink: true,
      },
      {
        time: '09:15:21',
        description:
          'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        hasHistoryLink: false,
      },
    ],
  },
  {
    month: 'Fevereiro/1985',
    day: 'Seg, 16/02',
    events: [
      {
        time: '10:30:42',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        hasHistoryLink: true,
      },
      {
        time: '09:15:21',
        description:
          'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        hasHistoryLink: false,
      },
    ],
  },
]

export const CONTEXT_ITEMS: ItemSelecaoContexto[] = [
  { id: 1, descricao: 'Extensões', imagemAvatar: 'https://picsum.photos/48/48' },
  {
    id: 2,
    descricao: 'Aplicações',
    icone: 'ship-wheel',
    complemento: 'Licença bloqueada',
    iconeStatus: 'lock',
    iconeStatusTitle: 'Licença bloqueada',
  },
  { id: 4, descricao: 'Plataforma', icone: 'medal' },
]
