import { writable } from 'svelte/store'
import { ApiError, fetchSite, fetchSites } from './client'
import type { LoadState, Site, SiteDetail } from './types'

export const sitesState = writable<LoadState<Site[]>>({ status: 'idle' })
export const siteDetailState = writable<LoadState<SiteDetail>>({ status: 'idle' })

export async function loadSites(): Promise<void> {
  sitesState.set({ status: 'loading' })
  try {
    const data = await fetchSites()
    sitesState.set({ status: 'ready', data })
  } catch (error) {
    sitesState.set({
      status: 'error',
      message: error instanceof Error ? error.message : 'failed to load sites',
    })
  }
}

export async function loadSite(id: string): Promise<void> {
  siteDetailState.set({ status: 'loading' })
  try {
    const data = await fetchSite(id)
    siteDetailState.set({ status: 'ready', data })
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      siteDetailState.set({ status: 'error', message: 'site not found' })
      return
    }
    siteDetailState.set({
      status: 'error',
      message: error instanceof Error ? error.message : 'failed to load site',
    })
  }
}
