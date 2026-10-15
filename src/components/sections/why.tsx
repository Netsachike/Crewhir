import { ArrowRightIcon } from '@phosphor-icons/react'
import { useRef } from 'react'
import { IntegrationLogo } from '@/components/brand/integration-logo'
import { LogoMark } from '@/components/brand/logo'
import { people } from '@/content/people'
import { avatarUrl } from '@/lib/assets'
import { HandoffTick } from '@/components/mockups/parts'
import { Button } from '@/components/ui/button'
import { Container, Section, SectionHeading } from '@/components/ui/layout'
import { Reveal } from '@/components/ui/reveal'
import { comparison, howItWorks, pillars } from '@/content/home'
import { useMotion } from '@/lib/motion'
import { LINKS } from '@/lib/site'

/** A real table from md up; stacked cards below (plan §6.4). */
export function Comparison() {
  const [taskCol, typicalCol, crewCol] = comparison.columns
  return (
    <Section id="why" aria-labelledby="why-title">
      <Container>
        <SectionHeading id="why-title" eyebrow={comparison.eyebrow} title={comparison.title} />

        <Reveal className="mt-14 hidden overflow-hidden rounded-card border border-rope bg-white shadow-soft md:block">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-rope bg-sand">
                <th scope="col" className="w-[24%] px-6 py-4 text-eyebrow text-slate uppercase">
                  {taskCol}
                </th>
                <th scope="col" className="w-[34%] px-6 py-4 text-eyebrow text-slate uppercase">
                  {typicalCol}
                </th>
                <th scope="col" className="bg-mint px-6 py-4 text-eyebrow text-crew-deep uppercase">
                  <span className="inline-flex items-center gap-2">
                    <LogoMark size={18} />
                    {crewCol}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((row) => (
                <tr key={row.task} className="border-b border-rope last:border-0" data-anim="in">
                  <th scope="row" className="px-6 py-5 align-top font-display text-body font-semibold text-harbor">
                    {row.task}
                  </th>
                  <td className="px-6 py-5 align-top text-small text-slate">{row.typical}</td>
                  <td className="bg-mint/50 px-6 py-5 align-top text-small text-ink">
                    <span className="flex gap-2.5">
                      <HandoffTick size={18} className="mt-0.5" />
                      {row.crewhir}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        <Reveal as="ul" className="mt-10 flex flex-col gap-4 md:hidden">
          {comparison.rows.map((row) => (
            <li key={row.task} data-anim="in" className="overflow-hidden rounded-card border border-rope bg-white">
              <h3 className="px-5 pt-5 text-title text-harbor">{row.task}</h3>
              <dl className="mt-3 text-small">
                <div className="px-5 pb-4">
                  <dt className="text-xs font-semibold text-muted uppercase">{typicalCol}</dt>
                  <dd className="mt-1 text-slate">{row.typical}</dd>
                </div>
                <div className="bg-mint/60 px-5 py-4">
                  <dt className="text-xs font-semibold text-crew-deep uppercase">{crewCol}</dt>
                  <dd className="mt-1 flex gap-2 text-ink">
                    <HandoffTick size={18} className="mt-0.5" />
                    {row.crewhir}
                  </dd>
                </div>
              </dl>
            </li>
          ))}
        </Reveal>
      </Container>
    </Section>
  )
}

function Vignette({ kind }: { kind: (typeof pillars.items)[number]['vignette'] }) {
  const v = pillars.vignettes
  if (kind === 'tools') {
    return (
      <div className="flex flex-col gap-2">
        {v.tools.map((t) => (
          <span
            key={t.label}
            className="flex items-center gap-2.5 rounded-lg border border-rope bg-white px-3 py-2 text-small font-medium text-harbor"
          >
            <IntegrationLogo slug={t.logo} size={18} />
            {t.label}
            <HandoffTick size={16} className="ml-auto" />
          </span>
        ))}
      </div>
    )
  }
  if (kind === 'connected') {
    // A hub: Crewhir in the middle, connected tools around it.
    const r = 38
    return (
      <div className="relative mx-auto aspect-square w-full max-w-44">
        <svg viewBox="-50 -50 100 100" className="absolute inset-0 size-full text-rope-dark" aria-hidden="true">
          {v.connected.map((_, i) => {
            const a = (i / v.connected.length) * Math.PI * 2 - Math.PI / 2
            return (
              <line
                key={i}
                x1="0"
                y1="0"
                x2={Math.cos(a) * r}
                y2={Math.sin(a) * r}
                stroke="currentColor"
                strokeWidth="0.8"
                strokeDasharray="2 2"
              />
            )
          })}
        </svg>
        {v.connected.map((slug, i) => {
          const a = (i / v.connected.length) * Math.PI * 2 - Math.PI / 2
          return (
            <span
              key={slug}
              className="absolute grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-xl border border-rope bg-white shadow-soft"
              style={{ left: `${50 + Math.cos(a) * r}%`, top: `${50 + Math.sin(a) * r}%` }}
            >
              <IntegrationLogo slug={slug} size={20} />
            </span>
          )
        })}
        <span className="absolute top-1/2 left-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl bg-harbor shadow-soft">
          <LogoMark tone="reversed" size={28} />
        </span>
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-start gap-2.5 rounded-lg border border-rope bg-white p-3">
        <img
          src={avatarUrl(people[v.note.from].avatar)}
          alt=""
          width={28}
          height={28}
          loading="lazy"
          className="size-7 rounded-full object-cover"
        />
        <p className="text-small text-harbor">
          <span className="font-semibold">{people[v.note.from].name.split(' ')[0]}</span>: "Send the Monday numbers to
          leadership, not here."
        </p>
      </div>
      <div className="rounded-lg border border-crew/30 bg-mint/60 p-3">
        <p className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-crew-deep uppercase">
          <LogoMark size={14} />
          {v.note.label}
        </p>
        <p className="mt-1 text-small text-harbor">{v.note.text}</p>
      </div>
    </div>
  )
}

export function Pillars() {
  return (
    <Section id="different" tone="white" aria-labelledby="different-title">
      <Container>
        <SectionHeading id="different-title" eyebrow={pillars.eyebrow} title={pillars.title} />
        <Reveal as="ul" className="mt-14 grid gap-5 md:grid-cols-3">
          {pillars.items.map((item) => (
            <li key={item.title} data-anim="in" className="flex flex-col rounded-card border border-rope bg-paper p-6">
              <div className="min-h-32 rounded-xl bg-sand p-4">
                <Vignette kind={item.vignette} />
              </div>
              <h3 className="mt-6 text-title text-harbor">{item.title}</h3>
              <p className="mt-3 text-body text-slate">{item.body}</p>
            </li>
          ))}
        </Reveal>
      </Container>
    </Section>
  )
}

/** Three-up with a line that draws on scroll from lg; a vertical timeline below. */
export function HowItWorks() {
  const ref = useRef<HTMLOListElement>(null)

  useMotion(ref, ({ gsap }, root) => {
    gsap.fromTo(
      '[data-line]',
      { scaleX: 0, scaleY: 0 },
      {
        scaleX: 1,
        scaleY: 1,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top 75%', end: 'bottom 55%', scrub: 0.6 },
      },
    )
  })

  return (
    <Section id="how-it-works" aria-labelledby="how-title">
      <Container>
        <SectionHeading id="how-title" eyebrow={howItWorks.eyebrow} title={howItWorks.title} />
        <ol ref={ref} className="relative mt-14 grid gap-10 lg:grid-cols-3 lg:gap-8">
          <span
            data-line
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-5 w-px origin-top bg-crew lg:top-5 lg:right-[16%] lg:bottom-auto lg:left-[16%] lg:h-px lg:w-auto lg:origin-left"
          />
          {howItWorks.steps.map((step, i) => (
            <li key={step.title} className="relative grid grid-cols-[2.5rem_1fr] gap-5 lg:grid-cols-1 lg:text-center">
              <span className="relative z-10 grid size-10 place-items-center rounded-full border border-crew bg-paper font-display text-body font-bold text-crew lg:mx-auto">
                {i + 1}
              </span>
              <div>
                <h3 className="text-title text-harbor">{step.title}</h3>
                <p className="mt-3 text-body text-slate lg:mx-auto lg:max-w-xs">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-14 text-center">
          <Button asChild size="lg">
            <a href={LINKS.signUp}>
              {howItWorks.cta}
              <ArrowRightIcon size={18} aria-hidden="true" />
            </a>
          </Button>
        </div>
      </Container>
    </Section>
  )
}
