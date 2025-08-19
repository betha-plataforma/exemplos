# cadastro-unico-integracao

---

## 1) O que é e como funciona

* **Repositório cadastral** reutilizável (autocomplete entre sistemas).
* **Sincronização near real‑time** entre sistemas por **chave natural**.
* Cada mudança gera **changeset/pendência**, com regra de aceite **por campo** (sempre/nunca/pendência). Por padrão, **rejeita** alterações de terceiros.

---

## 2) Configuração rápida

Executar docker-compose para subir o serviço:

```bash
docker-compose up -d
```

### Configuração do `application.yml`

```yaml
cadastro-unico:
  base-url: https://plataforma-cadastro-unico.betha.cloud
  token: seutokenaqui   # Bearer token gerado no Studio
  user-access: seuuseraccessaqui   # User-Access gerado no Studio

oauth2:
  token-info-url: https://plataforma-oauth.betha.cloud/auth/oauth2/tokeninfo

webhook:
  jwt-secret: suasecretkeyaqui   # Chave secreta para validar webhooks (≥ 32 caracteres)
  jwt-algorithm: HS256
```

* **Auth**: `Authorization: Bearer <TOKEN>` + `User-Access: <USER>`.

---

## 2.1) Geração de credenciais (obrigatório)

* No **Studio → Credenciais**, crie uma credencial do tipo **Serviço** para o seu sistema.
* **Adicione a API *Cadastro Único*** à credencial (obrigatório para autorizar chamadas).
* Guarde:
    * **Bearer token** (usado em `Authorization: Bearer <TOKEN>`);
        * **User-Access** (enviado no header `User-Access`).
* Passo a passo detalhado (gerar **credencial** e **User-Access**):
  [https://studio.ajuda.betha.cloud/aplicacoes/studio/credenciais](https://studio.ajuda.betha.cloud/aplicacoes/studio/credenciais)

---

## 3) Configuração do resource e sincronização via API

1. **Vincular resource** → `POST/PUT /api/v2/resources/{templateId}/{aggregate}`
    * Configure: `acceptCriteria`, `disableEvaluationConfig`, `callbackConfig.webhook.url` e `secretToken` (≥ 32).
2. **Enviar updates (Commands)** → `POST /api/v2/commands` (`action=UPDATE`)
    * `data = { template, aggregate, id (chave natural), user, data (snapshot completo) }`.
3. **Receber webhooks** em **`POST /webhook/eventos`** (nesta app)
    * JWT **HS256** no corpo (`jwtSignature`); claims com `data` e possivelmente `changesetId` e `diff` (**JSON Patch**).
    * Processar e persistir. **Idempotência** por `changesetId`. **Ordem garantida** por registro.

---

## 4) Referências

* Documentação sobre o serviço: [https://studio.ajuda.betha.cloud/aplicacoes/cadastro-unico/apresentacao](https://studio.ajuda.betha.cloud/aplicacoes/cadastro-unico/apresentacao)
* Documentação da API: [https://plataforma-cadastro-unico.betha.cloud/swagger-ui.html](https://plataforma-cadastro-unico.betha.cloud/swagger-ui.html)
* Criação de resources: [https://plataforma-cadastro-unico.betha.cloud/swagger-ui.html#/resource-controller/createUsingPOST\_1](https://plataforma-cadastro-unico.betha.cloud/swagger-ui.html#/resource-controller/createUsingPOST_1)
* Envio de commands: [https://plataforma-cadastro-unico.betha.cloud/swagger-ui.html#/command-resource/sendUsingPOST](https://plataforma-cadastro-unico.betha.cloud/swagger-ui.html#/command-resource/sendUsingPOST)
* Status report: [https://plataforma-cadastro-unico.betha.cloud/swagger-ui.html#/command-resource/statusReportUsingPOST](https://plataforma-cadastro-unico.betha.cloud/swagger-ui.html#/command-resource/statusReportUsingPOST)
* API de webhooks: [https://plataforma-cadastro-unico.betha.cloud/swagger-ui.html#/webhook-event-controller](https://plataforma-cadastro-unico.betha.cloud/swagger-ui.html#/webhook-event-controller)

## 5) FAQ

* **Como funciona a sincronização?**
    * O Cadastro Único envia updates de outros sistemas via webhooks.
    * Você recebe esses updates e processa as mudanças.
    * Você envia updates via commands para atualizar dados no Cadastro Único e os demais sistemas inscritos no mesmo resource recebem essas alterações.
* **O que é um changeset?**
    * É um conjunto de mudanças que podem ser aceitas ou rejeitadas.
    * A configuração padrão de aceite é definida no resource, porém você pode personalizar as regras de aceite pela interface de gestão de aceites do Cadastro Único.
* **O que é um webhook?**
    * É uma notificação enviada pelo Cadastro Único quando há mudanças.
    * Você deve implementar um endpoint para receber esses webhooks.
* **O que é o status report?**
    * É uma confirmação de que você processou o webhook recebido.
    * Você deve enviar o status report para informar se o processamento foi bem-sucedido ou falhou.
    * O status report é importante para garantir a integridade dos dados e a continuidade do fluxo de sincronização.
    * **Falhas no processamento do webhook devem ser tratadas e reportadas**, para que apareçam na interface de gestão de aceites e o usuário responsável possa visualizar e tratar as alterações.

