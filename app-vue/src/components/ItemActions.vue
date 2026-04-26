<template>
  <div class="dropdown d-inline-block">
    <button
      type="button"
      class="btn btn-link no-caret btn-sm"
      :id="`item-acoes-${id}`"
      :aria-label="ariaLabel"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <MdiIcon name="dots-vertical" />
    </button>
    <ul class="dropdown-menu dropdown-menu-end" :aria-labelledby="`item-acoes-${id}`">
      <li>
        <button type="button" class="dropdown-item">
          <MdiIcon name="pencil" extra-class="me-2" />
          Editar
        </button>
      </li>
      <li><hr class="dropdown-divider" /></li>
      <li>
        <button type="button" class="dropdown-item">
          <MdiIcon name="trash-can-outline" extra-class="me-2" />
          Excluir
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import MdiIcon from './MdiIcon.vue'

withDefaults(defineProps<{ id: number; ariaLabel?: string }>(), { ariaLabel: 'Abrir ações' })
</script>
