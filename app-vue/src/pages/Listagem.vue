<template>
  <div>
  <LoadingOverlay />
  <PageHeader title="Listagem" />

  <div class="row align-items-center">
    <div class="col-12 col-lg-auto">
      <div class="btn-group">
        <button type="button" class="btn btn-sm btn-success" @click="openModal">
          <MdiIcon name="plus" extra-class="h6 m-0 me-1" />
          Registro
        </button>
        <div class="btn-group" role="group">
          <button
            type="button"
            class="btn btn-sm btn-success dropdown-toggle"
            id="registro-opcoes"
            aria-label="Abrir opções de registro"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <MdiIcon name="chevron-down" />
          </button>
          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="registro-opcoes">
            <li>
              <button type="button" class="dropdown-item">
                <MdiIcon name="cog" extra-class="me-2" />
                Outra opção
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="col-12 col-lg my-3 my-lg-0 text-lg-end">
      <button type="button" class="btn btn-sm btn-link">
        <MdiIcon name="cog" extra-class="me-1" />Opção 1
      </button>
      <button type="button" class="btn btn-sm btn-link">
        <MdiIcon name="cog" extra-class="me-1" />Opção 2
      </button>
      <button type="button" class="btn btn-sm btn-link">
        <MdiIcon name="cog" extra-class="me-1" />Opção 3
      </button>
      <div class="dropdown d-inline-block">
        <button
          type="button"
          class="btn btn-link btn-sm no-caret"
          id="listagem-opcoes"
          aria-label="Mais opções"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <MdiIcon name="dots-vertical" />
        </button>
        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="listagem-opcoes">
          <li v-for="option in [4, 5, 6]" :key="option">
            <button type="button" class="dropdown-item">
              <MdiIcon name="cog" extra-class="me-2" />
              Opção {{ option }}
            </button>
          </li>
        </ul>
      </div>
    </div>

    <div class="col-12 col-lg-3">
      <label class="visually-hidden" for="buscaListagem">Pesquisar na listagem</label>
      <div class="input-group">
        <input
          id="buscaListagem"
          class="form-control"
          type="search"
          placeholder="O que você está buscando?"
        />
        <button type="button" class="btn btn-sm btn-secondary" aria-label="Pesquisar">
          <MdiIcon name="magnify" />
        </button>
      </div>
    </div>
  </div>

  <div class="row my-3">
    <div class="col-12">
      <div class="px-lg-1 p-2 py-lg-0 bg__gray--l30 small">
        <div class="row m-0 align-items-center">
          <div class="col-12 col-lg-auto my-1 my-lg-0">
            <p class="m-0 fw-bold text-uppercase me-2">Filtrar por</p>
          </div>
          <div class="col-12 col-lg">
            <button
              v-for="filter in LIST_FILTERS"
              :key="filter"
              type="button"
              class="btn btn-sm btn-link text-capitalize"
              :class="{ active: activeFilter === filter }"
              :aria-pressed="activeFilter === filter"
              @click="activeFilter = filter"
            >
              {{ filter }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="row mb-0">
    <div class="col-12">
      <table class="table table-hover table-card table-pointer" style="table-layout: fixed">
        <thead>
          <tr>
            <th style="width: 30px">
              <div class="form-check">
                <input id="checkTableAll" type="checkbox" class="form-check-input" />
                <label class="form-check-label" for="checkTableAll">
                  <span class="visually-hidden">Selecionar todos os registros</span>
                </label>
              </div>
            </th>
            <th v-for="column in ['Coluna 1', 'Coluna 2', 'Coluna 3', 'Coluna 4']" :key="column">
              <button type="button" class="btn btn-link p-0">{{ column }}</button>
            </th>
            <th style="width: 80px"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="record in filteredRecords" :key="record.id">
            <td>
              <div class="form-check">
                <input
                  :id="`checkTable${record.id}`"
                  type="checkbox"
                  class="form-check-input"
                />
                <label class="form-check-label" :for="`checkTable${record.id}`">
                  <span class="visually-hidden">Selecionar registro {{ record.id }}</span>
                </label>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <img
                  class="rounded-circle me-3"
                  width="40"
                  height="40"
                  :src="record.avatarUrl"
                  alt=""
                />
                <div>
                  <button type="button" class="btn btn-link p-0">{{ record.name }}</button>
                  <p class="m-0 small text-muted">{{ record.complement }}</p>
                </div>
              </div>
            </td>
            <td>{{ record.column2 }}</td>
            <td>
              <button type="button" class="btn btn-link p-0 text-truncate">
                {{ record.column3Main }}
              </button>
              <p class="m-0 small text-muted text-truncate">{{ record.column3Complement }}</p>
            </td>
            <td>
              <span :class="record.badgeClass">{{ record.status }}</span>
            </td>
            <td class="text-end">
              <ItemActions :id="record.id" aria-label="Abrir ações do registro" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="row">
    <div class="col">
      <nav class="float-end" aria-label="Paginação da listagem">
        <ul class="pagination">
          <li class="page-item">
            <button type="button" class="page-link">
              <MdiIcon name="chevron-left" extra-class="me-1" />
              Anterior
            </button>
          </li>
          <li v-for="page in [1, 2, 3]" :key="page" class="page-item">
            <button type="button" class="page-link">{{ page }}</button>
          </li>
          <li class="page-item">
            <button type="button" class="page-link">
              Próxima
              <MdiIcon name="chevron-right" extra-class="ms-1" />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>

  <!-- Modal -->
  <div ref="modalRef" class="modal fade" tabindex="-1" aria-labelledby="registroModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title" id="registroModalLabel">Adicionando registro 123</h4>
          <button type="button" class="btn-close" @click="closeModal" aria-label="Fechar"></button>
        </div>

        <form>
          <div class="modal-body">
            <div class="row">
              <div class="col-12">
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
                        <label for="modalNome" class="form-label required">Nome</label>
                        <input
                          id="modalNome"
                          type="text"
                          class="form-control"
                          placeholder="Informe o nome"
                        />
                      </div>
                      <div class="col-12 col-lg-4">
                        <label for="modalCpf" class="form-label required">CPF</label>
                        <input id="modalCpf" type="text" class="form-control" />
                      </div>
                      <div class="col-12 col-lg-8">
                        <label for="modalEndereco" class="form-label">Endereço</label>
                        <input id="modalEndereco" type="text" class="form-control" />
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
          </div>

          <div class="modal-footer">
            <div class="row w-100 align-items-center">
              <div class="col">
                <button type="button" class="btn btn-secondary" @click="nextStep">
                  <span class="d-none d-lg-inline-block me-2">Próximo</span>
                  <MdiIcon name="arrow-right" />
                </button>
              </div>
              <div class="col-auto">
                <button type="button" class="btn btn-primary" :disabled="activeStep !== 3">
                  Salvar
                </button>
                <button type="button" class="btn btn-secondary ms-1" @click="closeModal">
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Modal } from 'bootstrap'
import { LIST_FILTERS, LIST_RECORDS } from '@/data/examples'
import type { ListFilter } from '@/data/examples'
import LoadingOverlay from '@/components/LoadingOverlay.vue'
import PageHeader from '@/components/PageHeader.vue'
import MdiIcon from '@/components/MdiIcon.vue'
import ItemActions from '@/components/ItemActions.vue'

const activeFilter = ref<ListFilter>('Todos')
const activeStep = ref(1)
const modalRef = ref<HTMLElement | null>(null)
let bsModal: Modal | null = null

const filteredRecords = computed(() => {
  if (activeFilter.value === 'Todos') return LIST_RECORDS
  return LIST_RECORDS.filter((record) => record.status === activeFilter.value)
})

onMounted(() => {
  bsModal = new Modal(modalRef.value!)
})

onUnmounted(() => {
  bsModal?.dispose()
})

function openModal() {
  bsModal?.show()
}

function closeModal() {
  activeStep.value = 1
  bsModal?.hide()
}

function nextStep() {
  activeStep.value = Math.min(activeStep.value + 1, 3)
}
</script>
