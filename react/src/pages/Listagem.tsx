import { useMemo, useState } from 'react'
import { Dropdown, Modal, Nav, Tab } from 'react-bootstrap'
import { LIST_FILTERS, LIST_RECORDS } from '../data/examples'
import type { ListFilter } from '../data/examples'
import { ItemActions } from '../components/ItemActions'
import { LoadingOverlay, MdiIcon, PageHeader } from '../components/shared'

type ModalProps = {
  show: boolean
  onHide: () => void
}

function RegisterModal({ show, onHide }: ModalProps) {
  const [activeStep, setActiveStep] = useState(1)

  const close = () => {
    setActiveStep(1)
    onHide()
  }

  const next = () => setActiveStep(Math.min(activeStep + 1, 3))

  return (
    <Modal show={show} onHide={close} size="lg">
      <Modal.Header closeButton>
        <Modal.Title as="h4">Adicionando registro 123</Modal.Title>
      </Modal.Header>

      <form>
        <Modal.Body>
          <div className="row">
            <div className="col-12">
              <Tab.Container activeKey={activeStep} onSelect={(key) => key && setActiveStep(Number(key))}>
                <Nav variant="tabs" className="nav-wizard">
                  <Nav.Item>
                    <Nav.Link eventKey={1} className="checked">
                      Etapa 1
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey={2} className="checked">
                      Etapa 2
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey={3}>
                      Etapa 3
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey={4} disabled>
                      Etapa 4
                    </Nav.Link>
                  </Nav.Item>
                </Nav>

                <Tab.Content className="mt-3">
                  <Tab.Pane eventKey={1}>
                    <div className="row g-3">
                      <div className="col-12">
                        <label htmlFor="modalNome" className="form-label required">
                          Nome
                        </label>
                        <input
                          id="modalNome"
                          type="text"
                          className="form-control"
                          placeholder="Informe o nome"
                        />
                      </div>

                      <div className="col-12 col-lg-4">
                        <label htmlFor="modalCpf" className="form-label required">
                          CPF
                        </label>
                        <input id="modalCpf" type="text" className="form-control" />
                      </div>

                      <div className="col-12 col-lg-8">
                        <label htmlFor="modalEndereco" className="form-label">
                          Endereço
                        </label>
                        <input id="modalEndereco" type="text" className="form-control" />
                      </div>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey={2}>
                    <p className="mb-0">Conteúdo da etapa 2</p>
                  </Tab.Pane>
                  <Tab.Pane eventKey={3}>
                    <p className="mb-0">Conteúdo da etapa 3</p>
                  </Tab.Pane>
                  <Tab.Pane eventKey={4}>
                    <p className="mb-0">Conteúdo da etapa 4</p>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <div className="row w-100 align-items-center">
            <div className="col">
              <button type="button" className="btn btn-secondary" onClick={next}>
                <span className="d-none d-lg-inline-block me-2">Próximo</span>
                <MdiIcon name="arrow-right" />
              </button>
            </div>
            <div className="col-auto">
              <button type="button" className="btn btn-primary" disabled={activeStep !== 3}>
                Salvar
              </button>
              <button type="button" className="btn btn-secondary ms-1" onClick={close}>
                Cancelar
              </button>
            </div>
          </div>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

export function Listagem() {
  const [activeFilter, setActiveFilter] = useState<ListFilter>('Todos')
  const [showModal, setShowModal] = useState(false)

  const filteredRecords = useMemo(() => {
    if (activeFilter === 'Todos') {
      return LIST_RECORDS
    }

    return LIST_RECORDS.filter((record) => record.status === activeFilter)
  }, [activeFilter])

  return (
    <>
      <LoadingOverlay />
      <PageHeader title="Listagem" />

      <div className="row align-items-center">
        <div className="col-12 col-lg-auto">
          <div className="btn-group">
            <button type="button" className="btn btn-sm btn-success" onClick={() => setShowModal(true)}>
              <MdiIcon name="plus" className="h6 m-0 me-1" />
              Registro
            </button>
            <Dropdown as="div" className="btn-group" align="end">
              <Dropdown.Toggle
                variant="success"
                size="sm"
                id="registro-opcoes"
                aria-label="Abrir opções de registro"
              >
                <MdiIcon name="chevron-down" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as="button" type="button">
                  <MdiIcon name="cog" className="me-2" />
                  Outra opção
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        <div className="col-12 col-lg my-3 my-lg-0 text-lg-end">
          <button type="button" className="btn btn-sm btn-link">
            <MdiIcon name="cog" className="me-1" />
            Opção 1
          </button>
          <button type="button" className="btn btn-sm btn-link">
            <MdiIcon name="cog" className="me-1" />
            Opção 2
          </button>
          <button type="button" className="btn btn-sm btn-link">
            <MdiIcon name="cog" className="me-1" />
            Opção 3
          </button>
          <Dropdown align="end" className="d-inline-block">
            <Dropdown.Toggle
              variant="link"
              size="sm"
              className="no-caret"
              id="listagem-opcoes"
              aria-label="Mais opções"
            >
              <MdiIcon name="dots-vertical" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {[4, 5, 6].map((option) => (
                <Dropdown.Item as="button" type="button" key={option}>
                  <MdiIcon name="cog" className="me-2" />
                  Opção {option}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div className="col-12 col-lg-3">
          <label className="visually-hidden" htmlFor="buscaListagem">
            Pesquisar na listagem
          </label>
          <div className="input-group">
            <input
              id="buscaListagem"
              className="form-control"
              type="search"
              placeholder="O que você está buscando?"
            />
            <button type="button" className="btn btn-sm btn-secondary" aria-label="Pesquisar">
              <MdiIcon name="magnify" />
            </button>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <div className="col-12">
          <div className="px-lg-1 p-2 py-lg-0 bg__gray--l30 small">
            <div className="row m-0 align-items-center">
              <div className="col-12 col-lg-auto my-1 my-lg-0">
                <p className="m-0 fw-bold text-uppercase me-2">Filtrar por</p>
              </div>
              <div className="col-12 col-lg">
                {LIST_FILTERS.map((filter) => (
                  <button
                    type="button"
                    className={`btn btn-sm btn-link text-capitalize ${
                      activeFilter === filter ? 'active' : ''
                    }`}
                    aria-pressed={activeFilter === filter}
                    onClick={() => setActiveFilter(filter)}
                    key={filter}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-0">
        <div className="col-12">
          <table className="table table-hover table-card table-pointer" style={{ tableLayout: 'fixed' }}>
            <thead>
              <tr>
                <th style={{ width: 30 }}>
                  <div className="form-check">
                    <input id="checkTableAll" type="checkbox" className="form-check-input" />
                    <label className="form-check-label" htmlFor="checkTableAll">
                      <span className="visually-hidden">Selecionar todos os registros</span>
                    </label>
                  </div>
                </th>
                {['Coluna 1', 'Coluna 2', 'Coluna 3', 'Coluna 4'].map((column) => (
                  <th key={column}>
                    <button type="button" className="btn btn-link p-0">
                      {column}
                    </button>
                  </th>
                ))}
                <th style={{ width: 80 }}></th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record) => (
                <tr key={record.id}>
                  <td>
                    <div className="form-check">
                      <input
                        id={`checkTable${record.id}`}
                        type="checkbox"
                        className="form-check-input"
                      />
                      <label className="form-check-label" htmlFor={`checkTable${record.id}`}>
                        <span className="visually-hidden">Selecionar registro {record.id}</span>
                      </label>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        className="rounded-circle me-3"
                        width="40"
                        height="40"
                        src={record.avatarUrl}
                        alt=""
                      />
                      <div>
                        <button type="button" className="btn btn-link p-0">
                          {record.name}
                        </button>
                        <p className="m-0 small text-muted">{record.complement}</p>
                      </div>
                    </div>
                  </td>
                  <td>{record.column2}</td>
                  <td>
                    <button type="button" className="btn btn-link p-0 text-truncate">
                      {record.column3Main}
                    </button>
                    <p className="m-0 small text-muted text-truncate">{record.column3Complement}</p>
                  </td>
                  <td>
                    <span className={record.badgeClass}>{record.status}</span>
                  </td>
                  <td className="text-end">
                    <ItemActions id={record.id} ariaLabel="Abrir ações do registro" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <nav className="float-end" aria-label="Paginação da listagem">
            <ul className="pagination">
              <li className="page-item">
                <button type="button" className="page-link">
                  <MdiIcon name="chevron-left" className="me-1" />
                  Anterior
                </button>
              </li>
              {[1, 2, 3].map((page) => (
                <li className="page-item" key={page}>
                  <button type="button" className="page-link">
                    {page}
                  </button>
                </li>
              ))}
              <li className="page-item">
                <button type="button" className="page-link">
                  Próxima
                  <MdiIcon name="chevron-right" className="ms-1" />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <RegisterModal show={showModal} onHide={() => setShowModal(false)} />
    </>
  )
}
