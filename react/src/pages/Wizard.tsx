import { useState } from 'react'
import { Nav, Tab } from 'react-bootstrap'
import { LoadingOverlay, MdiIcon, PageHeader } from './shared'

function WizardFormFields() {
  return (
    <div className="row g-3">
      <div className="col-12">
        <label htmlFor="wizardNome" className="form-label required">
          Nome
        </label>
        <input id="wizardNome" type="text" className="form-control" placeholder="Informe o nome" />
      </div>

      <div className="col-12 col-lg-6">
        <label htmlFor="wizardPas" className="form-label required">
          Pressão sanguínea
        </label>
        <div className="input-group">
          <input id="wizardPas" className="form-control" type="text" placeholder="PAS" />
          <input
            className="form-control"
            type="text"
            placeholder="PAD"
            aria-label="Pressão arterial diastólica"
          />
        </div>
      </div>

      <div className="col-12 col-lg-6">
        <label htmlFor="wizardAtividade" className="form-label required">
          Atividade
        </label>
        <div className="input-group">
          <input
            id="wizardAtividade"
            className="form-control"
            type="text"
            value="Inativo"
            disabled
            readOnly
          />
        </div>
      </div>

      <div className="col-12 col-lg-4">
        <label htmlFor="wizardCpf" className="form-label required">
          CPF
        </label>
        <input id="wizardCpf" type="text" className="form-control" />
      </div>

      <div className="col-12 col-lg-8">
        <label htmlFor="wizardEndereco" className="form-label">
          Endereço
        </label>
        <input id="wizardEndereco" type="text" className="form-control" />
      </div>
    </div>
  )
}

export function Wizard() {
  const [activeStep, setActiveStep] = useState('1')
  const stepNumber = Number(activeStep)

  const next = () => setActiveStep(String(Math.min(stepNumber + 1, 3)))
  const previous = () => setActiveStep(String(Math.max(stepNumber - 1, 1)))

  return (
    <>
      <LoadingOverlay />
      <PageHeader title="Wizard" />

      <form>
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <Tab.Container activeKey={activeStep} onSelect={(key) => key && setActiveStep(key)}>
              <Nav variant="tabs" className="nav-wizard">
                <Nav.Item>
                  <Nav.Link eventKey="1" as="button" type="button" className="checked">
                    Etapa 1
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="2" as="button" type="button" className="checked">
                    Etapa 2
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="3" as="button" type="button">
                    Etapa 3
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="4" as="button" type="button" disabled>
                    Etapa 4
                  </Nav.Link>
                </Nav.Item>
              </Nav>

              <Tab.Content className="mt-3">
                <Tab.Pane eventKey="1">
                  <WizardFormFields />
                </Tab.Pane>
                <Tab.Pane eventKey="2">
                  <p className="mb-0">Conteúdo da etapa 2</p>
                </Tab.Pane>
                <Tab.Pane eventKey="3">
                  <p className="mb-0">Conteúdo da etapa 3</p>
                </Tab.Pane>
                <Tab.Pane eventKey="4">
                  <p className="mb-0">Conteúdo da etapa 4</p>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </div>
        </div>

        <div className="container-fluid bg__gray--l40 border-top position-sticky mt-5 py-3 sticky-actions">
          <div className="row align-items-center">
            <div className="col">
              <button
                type="button"
                className="btn btn-secondary me-1"
                title="Anterior"
                disabled={stepNumber === 1}
                onClick={previous}
              >
                <MdiIcon name="arrow-left" />
                <span className="d-none d-lg-inline-block ms-2">Anterior</span>
              </button>
              <button type="button" className="btn btn-secondary" title="Próximo" onClick={next}>
                <span className="d-none d-lg-inline-block me-2">Próximo</span>
                <MdiIcon name="arrow-right" />
              </button>
            </div>
            <div className="col-auto">
              <button type="button" className="btn btn-primary" disabled={stepNumber !== 3}>
                Salvar
              </button>
              <button type="button" className="btn btn-secondary ms-1">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}
