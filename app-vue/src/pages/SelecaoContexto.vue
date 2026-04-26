<template>
  <bth-selecao-contexto
    ref="contextRef"
    id="selecao-contexto-entidades"
    placeholder-pesquisa="Qual entidade você está buscando?"
  >
    <h4 class="mt-5" slot="cabecalho">Selecione a entidade que deseja acessar</h4>

    <img
      src="/img/help.svg"
      width="200"
      height="160"
      alt="Você precisa de ajuda?"
      slot="sem_resultado"
    />

    <h4 slot="sem_resultado">Título customizado</h4>

    <span slot="sem_resultado">
      Parágrafo customizado com <RouterLink to="/visao-geral">link também</RouterLink>
    </span>

    <div slot="rodape" class="text-end">
      <RouterLink to="/visao-geral">Liberar nova entidade</RouterLink>
    </div>
  </bth-selecao-contexto>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { CONTEXT_ITEMS } from '@/data/examples'
import type { ItemSelecaoContexto } from '@betha-plataforma/estrutura-componentes/dist/types/components/comuns/selecao-contexto/selecao-contexto.interfaces'

const contextRef = ref<HTMLBthSelecaoContextoElement | null>(null)

onMounted(() => {
  const el = contextRef.value
  if (!el) return

  el.buscar = async () => {
    await new Promise((resolve) => window.setTimeout(resolve, 1500))
    return [...CONTEXT_ITEMS]
  }

  el.selecionar = (item: ItemSelecaoContexto) => {
    console.log('Selecionado entidade', item)
  }
})

onUnmounted(() => {
  const el = contextRef.value
  if (!el) return
  el.buscar = async () => []
  el.selecionar = () => undefined
})
</script>
