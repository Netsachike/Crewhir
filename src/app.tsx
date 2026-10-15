import { Analytics } from '@vercel/analytics/react'
import type { ComponentType } from 'react'
import { SkipLink } from '@/components/layout/footer'
import { normalizePath, PathProvider } from '@/lib/router'

export type PageKey = 'home' | 'legal' | 'not-found'

const LEGAL_PATHS = ['/privacy-policy', '/terms-of-service', '/refund-policy']

/** Which page module a path needs. Each one is its own chunk in the browser. */
export function pageFor(path: string): PageKey {
  const p = normalizePath(path)
  if (p === '/') return 'home'
  return LEGAL_PATHS.includes(p) ? 'legal' : 'not-found'
}

/** The shell around every page; `path` comes from the prerender or `location`. */
export function App({ path, Page }: { path: string; Page: ComponentType }) {
  return (
    <PathProvider value={normalizePath(path)}>
      <SkipLink />
      <Page />
      <Analytics />
    </PathProvider>
  )
}
