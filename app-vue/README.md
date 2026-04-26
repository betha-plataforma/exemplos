# app-vue

Exemplo de aplicação Vue 3 que demonstra a integração do tema Bootstrap 5 da Betha com os web components do pacote [@betha-plataforma/estrutura-componentes](https://github.com/betha-plataforma/estrutura-componentes).

## O que este projeto demonstra

- shell da aplicação com `bth-app` e menu lateral
- registro dos custom elements Betha no bootstrap Vue (`applyPolyfills` + `defineCustomElements`)
- integração entre eventos dos web components e o roteamento Vue Router
- padrão `disposed` para evitar race conditions na inicialização assíncrona dos custom elements
- sincronização do menu ativo via `router.afterEach`
- uso de Bootstrap 5 nativo (sem wrapper UI) para dropdowns, modais, abas, wizard, alertas e barra de progresso
- páginas de exemplo para visão geral, dashboard, listagem, lista de cards, timeline, formulário, sem registros, configurações, wizard e seleção de contexto

## Stack utilizada

- Vue 3 + Composition API (`<script setup>`)
- Vite
- Vue Router 5
- Bootstrap 5
- [@betha-plataforma/theme-bootstrap5](https://www.npmjs.com/package/@betha-plataforma/theme-bootstrap5)
- [@betha-plataforma/estrutura-componentes](https://www.npmjs.com/package/@betha-plataforma/estrutura-componentes)
- [@mdi/font](https://www.npmjs.com/package/@mdi/font)
- TypeScript

## Rotas disponíveis

| Rota | Página |
|---|---|
| `/visao-geral` | Visão geral |
| `/dashboard` | Dashboard |
| `/listagem` | Listagem com filtros, paginação e modal wizard |
| `/lista-de-cards` | Lista de cards com modal de upload |
| `/timeline` | Timeline |
| `/formulario` | Formulário com abas e barra de ações fixa |
| `/sem-registros` | Estado vazio |
| `/configuracoes` | Configurações com nav lateral |
| `/wizard` | Wizard multi-etapas |
| `/contexto` | Seleção de contexto (menu lateral oculto) |

## Inicializando

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

## Scripts úteis

- `npm run dev` — inicia a aplicação em modo de desenvolvimento
- `npm run build` — gera a build de produção em `dist/`
- `npm run type-check` — verifica os tipos TypeScript
- `npm run lint` — executa oxlint + ESLint
- `npm run format` — formata os arquivos com Prettier
- `npm run preview` — serve localmente a build de produção

## IDE recomendada

[VS Code](https://code.visualstudio.com/) + extensão [Vue (Official) / Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (desabilite o Vetur se estiver instalado).
