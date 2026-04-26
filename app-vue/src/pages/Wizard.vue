<template>
  <div>
  <LoadingOverlay />
  <PageHeader title="Wizard" />

  <form>
    <div class="row justify-content-center">
      <div class="col-12 col-lg-8">
        <ul class="nav nav-tabs nav-wizard">
          <li class="nav-item">
            <button
              type="button"
              class="nav-link"
              :class="{ active: activeStep === 1, checked: activeStep > 1 }"
              @click="activeStep = 1"
            >
              Etapa 1
            </button>
          </li>
          <li class="nav-item">
            <button
              type="button"
              class="nav-link"
              :class="{ active: activeStep === 2, checked: activeStep > 2 }"
              @click="activeStep = 2"
            >
              Etapa 2
            </button>
          </li>
          <li class="nav-item">
            <button
              type="button"
              class="nav-link"
              :class="{ active: activeStep === 3 }"
              @click="activeStep = 3"
            >
              Etapa 3
            </button>
          </li>
          <li class="nav-item">
            <button type="button" class="nav-link" disabled>Etapa 4</button>
          </li>
        </ul>

        <div class="mt-3">
          <div v-show="activeStep === 1">
            <div class="row g-3">
              <div class="col-12">
                <label for="wizardNome" class="form-label required">Nome</label>
                <input
                  id="wizardNome"
                  type="text"
                  class="form-control"
                  placeholder="Informe o nome"
                />
              </div>

              <div class="col-12 col-lg-6">
                <label for="wizardPas" class="form-label required">Pressão sanguínea</label>
                <div class="input-group">
                  <input id="wizardPas" class="form-control" type="text" placeholder="PAS" />
                  <input
                    class="form-control"
                    type="text"
                    placeholder="PAD"
                    aria-label="Pressão arterial diastólica"
                  />
                </div>
              </div>

              <div class="col-12 col-lg-6">
                <label for="wizardAtividade" class="form-label required">Atividade</label>
                <div class="input-group">
                  <input
                    id="wizardAtividade"
                    class="form-control"
                    type="text"
                    value="Inativo"
                    disabled
                    readonly
                  />
                </div>
              </div>

              <div class="col-12 col-lg-4">
                <label for="wizardCpf" class="form-label required">CPF</label>
                <input id="wizardCpf" type="text" class="form-control" />
              </div>

              <div class="col-12 col-lg-8">
                <label for="wizardEndereco" class="form-label">Endereço</label>
                <input id="wizardEndereco" type="text" class="form-control" />
              </div>
            </div>
          </div>

          <div v-show="activeStep === 2">
            <p class="mb-0">Conteúdo da etapa 2</p>
          </div>

          <div v-show="activeStep === 3">
            <p class="mb-0">Conteúdo da etapa 3</p>
          </div>

          <div v-show="activeStep === 4">
            <p class="mb-0">Conteúdo da etapa 4</p>
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid bg__gray--l40 border-top position-sticky mt-5 py-3 sticky-actions">
      <div class="row align-items-center">
        <div class="col">
          <button
            type="button"
            class="btn btn-secondary me-1"
            title="Anterior"
            :disabled="activeStep === 1"
            @click="previous"
          >
            <MdiIcon name="arrow-left" />
            <span class="d-none d-lg-inline-block ms-2">Anterior</span>
          </button>
          <button type="button" class="btn btn-secondary" title="Próximo" @click="next">
            <span class="d-none d-lg-inline-block me-2">Próximo</span>
            <MdiIcon name="arrow-right" />
          </button>
        </div>
        <div class="col-auto">
          <button type="button" class="btn btn-primary" :disabled="activeStep !== 3">Salvar</button>
          <button type="button" class="btn btn-secondary ms-1">Cancelar</button>
        </div>
      </div>
    </div>
  </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LoadingOverlay from '@/components/LoadingOverlay.vue'
import PageHeader from '@/components/PageHeader.vue'
import MdiIcon from '@/components/MdiIcon.vue'

const activeStep = ref(1)
const next = () => { activeStep.value = Math.min(activeStep.value + 1, 3) }
const previous = () => { activeStep.value = Math.max(activeStep.value - 1, 1) }
</script>
