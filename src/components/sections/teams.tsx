import {
  ArrowRightIcon,
  CheckCircleIcon,
  DatabaseIcon,
  EyeIcon,
  ListChecksIcon,
  LockKeyIcon,
  ShieldCheckIcon,
  SlidersHorizontalIcon,
  TrashIcon,
} from '@phosphor-icons/react'
import { Tabs } from 'radix-ui'
import { useEffect, useRef, useState } from 'react'
import { IntegrationLogo } from '@/components/brand/integration-logo'
import { LogoMark } from '@/components/brand/logo'
import {
  ApprovalBlock,
  ChatWindow,
  DoneLine,
  LinkCard,
  Mention,
  Message,
  ReplyLink,
} from '@/components/mockups/platform'
import { Button } from '@/components/ui/button'
import { Container, Pill, Section, SectionHeading } from '@/components/ui/layout'
import { Reveal } from '@/components/ui/reveal'
import { control, heroChat, security, useCases, type TeamId } from '@/content/home'
import { people } from '@/content/people'
import { avatarUrl } from '@/lib/assets'
import { useMotion } from '@/lib/motion'
import { Link } from '@/lib/router'
import { LINKS } from '@/lib/site'

const teamIds = useCases.teams.map((t) => t.id) as TeamId[]
const isTeam = (v: string | null): v is TeamId => !!v && (teamIds as string[]).includes(v)

function UseCaseChat({ team }: { team: (typeof useCases.teams)[number] }) {
  const ref = useRef<HTMLDivElement>(null)

  // Replays the one-message exchange each time a tab is shown.
  useMotion(
    ref,
    ({ gsap, drawTick, EASE }, root) => {
      const q = gsap.utils.selector(root)
      const tl = gsap.timeline({
        defaults: { ease: EASE, duration: 0.45 },
        scrollTrigger: { trigger: root, start: 'top 80%', once: true },
      })
      tl.fromTo(q('[data-msg]'), { opacity: 0, y: 10 }, { opacity: 1, y: 0, stagger: 0.5 })
      drawTick(tl, q('[data-anim="tick"] path'), '-=0.1')
    },
    [team.id],
  )

  const t = team.thread
  const teams = t.platform === 'teams'
  return (
    <div ref={ref} aria-hidden="true">
      <ChatWindow
        platform={t.platform}
        workspace="Lumen Bikes"
        channel={t.channel}
        members={[t.from, 'maya', 'leo']}
        compact
        composer={false}
      >
        <Message from={t.from} time="10:42 AM">
          <Mention /> {t.ask}
        </Message>
        <Message time="10:44 AM" reply={teams}>
          <DoneLine>{t.reply}</DoneLine>
          <LinkCard {...t.attachment} />
        </Message>
        <ReplyLink />
      </ChatWindow>
    </div>
  )
}

/** Tabs are linkable: `?team=engineering#use-cases` (plan Phase 4). */
export function UseCases() {
  const [team, setTeam] = useState<TeamId>('founders')

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get('team')
    if (isTeam(fromUrl)) setTeam(fromUrl)
  }, [])

  const onChange = (value: string) => {
    if (!isTeam(value)) return
    setTeam(value)
    const url = new URL(window.location.href)
    url.searchParams.set('team', value)
    url.hash = 'use-cases'
    history.replaceState(history.state, '', url)
  }

  return (
    <Section id="use-cases" tone="white" aria-labelledby="use-cases-title">
      <Container>
        <SectionHeading id="use-cases-title" eyebrow={useCases.eyebrow} title={useCases.title} />
        <Tabs.Root value={team} onValueChange={onChange} className="mt-12">
          <Tabs.List
            aria-label="Teams"
            className="mx-auto flex w-full max-w-full gap-1 overflow-x-auto rounded-full border border-rope bg-paper p-1 sm:w-max"
          >
            {useCases.teams.map((t) => (
              <Tabs.Trigger
                key={t.id}
                value={t.id}
                className="min-h-11 shrink-0 rounded-full px-4 text-small font-semibold text-slate transition-colors duration-200 hover:text-harbor data-[state=active]:bg-harbor data-[state=active]:text-foam sm:px-5"
              >
                {t.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          {useCases.teams.map((t) => (
            <Tabs.Content
              key={t.id}
              value={t.id}
              className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center"
            >
              <div>
                <ul className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
                  {t.items.map((item) => (
                    <li key={item.title}>
                      <h3 className="flex items-center gap-2 text-body font-semibold text-harbor">
                        <CheckCircleIcon size={20} weight="fill" className="text-crew" aria-hidden="true" />
                        {item.title}
                      </h3>
                      <p className="mt-2 text-small text-slate">{item.body}</p>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-rope pt-6">
                  <span className="text-small text-muted">Works across</span>
                  <ul className="flex flex-wrap gap-2">
                    {t.tools.map((slug) => (
                      <li
                        key={slug}
                        className="grid h-10 min-w-10 place-items-center rounded-xl border border-rope bg-white px-2"
                      >
                        <IntegrationLogo slug={slug} size={slug === 'xero' ? 22 : 20} alt={slug} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="rounded-panel bg-sand p-3 sm:p-5">
                <p className="mb-3 flex items-center gap-2 px-1 text-xs font-semibold text-slate">
                  <IntegrationLogo slug={t.thread.platform} size={14} />
                  In {t.thread.platform === 'slack' ? 'Slack' : 'Microsoft Teams'}
                </p>
                <UseCaseChat team={t} />
              </div>
            </Tabs.Content>
          ))}
        </Tabs.Root>
        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <a href={LINKS.signUp}>
              {useCases.cta}
              <ArrowRightIcon size={18} aria-hidden="true" />
            </a>
          </Button>
        </div>
      </Container>
    </Section>
  )
}

const controlIcons = { approval: ShieldCheckIcon, rules: SlidersHorizontalIcon, log: ListChecksIcon }

export function Control() {
  return (
    <Section id="control" tone="harbor" aria-labelledby="control-title">
      <Container className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div>
          <SectionHeading
            id="control-title"
            dark
            align="left"
            eyebrow={control.eyebrow}
            title={control.title}
            sub={control.sub}
          />
          <Reveal as="ul" className="mt-10 flex flex-col gap-7">
            {control.points.map((pt) => {
              const Icon = controlIcons[pt.icon]
              return (
                <li key={pt.title} data-anim="in" className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-harbor-line bg-harbor-2 text-foam">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-sans text-body font-semibold text-foam">{pt.title}</h3>
                    <p className="mt-1 text-small text-foam-2">{pt.body}</p>
                  </div>
                </li>
              )
            })}
          </Reveal>
        </div>

        <Reveal className="rounded-panel border border-harbor-line bg-harbor-2 p-3 sm:p-5">
          <div data-anim="in" aria-hidden="true">
            <ChatWindow
              platform="slack"
              workspace={heroChat.company}
              channel={heroChat.channel}
              members={heroChat.members}
              compact
              composer={false}
            >
              <Message time={heroChat.doneTime} animate={false}>
                <ApprovalBlock {...heroChat.approval} />
              </Message>
            </ChatWindow>
          </div>
          <div data-anim="in" className="mt-5 px-1">
            <p className="text-eyebrow text-foam-2 uppercase">Activity log</p>
            <ol className="mt-2 divide-y divide-harbor-line">
              {control.log.map((row) => (
                <li key={row.time} className="flex items-center gap-3 py-3 text-small">
                  {row.actor === 'crewhir' ? (
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-foam">
                      <LogoMark size={18} />
                    </span>
                  ) : (
                    <img
                      src={avatarUrl(people[row.actor].avatar)}
                      alt=""
                      width={32}
                      height={32}
                      loading="lazy"
                      className="size-8 shrink-0 rounded-full object-cover ring-2 ring-harbor-line"
                    />
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="block text-foam">{row.text}</span>
                    <span className="block text-xs text-foam-2">{row.who}</span>
                  </span>
                  <span className="font-mono text-xs text-foam-2 tabular">{row.time}</span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

const securityIcons = { scope: EyeIcon, train: DatabaseIcon, lock: LockKeyIcon, delete: TrashIcon }

export function Security() {
  return (
    <Section id="security" aria-labelledby="security-title">
      <Container>
        <SectionHeading id="security-title" eyebrow={security.eyebrow} title={security.title} />
        <Reveal as="ul" className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {security.cards.map((card) => {
            const Icon = securityIcons[card.icon]
            return (
              <li key={card.title} data-anim="in" className="rounded-card border border-rope bg-white p-6 shadow-soft">
                <Icon size={26} className="text-crew" aria-hidden="true" />
                <h3 className="mt-5 font-sans text-body font-semibold text-harbor">{card.title}</h3>
                <p className="mt-2 text-small text-slate">{card.body}</p>
              </li>
            )
          })}
        </Reveal>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {security.badge && <Pill tone="mint">{security.badge}</Pill>}
          <Link
            to="/privacy-policy"
            className="inline-flex min-h-11 items-center text-small font-semibold text-crew underline-offset-4 hover:underline"
          >
            {security.privacyLink} →
          </Link>
        </div>
      </Container>
    </Section>
  )
}
