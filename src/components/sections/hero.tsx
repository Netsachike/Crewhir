import { CheckIcon } from '@phosphor-icons/react'
import { HeroChat } from '@/components/mockups/hero-chat'
import { Button } from '@/components/ui/button'
import { Container, Pill } from '@/components/ui/layout'
import { hero, integrations, worksWith } from '@/content/home'
import { LINKS } from '@/lib/site'

/** The h1, sub and primary CTA are never animated: they paint without JS for LCP. */
export function Hero() {
  return (
    <section id="top" className="pt-10 pb-16 sm:pt-16 lg:pt-20 lg:pb-24">
      <Container className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div>
          <Pill>
            <span className="relative flex size-2" aria-hidden="true">
              <span className="absolute inset-0 animate-ping rounded-full bg-brass opacity-60 motion-reduce:hidden" />
              <span className="relative size-2 rounded-full bg-brass" />
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
        <HeroChat summary={hero.previewSummary} />
      </Container>
    </section>
  )
}

const live = integrations.filter((i) => i.live)

function Mark({ name }: { name: string }) {
  // Official SVG marks go in src/assets/integrations/ (plan §2.6). Until they
  // are added, the name is set in type rather than a redrawn logo.
  return (
    <span className="inline-flex min-h-11 items-center rounded-full border border-rope bg-white px-5 text-small font-semibold whitespace-nowrap text-harbor">
      {name}
    </span>
  )
}

/** CSS-only marquee once there are enough live integrations, a static row before that. */
export function WorksWith() {
  const scroll = live.length >= 6
  return (
    <section id="works-with" aria-labelledby="works-with-label" className="border-y border-rope bg-white py-10">
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
          <div className="marquee-mask mt-6 overflow-hidden" aria-hidden="true">
            <div className="marquee-track flex w-max animate-marquee gap-3">
              {[...live, ...live].map((i, idx) => (
                <Mark key={`${i.name}-${idx}`} name={i.name} />
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-6 flex flex-wrap justify-center gap-3" aria-hidden="true">
            {live.map((i) => (
              <Mark key={i.name} name={i.name} />
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
