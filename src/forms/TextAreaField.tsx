import type { TextareaHTMLAttributes } from 'react'

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
}

const TextAreaField = ({ label, error, className, ...props }: TextAreaFieldProps) => {
  return (
    <label className="flex flex-col gap-2 text-sm text-slate-200">
      <span className="font-semibold text-slate-100">{label}</span>
      <textarea
        {...props}
        className={[
          'min-h-[120px] rounded-xl border bg-slate-900 px-4 py-3 text-sm text-white outline-none ring-1 ring-slate-800 transition focus:ring-2 focus:ring-indigo-400',
          error ? 'border-red-400/80 ring-red-400/50' : 'border-slate-800',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      />
      {error ? <span className="text-xs text-red-300">{error}</span> : null}
    </label>
  )
}

export default TextAreaField
