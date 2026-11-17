import type { Reactor } from '../reactors/types'
import type { Site, SiteDetail } from './types'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function readString(value: unknown, field: string): string {
  if (typeof value !== 'string') {
    throw new Error(`expected string for ${field}`)
  }
  return value
}

function readNullableString(value: unknown, field: string): string | null {
  if (value === null) {
    return null
  }
  if (typeof value !== 'string') {
    throw new Error(`expected string or null for ${field}`)
  }
  return value
}

function readNullableNumber(value: unknown, field: string): number | null {
  if (value === null) {
    return null
  }
  if (typeof value !== 'number' || Number.isNaN(value)) {
    throw new Error(`expected number or null for ${field}`)
  }
  return value
}

export function parseSite(value: unknown): Site {
  if (!isRecord(value)) {
    throw new Error('expected site object')
  }
  return {
    id: readString(value.id, 'id'),
    eia_plant_code: readNullableString(value.eia_plant_code, 'eia_plant_code'),
    name: readString(value.name, 'name'),
    timezone: readNullableString(value.timezone, 'timezone'),
    latitude: readNullableNumber(value.latitude, 'latitude'),
    longitude: readNullableNumber(value.longitude, 'longitude'),
    address_line_1: readNullableString(value.address_line_1, 'address_line_1'),
    address_line_2: readNullableString(value.address_line_2, 'address_line_2'),
    city: readNullableString(value.city, 'city'),
    state: readNullableString(value.state, 'state'),
    location: readNullableString(value.location, 'location'),
    zip: readNullableString(value.zip, 'zip'),
    phone: readNullableString(value.phone, 'phone'),
    email: readNullableString(value.email, 'email'),
    created_at: readString(value.created_at, 'created_at'),
    updated_at: readString(value.updated_at, 'updated_at'),
  }
}

export function parseReactor(value: unknown): Reactor {
  if (!isRecord(value)) {
    throw new Error('expected reactor object')
  }
  return {
    id: readString(value.id, 'id'),
    site_id: readString(value.site_id, 'site_id'),
    name: readString(value.name, 'name'),
    unit_number: readString(value.unit_number, 'unit_number'),
    docket_number: readString(value.docket_number, 'docket_number'),
    reactor_type: readString(value.reactor_type, 'reactor_type'),
    design: readNullableString(value.design, 'design'),
    created_at: readString(value.created_at, 'created_at'),
    updated_at: readString(value.updated_at, 'updated_at'),
  }
}

export function parseSites(value: unknown): Site[] {
  if (!Array.isArray(value)) {
    throw new Error('expected sites array')
  }
  return value.map(parseSite)
}

export function parseSiteDetail(value: unknown): SiteDetail {
  if (!isRecord(value)) {
    throw new Error('expected site detail object')
  }
  const site = parseSite(value)
  if (!Array.isArray(value.reactors)) {
    throw new Error('expected reactors array')
  }
  return {
    ...site,
    reactors: value.reactors.map(parseReactor),
  }
}
