# app-angular

Exemplo de aplicação Angular 21 que demonstra a integração do tema Bootstrap 5 da Betha com os web components do pacote [@betha-plataforma/estrutura-componentes](https://github.com/betha-plataforma/estrutura-componentes).

## O que este projeto demonstra

- shell da aplicação com `bth-app` e menu lateral
- registro dos custom elements Betha em [src/app/app.config.ts](./src/app/app.config.ts)
- integração entre eventos dos web components e o roteamento Angular em [src/app/app.ts](./src/app/app.ts)
- uso de componentes standalone com lazy loading por rota
- páginas de exemplo para visão geral, dashboard, listagem, lista de cards, timeline, formulário, sem registros, configurações, wizard e seleção de contexto

## Stack utilizada

- Angular 21.2
- TypeScript 5.9
- Bootstrap 5.3
- ng-bootstrap 20
- Vitest 4
- [@betha-plataforma/theme-bootstrap5](https://www.npmjs.com/package/@betha-plataforma/theme-bootstrap5)
- [@betha-plataforma/estrutura-componentes](https://www.npmjs.com/package/@betha-plataforma/estrutura-componentes)
- [@mdi/font](https://www.npmjs.com/package/@mdi/font)

## Estrutura principal

- [src/main.ts](./src/main.ts): bootstrap da aplicação
- [src/app/app.config.ts](./src/app/app.config.ts): aplica os polyfills e registra os custom elements com `defineCustomElements()`
- [src/app/app.ts](./src/app/app.ts): configura menu, utilitários, notificações, novidades, conta do usuário e o vínculo com o `Router`
- [src/app/app.html](./src/app/app.html): define a casca da aplicação com `bth-app`
- [angular.json](./angular.json): importa os estilos globais do Bootstrap, Material Design Icons, `theme-bootstrap5`, `estrutura-componentes` e [src/styles.scss](./src/styles.scss)

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

Inicie o servidor de desenvolvimento em `http://localhost:4200`:

```bash
npm start
```

## Scripts úteis

- `npm start`: inicia a aplicação em modo de desenvolvimento
- `npm run build`: gera a build de produção em `dist/`
- `npm run watch`: recompila a aplicação em modo desenvolvimento a cada alteração
- `npm test`: executa os testes unitários com Vitest

## Observações

- O projeto usa `npm` como gerenciador de pacotes e declara `npm@11.12.1` em [package.json](./package.json).
- Os dados de autorização, usuário e utilitários definidos em [src/app/app.ts](./src/app/app.ts) são exemplos para demonstrar a integração com os componentes Betha.
- Os assets públicos são servidos a partir da pasta [public](./public).
- Não há suíte de testes e2e configurada neste exemplo.
s