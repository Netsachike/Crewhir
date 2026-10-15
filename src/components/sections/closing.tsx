import { ArrowUpRightIcon, CheckIcon, PlusIcon } from '@phosphor-icons/react'
import { Accordion } from 'radix-ui'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { Container, Eyebrow, Section, SectionHeading } from '@/components/ui/layout'
import { Reveal } from '@/components/ui/reveal'
import { faq, faqGroups } from '@/content/faq'
import { askAi, finalCta, pricing, testimonials } from '@/content/home'
import { showTestimonials, verifiedTestimonials } from '@/content/proof'
import { LINKS } from '@/lib/site'

/** Built but hidden until three verified quotes exist (plan D8). */
export function Testimonials() {
  if (!showTestimonials) return null
  return (
    <Section id="stories" tone="white" aria-labelledby="stories-title">
      <Container>
        <SectionHeading id="stories-title" eyebrow={testimonials.eyebrow} title={testimonials.title} />
        <Reveal as="ul" className="mt-14 grid gap-5 md:grid-cols-3">
          {verifiedTestimonials.slice(0, 3).map((t) => (
            <li key={t.name} data-anim="in" className="flex flex-col rounded-card border border-rope bg-paper p-6">
              <blockquote className="flex-1 text-body text-ink">“{t.quote}”</blockquote>
              <p className="mt-6 text-small">
                <span className="block font-semibold text-harbor">{t.name}</span>
                <span className="text-muted">
                  {t.role}, {t.company}
                </span>
              </p>
              {t.timeSaved && (
                <span className="mt-4 w-max rounded-full bg-mint px-3 py-1 text-xs font-semibold text-crew-deep">
                  {t.timeSaved}
                </span>
              )}
            </li>
          ))}
        </Reveal>
      </Container>
    </Section>
  )
}

export function AskAi() {
  return (
    <Section id="ask-ai" tone="sand" className="py-16 sm:py-20 lg:py-24" aria-labelledby="ask-ai-title">
      <Container className="flex flex-col items-center text-center">
        <h2 id="ask-ai-title" className="max-w-2xl text-section text-harbor">
          {askAi.title}
        </h2>
        <p className="mt-4 text-lead text-slate">{askAi.sub}</p>
        <p className="mt-6 max-w-xl rounded-xl border border-rope-dark bg-paper px-4 py-3 font-mono text-xs text-slate">
          {askAi.prompt}
        </p>
        <ul className="mt-6 flex flex-wrap justify-center gap-3">
          {askAi.links.map((l) => (
            <li key={l.label}>
              <Button asChild variant="secondary">
                <a href={l.href} target="_blank" rel="noopener">
                  {l.label}
                  <ArrowUpRightIcon size={16} aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </Button>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}

export function PricingTeaser() {
  return (
    <Section id="pricing" aria-labelledby="pricing-title">
      <Container>
        <div className="grid gap-10 overflow-hidden rounded-panel border border-rope bg-white p-6 shadow-soft sm:p-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16 lg:p-14">
          <div>
            <Eyebrow>{pricing.eyebrow}</Eyebrow>
            <h2 id="pricing-title" className="mt-4 text-section text-harbor">
              {pricing.title}
            </h2>
            <p className="mt-5 text-lead text-slate">{pricing.sub}</p>
            {pricing.price && <p className="mt-6 font-display text-title text-harbor">{pricing.price}</p>}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <a href={LINKS.signUp}>{pricing.primary}</a>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <a href={LINKS.talk}>{pricing.secondary}</a>
              </Button>
            </div>
          </div>
          <div className="rounded-card bg-paper p-6">
            <p className="text-eyebrow text-slate uppercase">Every plan includes</p>
            <ul className="mt-4 flex flex-col gap-3">
              {pricing.included.map((item) => (
                <li key={item} className="flex items-center gap-3 text-body text-ink">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-mint text-crew">
                    <CheckIcon size={14} weight="bold" aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  )
}

/** Links the refund policy wherever an answer mentions it. */
function Answer({ text }: { text: string }) {
  const marker = 'the refund policy'
  const at = text.indexOf(marker)
  if (at === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, at)}
      <Link to="/refund-policy" className="font-medium text-crew underline underline-offset-4">
        {marker}
      </Link>
      {text.slice(at + marker.length)}
    </>
  )
}

export function Faq() {
  return (
    <Section id="faq" tone="white" aria-labelledby="faq-title">
      <Container className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading id="faq-title" align="left" eyebrow={faq.eyebrow} title={faq.title} />
        </div>
        <div className="flex flex-col gap-10">
          {faqGroups.map((group) => (
            <div key={group.title}>
              <h3 className="font-sans text-eyebrow text-crew uppercase">{group.title}</h3>
              <Accordion.Root type="multiple" className="mt-3 border-t border-rope">
                {group.items.map((item) => (
                  <Accordion.Item key={item.q} value={item.q} className="border-b border-rope">
                    <Accordion.Header>
                      <Accordion.Trigger className="group flex min-h-14 w-full items-center justify-between gap-6 py-4 text-left font-sans text-body font-semibold text-harbor">
                        {item.q}
                        <PlusIcon
                          size={18}
                          aria-hidden="true"
                          className="shrink-0 text-crew transition-transform duration-300 ease-crew group-data-[state=open]:rotate-45"
                        />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="pb-5 text-body text-slate">
                      <p className="max-w-[60ch]">
                        <Answer text={item.a} />
                      </p>
                    </Accordion.Content>
                  </Accordion.Item>
                ))}
              </Accordion.Root>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

export function FinalCta() {
  return (
    <section className="pt-4 pb-20 sm:pb-24 lg:pb-32" aria-labelledby="final-cta-title">
      <Container>
        <Reveal className="on-dark relative grain overflow-hidden rounded-panel bg-harbor px-6 py-16 text-center sm:px-12 lg:py-24">
          <svg
            viewBox="0 0 16 16"
            aria-hidden="true"
            data-anim="tick"
            className="pointer-events-none absolute -right-10 -bottom-16 size-72 text-harbor-line sm:size-96"
          >
            <path
              d="M3.5 8.5l3 3 6-7"
              pathLength={1}
              strokeDasharray="1"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.4}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="relative">
            <h2 id="final-cta-title" className="text-hero text-foam">
              {finalCta.title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lead text-foam-2">{finalCta.sub}</p>
            <div className="mt-8 flex flex-col items-center gap-3">
              <Button asChild size="lg" variant="onDark">
                <a href={LINKS.signUp}>{finalCta.cta}</a>
              </Button>
              {finalCta.note && <p className="text-small text-foam-2">{finalCta.note}</p>}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
