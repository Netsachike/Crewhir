import { Tabs } from 'radix-ui'
import { useEffect, useRef, useState } from 'react'
import { IntegrationLogo } from '@/components/brand/integration-logo'
import { heroChat, type ChatPlatform } from '@/content/home'
import { useMotion } from '@/lib/motion'
import {
  ApprovalBlock,
  ChatWindow,
  DateDivider,
  DoneLine,
  FileAttachment,
  Mention,
  Message,
  ReplyLink,
  ToolChip,
  Typing,
} from './platform'

const PLATFORMS: { id: ChatPlatform; label: string; logo: 'slack' | 'teams' }[] = [
  { id: 'slack', label: 'Slack', logo: 'slack' },
  { id: 'teams', label: 'Teams', logo: 'teams' },
]

function Thread({ platform }: { platform: ChatPlatform }) {
  const c = heroChat
  const teams = platform === 'teams'
  return (
    <ChatWindow
      platform={platform}
      workspace={c.company}
      channel={c.channel}
      topic={c.topic}
      channels={c.channels}
      directMessages={c.directMessages}
      members={c.members}
      className="min-h-[30rem]"
    >
      <DateDivider />
      <Message from={c.request.from} time={c.request.time}>
        <Mention /> {c.request.text}
      </Message>
      <Message time={c.ackTime} reply={teams}>
        {c.ack}
        <span className="mt-1.5 flex flex-wrap gap-1.5">
          {c.tools.map((t) => (
            <ToolChip key={t.name} name={t.name} logo={t.logo} />
          ))}
        </span>
      </Message>
      <Message time={c.doneTime} reply={teams}>
        <DoneLine>{c.done}</DoneLine>
        <FileAttachment name={c.file.name} meta={c.file.meta} />
        <ApprovalBlock {...c.approval} />
      </Message>
      <ReplyLink />
      <Typing />
    </ChatWindow>
  )
}

/**
 * The hero preview (plan §6.2): the same request in a realistic Slack or
 * Teams window. The thread plays once when 30% visible (in both windows, so
 * switching never shows a half-played thread); reduced motion shows it done.
 */
export function HeroChat({ summary }: { summary: string }) {
  const [platform, setPlatform] = useState<ChatPlatform>('slack')
  const ref = useRef<HTMLDivElement>(null)

  // ?preview=teams opens on Teams, so the Teams example can be linked to.
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('preview') === 'teams') setPlatform('teams')
  }, [])

  useMotion(ref, ({ gsap, drawTick, EASE }, root) => {
    const tl = gsap.timeline({
      defaults: { ease: EASE, duration: 0.5 },
      scrollTrigger: { trigger: root, start: 'top 70%', once: true },
    })
    root.querySelectorAll<HTMLElement>('[data-window]').forEach((win) => {
      const q = gsap.utils.selector(win)
      const [request, ack, done] = q('[data-msg]')
      const typing = q('[data-typing]')
      const w = gsap.timeline({ defaults: { ease: EASE, duration: 0.5 } })
      gsap.set(typing, { opacity: 0 })
      w.fromTo(request, { opacity: 0, y: 12 }, { opacity: 1, y: 0 }, 0.2)
        .set(typing, { display: 'flex' })
        .to(typing, { opacity: 1, duration: 0.25 })
        .to(typing, { opacity: 0, duration: 0.2 }, '+=0.9')
        .set(typing, { display: 'none' })
        .fromTo(ack, { opacity: 0, y: 12 }, { opacity: 1, y: 0 })
      q('[data-chip]').forEach((chip, i) => {
        w.fromTo(chip, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.35 }, i ? '+=0.15' : '+=0.1')
        drawTick(w, chip.querySelector('[data-anim="tick"] path'), '<0.15')
      })
      w.fromTo(done, { opacity: 0, y: 12 }, { opacity: 1, y: 0 }, '+=0.3')
      drawTick(w, q('[data-done-tick] path'), '<0.2')
      w.fromTo(q('[data-approval]'), { opacity: 0, y: 12 }, { opacity: 1, y: 0 }, '+=0.35')
      tl.add(w, 0)
    })
  })

  return (
    <div className="grain relative rounded-panel bg-harbor p-3 sm:p-4">
      <Tabs.Root value={platform} onValueChange={(v) => setPlatform(v as ChatPlatform)}>
        <div className="mb-3 flex items-center justify-between gap-3 px-1">
          <span className="flex items-center gap-2 text-xs font-medium text-foam-2">
            <span className="size-1.5 rounded-full bg-brass" aria-hidden="true" />
            Live example
          </span>
          <Tabs.List
            aria-label="Chat platform"
            className="inline-flex rounded-full border border-harbor-line bg-harbor-2 p-1"
          >
            {PLATFORMS.map((p) => (
              <Tabs.Trigger
                key={p.id}
                value={p.id}
                className="flex min-h-9 items-center gap-1.5 rounded-full px-3.5 text-xs font-semibold text-foam-2 transition-colors duration-200 hover:text-foam data-[state=active]:bg-foam data-[state=active]:text-harbor"
              >
                <IntegrationLogo slug={p.logo} size={14} />
                {p.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </div>
        {PLATFORMS.map((p) => (
          <Tabs.Content key={p.id} value={p.id} forceMount hidden={p.id !== platform} className="sr-only">
            {summary}
          </Tabs.Content>
        ))}
      </Tabs.Root>

      {/* Both windows share one grid cell, so the panel never changes height on switch. */}
      <div ref={ref} aria-hidden="true" className="grid grid-cols-1">
        {PLATFORMS.map((p) => (
          <div
            key={p.id}
            className={`flex min-w-0 [grid-area:1/1] *:min-w-0 *:flex-1 ${p.id === platform ? '' : 'invisible'}`}
          >
            <Thread platform={p.id} />
          </div>
        ))}
      </div>
    </div>
  )
}
