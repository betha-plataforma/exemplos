<template>
  <div>
  <LoadingOverlay />
  <PageHeader title="Configurações" />

  <form>
    <div class="row mt-3">
      <div class="col-12 col-lg-3">
        <div class="d-flex">
          <ul class="nav nav-tabs flex-column">
            <li class="nav-item">
              <button
                type="button"
                class="nav-link"
                :class="{ active: activeTab === 1 }"
                @click="activeTab = 1"
              >
                Aba 1
              </button>
            </li>
            <li class="nav-item">
              <button
                type="button"
                class="nav-link"
                :class="{ active: activeTab === 2 }"
                @click="activeTab = 2"
              >
                Aba 2
              </button>
            </li>
            <li class="nav-item">
              <button type="button" class="nav-link" disabled>Aba desabilitada</button>
            </li>
          </ul>
        </div>
      </div>

      <div class="col-12 col-lg-9">
        <div class="pt-3 pt-lg-0">
          <div v-show="activeTab === 1">
            <div class="row mb-3">
              <div class="col-12">
                <h5 class="tx__gray--d20 mb-3">
                  <MdiIcon name="cog" extra-class="me-2" />
                  Subtítulo 1
                </h5>
              </div>
            </div>

            <div class="row align-items-center mb-3">
              <div class="col-auto">
                <div class="form-check form-switch">
                  <input id="opcaoAtiva1" class="form-check-input" type="checkbox" checked />
                  <label class="form-check-label" for="opcaoAtiva1">&nbsp;</label>
                </div>
              </div>
              <div class="col">
                <p class="m-0">Este é o título da opção a ser ativada</p>
                <p class="m-0 small text-muted">
                  Este é um texto explicativo sobre a opção atual em detalhes para o usuário.
                </p>
              </div>
            </div>

            <div class="row align-items-center">
              <div class="col-auto">
                <div class="form-check form-switch">
                  <input id="opcaoAtiva2" class="form-check-input" type="checkbox" />
                  <label class="form-check-label" for="opcaoAtiva2">&nbsp;</label>
                </div>
              </div>
              <div class="col">
                <p class="m-0">Este é o título da opção a ser ativada</p>
                <p class="m-0 small text-muted">
                  Este é um texto explicativo sobre a opção atual em detalhes para o usuário.
                </p>
              </div>
            </div>

            <div class="row mt-5">
              <div class="col-12">
                <h5 class="tx__gray--d20 mb-3">
                  <MdiIcon name="cog" extra-class="me-2" />
                  Subtítulo 2
                </h5>
              </div>
            </div>

            <div class="row">
              <div class="col-12 col-sm-6 col-lg-3">
                <label for="tempoInatividade" class="form-label">Tempo de inatividade</label>
                <select id="tempoInatividade" class="form-select">
                  <option value="10" selected>10 minutos</option>
                  <option value="20">20 minutos</option>
                  <option value="30">30 minutos</option>
                </select>
              </div>
            </div>

            <div class="row mt-5">
              <div class="col-12">
                <h5 class="tx__gray--d20 mb-3">
                  <MdiIcon name="cog" extra-class="me-2" />
                  Subtítulo 3
                </h5>
              </div>
            </div>

            <div class="row">
              <div class="col-12">
                <div v-for="option in [1, 2, 3]" :key="option" class="form-check form-check-inline">
                  <input
                    :id="`perfil${option}`"
                    class="form-check-input"
                    type="radio"
                    name="perfil"
                    :value="option"
                    :checked="option === 1"
                    :disabled="option === 3"
                  />
                  <label class="form-check-label" :for="`perfil${option}`">
                    Opção {{ option }}{{ option === 3 ? ' (disabled)' : '' }}
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div v-show="activeTab === 2">
            <p class="mb-0">Dolor sit amet</p>
          </div>

          <div v-show="activeTab === 3"></div>
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

const activeTab = ref(1)
</script>
