import { describe, expect, it } from 'vitest'
import { parseSite, parseSiteDetail, parseSites } from './parse'

const siteJson = {
  id: '019a0000-0000-7000-8000-000000000001',
  eia_plant_code: null,
  name: 'Example',
  timezone: null,
  latitude: 41.5,
  longitude: null,
  address_line_1: null,
  address_line_2: null,
  city: null,
  state: 'IL',
  location: 'Somewhere, IL',
  zip: null,
  phone: null,
  email: null,
  created_at: '2026-11-17T00:00:00Z',
  updated_at: '2026-11-17T00:00:00Z',
  reactor_count: 2,
}

const reactorJson = {
  id: '019a0000-0000-7000-8000-000000000002',
  site_id: siteJson.id,
  name: 'Example',
  unit_number: '1',
  docket_number: '05000456',
  reactor_type: 'PWR',
  design: null,
  created_at: '2026-11-17T00:00:00Z',
  updated_at: '2026-11-17T00:00:00Z',
}

describe('parseSites', () => {
  it('parses a site list', () => {
    expect(parseSites([siteJson])).toEqual([
      {
        ...siteJson,
        latitude: 41.5,
      },
    ])
  })

  it('rejects a non-array', () => {
    expect(() => parseSites({})).toThrow(/sites array/)
  })
})

describe('parseSiteDetail', () => {
  it('parses a site with reactors', () => {
    const detail = parseSiteDetail({ ...siteJson, reactors: [reactorJson] })
    expect(detail.name).toBe('Example')
    expect(detail.reactors).toHaveLength(1)
    expect(detail.reactors[0]?.docket_number).toBe('05000456')
  })

  it('rejects missing reactors', () => {
    expect(() => parseSiteDetail(siteJson)).toThrow(/reactors array/)
  })
})

describe('parseSite', () => {
  it('rejects a bad field type', () => {
    expect(() => parseSite({ ...siteJson, name: 1 })).toThrow(/name/)
  })

  it('accepts a zero reactor_count', () => {
    expect(parseSite({ ...siteJson, reactor_count: 0 }).reactor_count).toBe(0)
  })

  it('rejects a missing reactor_count', () => {
    const { reactor_count, ...rest } = siteJson
    expect(reactor_count).toBe(2)
    expect(() => parseSite(rest)).toThrow(/reactor_count/)
  })

  it('rejects a non-integer reactor_count', () => {
    expect(() => parseSite({ ...siteJson, reactor_count: 1.5 })).toThrow(/reactor_count/)
    expect(() => parseSite({ ...siteJson, reactor_count: '2' })).toThrow(/reactor_count/)
    expect(() => parseSite({ ...siteJson, reactor_count: null })).toThrow(/reactor_count/)
  })

  it('rejects a negative reactor_count', () => {
    expect(() => parseSite({ ...siteJson, reactor_count: -1 })).toThrow(/reactor_count/)
  })
})
