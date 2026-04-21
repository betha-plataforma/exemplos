import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { CONTEXT_ITEMS } from '../data/examples'
import type { ItemSelecaoContexto } from '@betha-plataforma/estrutura-componentes/dist/types/components/comuns/selecao-contexto/selecao-contexto.interfaces'

export function SelecaoContexto() {
  const contextRef = useRef<HTMLBthSelecaoContextoElement | null>(null)

  useEffect(() => {
    const contextElement = contextRef.current

    if (!contextElement) {
      return undefined
    }

    contextElement.buscar = async () => {
      await new Promise((resolve) => {
        window.setTimeout(resolve, 1500)
      })

      return [...CONTEXT_ITEMS]
    }

    contextElement.selecionar = (item: ItemSelecaoContexto) => {
      console.log('Selecionado entidade', item)
    }

    return () => {
      contextElement.buscar = async () => []
      contextElement.selecionar = () => undefined
    }
  }, [])

  return (
    <bth-selecao-contexto
      ref={contextRef}
      id="selecao-contexto-entidades"
      placeholder-pesquisa="Qual entidade você está buscando?"
    >
      <h4 className="mt-5" slot="cabecalho">
        Selecione a entidade que deseja acessar
      </h4>

      <img
        src="/img/help.svg"
        width="200"
        height="160"
        alt="Você precisa de ajuda?"
        slot="sem_resultado"
      />

      <h4 slot="sem_resultado">Título customizado</h4>

      <span slot="sem_resultado">
        Parágrafo customizado com <Link to="/visao-geral">link também</Link>
      </span>

      <div slot="rodape" className="text-end">
        <Link to="/visao-geral">Liberar nova entidade</Link>
      </div>
    </bth-selecao-contexto>
  )
}
