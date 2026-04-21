import { Link } from 'react-router-dom'
import { LoadingOverlay, PageHeader } from './shared'

export function SemRegistros() {
  return (
    <>
      <LoadingOverlay />
      <PageHeader title="Sem registros" />

      <div className="row">
        <div className="col-12 text-center my-5">
          <img
            src="/img/ilustracoes_semregistros.svg"
            width="349"
            height="276"
            className="img-fluid mb-5"
            alt="Ilustração indicando ausência de registros"
          />
          <p className="h5 mb-0">
            Ainda não há itens por aqui. <Link to="/formulario">Adicionar</Link>
          </p>
        </div>
      </div>
    </>
  )
}
