import { get } from 'svelte/store'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { loadSite, loadSites, siteDetailState, sitesState } from './store'

const site = {
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

describe('sites store', () => {
  beforeEach(() => {
    sitesState.set({ status: 'idle' })
    siteDetailState.set({ status: 'idle' })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('loadSites reaches ready with parsed data', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        text: async () => JSON.stringify([site]),
      }),
    )

    await loadSites()
    expect(get(sitesState)).toEqual({ status: 'ready', data: [site] })
  })

  it('loadSites records network failure', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new TypeError('failed to fetch')),
    )

    await loadSites()
    expect(get(sitesState)).toEqual({
      status: 'error',
      message: 'network error loading sites',
    })
  })

  it('loadSite maps 404 to not found', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
        text: async () => '',
      }),
    )

    await loadSite(site.id)
    expect(get(siteDetailState)).toEqual({
      status: 'error',
      message: 'site not found',
    })
  })

  it('loadSite reaches ready with reactors', async () => {
    const detail = { ...site, reactors: [] }
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        text: async () => JSON.stringify(detail),
      }),
    )

    await loadSite(site.id)
    expect(get(siteDetailState)).toEqual({ status: 'ready', data: detail })
  })
})
