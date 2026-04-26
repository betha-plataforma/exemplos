import type { ComponentPropsWithoutRef, ReactNode } from 'react'

type PageHeaderProps = {
  title: string
  children?: ReactNode
}

type MdiIconProps = Omit<ComponentPropsWithoutRef<'i'>, 'className'> & {
  name: string
  className?: string
}

export function LoadingOverlay() {
  return (
    <div className="spinner-grow-backdrop loader-fadeout">
      <div className="spinner-grow"></div>
    </div>
  )
}

export function PageHeader({ title, children }: PageHeaderProps) {
  return (
    <div className="row align-items-center py-3">
      <div className="col">
        <h4 className="m-0">{title}</h4>
      </div>
      {children}
    </div>
  )
}

export function MdiIcon({ name, className = '', ...props }: MdiIconProps) {
  return <i className={`mdi mdi-${name} ${className}`.trim()} aria-hidden="true" {...props}></i>
}
