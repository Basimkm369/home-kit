interface PageHeaderProps {
  title: string
  description?: string
  action?: ReactNode
}

const PageHeader = ({ title, description, action }: PageHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300/80">Home Kit</p>
        <h1 className="text-3xl font-semibold text-white">{title}</h1>
        {description ? <p className="mt-2 text-sm text-slate-300">{description}</p> : null}
      </div>
      {action ? <div className="flex items-center gap-2">{action}</div> : null}
    </div>
  )
}

export default PageHeader
import type { ReactNode } from 'react'
