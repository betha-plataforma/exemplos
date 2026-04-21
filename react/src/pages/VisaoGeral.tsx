import { Link } from 'react-router-dom'
import { PRINCIPLES } from '../data/examples'
import { LoadingOverlay, MdiIcon, PageHeader } from '../components/shared'

export function VisaoGeral() {
  return (
    <>
      <LoadingOverlay />
      <PageHeader title="Visão geral" />

      <div className="row">
        <div className="col-12">
          <p className="m-0">
            Neste projeto, você encontrará demonstrações de estruturas básicas que podem servir de
            base para o seu projeto.
          </p>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <h5>Projetando</h5>
        </div>
      </div>

      <div className="row">
        {PRINCIPLES.map((principle) => (
          <div className="col-12 col-sm-6 col-lg-4 pb-2" key={principle.title}>
            <div className="card card-body h-100">
              <i className={principle.iconClass} aria-hidden="true"></i>
              <p className="h6 mb-0">{principle.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <h5>Programando</h5>
          <p>Ao começar uma solução, você deverá seguir a ordem:</p>
          <ol className="mb-0">
            <li>
              <strong>Login</strong>
            </li>
            <li>
              <strong>Seleção de contexto</strong>:{' '}
              <Link to="/contexto">
                Veja exemplo
                <MdiIcon name="open-in-new" className="ms-1" />
              </Link>
            </li>
            <li>
              <strong>Sua solução</strong>
            </li>
          </ol>
        </div>
      </div>
    </>
  )
}
