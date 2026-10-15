import type { FAQPage, Organization, SoftwareApplication, WithContext } from 'schema-dts'
import { faqGroups } from '@/content/faq'
import { legalDocuments } from '@/content/legal'
import { PROOF } from '@/content/proof'
import { COMPANY, SITE, SITE_URL } from './site'

export type RouteMeta = {
  path: string
  title: string
  description: string
  jsonLd: object[]
}

const organization: WithContext<Organization> = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE.name,
  legalName: COMPANY.name,
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  email: COMPANY.supportEmail,
}

const application: WithContext<SoftwareApplication> = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: SITE.name,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, Slack, Microsoft Teams',
  description: SITE.description,
  url: SITE_URL,
  // Offers only once a real price exists (plan §7).
  ...(PROOF.startingPrice && {
    offers: {
      '@type': 'Offer',
      price: PROOF.startingPrice.replace(/[^\d.]/g, ''),
      priceCurrency: 'USD',
    },
  }),
}

const faqPage: WithContext<FAQPage> = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqGroups.flatMap((g) =>
    g.items.map((item) => ({
      '@type': 'Question' as const,
      name: item.q,
      acceptedAnswer: { '@type': 'Answer' as const, text: item.a },
    })),
  ),
}

export const ROUTE_META: RouteMeta[] = [
  { path: '/', title: SITE.title, description: SITE.description, jsonLd: [organization, application, faqPage] },
  ...legalDocuments.map((doc) => ({
    path: `/${doc.slug}`,
    title: `${doc.title} · ${SITE.name}`,
    description: doc.description,
    jsonLd: [organization],
  })),
]

export const NOT_FOUND_META: RouteMeta = {
  path: '/404',
  title: `Page not found · ${SITE.name}`,
  description: SITE.description,
  jsonLd: [],
}

export const metaFor = (path: string) => ROUTE_META.find((m) => m.path === path) ?? NOT_FOUND_META
