import { useNavigate } from 'react-router-dom'
import Button from '@/components/Button'
import PageHeader from '@/components/PageHeader'
import StatusPill from '@/components/StatusPill'
import { useAppSelector } from '@/hooks'
import { formatDateTime } from '@/utils/date'

const statusTone = (status: string): 'success' | 'warning' | 'danger' | 'info' => {
  if (status === 'confirmed') return 'success'
  if (status === 'pending') return 'warning'
  if (status === 'cancelled') return 'danger'
  return 'info'
}

const BookingListPage = () => {
  const bookings = useAppSelector((state) => state.booking.bookings)
  const navigate = useNavigate()

  return (
    <div className="space-y-8">
      <PageHeader
        title="Booking list"
        description="Table view of all bookings with status."
        action={<Button onClick={() => navigate('/booking')}>Add booking</Button>}
      />

      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl shadow-black/30">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-800 text-sm">
            <thead className="bg-slate-900">
              <tr className="text-left text-xs uppercase tracking-wide text-slate-400">
                <th className="px-4 py-3">Booking ID</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {bookings.map((booking) => (
                <tr key={booking.id} className="text-slate-200">
                  <td className="px-4 py-3 font-semibold">{booking.id}</td>
                  <td className="px-4 py-3">
                    <div>{booking.customer.name}</div>
                    <div className="text-xs text-slate-400">{booking.customer.mobile}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="capitalize">{booking.categoryId.replace('-', ' ')}</div>
                    <div className="text-xs text-slate-400">{booking.subCategoryId.replace('-', ' ')}</div>
                  </td>
                  <td className="px-4 py-3">{formatDateTime(booking.scheduledFor)}</td>
                  <td className="px-4 py-3">
                    <StatusPill label={booking.status} tone={statusTone(booking.status)} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" onClick={() => navigate(`/admin/bookings/${booking.id}`)}>
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default BookingListPage
