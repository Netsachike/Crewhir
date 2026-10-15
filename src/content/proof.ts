/**
 * Every claim that has to be true before it ships (plan D3). A `null` value
 * hides each line that uses it, so nothing goes out with an invented number.
 * Fill these in only once the product owner confirms them (plan Q3, Q5, Q7).
 */
export type Testimonial = {
  quote: string
  name: string
  role: string
  company: string
  timeSaved?: string
  /** Only quotes with written permission count. */
  verified: boolean
}

export const PROOF: {
  freeCredits: string | null
  noCardNeeded: boolean
  startingPrice: string | null
  integrationCount: number | null
  integrationListSummary: string | null
  complianceBadge: string | null
  testimonials: Testimonial[]
} = {
  /** e.g. "$100" */
  freeCredits: null,
  noCardNeeded: false,
  /** e.g. "$50" */
  startingPrice: null,
  integrationCount: null,
  /** e.g. "Slack, Microsoft Teams, Google Workspace, Notion, GitHub and 40 more" */
  integrationListSummary: null,
  /** e.g. "SOC 2 Type II" */
  complianceBadge: null,
  testimonials: [],
}

export const verifiedTestimonials = PROOF.testimonials.filter((t) => t.verified)
/** The section renders only with three or more real quotes (plan D8). */
export const showTestimonials = verifiedTestimonials.length >= 3
