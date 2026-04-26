import { Dropdown } from 'react-bootstrap'
import { MdiIcon } from './shared'

type ItemActionsProps = {
  id: number
  ariaLabel?: string
  size?: 'sm' | 'lg'
}

export function ItemActions({ id, ariaLabel = 'Abrir ações', size }: ItemActionsProps) {
  return (
    <Dropdown align="end" className="d-inline-block">
      <Dropdown.Toggle
        variant="link"
        size={size}
        className="no-caret"
        id={`item-acoes-${id}`}
        aria-label={ariaLabel}
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
