import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-3xl space-y-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-10 shadow-2xl shadow-indigo-900/40 backdrop-blur">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-300/80">
              Tailwind Ready
            </p>
            <h1 className="text-3xl font-semibold leading-tight text-slate-50 sm:text-4xl">
              Home Kit Dashboard
            </h1>
            <p className="max-w-2xl text-sm text-slate-300 sm:text-base">
              Kickstart your React + Vite project with Tailwind CSS styling and a clean
              starter layout you can extend right away.
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/15 text-lg font-semibold text-indigo-200 ring-1 ring-inset ring-indigo-400/60 sm:h-14 sm:w-14">
            HK
          </div>
        </header>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            'React + Vite setup',
            'Tailwind utility-first styling',
            'Ready for routing & state',
          ].map((item) => (
            <div
              key={item}
              className="rounded-xl border border-slate-800/80 bg-slate-900/70 p-4 text-sm text-slate-200 shadow-sm shadow-black/30"
            >
              {item}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-slate-200">Quick counter demo</p>
            <p className="text-sm text-slate-400">
              Tailwind classes applied to buttons, badges, and layout primitives.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-indigo-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-900/40 transition hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              onClick={() => setCount((value) => value + 1)}
            >
              Increase
            </button>
            <span className="rounded-full border border-indigo-400/60 bg-indigo-500/15 px-4 py-2 text-sm font-semibold text-indigo-100">
              Count: {count}
            </span>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
