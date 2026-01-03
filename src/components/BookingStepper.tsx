import { useAppSelector } from '@/hooks'

const BookingStepper = () => {
  const { steps, currentStep } = useAppSelector((state) => state.booking)

  return (
    <ol className="grid gap-3 sm:grid-cols-7">
      {steps.map((step, index) => {
        const isActive = currentStep === index
        const isComplete = currentStep > index
        return (
          <li
            key={step}
            className={[
              'flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold uppercase tracking-wide',
              isActive
                ? 'border-indigo-500/70 bg-indigo-500/10 text-indigo-100'
                : isComplete
                  ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-100'
                  : 'border-slate-800 bg-slate-900 text-slate-300',
            ].join(' ')}
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-xs">
              {index + 1}
            </span>
            <span className="hidden sm:inline">
              {step
                .replace(/([A-Z])/g, ' $1')
                .replace('-', ' ')
                .replace(/^\w/, (c) => c.toUpperCase())}
            </span>
          </li>
        )
      })}
    </ol>
  )
}

export default BookingStepper
