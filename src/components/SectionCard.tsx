interface SectionCardProps {
  title: string
  children: ReactNode
  actions?: ReactNode
}

const SectionCard = ({ title, children, actions }: SectionCardProps) => {
  return (
    <section className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 shadow-lg shadow-black/30">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        {actions}
      </div>
      <div className="space-y-3 text-sm text-slate-200">{children}</div>
    </section>
  )
}

export default SectionCard
import type { ReactNode } from 'react'
