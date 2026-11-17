import { parseSiteDetail, parseSites } from './parse'
import type { Site, SiteDetail } from './types'

export class ApiError extends Error {
  readonly status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

async function readJson(response: Response): Promise<unknown> {
  const text = await response.text()
  if (text === '') {
    return null
  }
  try {
    return JSON.parse(text) as unknown
  } catch {
    throw new Error('response was not JSON')
  }
}

export async function fetchHealth(): Promise<boolean> {
  try {
    const response = await fetch('/api/health')
    return response.ok
  } catch {
    return false
  }
}

export async function fetchSites(): Promise<Site[]> {
  let response: Response
  try {
    response = await fetch('/api/sites')
  } catch {
    throw new Error('network error loading sites')
  }
  if (!response.ok) {
    throw new ApiError(response.status, `failed to load sites (${response.status})`)
  }
  return parseSites(await readJson(response))
}

export async function fetchSite(id: string): Promise<SiteDetail> {
  let response: Response
  try {
    response = await fetch(`/api/sites/${encodeURIComponent(id)}`)
  } catch {
    throw new Error('network error loading site')
  }
  if (response.status === 404) {
    throw new ApiError(404, 'site not found')
  }
  if (!response.ok) {
    throw new ApiError(response.status, `failed to load site (${response.status})`)
  }
  return parseSiteDetail(await readJson(response))
}
