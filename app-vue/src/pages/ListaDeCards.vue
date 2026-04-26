<template>
  <div>
  <LoadingOverlay />
  <PageHeader title="Lista de cards">
    <div class="col-12 col-lg-auto my-3 my-lg-0">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <button type="button" class="btn btn-link p-0">Grupo</button>
          </li>
          <li class="breadcrumb-item">
            <button type="button" class="btn btn-link p-0">Subgrupo</button>
          </li>
          <li class="breadcrumb-item active" aria-current="page">Item</li>
        </ol>
      </nav>
    </div>
  </PageHeader>

  <div class="row align-items-center mb-3">
    <div class="col">
      <div class="btn-group">
        <button
          type="button"
          class="btn btn-sm btn-success"
          aria-label="Adicionar arquivo"
          @click="openModal"
        >
          <MdiIcon name="plus" extra-class="h6 m-0 me-1" />
          Arquivo
        </button>
      </div>
    </div>

    <div class="col-auto">
      <div class="d-block pe-1">
        <div v-for="avatar in CARD_AVATARS" :key="avatar" class="d-inline-block me-n1">
          <img class="rounded-circle border" width="30" height="30" alt="" :src="avatar" />
        </div>
      </div>
    </div>

    <div class="col-12 col-lg-3 my-3 my-lg-0">
      <label class="visually-hidden" for="buscaCards">Pesquisar na lista de cards</label>
      <div class="input-group">
        <input
          id="buscaCards"
          class="form-control"
          type="search"
          placeholder="O que você está buscando?"
        />
        <button type="button" class="btn btn-secondary" aria-label="Pesquisar">
          <MdiIcon name="magnify" />
        </button>
      </div>
    </div>
  </div>

  <div class="row">
    <div
      v-for="file in FILE_CARDS"
      :key="file.id"
      class="col-12 col-sm-6 col-md-3 col-lg-2"
    >
      <div class="card mb-2">
        <div class="card-body p-0 overflow-hidden file-card-preview">
          <img class="w-100 file-card-image" :src="file.imageUrl" alt="" />
        </div>
        <div class="card-footer bg__gray--l40">
          <div class="row m-0 align-items-center">
            <div class="col-10">
              <p class="text-truncate m-0">{{ file.title }}</p>
            </div>
            <div class="col-2 text-end">
              <ItemActions :id="file.id" aria-label="Abrir ações do arquivo" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div ref="modalRef" class="modal fade" tabindex="-1" aria-labelledby="fileModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title" id="fileModalLabel">Salvando arquivo</h4>
          <button type="button" class="btn-close" @click="closeModal" aria-label="Fechar"></button>
        </div>

        <form>
          <div class="modal-body">
            <div class="row">
              <div class="col-12">
                <label class="visually-hidden" for="anexoInputModal">Arquivo</label>
                <div class="input-group">
                  <input
                    id="anexoInputModal"
                    type="text"
                    class="form-control"
                    placeholder="Escolha um arquivo de seu dispositivo"
                    aria-label="Escolha um arquivo de seu dispositivo"
                    disabled
                  />
                  <label class="btn btn-secondary px-3 position-relative btn-sm" for="btnAnexoModal">
                    <input id="btnAnexoModal" class="visually-hidden" type="file" />
                    <MdiIcon name="paperclip" />
                    <span class="visually-hidden">Selecionar arquivo</span>
                  </label>
                </div>
              </div>

              <div class="col-12 py-3">
                <div class="progress">
                  <div
                    class="progress-bar"
                    role="progressbar"
                    style="width: 80%"
                    aria-valuenow="80"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <p class="m-0 mt-1 text-muted">Carregando...</p>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="closeModal">Salvar</button>
            <button type="button" class="btn btn-secondary" @click="closeModal">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Modal } from 'bootstrap'
import { CARD_AVATARS, FILE_CARDS } from '@/data/examples'
import LoadingOverlay from '@/components/LoadingOverlay.vue'
import PageHeader from '@/components/PageHeader.vue'
import MdiIcon from '@/components/MdiIcon.vue'
import ItemActions from '@/components/ItemActions.vue'

const modalRef = ref<HTMLElement | null>(null)
let bsModal: Modal | null = null

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
  bsModal?.hide()
}
</script>
