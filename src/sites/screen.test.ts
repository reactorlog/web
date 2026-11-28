import { describe, expect, it } from 'vitest'
import {
  SITE_MISSING_MESSAGE,
  SITES_EMPTY_MESSAGE,
  buildSitesListModel,
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
  reactor_count: 0,
}

function plant(overrides: Partial<Site> & Pick<Site, 'id' | 'name'>): Site {
  return { ...site, city: null, state: null, location: null, ...overrides }
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

  it('maps ready sites to a flat name-sorted list', () => {
    const dixon = plant({ id: 'site-dixon', name: 'Dixon', state: 'IL' })
    const braidwood = plant({ id: 'site-braidwood', name: 'Braidwood', state: 'IL' })
    const southTexas = plant({ id: 'site-south-texas', name: 'South Texas', state: 'TX' })

    expect(
      sitesScreen({
        status: 'ready',
        data: [dixon, southTexas, braidwood],
      }),
    ).toEqual({
      kind: 'list',
      sites: [braidwood, dixon, southTexas],
    })
  })
})

describe('buildSitesListModel', () => {
  const braidwood = plant({ id: 'site-braidwood', name: 'Braidwood', state: 'IL', city: 'Braceville' })
  const dixon = plant({ id: 'site-dixon', name: 'Dixon', state: 'IL' })
  const paloVerde = plant({ id: 'site-palo-verde', name: 'Palo Verde', state: 'AZ' })
  const unplaced = plant({ id: 'site-unplaced', name: 'Unplaced', state: null })

  const fleet = [dixon, paloVerde, braidwood, unplaced]

  it('builds facet states from the full fleet, ignoring null state', () => {
    const model = buildSitesListModel(fleet, { query: '', stateFilter: 'all' })
    expect(model.facetStates).toEqual(['AZ', 'IL'])
    expect(model.visible.map((s) => s.name)).toEqual([
      'Braidwood',
      'Dixon',
      'Palo Verde',
      'Unplaced',
    ])
    expect(model.noMatches).toBe(false)
  })

  it('filters by query across name, city, and state', () => {
    expect(
      buildSitesListModel(fleet, { query: 'brace', stateFilter: 'all' }).visible.map((s) => s.name),
    ).toEqual(['Braidwood'])
    expect(
      buildSitesListModel(fleet, { query: 'az', stateFilter: 'all' }).visible.map((s) => s.name),
    ).toEqual(['Palo Verde'])
  })

  it('applies state filter after query and keeps facet options from the full fleet', () => {
    const model = buildSitesListModel(fleet, { query: 'dixon', stateFilter: 'IL' })
    expect(model.visible.map((s) => s.name)).toEqual(['Dixon'])
    expect(model.facetStates).toEqual(['AZ', 'IL'])
  })

  it('excludes null-state sites when a concrete state is selected', () => {
    const model = buildSitesListModel(fleet, { query: '', stateFilter: 'IL' })
    expect(model.visible.map((s) => s.name)).toEqual(['Braidwood', 'Dixon'])
  })

  it('marks noMatches when the fleet is nonempty but filters hide everything', () => {
    const model = buildSitesListModel(fleet, { query: 'zzzz', stateFilter: 'all' })
    expect(model.visible).toEqual([])
    expect(model.noMatches).toBe(true)
  })

  it('does not mark noMatches for an empty fleet', () => {
    expect(buildSitesListModel([], { query: '', stateFilter: 'all' }).noMatches).toBe(false)
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
