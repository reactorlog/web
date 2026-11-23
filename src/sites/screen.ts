import type { LoadState, Site, SiteDetail } from './types'

export const SITES_EMPTY_MESSAGE = 'No nuclear power sites found'
export const SITE_MISSING_MESSAGE = 'Site not found'

export type SitesScreen =
  | { kind: 'loading' }
  | { kind: 'empty'; message: typeof SITES_EMPTY_MESSAGE }
  | { kind: 'list'; sites: Site[] }

export type SiteDetailScreen =
  | { kind: 'loading' }
  | { kind: 'empty'; message: typeof SITE_MISSING_MESSAGE }
  | { kind: 'ready'; site: SiteDetail }

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
      return { kind: 'list', sites: state.data }
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
