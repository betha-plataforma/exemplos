<template>
  <div>
  <LoadingOverlay />
  <PageHeader title="Sem registros" />

  <div class="row">
    <div class="col-12 text-center my-5">
      <img
        src="/img/ilustracoes_semregistros.svg"
        width="349"
        height="276"
        class="img-fluid mb-5"
        alt="Ilustração indicando ausência de registros"
      />
      <p class="h5 mb-0">
        Ainda não há itens por aqui. <RouterLink to="/formulario">Adicionar</RouterLink>
      </p>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import LoadingOverlay from '@/components/LoadingOverlay.vue'
import PageHeader from '@/components/PageHeader.vue'
</script>
