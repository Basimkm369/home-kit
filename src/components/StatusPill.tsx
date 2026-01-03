interface StatusPillProps {
  label: string
  tone?: 'success' | 'warning' | 'danger' | 'info'
}

const tones: Record<NonNullable<StatusPillProps['tone']>, string> = {
  success: 'bg-emerald-500/15 text-emerald-200 ring-emerald-400/50',
  warning: 'bg-amber-500/15 text-amber-100 ring-amber-400/50',
  danger: 'bg-rose-500/15 text-rose-100 ring-rose-400/50',
  info: 'bg-sky-500/15 text-sky-100 ring-sky-400/50',
}

const StatusPill = ({ label, tone = 'info' }: StatusPillProps) => (
  <span
    className={[
      'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset',
      tones[tone],
    ].join(' ')}
  >
    {label}
  </span>
)

export default StatusPill
