<template>
  <i :class="`mdi mdi-${name}${extraClass ? ' ' + extraClass : ''}`" aria-hidden="true" v-bind="$attrs"></i>
</template>

<script setup lang="ts">
defineOptions({ inheritAttrs: false })
withDefaults(defineProps<{ name: string; extraClass?: string }>(), { extraClass: '' })
</script>
