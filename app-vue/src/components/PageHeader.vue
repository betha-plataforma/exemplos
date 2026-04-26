<template>
  <div class="row align-items-center py-3">
    <div class="col">
      <h4 class="m-0">{{ title }}</h4>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string }>()
</script>
