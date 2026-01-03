import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from '@/App'
import AdminLayout from '@/layouts/AdminLayout'
import MainLayout from '@/layouts/MainLayout'

const HomePage = lazy(() => import('@/pages/home/HomePage'))
const ServicesPage = lazy(() => import('@/pages/services/ServicesPage'))
const ContactPage = lazy(() => import('@/pages/contact/ContactPage'))
const BookingPage = lazy(() => import('@/pages/booking/BookingPage'))
const AdminDashboardPage = lazy(() => import('@/pages/admin/AdminDashboardPage'))
const BookingListPage = lazy(() => import('@/pages/admin/BookingListPage'))
const BookingDetailsPage = lazy(() => import('@/pages/admin/BookingDetailsPage'))

const SuspensePage = ({ children }: { children: React.ReactNode }) => (
  <Suspense
    fallback={
      <div className="flex items-center justify-center py-20 text-sm text-slate-300">
        Loading page…
      </div>
    }
  >
    {children}
  </Suspense>
)

const NotFound = () => (
  <div className="space-y-3">
    <h1 className="text-3xl font-semibold text-white">Page not found</h1>
    <p className="text-slate-300">Try a different link from the navigation.</p>
  </div>
)

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: (
              <SuspensePage>
                <HomePage />
              </SuspensePage>
            ),
          },
          {
            path: 'services',
            element: (
              <SuspensePage>
                <ServicesPage />
              </SuspensePage>
            ),
          },
          {
            path: 'contact',
            element: (
              <SuspensePage>
                <ContactPage />
              </SuspensePage>
            ),
          },
          {
            path: 'booking',
            element: (
              <SuspensePage>
                <BookingPage />
              </SuspensePage>
            ),
          },
          {
            path: '*',
            element: (
              <SuspensePage>
                <NotFound />
              </SuspensePage>
            ),
          },
        ],
      },
      {
        path: '/admin',
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: (
              <SuspensePage>
                <AdminDashboardPage />
              </SuspensePage>
            ),
          },
          {
            path: 'bookings',
            element: (
              <SuspensePage>
                <BookingListPage />
              </SuspensePage>
            ),
          },
          {
            path: 'bookings/:id',
            element: (
              <SuspensePage>
                <BookingDetailsPage />
              </SuspensePage>
            ),
          },
          {
            path: '*',
            element: (
              <SuspensePage>
                <NotFound />
              </SuspensePage>
            ),
          },
        ],
      },
    ],
  },
])
