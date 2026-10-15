import { StrictMode, type ComponentType } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { App, pageFor, type PageKey } from './app'
import './styles/globals.css'

const pages: Record<PageKey, () => Promise<{ default: ComponentType }>> = {
  home: () => import('./pages/home'),
  legal: () => import('./pages/legal'),
  'not-found': () => import('./pages/not-found'),
}

const root = document.getElementById('root')!
// The prerendered HTML says which page it holds, so a server fallback (say,
// the 404 page served for an unknown URL) always hydrates the page it sent.
const path = root.dataset.path ?? window.location.pathname
// Load only that page's code, then hydrate.
const { default: Page } = await pages[pageFor(path)]()

const app = (
  <StrictMode>
    <App path={path} Page={Page} />
  </StrictMode>
)

if (root.firstElementChild) hydrateRoot(root, app)
else createRoot(root).render(app)

;(window as Window & { __crewhirReady?: boolean }).__crewhirReady = true
