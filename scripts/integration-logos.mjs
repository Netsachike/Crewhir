/**
 * Extracts the official full-colour integration marks from the
 * @iconify-json/logos set into src/assets/integrations/<slug>.svg.
 * Marks are copied as published, never redrawn or recoloured (plan §2.6).
 * Run with `npm run logos` after adding an integration below.
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const set = require('@iconify-json/logos/icons.json')
const out = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'assets', 'integrations')
await mkdir(out, { recursive: true })

/** slug in this repo → icon name in the Iconify "logos" set */
export const MARKS = {
  slack: 'slack-icon',
  teams: 'microsoft-teams',
  gmail: 'google-gmail',
  'google-drive': 'google-drive',
  'google-calendar': 'google-calendar',
  'google-ads': 'google-ads',
  'google-analytics': 'google-analytics',
  notion: 'notion-icon',
  stripe: 'stripe',
  github: 'github-icon',
  hubspot: 'hubspot',
  linear: 'linear-icon',
  jira: 'jira',
  salesforce: 'salesforce',
  airtable: 'airtable',
  meta: 'meta-icon',
  shopify: 'shopify',
  figma: 'figma',
  intercom: 'intercom',
  zendesk: 'zendesk',
  asana: 'asana-icon',
  dropbox: 'dropbox',
  xero: 'xero',
  openai: 'openai-icon',
  claude: 'claude-icon',
  perplexity: 'perplexity-icon',
}

for (const [slug, name] of Object.entries(MARKS)) {
  const icon = set.icons[name]
  if (!icon) throw new Error(`Missing icon: ${name}`)
  const w = icon.width ?? set.width ?? 16
  const h = icon.height ?? set.height ?? 16
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${icon.left ?? 0} ${icon.top ?? 0} ${w} ${h}">${icon.body}</svg>\n`
  await writeFile(join(out, `${slug}.svg`), svg)
}
console.log(`wrote ${Object.keys(MARKS).length} marks to src/assets/integrations`)
