import { CheckIcon } from '@phosphor-icons/react'
import { IntegrationLogo } from '@/components/brand/integration-logo'
import { HeroChat } from '@/components/mockups/hero-chat'
import { WORDMARKS } from '@/lib/assets'
import { Button } from '@/components/ui/button'
import { Container, Pill } from '@/components/ui/layout'
import { hero, integrations, worksWith } from '@/content/home'
import { LINKS } from '@/lib/site'

/** The h1, sub and primary CTA are never animated: they paint without JS for LCP. */
export function Hero() {
  return (
    <section id="top" className="pt-10 pb-16 sm:pt-16 lg:pt-20 lg:pb-24">
      <Container className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
        <div>
          <Pill>
            <span className="flex -space-x-1" aria-hidden="true">
              <span className="grid size-6 place-items-center rounded-full bg-white ring-1 ring-rope">
                <IntegrationLogo slug="slack" size={14} />
              </span>
              <span className="grid size-6 place-items-center rounded-full bg-white ring-1 ring-rope">
                <IntegrationLogo slug="teams" size={14} />
              </span>
            </span>
            {hero.eyebrow}
          </Pill>
          <h1 className="mt-6 text-hero text-harbor">{hero.title}</h1>
          <p className="mt-6 max-w-xl text-lead text-slate">{hero.sub}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href={LINKS.signUp}>{hero.primary}</a>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <a href={LINKS.demo}>{hero.secondary}</a>
            </Button>
          </div>
          {hero.trust.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-small text-slate">
              {hero.trust.map((item) => (
                <li key={item} className="flex items-center gap-1.5">
                  <CheckIcon size={16} weight="bold" className="text-crew" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="min-w-0">
          <HeroChat summary={hero.previewSummary} />
        </div>
      </Container>
    </section>
  )
}

const live = integrations.filter((i) => i.live)

function Mark({ name, logo }: (typeof integrations)[number]) {
  const wordmark = WORDMARKS.includes(logo)
  return (
    <span className="inline-flex min-h-12 items-center gap-2.5 rounded-full border border-rope bg-white py-2 pr-5 pl-3 text-small font-semibold whitespace-nowrap text-harbor shadow-[0_1px_2px_rgb(13_31_28/0.05)]">
      <IntegrationLogo slug={logo} size={wordmark ? 18 : 24} />
      {!wordmark && name}
    </span>
  )
}

function Track({ items, reverse }: { items: typeof live; reverse?: boolean }) {
  return (
    <div className="marquee-mask overflow-hidden">
      <div className={`marquee-track flex w-max gap-3 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
        {[...items, ...items].map((i, idx) => (
          <Mark key={`${i.name}-${idx}`} {...i} />
        ))}
      </div>
    </div>
  )
}

/** Two CSS-only marquee rows of official marks; a static row when there are only a few. */
export function WorksWith() {
  const scroll = live.length >= 8
  const half = Math.ceil(live.length / 2)
  return (
    <section id="works-with" aria-labelledby="works-with-label" className="border-y border-rope bg-white py-12">
      <Container>
        <p id="works-with-label" className="text-center text-small font-medium text-slate">
          {worksWith.label}
        </p>
        <ul className="sr-only">
          {live.map((i) => (
            <li key={i.name}>{i.name}</li>
          ))}
        </ul>
        {scroll ? (
          <div className="mt-7 flex flex-col gap-3" aria-hidden="true">
            <Track items={live.slice(0, half)} />
            <Track items={live.slice(half)} reverse />
          </div>
        ) : (
          <div className="mt-6 flex flex-wrap justify-center gap-3" aria-hidden="true">
            {live.map((i) => (
              <Mark key={i.name} {...i} />
            ))}
          </div>
        )}
        {worksWith.seeAll && (
          <p className="mt-6 text-center">
            <a href="#faq" className="text-small font-semibold text-crew underline-offset-4 hover:underline">
              {worksWith.seeAll} →
            </a>
          </p>
        )}
      </Container>
    </section>
  )
}
