/**
 * Every URL, address and company fact the site uses. Change it here and every
 * page, link and legal document follows. Env values come from Vite (`VITE_*`).
 */
const env = import.meta.env

const trimSlash = (url: string) => url.replace(/\/+$/, '')

export const SITE_URL = trimSlash(env.VITE_SITE_URL || 'https://crewhir.com')
export const APP_URL = trimSlash(env.VITE_APP_URL || 'https://app.crewhir.com')
export const CONTACT_EMAIL = env.VITE_CONTACT_EMAIL || 'hello@crewhir.com'

export const SITE = {
  name: 'Crewhir',
  tagline: 'Consider it done.',
  title: 'Crewhir: the AI teammate in Slack and Microsoft Teams',
  description:
    'Crewhir is an AI teammate that lives in Slack and Microsoft Teams. Connect your tools, ask in plain words, and get finished work back: reports, dashboards, code and campaigns.',
  themeColor: '#F6F4EE',
} as const

/** Legal facts. Confirm against the legal plan's open questions (Q1 to Q3). */
export const COMPANY = {
  name: 'NETSACH TECH LTD',
  address: '3568 Dodge Street, Omaha, NE 68131',
  jurisdiction: 'England and Wales',
  supportEmail: 'support@crewhir.com',
  /** A constant, so the footer never changes on its own at New Year. */
  copyrightYear: 2026,
} as const

export const LINKS = {
  signUp: `${APP_URL}/sign-up`,
  signIn: `${APP_URL}/sign-in`,
  /** No booking page yet (plan Q4): demos go to the contact inbox. */
  demo: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Crewhir demo')}`,
  contact: `mailto:${CONTACT_EMAIL}`,
  talk: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Crewhir pricing')}`,
} as const

export const NAV = [
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Use cases', href: '/#use-cases' },
  { label: 'Security', href: '/#security' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'FAQ', href: '/#faq' },
] as const

export const LEGAL_LINKS = [
  { label: 'Privacy policy', href: '/privacy-policy' },
  { label: 'Terms of service', href: '/terms-of-service' },
  { label: 'Refund policy', href: '/refund-policy' },
] as const

export const ROUTES = ['/', '/privacy-policy', '/terms-of-service', '/refund-policy'] as const
