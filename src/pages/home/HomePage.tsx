import { Link, useNavigate } from 'react-router-dom'
import Button from '@/components/Button'
import PageHeader from '@/components/PageHeader'
import SectionCard from '@/components/SectionCard'
import { serviceCategories } from '@/services/services'

const HomePage = () => {
  const navigate = useNavigate()

  return (
    <div className="space-y-8">
      <PageHeader
        title="On-demand home services"
        description="Plumbing, electrical, AC, and gadget repairs handled with clear scheduling and transparent status updates."
        action={
          <>
            <Button onClick={() => navigate('/booking')}>
              Book a service
            </Button>
            <Button variant="secondary" onClick={() => navigate('/services')}>
              Browse services
            </Button>
          </>
        }
      />

      <SectionCard title="Popular categories">
        <div className="grid gap-4 md:grid-cols-3">
          {serviceCategories.slice(0, 6).map((category) => (
            <div
              key={category.id}
              className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-4 shadow-sm shadow-black/30"
            >
              <p className="text-sm font-semibold text-white">{category.name}</p>
              <p className="mt-2 text-sm text-slate-300">{category.summary}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {category.subCategories.slice(0, 3).map((sub) => (
                  <span
                    key={sub.id}
                    className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-200"
                  >
                    {sub.name}
                  </span>
                ))}
              </div>
              <Link to="/booking" className="mt-3 inline-flex text-sm font-semibold text-indigo-200">
                Start booking
              </Link>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="How it works">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            'Pick a category and sub-category that matches your issue.',
            'Choose your location, preferred date and time.',
            'Confirm details; track in the admin dashboard demo.',
          ].map((item, index) => (
            <div
              key={item}
              className="rounded-xl border border-slate-800/60 bg-slate-900/50 p-4 text-sm text-slate-200"
            >
              <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/15 text-xs font-bold text-indigo-200">
                {index + 1}
              </div>
              {item}
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  )
}

export default HomePage
