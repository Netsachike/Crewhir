/**
 * Image lookups. Vite fingerprints each file (or inlines it when tiny), so
 * components ask for a slug and get a URL that works in dev, build and SSR.
 */
const logoFiles = import.meta.glob<string>('../assets/integrations/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
})
const avatarFiles = import.meta.glob<string>('../assets/avatars/*.jpg', {
  eager: true,
  query: '?url',
  import: 'default',
})

const bySlug = (files: Record<string, string>) =>
  Object.fromEntries(
    Object.entries(files).map(([path, url]) => [
      path
        .split('/')
        .pop()!
        .replace(/\.\w+$/, ''),
      url,
    ]),
  )

const logos = bySlug(logoFiles)
const avatars = bySlug(avatarFiles)

export type LogoSlug =
  | 'slack'
  | 'teams'
  | 'gmail'
  | 'google-drive'
  | 'google-calendar'
  | 'google-ads'
  | 'google-analytics'
  | 'notion'
  | 'stripe'
  | 'github'
  | 'hubspot'
  | 'linear'
  | 'jira'
  | 'salesforce'
  | 'airtable'
  | 'meta'
  | 'shopify'
  | 'figma'
  | 'intercom'
  | 'zendesk'
  | 'asana'
  | 'dropbox'
  | 'xero'
  | 'openai'
  | 'claude'
  | 'perplexity'

export type AvatarSlug = 'maya' | 'daniel' | 'priya' | 'sam' | 'marcus' | 'leo' | 'kwame' | 'ana'

export const logoUrl = (slug: LogoSlug) => logos[slug]
export const avatarUrl = (slug: AvatarSlug) => avatars[slug]

/** Marks that are wordmarks rather than square symbols get a wider box. */
export const WORDMARKS: LogoSlug[] = ['stripe', 'hubspot', 'intercom', 'zendesk', 'xero']
