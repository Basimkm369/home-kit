type ButtonAs = 'button' | 'a'

type BaseProps =
  | ({
      as?: 'button'
    } & React.ButtonHTMLAttributes<HTMLButtonElement>)
  | ({
      as: 'a'
    } & React.AnchorHTMLAttributes<HTMLAnchorElement>)

interface ButtonProps extends BaseProps {
  variant?: 'primary' | 'ghost' | 'secondary'
  className?: string
}

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900'

const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-indigo-500 text-white hover:bg-indigo-400 focus-visible:ring-indigo-300',
  secondary:
    'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700 focus-visible:ring-slate-500',
  ghost: 'bg-transparent text-slate-200 hover:bg-slate-800 focus-visible:ring-slate-500',
}

const Button = ({ variant = 'primary', className, as = 'button', ...props }: ButtonProps) => {
  if (as === 'a') {
    const anchorProps = props as React.AnchorHTMLAttributes<HTMLAnchorElement>
    return (
      <a
        {...anchorProps}
        className={[baseClasses, variants[variant], className].filter(Boolean).join(' ')}
      />
    )
  }

  const buttonProps = props as React.ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button
      {...buttonProps}
      className={[baseClasses, variants[variant], className].filter(Boolean).join(' ')}
    />
  )
}

export default Button
import type React from 'react'
