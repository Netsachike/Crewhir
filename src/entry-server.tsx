import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { App, pageFor } from './app'
import Home from './pages/home'
import Legal from './pages/legal'
import NotFound from './pages/not-found'

export { pageFor }
export { NOT_FOUND_META, ROUTE_META } from './lib/meta'
export { COMPANY, SITE, SITE_URL } from './lib/site'

const pages = { home: Home, legal: Legal, 'not-found': NotFound }

/** Used by scripts/prerender.mjs to write static HTML for each route. */
export function render(path: string) {
  return renderToString(
    <StrictMode>
      <App path={path} Page={pages[pageFor(path)]} />
    </StrictMode>,
  )
}
