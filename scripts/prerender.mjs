/**
 * Static site generation. After `vite build` (client) and `vite build --ssr`
 * (server), this renders every route to its own HTML file so pages paint and
 * index without JavaScript, then writes robots.txt and sitemap.xml.
 * Previews (VERCEL_ENV !== "production") are marked noindex.
 */
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const serverDir = join(root, 'dist-server')

const { render, ROUTE_META, NOT_FOUND_META, SITE, SITE_URL } = await import(
  pathToFileURL(join(serverDir, 'entry-server.js')).href
)

const template = await readFile(join(dist, 'index.html'), 'utf8')
const indexable = !process.env.VERCEL_ENV || process.env.VERCEL_ENV === 'production'

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const json = (o) => JSON.stringify(o).replace(/</g, '\\u003c')

function head(meta, { canonical = true } = {}) {
  const url = `${SITE_URL}${meta.path === '/' ? '/' : meta.path}`
  const image = `${SITE_URL}/og-image.png`
  return [
    canonical && `<link rel="canonical" href="${url}" />`,
    !indexable || !canonical ? '<meta name="robots" content="noindex" />' : null,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${SITE.name}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="Crewhir. Consider it done." />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    ...meta.jsonLd.map((o) => `<script type="application/ld+json">${json(o)}</script>`),
  ]
    .filter(Boolean)
    .join('\n    ')
}

function page(meta, html, opts) {
  return template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(meta.title)}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${esc(meta.description)}$2`)
    .replace('<!--app-head-->', head(meta, opts))
    .replace('<!--app-html-->', html)
}

for (const meta of ROUTE_META) {
  const file = meta.path === '/' ? join(dist, 'index.html') : join(dist, meta.path.slice(1), 'index.html')
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, page(meta, render(meta.path)))
  console.log(`prerendered ${meta.path}`)
}

await writeFile(join(dist, '404.html'), page(NOT_FOUND_META, render('/404'), { canonical: false }))
console.log('prerendered /404')

await writeFile(
  join(dist, 'robots.txt'),
  indexable ? `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n` : 'User-agent: *\nDisallow: /\n',
)

const today = new Date().toISOString().slice(0, 10)
await writeFile(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${ROUTE_META.map(
    (m) => `  <url><loc>${SITE_URL}${m.path === '/' ? '/' : m.path}</loc><lastmod>${today}</lastmod></url>`,
  ).join('\n')}\n</urlset>\n`,
)
console.log(`wrote robots.txt (${indexable ? 'indexable' : 'noindex'}) and sitemap.xml`)

await rm(serverDir, { recursive: true, force: true })
