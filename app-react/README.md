# theme-bootstrap-5-react

Exemplo de aplicação React que demonstra a integração do tema Bootstrap 5 da Betha com os web components do pacote [@betha-plataforma/estrutura-componentes](https://github.com/betha-plataforma/estrutura-componentes).

## O que este projeto demonstra

- shell da aplicação com `bth-app` e menu lateral
- registro dos custom elements Betha no bootstrap React
- integração entre eventos dos web components e o roteamento React
- uso de React Bootstrap para dropdowns, modais, abas, wizard, alertas e barra de progresso
- páginas de exemplo para visão geral, dashboard, listagem, lista de cards, timeline, formulário, sem registros, configurações, wizard e seleção de contexto

## Stack utilizada

- React 19
- Vite
- Bootstrap 5
- React Bootstrap
- [@betha-plataforma/theme-bootstrap5](https://www.npmjs.com/package/@betha-plataforma/theme-bootstrap5)
- [@betha-plataforma/estrutura-componentes](https://www.npmjs.com/package/@betha-plataforma/estrutura-componentes)
- [@mdi/font](https://www.npmjs.com/package/@mdi/font)

## Rotas disponíveis

- `/visao-geral`
- `/dashboard`
- `/listagem`
- `/lista-de-cards`
- `/timeline`
- `/formulario`
- `/sem-registros`
- `/configuracoes`
- `/wizard`
- `/contexto`

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

- `npm run dev`: inicia a aplicação em modo de desenvolvimento
- `npm run build`: gera a build de produção em `dist/`
- `npm run lint`: executa o ESLint
- `npm run preview`: serve localmente a build de produção
