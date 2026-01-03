export type ServiceCategoryId =
  | 'plumbing'
  | 'electrical'
  | 'ac'
  | 'electronic-repair'
  | 'gadget-repair'
  | 'carpenter'
  | 'painter'
  | 'kitchen-cabinet'
  | 'welding'

export type ServiceSubCategoryId =
  | 'general-plumbing'
  | 'leak-fix'
  | 'rewiring'
  | 'panel-upgrade'
  | 'ac-installation'
  | 'ac-servicing'
  | 'fridge'
  | 'washing-machine'
  | 'electric-burner'
  | 'other-electronics'
  | 'mobile'
  | 'laptop'
  | 'pc'
  | 'tv'
  | 'airpods'
  | 'other-gadgets'
  | 'woodwork'
  | 'painting'
  | 'cabinet-install'
  | 'welding'

export interface ServiceSubCategory {
  id: ServiceSubCategoryId
  name: string
  description: string
}

export interface ServiceCategory {
  id: ServiceCategoryId
  name: string
  summary: string
  subCategories: ServiceSubCategory[]
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'plumbing',
    name: 'Plumbing',
    summary: 'Leak repairs, fixture installs, and quick fixes.',
    subCategories: [
      { id: 'general-plumbing', name: 'General Plumbing', description: 'Routine fixes and maintenance.' },
      { id: 'leak-fix', name: 'Leak Fix', description: 'Pipes, taps, and joints.' },
    ],
  },
  {
    id: 'electrical',
    name: 'Electrical',
    summary: 'Safe rewiring, panel upgrades, and troubleshooting.',
    subCategories: [
      { id: 'rewiring', name: 'Rewiring', description: 'Home rewiring and safety audits.' },
      { id: 'panel-upgrade', name: 'Panel Upgrade', description: 'Load balancing and new panels.' },
    ],
  },
  {
    id: 'ac',
    name: 'AC Installation & Servicing',
    summary: 'Split/Window AC installs, servicing, and gas top-ups.',
    subCategories: [
      { id: 'ac-installation', name: 'AC Installation', description: 'New unit setup and testing.' },
      { id: 'ac-servicing', name: 'AC Servicing', description: 'Cleaning, gas refill, and tuning.' },
    ],
  },
  {
    id: 'electronic-repair',
    name: 'Electronic Repair',
    summary: 'Home electronics diagnosed and repaired.',
    subCategories: [
      { id: 'fridge', name: 'Fridge', description: 'Cooling issues and part replacements.' },
      { id: 'washing-machine', name: 'Washing Machine', description: 'Drum, drain, and motor fixes.' },
      { id: 'electric-burner', name: 'Electric Burner', description: 'Heating elements and controls.' },
      { id: 'other-electronics', name: 'Other Home Electronics', description: 'Microwaves, purifiers, and more.' },
    ],
  },
  {
    id: 'gadget-repair',
    name: 'Gadget Repair',
    summary: 'Mobiles, laptops, and peripherals serviced quickly.',
    subCategories: [
      { id: 'mobile', name: 'Mobile', description: 'Screen, battery, and board fixes.' },
      { id: 'laptop', name: 'Laptop', description: 'Upgrades, cleaning, and repairs.' },
      { id: 'pc', name: 'PC', description: 'Desktop builds and troubleshooting.' },
      { id: 'tv', name: 'TV', description: 'Display, audio, and connectivity issues.' },
      { id: 'airpods', name: 'AirPods', description: 'Battery and connectivity fixes.' },
      { id: 'other-gadgets', name: 'Other Gadgets', description: 'Wearables and accessories.' },
    ],
  },
  {
    id: 'carpenter',
    name: 'Carpenter',
    summary: 'Furniture builds, repairs, and custom fixtures.',
    subCategories: [
      { id: 'woodwork', name: 'Custom Woodwork', description: 'Shelves, doors, frames.' },
    ],
  },
  {
    id: 'painter',
    name: 'Painter',
    summary: 'Interior and exterior painting with prep.',
    subCategories: [
      { id: 'painting', name: 'Interior/Exterior Painting', description: 'Prep, coats, and cleanup.' },
    ],
  },
  {
    id: 'kitchen-cabinet',
    name: 'Kitchen Cabinet Installation',
    summary: 'Modular cabinet installs and adjustments.',
    subCategories: [
      { id: 'cabinet-install', name: 'Cabinet Install', description: 'Modular and custom cabinets.' },
    ],
  },
  {
    id: 'welding',
    name: 'Welding Work',
    summary: 'Gates, grills, and structural welding tasks.',
    subCategories: [
      { id: 'welding', name: 'Welding Work', description: 'On-site fabrication and fixes.' },
    ],
  },
]

export const serviceLookup: Record<ServiceCategoryId, ServiceCategory> = Object.fromEntries(
  serviceCategories.map((category) => [category.id, category]),
) as Record<ServiceCategoryId, ServiceCategory>
