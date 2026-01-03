import { Link, NavLink, Outlet } from 'react-router-dom'

const navItems = [
  { to: '/admin', label: 'Dashboard' },
  { to: '/admin/bookings', label: 'Bookings' },
]

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800/70 bg-slate-900/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-2 text-lg font-semibold text-white">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/15 text-indigo-200 ring-1 ring-inset ring-indigo-400/50">
              HK
            </span>
            Admin Panel
          </Link>
          <nav className="flex items-center gap-2">
            {navItems?.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/admin'}
                className={({ isActive }) =>
                  [
                    'text-sm font-semibold transition px-3 py-2 rounded-full',
                    isActive
                      ? 'bg-indigo-500/20 text-indigo-100'
                      : 'text-slate-200 hover:text-white',
                  ].join(' ')
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-10">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
