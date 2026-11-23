import { describe, expect, it } from 'vitest'
import {
  SITE_MISSING_MESSAGE,
  SITES_EMPTY_MESSAGE,
  siteDetailScreen,
  sitesScreen,
} from './screen'
import type { Site, SiteDetail } from './types'

const site: Site = {
  id: '019a0000-0000-7000-8000-000000000001',
  eia_plant_code: null,
  name: 'Example',
  timezone: null,
  latitude: null,
  longitude: null,
  address_line_1: null,
  address_line_2: null,
  city: null,
  state: 'IL',
  location: null,
  zip: null,
  phone: null,
  email: null,
  created_at: '2026-11-17T00:00:00Z',
  updated_at: '2026-11-17T00:00:00Z',
}

describe('sitesScreen', () => {
  it('maps ready empty list to the sites empty message', () => {
    expect(sitesScreen({ status: 'ready', data: [] })).toEqual({
      kind: 'empty',
      message: SITES_EMPTY_MESSAGE,
    })
  })

  it('maps load error to the same empty message without api copy', () => {
    expect(sitesScreen({ status: 'error', message: 'failed to load sites (502)' })).toEqual({
      kind: 'empty',
      message: SITES_EMPTY_MESSAGE,
    })
  })

  it('maps a populated list', () => {
    expect(sitesScreen({ status: 'ready', data: [site] })).toEqual({
      kind: 'list',
      sites: [site],
    })
  })
})

describe('siteDetailScreen', () => {
  it('maps error to site-not-found copy, not the fleet empty string', () => {
    expect(siteDetailScreen({ status: 'error', message: 'site not found' })).toEqual({
      kind: 'empty',
      message: SITE_MISSING_MESSAGE,
    })
    expect(SITE_MISSING_MESSAGE).not.toBe(SITES_EMPTY_MESSAGE)
  })

  it('maps ready detail', () => {
    const detail: SiteDetail = { ...site, reactors: [] }
    expect(siteDetailScreen({ status: 'ready', data: detail })).toEqual({
      kind: 'ready',
      site: detail,
    })
  })
})
