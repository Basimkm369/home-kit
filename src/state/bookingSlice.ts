import { createSlice, nanoid } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { mockBookings } from '@/utils/mockBookings'
import type {
  BookingAddress,
  BookingForm,
  BookingRecord,
  BookingStepId,
  BookingUserDetails,
} from '@/state/bookingTypes'
import type { ServiceCategoryId, ServiceSubCategoryId } from '@/services/services'

const createInitialForm = (): BookingForm => ({
  categoryId: null,
  subCategoryId: null,
  location: '',
  date: '',
  time: '',
  user: { name: '', mobile: '' },
  address: {
    house: '',
    street: '',
    place: '',
    district: '',
    pincode: '',
  },
})

export interface BookingState {
  currentStep: number
  steps: BookingStepId[]
  form: BookingForm
  bookings: BookingRecord[]
}

const steps: BookingStepId[] = [
  'category',
  'subCategory',
  'location',
  'schedule',
  'user',
  'address',
  'confirm',
]

const initialState: BookingState = {
  currentStep: 0,
  steps,
  form: createInitialForm(),
  bookings: mockBookings,
}

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    resetBooking: (state) => {
      state.currentStep = 0
      state.form = createInitialForm()
    },
    setCategory: (state, action: PayloadAction<ServiceCategoryId>) => {
      state.form.categoryId = action.payload
      state.form.subCategoryId = null
    },
    setSubCategory: (state, action: PayloadAction<ServiceSubCategoryId>) => {
      state.form.subCategoryId = action.payload
    },
    setLocation: (state, action: PayloadAction<string>) => {
      state.form.location = action.payload
    },
    setSchedule: (state, action: PayloadAction<{ date: string; time: string }>) => {
      state.form.date = action.payload.date
      state.form.time = action.payload.time
    },
    setUserDetails: (state, action: PayloadAction<BookingUserDetails>) => {
      state.form.user = action.payload
    },
    setAddress: (state, action: PayloadAction<BookingAddress>) => {
      state.form.address = action.payload
    },
    goToStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload
    },
    confirmBooking: (state) => {
      if (
        !state.form.categoryId ||
        !state.form.subCategoryId ||
        !state.form.location ||
        !state.form.date ||
        !state.form.time ||
        !state.form.user.name ||
        !state.form.user.mobile ||
        !state.form.address.house ||
        !state.form.address.street ||
        !state.form.address.place ||
        !state.form.address.district ||
        !state.form.address.pincode
      ) {
        return
      }

      const scheduledFor = `${state.form.date}T${state.form.time}:00`
      const id = `BK-${nanoid(5).toUpperCase()}`

      state.bookings.unshift({
        id,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
        scheduledFor,
        categoryId: state.form.categoryId,
        subCategoryId: state.form.subCategoryId,
        customer: state.form.user,
        address: state.form.address,
        locationNote: state.form.location,
      })

      state.currentStep = steps.length - 1
    },
  },
})

export const {
  resetBooking,
  setCategory,
  setSubCategory,
  setLocation,
  setSchedule,
  setUserDetails,
  setAddress,
  goToStep,
  confirmBooking,
} = bookingSlice.actions

export default bookingSlice.reducer

export const selectBookingState = (state: { booking: BookingState }) => state.booking
export const selectBookings = (state: { booking: BookingState }) => state.booking.bookings
