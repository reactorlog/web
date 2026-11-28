import type { LoadState, Site, SiteDetail } from './types'

export const SITES_EMPTY_MESSAGE = 'No nuclear power sites found'
export const SITE_MISSING_MESSAGE = 'Site not found'
export const SITES_NO_MATCH_MESSAGE = 'No sites match.'

export type SitesControls = {
  query: string
  stateFilter: 'all' | string
}

export type SitesListModel = {
  facetStates: string[]
  visible: Site[]
  noMatches: boolean
}

export type SitesScreen =
  | { kind: 'loading' }
  | { kind: 'empty'; message: typeof SITES_EMPTY_MESSAGE }
  | { kind: 'list'; sites: Site[] }

export type SiteDetailScreen =
  | { kind: 'loading' }
  | { kind: 'empty'; message: typeof SITE_MISSING_MESSAGE }
  | { kind: 'ready'; site: SiteDetail }

function sortSitesByName(sites: Site[]): Site[] {
  return [...sites].sort((a, b) => a.name.localeCompare(b.name))
}

function matchesQuery(site: Site, query: string): boolean {
  const q = query.trim().toLowerCase()
  if (!q) return true
  const hay = [site.name, site.city, site.state].filter(Boolean).join(' ').toLowerCase()
  return hay.includes(q)
}

export function buildSitesListModel(sites: Site[], controls: SitesControls): SitesListModel {
  const facetStates = [
    ...new Set(sites.map((site) => site.state).filter((state): state is string => state != null)),
  ].sort((a, b) => a.localeCompare(b))

  const visible = sortSitesByName(sites).filter((site) => {
    if (controls.stateFilter !== 'all' && site.state !== controls.stateFilter) {
      return false
    }
    return matchesQuery(site, controls.query)
  })

  return {
    facetStates,
    visible,
    noMatches: sites.length > 0 && visible.length === 0,
  }
}

export function sitesScreen(state: LoadState<Site[]>): SitesScreen {
  switch (state.status) {
    case 'idle':
    case 'loading':
      return { kind: 'loading' }
    case 'error':
      return { kind: 'empty', message: SITES_EMPTY_MESSAGE }
    case 'ready':
      if (state.data.length === 0) {
        return { kind: 'empty', message: SITES_EMPTY_MESSAGE }
      }
      return { kind: 'list', sites: sortSitesByName(state.data) }
  }
}

export function siteDetailScreen(state: LoadState<SiteDetail>): SiteDetailScreen {
  switch (state.status) {
    case 'idle':
    case 'loading':
      return { kind: 'loading' }
    case 'error':
      return { kind: 'empty', message: SITE_MISSING_MESSAGE }
    case 'ready':
      return { kind: 'ready', site: state.data }
  }
}
