import { useState } from 'react'
import { Alert, Nav, Tab } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { LoadingOverlay, MdiIcon, PageHeader } from '../components/shared'

export function Formulario() {
  const [activeTab, setActiveTab] = useState(1)

  return (
    <>
      <LoadingOverlay />
      <PageHeader title="Formulário" />

      <form>
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <Tab.Container activeKey={activeTab} onSelect={(key) => key && setActiveTab(Number(key))}>
              <Nav variant="tabs">
                <Nav.Item>
                  <Nav.Link eventKey={1} as="button" type="button">
                    Dados pessoais
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey={2} as="button" type="button">
                    Dados funcionais
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey={3} as="button" type="button" disabled>
                    Aba desabilitada
                  </Nav.Link>
                </Nav.Item>
              </Nav>

              <Tab.Content className="pt-3">
                <Tab.Pane eventKey={1}>
                  <Alert variant="info">
                    Exemplo de alerta com <Link to="/visao-geral">link</Link>.
                  </Alert>

                  <div className="row g-3">
                    <div className="col-12">
                      <label htmlFor="nomeInput" className="form-label required">
                        Nome
                      </label>
                      <input
                        id="nomeInput"
                        type="text"
                        className="form-control"
                        placeholder="Informe o nome"
                      />
                    </div>

                    <div className="col-12 col-lg-6">
                      <label htmlFor="pasInput" className="form-label required">
                        Pressão sanguínea
                      </label>
                      <div className="input-group">
                        <input
                          id="pasInput"
                          className="form-control"
                          type="text"
                          placeholder="PAS"
                        />
                        <input
                          className="form-control"
                          type="text"
                          placeholder="PAD"
                          aria-label="Pressão arterial diastólica"
                        />
                      </div>
                    </div>

                    <div className="col-12 col-lg-6">
                      <label htmlFor="atividadeInput" className="form-label required">
                        Atividade
                      </label>
                      <div className="input-group">
                        <input
                          id="atividadeInput"
                          className="form-control"
                          type="text"
                          value="Inativo"
                          disabled
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="col-12 col-lg-4">
                      <label htmlFor="cpfInput" className="form-label required">
                        CPF
                      </label>
                      <input id="cpfInput" type="text" className="form-control" />
                    </div>

                    <div className="col-12 col-lg-8">
                      <label htmlFor="enderecoInput" className="form-label">
                        Endereço
                      </label>
                      <input id="enderecoInput" type="text" className="form-control" />
                    </div>

                    <div className="col-12 col-md-3">
                      <label htmlFor="valorInput" className="form-label required">
                        Valor
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">R$</span>
                        <input id="valorInput" type="number" className="form-control" />
                      </div>
                    </div>

                    <div className="col-12 col-md-3">
                      <label htmlFor="tamanhoInput" className="form-label required">
                        Tamanho
                      </label>
                      <div className="input-group">
                        <input id="tamanhoInput" type="text" className="form-control" />
                        <span className="input-group-text">m²</span>
                      </div>
                    </div>

                    <div className="col-12 col-lg-6">
                      <label htmlFor="anexoInput" className="form-label">
                        Arquivo
                      </label>
                      <div className="input-group">
                        <input
                          id="anexoInput"
                          type="text"
                          className="form-control"
                          placeholder="Escolha um arquivo de seu dispositivo"
                          aria-label="Escolha um arquivo de seu dispositivo"
                          disabled
                        />
                        <label className="btn btn-secondary px-3 position-relative btn-sm" htmlFor="btnAnexo">
                          <input id="btnAnexo" className="visually-hidden" type="file" />
                          <MdiIcon name="paperclip" />
                          <span className="visually-hidden">Selecionar arquivo</span>
                        </label>
                      </div>
                    </div>

                    <div className="col-12 col-sm-6">
                      <label className="form-label d-block">Escolha uma ou mais opções</label>
                      <div className="form-check form-check-inline">
                        <input id="inlineCheckbox1" className="form-check-input" type="checkbox" />
                        <label className="form-check-label" htmlFor="inlineCheckbox1">
                          1
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input id="inlineCheckbox2" className="form-check-input" type="checkbox" />
                        <label className="form-check-label" htmlFor="inlineCheckbox2">
                          2
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          id="inlineCheckbox3"
                          className="form-check-input"
                          type="checkbox"
                          disabled
                        />
                        <label className="form-check-label" htmlFor="inlineCheckbox3">
                          3 (disabled)
                        </label>
                      </div>
                    </div>

                    <div className="col-12 col-sm-6">
                      <label className="form-label d-block">Escolha uma das opções</label>
                      <div className="form-check form-check-inline">
                        <input
                          id="inlineRadio1"
                          className="form-check-input"
                          type="radio"
                          name="escolha"
                          value="1"
                          defaultChecked
                        />
                        <label className="form-check-label" htmlFor="inlineRadio1">
                          1
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          id="inlineRadio2"
                          className="form-check-input"
                          type="radio"
                          name="escolha"
                          value="2"
                        />
                        <label className="form-check-label" htmlFor="inlineRadio2">
                          2
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          id="inlineRadio3"
                          className="form-check-input"
                          type="radio"
                          name="escolha"
                          value="3"
                          disabled
                        />
                        <label className="form-check-label" htmlFor="inlineRadio3">
                          3 (disabled)
                        </label>
                      </div>
                    </div>

                    <div className="col-12">
                      <label htmlFor="descricaoInput" className="form-label">
                        Descrição
                      </label>
                      <textarea id="descricaoInput" className="form-control" rows={3}></textarea>
                    </div>

                    <div className="col-12">
                      <div className="form-check form-switch float-end">
                        <input
                          id="receberAtualizacoes"
                          className="form-check-input"
                          type="checkbox"
                          defaultChecked
                        />
                        <label className="form-check-label" htmlFor="receberAtualizacoes">
                          Receber atualizações
                        </label>
                      </div>
                    </div>
                  </div>
                </Tab.Pane>

                <Tab.Pane eventKey={2}>
                  <p className="mb-0">Aba de dados funcionais</p>
                </Tab.Pane>
                <Tab.Pane eventKey={3}></Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </div>
        </div>

        <div className="container-fluid bg__gray--l40 border-top position-sticky mt-5 py-3 sticky-actions">
          <div className="row justify-content-end">
            <div className="col-auto">
              <button type="button" className="btn btn-primary">
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
