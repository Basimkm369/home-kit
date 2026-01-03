import { useParams } from 'react-router-dom'
import PageHeader from '@/components/PageHeader'
import SectionCard from '@/components/SectionCard'
import StatusPill from '@/components/StatusPill'
import { useAppSelector } from '@/hooks'
import { formatDateTime } from '@/utils/date'

const BookingDetailsPage = () => {
  const { id } = useParams<{ id: string }>()
  const booking = useAppSelector((state) =>
    state.booking.bookings.find((item) => item.id === id),
  )

  if (!booking) {
    return (
      <PageHeader
        title="Booking not found"
        description="Check the booking ID or return to the list."
      />
    )
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Booking ${booking.id}`}
        description="Complete booking information and schedule."
        action={<StatusPill label={booking.status} tone="info" />}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <SectionCard title="Service details">
          <p className="text-sm text-white capitalize">{booking.categoryId.replace('-', ' ')}</p>
          <p className="text-sm text-slate-300 capitalize">
            {booking.subCategoryId.replace('-', ' ')}
          </p>
          <p className="text-xs text-slate-400">Scheduled: {formatDateTime(booking.scheduledFor)}</p>
          <p className="text-xs text-slate-400">Created: {formatDateTime(booking.createdAt)}</p>
        </SectionCard>

        <SectionCard title="Customer">
          <p className="text-sm text-white">{booking.customer.name}</p>
          <p className="text-sm text-slate-300">{booking.customer.mobile}</p>
        </SectionCard>

        <SectionCard title="Address">
          <p className="text-sm text-white">
            {[booking.address.house, booking.address.street, booking.address.place].join(', ')}
          </p>
          <p className="text-sm text-slate-300">
            {booking.address.district} • {booking.address.pincode}
          </p>
          <p className="text-xs text-slate-400">Location note: {booking.locationNote}</p>
        </SectionCard>
      </div>
    </div>
  )
}

export default BookingDetailsPage
