import { useState } from 'react'
import { Dropdown, Modal, ProgressBar } from 'react-bootstrap'
import { CARD_AVATARS, FILE_CARDS } from '../data/examples'
import { LoadingOverlay, MdiIcon, PageHeader } from './shared'

type ModalProps = {
  show: boolean
  onHide: () => void
}

function FileActions({ id }: { id: number }) {
  return (
    <Dropdown align="end" className="d-inline-block">
      <Dropdown.Toggle
        variant="link"
        size="sm"
        className="no-caret"
        id={`arquivo-acoes-${id}`}
        aria-label="Abrir ações do arquivo"
      >
        <MdiIcon name="dots-vertical" />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item as="button" type="button">
          <MdiIcon name="pencil" className="me-2" />
          Editar
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item as="button" type="button">
          <MdiIcon name="trash-can-outline" className="me-2" />
          Excluir
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

function FileModal({ show, onHide }: ModalProps) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title as="h4">Salvando arquivo</Modal.Title>
      </Modal.Header>

      <form>
        <Modal.Body>
          <div className="row">
            <div className="col-12">
              <label className="visually-hidden" htmlFor="anexoInputModal">
                Arquivo
              </label>
              <div className="input-group">
                <input
                  id="anexoInputModal"
                  type="text"
                  className="form-control"
                  placeholder="Escolha um arquivo de seu dispositivo"
                  aria-label="Escolha um arquivo de seu dispositivo"
                  disabled
                />
                <label className="btn btn-secondary px-3 position-relative btn-sm" htmlFor="btnAnexoModal">
                  <input id="btnAnexoModal" className="visually-hidden" type="file" />
                  <MdiIcon name="paperclip" />
                  <span className="visually-hidden">Selecionar arquivo</span>
                </label>
              </div>
            </div>

            <div className="col-12 py-3">
              <ProgressBar now={80} />
              <p className="m-0 mt-1 text-muted">Carregando...</p>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <button type="button" className="btn btn-primary" onClick={onHide}>
            Salvar
          </button>
          <button type="button" className="btn btn-secondary" onClick={onHide}>
            Cancelar
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

export function ListaDeCards() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <LoadingOverlay />
      <PageHeader title="Lista de cards">
        <div className="col-12 col-lg-auto my-3 my-lg-0">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <button type="button" className="btn btn-link p-0">
                  Grupo
                </button>
              </li>
              <li className="breadcrumb-item">
                <button type="button" className="btn btn-link p-0">
                  Subgrupo
                </button>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Item
              </li>
            </ol>
          </nav>
        </div>
      </PageHeader>

      <div className="row align-items-center mb-3">
        <div className="col">
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-sm btn-success"
              onClick={() => setShowModal(true)}
              aria-label="Adicionar arquivo"
            >
              <MdiIcon name="plus" className="h6 m-0 me-1" />
              Arquivo
            </button>
          </div>
        </div>

        <div className="col-auto">
          <div className="d-block pe-1">
            {CARD_AVATARS.map((avatar) => (
              <div className="d-inline-block me-n1" key={avatar}>
                <img className="rounded-circle border" width="30" height="30" alt="" src={avatar} />
              </div>
            ))}
          </div>
        </div>

        <div className="col-12 col-lg-3 my-3 my-lg-0">
          <label className="visually-hidden" htmlFor="buscaCards">
            Pesquisar na lista de cards
          </label>
          <div className="input-group">
            <input
              id="buscaCards"
              className="form-control"
              type="search"
              placeholder="O que você está buscando?"
            />
            <button type="button" className="btn btn-secondary" aria-label="Pesquisar">
              <MdiIcon name="magnify" />
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        {FILE_CARDS.map((file) => (
          <div className="col-12 col-sm-6 col-md-3 col-lg-2" key={file.id}>
            <div className="card mb-2">
              <div className="card-body p-0 overflow-hidden file-card-preview">
                <img className="w-100 file-card-image" src={file.imageUrl} alt="" />
              </div>
              <div className="card-footer bg__gray--l40">
                <div className="row m-0 align-items-center">
                  <div className="col-10">
                    <p className="text-truncate m-0">{file.title}</p>
                  </div>
                  <div className="col-2 text-end">
                    <FileActions id={file.id} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <FileModal show={showModal} onHide={() => setShowModal(false)} />
    </>
  )
}
