# exemplos

Repositório com exemplos de integração com a Plataforma Betha, cobrindo diferentes tecnologias de front-end e back-end.

## Exemplos disponíveis

### Front-end

| Projeto | Tecnologia | Descrição |
|---|---|---|
| [app-angular](./app-angular) | Angular 21 + TypeScript | Exemplo de SPA Angular com integração dos web components `@betha-plataforma/estrutura-componentes` e tema Bootstrap 5. Demonstra registro de custom elements, roteamento lazy e 10 páginas de referência (listagem, dashboard, wizard, etc.). |
| [app-react](./app-react) | React 19 + Vite | Exemplo de SPA React com a mesma integração dos web components e tema Betha. Utiliza React Bootstrap para componentes UI e React Router para navegação. |
| [app-vue](./app-vue) | Vue 3 + Vite | Exemplo de SPA Vue 3 (Composition API) com integração dos web components Betha. Destaca o padrão `disposed` para evitar race conditions na inicialização assíncrona dos custom elements. |
| [app-angularjs](./app-angularjs) | AngularJS + Webpack | Exemplo legado com AngularJS demonstrando o uso dos web components `@betha-plataforma/estrutura-componentes` em aplicações mais antigas. |

### Back-end

| Projeto | Tecnologia | Descrição |
|---|---|---|
| [autenticacao-spring-boot](./autenticacao-spring-boot) | Java + Spring Boot | Demonstra a integração do fluxo OAuth 2 (Authorization Code) da Plataforma Betha com uma aplicação Spring Boot, incluindo login, callback, troca de código por access token e renovação automática de sessão. |
| [cadastro-unico-integracao](./cadastro-unico-integracao) | Java + Spring Boot + Docker | Exemplo de integração com a API de Cadastro Único da Plataforma Betha, demonstrando sincronização near real-time de entidades entre sistemas via chave natural, changesets e webhooks.
