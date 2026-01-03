import { Link, NavLink, Outlet } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
  { to: '/booking', label: 'Book Now' },
]

const NavItem = ({ to, label, end }: { to: string; label: string; end?: boolean }) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) =>
      [
        'text-sm font-semibold transition px-3 py-2 rounded-full',
        isActive ? 'bg-indigo-500/20 text-indigo-100' : 'text-slate-200 hover:text-white',
      ].join(' ')
    }
  >
    {label}
  </NavLink>
)

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-20 border-b border-slate-800/70 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-2 text-lg font-semibold text-white">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/15 text-indigo-200 ring-1 ring-inset ring-indigo-400/50">
              HK
            </span>
            Home Kit Services
          </Link>
          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <NavItem key={item.to} to={item.to} label={item.label} />
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-10">
        <Outlet />
      </main>
      <footer className="border-t border-slate-800/70 bg-slate-950/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 text-sm text-slate-400">
          <span>Home Kit • Reliable home services</span>
          <span>Admin panel: <Link className="text-indigo-200 hover:text-indigo-100" to="/admin">Go to dashboard</Link></span>
        </div>
      </footer>
    </div>
  )
}

export default MainLayout
