import type { SelectHTMLAttributes } from 'react'

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  error?: string
}

const SelectField = ({ label, error, className, children, ...props }: SelectFieldProps) => {
  return (
    <label className="flex flex-col gap-2 text-sm text-slate-200">
      <span className="font-semibold text-slate-100">{label}</span>
      <select
        {...props}
        className={[
          'rounded-xl border bg-slate-900 px-4 py-3 text-sm text-white outline-none ring-1 ring-slate-800 transition focus:ring-2 focus:ring-indigo-400',
          error ? 'border-red-400/80 ring-red-400/50' : 'border-slate-800',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {children}
      </select>
      {error ? <span className="text-xs text-red-300">{error}</span> : null}
    </label>
  )
}

export default SelectField
