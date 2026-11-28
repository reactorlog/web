export type Site = {
  id: string
  eia_plant_code: string | null
  name: string
  timezone: string | null
  latitude: number | null
  longitude: number | null
  address_line_1: string | null
  address_line_2: string | null
  city: string | null
  state: string | null
  location: string | null
  zip: string | null
  phone: string | null
  email: string | null
  created_at: string
  updated_at: string
  reactor_count: number
}

export type SiteDetail = Site & { reactors: import('../reactors/types').Reactor[] }

export type LoadState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'ready'; data: T }
  | { status: 'error'; message: string }
