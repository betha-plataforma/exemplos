import { useState } from 'react'
import { Nav, Tab } from 'react-bootstrap'
import { LoadingOverlay, MdiIcon, PageHeader } from './shared'

export function Configuracoes() {
  const [activeTab, setActiveTab] = useState('1')

  return (
    <>
      <LoadingOverlay />
      <PageHeader title="Configurações" />

      <form>
        <div className="row mt-3">
          <div className="col-12 col-lg-3">
            <div className="d-flex">
              <Tab.Container activeKey={activeTab} onSelect={(key) => key && setActiveTab(key)}>
                <Nav variant="tabs" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="1" as="button" type="button">
                      Aba 1
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="2" as="button" type="button">
                      Aba 2
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="3" as="button" type="button" disabled>
                      Aba desabilitada
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Tab.Container>
            </div>
          </div>

          <div className="col-12 col-lg-9">
            <Tab.Container activeKey={activeTab} onSelect={(key) => key && setActiveTab(key)}>
              <Tab.Content className="pt-3 pt-lg-0">
                <Tab.Pane eventKey="1">
                  <div className="row mb-3">
                    <div className="col-12">
                      <h5 className="tx__gray--d20 mb-3">
                        <MdiIcon name="cog" className="me-2" />
                        Subtítulo 1
                      </h5>
                    </div>
                  </div>

                  <div className="row align-items-center mb-3">
                    <div className="col-auto">
                      <div className="form-check form-switch">
                        <input
                          id="opcaoAtiva1"
                          className="form-check-input"
                          type="checkbox"
                          defaultChecked
                        />
                        <label className="form-check-label" htmlFor="opcaoAtiva1">
                          &nbsp;
                        </label>
                      </div>
                    </div>
                    <div className="col">
                      <p className="m-0">Este é o título da opção a ser ativada</p>
                      <p className="m-0 small text-muted">
                        Este é um texto explicativo sobre a opção atual em detalhes para o usuário.
                      </p>
                    </div>
                  </div>

                  <div className="row align-items-center">
                    <div className="col-auto">
                      <div className="form-check form-switch">
                        <input id="opcaoAtiva2" className="form-check-input" type="checkbox" />
                        <label className="form-check-label" htmlFor="opcaoAtiva2">
                          &nbsp;
                        </label>
                      </div>
                    </div>
                    <div className="col">
                      <p className="m-0">Este é o título da opção a ser ativada</p>
                      <p className="m-0 small text-muted">
                        Este é um texto explicativo sobre a opção atual em detalhes para o usuário.
                      </p>
                    </div>
                  </div>

                  <div className="row mt-5">
                    <div className="col-12">
                      <h5 className="tx__gray--d20 mb-3">
                        <MdiIcon name="cog" className="me-2" />
                        Subtítulo 2
                      </h5>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12 col-sm-6 col-lg-3">
                      <label htmlFor="tempoInatividade" className="form-label">
                        Tempo de inatividade
                      </label>
                      <select id="tempoInatividade" className="form-select" defaultValue="10">
                        <option value="10">10 minutos</option>
                        <option value="20">20 minutos</option>
                        <option value="30">30 minutos</option>
                      </select>
                    </div>
                  </div>

                  <div className="row mt-5">
                    <div className="col-12">
                      <h5 className="tx__gray--d20 mb-3">
                        <MdiIcon name="cog" className="me-2" />
                        Subtítulo 3
                      </h5>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12">
                      {[1, 2, 3].map((option) => (
                        <div className="form-check form-check-inline" key={option}>
                          <input
                            id={`perfil${option}`}
                            className="form-check-input"
                            type="radio"
                            name="perfil"
                            value={option}
                            defaultChecked={option === 1}
                            disabled={option === 3}
                          />
                          <label className="form-check-label" htmlFor={`perfil${option}`}>
                            Opção {option}
                            {option === 3 ? ' (disabled)' : ''}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </Tab.Pane>

                <Tab.Pane eventKey="2">
                  <p className="mb-0">Dolor sit amet</p>
                </Tab.Pane>
                <Tab.Pane eventKey="3"></Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </div>
        </div>
      </form>
    </>
  )
}
