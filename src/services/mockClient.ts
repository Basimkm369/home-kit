import { mockBookings } from '@/utils/mockBookings'
import { serviceCategories } from '@/services/services'

export const fetchServiceCategories = async () => {
  return Promise.resolve(serviceCategories)
}

export const fetchBookings = async () => {
  return Promise.resolve(mockBookings)
}
