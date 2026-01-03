import type { ServiceCategoryId, ServiceSubCategoryId } from '@/services/services'

export type BookingStepId =
  | 'category'
  | 'subCategory'
  | 'location'
  | 'schedule'
  | 'user'
  | 'address'
  | 'confirm'

export interface BookingUserDetails {
  name: string
  mobile: string
}

export interface BookingAddress {
  house: string
  street: string
  place: string
  district: string
  pincode: string
}

export interface BookingForm {
  categoryId: ServiceCategoryId | null
  subCategoryId: ServiceSubCategoryId | null
  location: string
  date: string
  time: string
  user: BookingUserDetails
  address: BookingAddress
}

export type BookingStatus = 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled'

export interface BookingRecord {
  id: string
  status: BookingStatus
  createdAt: string
  scheduledFor: string
  categoryId: ServiceCategoryId
  subCategoryId: ServiceSubCategoryId
  customer: BookingUserDetails
  address: BookingAddress
  locationNote: string
}
