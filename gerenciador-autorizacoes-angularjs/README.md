# Gerenciador de Autorizações com AngularJS

Frontend AngularJS do exemplo de integração com o Gerenciador de Autorizações da Plataforma Betha. O projeto utiliza [autenticacao-spring-boot](../autenticacao-spring-boot) como BFF e os componentes de `@betha-plataforma/estrutura-componentes` na interface.

Este projeto foi criado separadamente para que `estrutura-componentes-angularjs` continue sendo somente uma demonstração dos componentes, sem depender dos fluxos de autenticação e autorização.

Não existem usuário, token ou permissões simuladas. O navegador consulta somente o BFF local e recebe uma visão segura da sessão, sem access token ou refresh token Betha.

## Executando

Requisitos: Node.js 18 ou superior, npm e o backend configurado conforme as instruções de [autenticacao-spring-boot](../autenticacao-spring-boot/README.md).

```shell
npm ci
npm start
```

O servidor de desenvolvimento abre `http://localhost:8000` e encaminha `/api`, `/login`, `/callback` e `/logout` para o Spring Boot em `http://localhost:8080`.

O backend deve estar configurado e em execução antes de acessar a aplicação. O fluxo normal começa em:

```text
http://localhost:8080
```

## O que o exemplo demonstra

- usuário real no `bth-conta-usuario` e logout Betha;
- seleção de entidade com `bth-selecao-contexto` quando houver vários acessos;
- troca posterior de entidade sem novo login;
- produtos acessíveis pelo `bth-marca-produto`, através do BFF;
- link contextual para o Gerenciador de Acessos disponível a administradores;
- menus e rotas condicionados pelas capabilities retornadas pelo backend;
- CRUD com consultar, incluir, alterar e excluir independentes;
- aceite do termo de responsabilidade;
- bloqueio por restrição, timeout, desconexão administrativa ou login concorrente;
- registro de atividade sem enviar eventos a cada interação.

Menus e botões são apenas feedback visual. A autorização definitiva ocorre novamente no backend antes de cada endpoint protegido.

## Scripts

```shell
npm run build   # build de produção
npm run watch   # build incremental
npm start       # webpack-dev-server na porta 8000
```

O projeto usa webpack 5 para ser compatível com versões atuais do Node, sem `--openssl-legacy-provider`.
