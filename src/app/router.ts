import { derived, writable } from 'svelte/store'

export type Route =
  | { name: 'sites' }
  | { name: 'site'; id: string }
  | { name: 'not-found' }

function parsePath(pathname: string): Route {
  if (pathname === '/' || pathname === '') {
    return { name: 'sites' }
  }
  const match = pathname.match(/^\/sites\/([^/]+)\/?$/)
  if (match?.[1]) {
    return { name: 'site', id: decodeURIComponent(match[1]) }
  }
  return { name: 'not-found' }
}

function currentPath(): string {
  return window.location.pathname
}

const path = writable(currentPath())

export const route = derived(path, ($path) => parsePath($path))

export function navigate(to: string): void {
  if (to === currentPath()) {
    path.set(to)
    return
  }
  window.history.pushState({}, '', to)
  path.set(to)
}

export function startRouter(): () => void {
  const onPopState = () => {
    path.set(currentPath())
  }
  window.addEventListener('popstate', onPopState)
  path.set(currentPath())
  return () => window.removeEventListener('popstate', onPopState)
}
