<template>
  <div>
  <LoadingOverlay />
  <PageHeader title="Visão geral" />

  <div class="row">
    <div class="col-12">
      <p class="m-0">
        Neste projeto, você encontrará demonstrações de estruturas básicas que podem servir de
        base para o seu projeto.
      </p>
    </div>
  </div>

  <div class="row mt-4">
    <div class="col-12">
      <h5>Projetando</h5>
    </div>
  </div>

  <div class="row">
    <div
      v-for="principle in PRINCIPLES"
      :key="principle.title"
      class="col-12 col-sm-6 col-lg-4 pb-2"
    >
      <div class="card card-body h-100">
        <i :class="principle.iconClass" aria-hidden="true"></i>
        <p class="h6 mb-0">{{ principle.title }}</p>
      </div>
    </div>
  </div>

  <div class="row mt-4">
    <div class="col-12">
      <h5>Programando</h5>
      <p>Ao começar uma solução, você deverá seguir a ordem:</p>
      <ol class="mb-0">
        <li><strong>Login</strong></li>
        <li>
          <strong>Seleção de contexto</strong>:
          <RouterLink to="/contexto">
            Veja exemplo
            <MdiIcon name="open-in-new" extra-class="ms-1" />
          </RouterLink>
        </li>
        <li><strong>Sua solução</strong></li>
      </ol>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { PRINCIPLES } from '@/data/examples'
import LoadingOverlay from '@/components/LoadingOverlay.vue'
import PageHeader from '@/components/PageHeader.vue'
import MdiIcon from '@/components/MdiIcon.vue'
</script>
