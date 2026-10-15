import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { App } from './app'

export { NOT_FOUND_META, ROUTE_META } from './lib/meta'
export { COMPANY, SITE, SITE_URL } from './lib/site'

/** Used by scripts/prerender.mjs to write static HTML for each route. */
export function render(url: string) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )
}
