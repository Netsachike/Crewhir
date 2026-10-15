import { FilePdfIcon, HashIcon } from '@phosphor-icons/react'
import type { ReactNode } from 'react'
import { LogoMark } from '@/components/brand/logo'

/**
 * The "handoff tick": a Crew Green check that draws itself when Crewhir
 * finishes something (plan §2.5). `pathLength=1` lets GSAP and CSS animate
 * `stroke-dashoffset` from 1 to 0 regardless of size.
 */
export function HandoffTick({ size = 16, className = '', boxed = false }: { size?: number; className?: string; boxed?: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      aria-hidden="true"
      data-anim="tick"
      className={`shrink-0 text-crew ${boxed ? 'rounded-full bg-mint p-[3px]' : ''} ${className}`}
    >
      <path
        d="M3.5 8.5l3 3 6-7"
        pathLength={1}
        strokeDasharray="1"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Neutral Crewhir chat chrome. Deliberately not Slack's or Teams' UI (plan D5). */
export function ChatFrame({
  channel,
  platform,
  children,
  className = '',
}: {
  channel: string
  platform?: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`overflow-hidden rounded-card border border-harbor-line bg-paper text-ink shadow-soft ${className}`}>
      <div className="flex items-center justify-between gap-3 border-b border-rope bg-white px-4 py-3">
        <span className="flex items-center gap-1.5 text-small font-semibold text-harbor">
          <HashIcon size={16} weight="bold" aria-hidden="true" />
          {channel}
        </span>
        {platform && <span className="font-mono text-xs text-muted">{platform}</span>}
      </div>
      <div className="flex flex-col gap-4 p-4 sm:p-5">{children}</div>
    </div>
  )
}

function Avatar({ crewhir, initial }: { crewhir?: boolean; initial?: string }) {
  if (crewhir) {
    return (
      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-harbor">
        <LogoMark tone="reversed" size={20} />
      </span>
    )
  }
  return (
    <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-sand font-display text-small font-bold text-harbor">
      {initial}
    </span>
  )
}

export function ChatMessage({
  author,
  role,
  crewhir,
  children,
  anim = true,
}: {
  author: string
  role?: string
  crewhir?: boolean
  children: ReactNode
  anim?: boolean
}) {
  return (
    <div className="flex gap-3" data-anim={anim ? 'in' : undefined} data-msg>
      <Avatar crewhir={crewhir} initial={author[0]} />
      <div className="min-w-0 flex-1">
        <p className="flex flex-wrap items-baseline gap-x-2 text-small">
          <span className="font-semibold text-harbor">{author}</span>
          {crewhir && <span className="rounded bg-sand px-1.5 font-mono text-[0.6875rem] text-slate">APP</span>}
          {role && <span className="text-xs text-muted">{role}</span>}
        </p>
        <div className="mt-1 text-small text-ink">{children}</div>
      </div>
    </div>
  )
}

export function Mention() {
  return <span className="rounded bg-mint px-1 font-medium text-crew-deep">@Crewhir</span>
}

export function TypingIndicator() {
  return (
    <div className="hidden gap-3" data-typing>
      <Avatar crewhir />
      <span className="mt-1 inline-flex h-7 items-center gap-1 rounded-full bg-white px-3 shadow-soft">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="size-1.5 animate-typing rounded-full bg-slate"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </span>
    </div>
  )
}

export function ToolChip({ label }: { label: string }) {
  return (
    <span
      data-anim="in"
      data-chip
      className="inline-flex items-center gap-1.5 rounded-full border border-rope bg-white px-2.5 py-1 font-mono text-xs text-harbor"
    >
      {label}
      <HandoffTick size={14} />
    </span>
  )
}

export function FileCard({ name, meta }: { name: string; meta: string }) {
  return (
    <span className="mt-2 flex max-w-xs items-center gap-3 rounded-xl border border-rope bg-white p-3">
      <span className="grid size-9 place-items-center rounded-lg bg-sand text-rust">
        <FilePdfIcon size={20} aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block truncate font-mono text-xs font-medium text-harbor">{name}</span>
        <span className="block text-xs text-muted">{meta}</span>
      </span>
    </span>
  )
}

/** "Crewhir is asking you": the one place Brass belongs (plan §2.3). */
export function ApprovalCard({
  text,
  approve,
  review,
  large = false,
}: {
  text: string[]
  approve: string
  review: string
  large?: boolean
}) {
  return (
    <div
      data-anim="in"
      data-approval
      className={`rounded-xl border border-rope border-l-4 border-l-brass bg-white ${large ? 'p-5 sm:p-6' : 'p-3.5'}`}
    >
      <p className="flex items-center gap-2 text-xs font-semibold tracking-wide text-harbor uppercase">
        <span className="size-2 rounded-full bg-brass" aria-hidden="true" />
        Needs your approval
      </p>
      <p className={`mt-2 text-ink ${large ? 'text-body' : 'text-small'}`}>
        {text.map((part, i) => (i % 2 ? <em key={i} className="font-semibold not-italic">{part}</em> : part))}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <span className="inline-flex items-center rounded-full bg-crew px-3 py-1.5 text-xs font-semibold text-white">
          {approve}
        </span>
        <span className="inline-flex items-center rounded-full border border-rope-dark px-3 py-1.5 text-xs font-semibold text-harbor">
          {review}
        </span>
      </div>
    </div>
  )
}
