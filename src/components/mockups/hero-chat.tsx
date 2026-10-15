import { Tabs } from 'radix-ui'
import { useRef, useState } from 'react'
import { heroChat, type ChatPlatform } from '@/content/home'
import { drawTick, EASE, gsap, MOTION_OK, useGSAP } from '@/lib/gsap'
import { ApprovalCard, ChatFrame, ChatMessage, FileCard, HandoffTick, Mention, ToolChip, TypingIndicator } from './parts'

const PLATFORMS: { id: ChatPlatform; label: string; accent: string }[] = [
  { id: 'slack', label: 'Slack', accent: 'bg-brass' },
  { id: 'teams', label: 'Teams', accent: 'bg-crew' },
]

/**
 * The hero preview (plan §6.2). The thread plays once when 30% visible; under
 * reduced motion it renders finished. The Slack/Teams switch only changes the
 * frame label and accent strip.
 */
export function HeroChat({ summary }: { summary: string }) {
  const [platform, setPlatform] = useState<ChatPlatform>('slack')
  const ref = useRef<HTMLDivElement>(null)
  const c = heroChat
  const current = PLATFORMS.find((p) => p.id === platform)!

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(ref)
        const [request, ack, done] = q('[data-msg]')
        const typing = q('[data-typing]')
        const tl = gsap.timeline({
          defaults: { ease: EASE, duration: 0.5 },
          scrollTrigger: { trigger: ref.current, start: 'top 70%', once: true },
        })
        gsap.set(typing, { opacity: 0 })
        tl.fromTo(request, { opacity: 0, y: 12 }, { opacity: 1, y: 0 }, 0.2)
          .set(typing, { display: 'flex' })
          .to(typing, { opacity: 1, duration: 0.25 })
          .to(typing, { opacity: 0, duration: 0.2 }, '+=1.2')
          .set(typing, { display: 'none' })
          .fromTo(ack, { opacity: 0, y: 12 }, { opacity: 1, y: 0 })
        q('[data-chip]').forEach((chip, i) => {
          tl.fromTo(chip, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.35 }, i ? '+=0.25' : '+=0.1')
          drawTick(tl, chip.querySelector('[data-anim="tick"] path'), '<0.15')
        })
        tl.fromTo(done, { opacity: 0, y: 12 }, { opacity: 1, y: 0 }, '+=0.4')
        drawTick(tl, q('[data-done-tick] path'), '<0.2')
        tl.fromTo(q('[data-approval]'), { opacity: 0, y: 12 }, { opacity: 1, y: 0 }, '+=0.5')
      })
      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <div className="relative grain rounded-panel bg-harbor p-3 sm:p-5">
      <Tabs.Root value={platform} onValueChange={(v) => setPlatform(v as ChatPlatform)}>
        <div className="mb-3 flex items-center justify-between gap-3 px-1">
          <span className="text-xs font-medium text-foam-2">Preview</span>
          <Tabs.List aria-label="Chat platform" className="inline-flex rounded-full border border-harbor-line bg-harbor-2 p-1">
            {PLATFORMS.map((p) => (
              <Tabs.Trigger
                key={p.id}
                value={p.id}
                className="min-h-9 rounded-full px-4 text-xs font-semibold text-foam-2 transition-colors duration-200 hover:text-foam data-[state=active]:bg-foam data-[state=active]:text-harbor"
              >
                {p.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </div>
        {/* One shared thread; both tab panels point at it so the switch is labelled correctly. */}
        {PLATFORMS.map((p) => (
          <Tabs.Content key={p.id} value={p.id} forceMount hidden={p.id !== platform} className="sr-only">
            {summary}
          </Tabs.Content>
        ))}
      </Tabs.Root>

      <div ref={ref} aria-hidden="true" className="relative">
        <span className={`absolute inset-x-6 -top-px h-0.5 rounded-full ${current.accent} transition-colors duration-300`} />
        <ChatFrame channel={c.channel} platform={`${c.company} · ${current.label}`} className="min-h-[29rem]">
          <ChatMessage author={c.request.name} role={c.request.role}>
            <Mention /> {c.request.text}
          </ChatMessage>
          <TypingIndicator />
          <ChatMessage author="Crewhir" crewhir>
            {c.ack}
            <span className="mt-2 flex flex-wrap gap-1.5">
              {c.tools.map((t) => (
                <ToolChip key={t} label={t} />
              ))}
            </span>
          </ChatMessage>
          <ChatMessage author="Crewhir" crewhir>
            <span className="flex items-start gap-1.5">
              <span data-done-tick className="mt-0.5">
                <HandoffTick size={16} boxed />
              </span>
              {c.done}
            </span>
            <FileCard name={c.file.name} meta={c.file.meta} />
            <span className="mt-3 block">
              <ApprovalCard text={c.approval.text} approve={c.approval.approve} review={c.approval.review} />
            </span>
          </ChatMessage>
        </ChatFrame>
      </div>
    </div>
  )
}
