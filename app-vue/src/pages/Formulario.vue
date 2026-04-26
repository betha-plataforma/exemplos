<template>
  <div>
  <LoadingOverlay />
  <PageHeader title="Formulário" />

  <form>
    <div class="row justify-content-center">
      <div class="col-12 col-lg-8">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <button
              type="button"
              class="nav-link"
              :class="{ active: activeTab === 1 }"
              @click="activeTab = 1"
            >
              Dados pessoais
            </button>
          </li>
          <li class="nav-item">
            <button
              type="button"
              class="nav-link"
              :class="{ active: activeTab === 2 }"
              @click="activeTab = 2"
            >
              Dados funcionais
            </button>
          </li>
          <li class="nav-item">
            <button type="button" class="nav-link" disabled>Aba desabilitada</button>
          </li>
        </ul>

        <div class="pt-3">
          <div v-show="activeTab === 1">
            <div class="alert alert-info">
              Exemplo de alerta com <RouterLink to="/visao-geral">link</RouterLink>.
            </div>

            <div class="row g-3">
              <div class="col-12">
                <label for="nomeInput" class="form-label required">Nome</label>
                <input id="nomeInput" type="text" class="form-control" placeholder="Informe o nome" />
              </div>

              <div class="col-12 col-lg-6">
                <label for="pasInput" class="form-label required">Pressão sanguínea</label>
                <div class="input-group">
                  <input id="pasInput" class="form-control" type="text" placeholder="PAS" />
                  <input
                    class="form-control"
                    type="text"
                    placeholder="PAD"
                    aria-label="Pressão arterial diastólica"
                  />
                </div>
              </div>

              <div class="col-12 col-lg-6">
                <label for="atividadeInput" class="form-label required">Atividade</label>
                <div class="input-group">
                  <input
                    id="atividadeInput"
                    class="form-control"
                    type="text"
                    value="Inativo"
                    disabled
                    readonly
                  />
                </div>
              </div>

              <div class="col-12 col-lg-4">
                <label for="cpfInput" class="form-label required">CPF</label>
                <input id="cpfInput" type="text" class="form-control" />
              </div>

              <div class="col-12 col-lg-8">
                <label for="enderecoInput" class="form-label">Endereço</label>
                <input id="enderecoInput" type="text" class="form-control" />
              </div>

              <div class="col-12 col-md-3">
                <label for="valorInput" class="form-label required">Valor</label>
                <div class="input-group">
                  <span class="input-group-text">R$</span>
                  <input id="valorInput" type="number" class="form-control" />
                </div>
              </div>

              <div class="col-12 col-md-3">
                <label for="tamanhoInput" class="form-label required">Tamanho</label>
                <div class="input-group">
                  <input id="tamanhoInput" type="text" class="form-control" />
                  <span class="input-group-text">m²</span>
                </div>
              </div>

              <div class="col-12 col-lg-6">
                <label for="anexoInput" class="form-label">Arquivo</label>
                <div class="input-group">
                  <input
                    id="anexoInput"
                    type="text"
                    class="form-control"
                    placeholder="Escolha um arquivo de seu dispositivo"
                    aria-label="Escolha um arquivo de seu dispositivo"
                    disabled
                  />
                  <label class="btn btn-secondary px-3 position-relative btn-sm" for="btnAnexo">
                    <input id="btnAnexo" class="visually-hidden" type="file" />
                    <MdiIcon name="paperclip" />
                    <span class="visually-hidden">Selecionar arquivo</span>
                  </label>
                </div>
              </div>

              <div class="col-12 col-sm-6">
                <label class="form-label d-block">Escolha uma ou mais opções</label>
                <div class="form-check form-check-inline">
                  <input id="inlineCheckbox1" class="form-check-input" type="checkbox" />
                  <label class="form-check-label" for="inlineCheckbox1">1</label>
                </div>
                <div class="form-check form-check-inline">
                  <input id="inlineCheckbox2" class="form-check-input" type="checkbox" />
                  <label class="form-check-label" for="inlineCheckbox2">2</label>
                </div>
                <div class="form-check form-check-inline">
                  <input id="inlineCheckbox3" class="form-check-input" type="checkbox" disabled />
                  <label class="form-check-label" for="inlineCheckbox3">3 (disabled)</label>
                </div>
              </div>

              <div class="col-12 col-sm-6">
                <label class="form-label d-block">Escolha uma das opções</label>
                <div class="form-check form-check-inline">
                  <input
                    id="inlineRadio1"
                    class="form-check-input"
                    type="radio"
                    name="escolha"
                    value="1"
                    checked
                  />
                  <label class="form-check-label" for="inlineRadio1">1</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    id="inlineRadio2"
                    class="form-check-input"
                    type="radio"
                    name="escolha"
                    value="2"
                  />
                  <label class="form-check-label" for="inlineRadio2">2</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    id="inlineRadio3"
                    class="form-check-input"
                    type="radio"
                    name="escolha"
                    value="3"
                    disabled
                  />
                  <label class="form-check-label" for="inlineRadio3">3 (disabled)</label>
                </div>
              </div>

              <div class="col-12">
                <label for="descricaoInput" class="form-label">Descrição</label>
                <textarea id="descricaoInput" class="form-control" rows="3"></textarea>
              </div>

              <div class="col-12">
                <div class="form-check form-switch float-end">
                  <input
                    id="receberAtualizacoes"
                    class="form-check-input"
                    type="checkbox"
                    checked
                  />
                  <label class="form-check-label" for="receberAtualizacoes">
                    Receber atualizações
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div v-show="activeTab === 2">
            <p class="mb-0">Aba de dados funcionais</p>
          </div>

          <div v-show="activeTab === 3"></div>
        </div>
      </div>
    </div>

    <div class="container-fluid bg__gray--l40 border-top position-sticky mt-5 py-3 sticky-actions">
      <div class="row justify-content-end">
        <div class="col-auto">
          <button type="button" class="btn btn-primary">Salvar</button>
          <button type="button" class="btn btn-secondary ms-1">Cancelar</button>
        </div>
      </div>
    </div>
  </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import LoadingOverlay from '@/components/LoadingOverlay.vue'
import PageHeader from '@/components/PageHeader.vue'
import MdiIcon from '@/components/MdiIcon.vue'

const activeTab = ref(1)
</script>
