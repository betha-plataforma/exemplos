# autenticacao-spring-boot

Projeto para demonstrar a integração entre o fluxo de login da Plataforma Betha com uma aplicação rodando 
com Spring Boot. Embora esse exemplo tenha sido criado com Spring Boot, os códigos podem ser facilmente adaptados para 
outra tecnologia. 

# Autenticação
A camada de autenticação/autorização da Plataforma é disponibilizada sobre o protocolo OAuth 2. O OAuth 2 é um protocolo 
amplamente utilizado, principalmente por grandes players de plataforma, provendo acesso aos seus recursos de 
forma segura para aplicações de terceiros. 

Esse [artigo](https://www.digitalocean.com/community/tutorials/uma-introducao-ao-oauth-2-pt) pode ser útil para ajudar no entendimento

# Executando a aplicação

Para executar a aplicação, as seguintes ferramentas devem estar instaladas:

* Java 8 (ou superior)
* Maven 3.5.4 (ou superior)

No terminal, executar o comando:

```shell script
mvn spring-boot:run
```

Após, abrir o navegador em `http://localhost:8080`

Na página de login, é demonstrado a possibilidade do usuário fazer login com as credenciais da aplicação ou escolher fazer login utilizando as credenciais da Betha. Clicando em "Acessar com Betha Sistemas", o usuário é redirecionado para a página de login da Betha, porém caso o mesmo já se encontre autenticado com a Betha, a autenticação com a aplicação ocorre de forma transparente. 

<p align="center">
    <img src="login.png" width="350px" height="350px" />
</p>

Também foi implementado uma tela que demonstra como a aplicação poderia fazer o vínculo de um usuário de sua base com usuário da base da Betha:

<p align="center">
    <img src="login.png" width="350px" height="350px" />
</p>
