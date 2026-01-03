import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { goToStep, setCategory, setSubCategory } from '@/state/bookingSlice'
import {
  serviceCategories,
  type ServiceCategoryId,
  type ServiceSubCategoryId,
} from '@/services/services'
import Button from '@/components/Button'
import PageHeader from '@/components/PageHeader'
import SectionCard from '@/components/SectionCard'
import { useAppDispatch } from '@/hooks'

const ServicesPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [filter, setFilter] = useState<ServiceCategoryId | 'all'>('all')

  const filteredCategories = useMemo(() => {
    if (filter === 'all') return serviceCategories
    return serviceCategories.filter((category) => category.id === filter)
  }, [filter])

  const startBooking = (categoryId: ServiceCategoryId, subCategoryId?: ServiceSubCategoryId) => {
    dispatch(setCategory(categoryId))
    if (subCategoryId) {
      dispatch(setSubCategory(subCategoryId))
      dispatch(goToStep(2))
    } else {
      dispatch(goToStep(1))
    }
    navigate('/booking')
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Services"
        description="Browse all service categories and start a booking with one click."
        action={
          <select
            className="rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-sm text-white"
            value={filter}
            onChange={(event) => setFilter(event.target.value as ServiceCategoryId | 'all')}
          >
            <option value="all">All categories</option>
            {serviceCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        }
      />

      <div className="grid gap-4 md:grid-cols-2">
        {filteredCategories.map((category) => (
          <SectionCard key={category.id} title={category.name}>
            <p className="text-sm text-slate-300">{category.summary}</p>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {category.subCategories.map((sub) => (
                <div
                  key={sub.id}
                  className="rounded-xl border border-slate-800/70 bg-slate-900/60 p-4 shadow-sm shadow-black/30"
                >
                  <p className="text-sm font-semibold text-white">{sub.name}</p>
                  <p className="mt-1 text-xs text-slate-300">{sub.description}</p>
                  <div className="mt-3">
                    <Button
                      onClick={() => startBooking(category.id, sub.id)}
                      className="w-full justify-center"
                    >
                      Book this
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="secondary" onClick={() => startBooking(category.id)}>
                Book any {category.name} service
              </Button>
            </div>
          </SectionCard>
        ))}
      </div>
    </div>
  )
}

export default ServicesPage
