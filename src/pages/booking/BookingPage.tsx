import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BookingStepper from '@/components/BookingStepper'
import {
  confirmBooking,
  goToStep,
  resetBooking,
  setAddress,
  setCategory,
  setLocation,
  setSchedule,
  setSubCategory,
  setUserDetails,
} from '@/state/bookingSlice'
import type { BookingStepId } from '@/state/bookingTypes'
import { serviceCategories, serviceLookup } from '@/services/services'
import Button from '@/components/Button'
import PageHeader from '@/components/PageHeader'
import InputField from '@/forms/InputField'
import NumberInput from '@/forms/NumberInput'
import TextAreaField from '@/forms/TextAreaField'
import { useAppDispatch, useAppSelector } from '@/hooks'

type StepErrors = Partial<Record<string, string>>

const stepLabels: Record<BookingStepId, string> = {
  category: 'Select Service Category',
  subCategory: 'Select Sub-Category',
  location: 'Select Location',
  schedule: 'Preferred Date & Time',
  user: 'User Details',
  address: 'Address Details',
  confirm: 'Booking Confirmation',
}

const BookingPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { form, steps, currentStep } = useAppSelector((state) => state.booking)
  const [touchedStep, setTouchedStep] = useState<number>(0)

  const category = form.categoryId ? serviceLookup[form.categoryId] : null
  const subCategory = category?.subCategories.find((sub) => sub.id === form.subCategoryId)

  const getErrorsForStep = (stepId: BookingStepId): StepErrors => {
    switch (stepId) {
      case 'category':
        return form.categoryId ? {} : { categoryId: 'Pick a service category to continue.' }
      case 'subCategory':
        return form.subCategoryId ? {} : { subCategoryId: 'Select a sub-category.' }
      case 'location':
        return form.location.trim().length > 5
          ? {}
          : { location: 'Provide a brief location note or landmark.' }
      case 'schedule':
        return form.date && form.time ? {} : { schedule: 'Pick a date and time.' }
      case 'user': {
        const errors: StepErrors = {}
        if (!form.user.name) errors.name = 'Name is required.'
        if (!form.user.mobile || form.user.mobile.length < 10)
          errors.mobile = 'Enter a valid mobile number.'
        return errors
      }
      case 'address': {
        const errors: StepErrors = {}
        if (!form.address.house) errors.house = 'Required'
        if (!form.address.street) errors.street = 'Required'
        if (!form.address.place) errors.place = 'Required'
        if (!form.address.district) errors.district = 'Required'
        if (!form.address.pincode || form.address.pincode.length < 5)
          errors.pincode = 'Enter a valid pincode'
        return errors
      }
      case 'confirm':
      default:
        return {}
    }
  }

  const errors = useMemo(() => getErrorsForStep(steps[currentStep]), [steps, currentStep, form])
  const canProceed = Object.keys(errors).length === 0

  const goNext = () => {
    setTouchedStep(currentStep)
    if (!canProceed) return
    if (currentStep < steps.length - 1) {
      dispatch(goToStep(currentStep + 1))
    }
  }

  const goPrev = () => {
    dispatch(goToStep(Math.max(0, currentStep - 1)))
  }

  const handleConfirm = () => {
    setTouchedStep(currentStep)
    if (!canProceed) return
    dispatch(confirmBooking())
    navigate('/admin/bookings')
  }

  const resetFlow = () => {
    dispatch(resetBooking())
    navigate('/services')
  }

  const renderStep = () => {
    switch (steps[currentStep]) {
      case 'category':
        return (
          <div className="grid gap-3 md:grid-cols-3">
            {serviceCategories.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => dispatch(setCategory(item.id))}
                className={[
                  'flex flex-col gap-2 rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:border-indigo-500/70 hover:shadow-lg hover:shadow-indigo-900/40',
                  form.categoryId === item.id
                    ? 'border-indigo-500/70 bg-indigo-500/10'
                    : 'border-slate-800 bg-slate-900/70',
                ].join(' ')}
              >
                <p className="text-sm font-semibold text-white">{item.name}</p>
                <p className="text-xs text-slate-300">{item.summary}</p>
              </button>
            ))}
            {touchedStep === currentStep && errors.categoryId ? (
              <p className="text-sm text-red-300">{errors.categoryId}</p>
            ) : null}
          </div>
        )
      case 'subCategory':
        if (!category) {
          return <p className="text-sm text-red-300">Choose a category first.</p>
        }
        return (
          <div className="grid gap-3 md:grid-cols-3">
            {category.subCategories.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => dispatch(setSubCategory(item.id))}
                className={[
                  'flex flex-col gap-2 rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:border-indigo-500/70 hover:shadow-lg hover:shadow-indigo-900/40',
                  form.subCategoryId === item.id
                    ? 'border-indigo-500/70 bg-indigo-500/10'
                    : 'border-slate-800 bg-slate-900/70',
                ].join(' ')}
              >
                <p className="text-sm font-semibold text-white">{item.name}</p>
                <p className="text-xs text-slate-300">{item.description}</p>
              </button>
            ))}
            {touchedStep === currentStep && errors.subCategoryId ? (
              <p className="text-sm text-red-300">{errors.subCategoryId}</p>
            ) : null}
          </div>
        )
      case 'location':
        return (
          <TextAreaField
            label="Location / Landmark"
            placeholder="Add a landmark, floor, or directions (mocked input acceptable)"
            value={form.location}
            error={touchedStep === currentStep ? errors.location : undefined}
            onChange={(event) => dispatch(setLocation(event.target.value))}
          />
        )
      case 'schedule':
        return (
          <div className="grid gap-4 md:grid-cols-2">
            <InputField
              type="date"
              label="Preferred date"
              value={form.date}
              onChange={(event) => dispatch(setSchedule({ date: event.target.value, time: form.time }))}
              error={touchedStep === currentStep ? (errors.schedule as string | undefined) : undefined}
            />
            <InputField
              type="time"
              label="Preferred time"
              value={form.time}
              onChange={(event) => dispatch(setSchedule({ date: form.date, time: event.target.value }))}
              error={touchedStep === currentStep ? (errors.schedule as string | undefined) : undefined}
            />
          </div>
        )
      case 'user':
        return (
          <div className="grid gap-4 md:grid-cols-2">
            <InputField
              label="Full name"
              placeholder="Enter your name"
              value={form.user.name}
              error={touchedStep === currentStep ? errors.name : undefined}
              onChange={(event) => dispatch(setUserDetails({ ...form.user, name: event.target.value }))}
            />
            <NumberInput
              label="Mobile number"
              placeholder="10-digit mobile number"
              value={form.user.mobile}
              error={touchedStep === currentStep ? errors.mobile : undefined}
              maxLength={10}
              onChange={(value) => dispatch(setUserDetails({ ...form.user, mobile: value }))}
            />
          </div>
        )
      case 'address':
        return (
          <div className="grid gap-4 md:grid-cols-2">
            <InputField
              label="House / Flat"
              value={form.address.house}
              error={touchedStep === currentStep ? errors.house : undefined}
              onChange={(event) => dispatch(setAddress({ ...form.address, house: event.target.value }))}
            />
            <InputField
              label="Street"
              value={form.address.street}
              error={touchedStep === currentStep ? errors.street : undefined}
              onChange={(event) => dispatch(setAddress({ ...form.address, street: event.target.value }))}
            />
            <InputField
              label="Place"
              value={form.address.place}
              error={touchedStep === currentStep ? errors.place : undefined}
              onChange={(event) => dispatch(setAddress({ ...form.address, place: event.target.value }))}
            />
            <InputField
              label="District"
              value={form.address.district}
              error={touchedStep === currentStep ? errors.district : undefined}
              onChange={(event) => dispatch(setAddress({ ...form.address, district: event.target.value }))}
            />
            <NumberInput
              label="Pincode"
              value={form.address.pincode}
              error={touchedStep === currentStep ? errors.pincode : undefined}
              maxLength={6}
              onChange={(value) => dispatch(setAddress({ ...form.address, pincode: value }))}
            />
          </div>
        )
      case 'confirm':
        return (
          <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg shadow-black/30">
            <p className="text-sm text-slate-300">
              Review your selections before confirming. This will add a booking to the admin list for demo.
            </p>
            <dl className="grid gap-3 md:grid-cols-2">
              <div>
                <dt className="text-xs uppercase tracking-wide text-slate-400">Service</dt>
                <dd className="text-sm text-white">
                  {category?.name ?? 'Not selected'} • {subCategory?.name ?? 'Not selected'}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-slate-400">Location</dt>
                <dd className="text-sm text-white">{form.location || 'Not provided'}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-slate-400">Schedule</dt>
                <dd className="text-sm text-white">
                  {form.date || '—'} at {form.time || '—'}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-slate-400">Contact</dt>
                <dd className="text-sm text-white">
                  {form.user.name || '—'} • {form.user.mobile || '—'}
                </dd>
              </div>
              <div className="md:col-span-2">
                <dt className="text-xs uppercase tracking-wide text-slate-400">Address</dt>
                <dd className="text-sm text-white">
                  {[form.address.house, form.address.street, form.address.place, form.address.district]
                    .filter(Boolean)
                    .join(', ')}
                  {form.address.pincode ? ` - ${form.address.pincode}` : ''}
                </dd>
              </div>
            </dl>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Book a service"
        description="Complete each step to confirm your booking. Data persists while you navigate."
        action={
          <Button variant="ghost" onClick={resetFlow}>
            Reset flow
          </Button>
        }
      />
      <BookingStepper />
      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 shadow-xl shadow-black/40">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300/80">Step</p>
            <h2 className="text-lg font-semibold text-white">{stepLabels[steps[currentStep]]}</h2>
          </div>
          <span className="text-sm text-slate-300">
            {currentStep + 1} / {steps.length}
          </span>
        </div>
        <div className="space-y-4">{renderStep()}</div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button variant="secondary" onClick={goPrev} disabled={currentStep === 0}>
            Back
          </Button>
          {steps[currentStep] === 'confirm' ? (
            <Button onClick={handleConfirm}>
              Confirm booking
            </Button>
          ) : (
            <Button onClick={goNext}>
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default BookingPage
