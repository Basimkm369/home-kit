import PageHeader from '@/components/PageHeader'
import SectionCard from '@/components/SectionCard'
import StatusPill from '@/components/StatusPill'
import { useAppSelector } from '@/hooks'
import { formatDateTime } from '@/utils/date'

const AdminDashboardPage = () => {
  const bookings = useAppSelector((state) => state.booking.bookings)

  const totals = {
    total: bookings.length,
    today: bookings.filter((booking) => {
      const today = new Date().toISOString().slice(0, 10)
      return booking.scheduledFor.slice(0, 10) === today
    }).length,
  }

  const statusCounts = bookings.reduce<Record<string, number>>((acc, booking) => {
    acc[booking.status] = (acc[booking.status] || 0) + 1
    return acc
  }, {})

  const latest = bookings.slice(0, 3)

  return (
    <div className="space-y-8">
      <PageHeader
        title="Admin dashboard"
        description="Monitor bookings, daily load, and status distribution."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
          <p className="text-sm text-slate-400">Total bookings</p>
          <p className="text-3xl font-semibold text-white">{totals.total}</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
          <p className="text-sm text-slate-400">Today’s bookings</p>
          <p className="text-3xl font-semibold text-white">{totals.today}</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
          <p className="text-sm text-slate-400">Statuses</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {Object.entries(statusCounts).map(([status, count]) => (
              <StatusPill key={status} label={`${status} • ${count}`} tone="info" />
            ))}
          </div>
        </div>
      </div>

      <SectionCard title="Latest bookings">
        <div className="space-y-3">
          {latest.map((booking) => (
            <div
              key={booking.id}
              className="flex flex-col gap-2 rounded-xl border border-slate-800/70 bg-slate-900/50 p-4 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="text-sm font-semibold text-white">{booking.id}</p>
                <p className="text-xs text-slate-300">
                  {booking.customer.name} • {booking.categoryId} / {booking.subCategoryId}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <StatusPill label={booking.status} tone="info" />
                <span className="text-xs text-slate-300">{formatDateTime(booking.scheduledFor)}</span>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  )
}

export default AdminDashboardPage
