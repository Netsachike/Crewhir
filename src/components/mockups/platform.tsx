/**
 * Realistic Slack and Microsoft Teams windows for the product mockups. One
 * thread is written once and rendered in either app's layout: Slack's
 * aubergine sidebar, flat messages and Block Kit buttons, or Teams' app rail,
 * channel posts with threaded replies and Adaptive Card buttons.
 *
 * Every window is decorative (`aria-hidden` by the caller, with a text
 * summary). Animated parts carry `data-msg`, `data-typing`, `data-chip`,
 * `data-approval` and `data-done-tick` for the GSAP timelines.
 */
import {
  ArrowBendUpLeftIcon,
  AtIcon,
  BellIcon,
  CalendarBlankIcon,
  CaretDownIcon,
  ChatCircleIcon,
  ChatsCircleIcon,
  DotsThreeIcon,
  FilePdfIcon,
  HashIcon,
  LinkSimpleIcon,
  MagnifyingGlassIcon,
  PaperPlaneRightIcon,
  PlusIcon,
  SmileyIcon,
  SquaresFourIcon,
  TextBIcon,
  TextItalicIcon,
  UsersThreeIcon,
  VideoCameraIcon,
} from '@phosphor-icons/react'
import { createContext, useContext, type ReactNode } from 'react'
import { IntegrationLogo } from '@/components/brand/integration-logo'
import { LogoMark } from '@/components/brand/logo'
import type { ChatPlatform } from '@/content/home'
import { people, type PersonId } from '@/content/people'
import { avatarUrl, type LogoSlug } from '@/lib/assets'
import { HandoffTick } from './parts'

const PlatformContext = createContext<ChatPlatform>('slack')
const usePlatform = () => useContext(PlatformContext)

/* ------------------------------------------------------------------ */
/* Shared pieces                                                       */
/* ------------------------------------------------------------------ */

function Photo({ id, size, round }: { id: PersonId; size: number; round?: boolean }) {
  return (
    <img
      src={avatarUrl(people[id].avatar)}
      alt=""
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      className={`shrink-0 object-cover ${round ? 'rounded-full' : 'rounded-[6px]'}`}
      style={{ width: size, height: size }}
    />
  )
}

function Presence({ id, ring }: { id: PersonId; ring: string }) {
  const active = people[id].status === 'active'
  return (
    <span
      className={`absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full border-2 ${ring} ${
        active ? 'bg-[#2BAC76]' : 'bg-[#8D8D8D]'
      }`}
    />
  )
}

function CrewhirAvatar({ size, round }: { size: number; round?: boolean }) {
  return (
    <span
      className={`grid shrink-0 place-items-center bg-harbor ${round ? 'rounded-full' : 'rounded-[6px]'}`}
      style={{ width: size, height: size }}
    >
      <LogoMark tone="reversed" size={Math.round(size * 0.62)} />
    </span>
  )
}

function TrafficLights() {
  return (
    <span className="flex gap-1.5" aria-hidden="true">
      <span className="size-2.5 rounded-full bg-[#FF5F57]" />
      <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
      <span className="size-2.5 rounded-full bg-[#28C840]" />
    </span>
  )
}

/** The person mention inside a message. */
export function Mention({ children = '@Crewhir' }: { children?: ReactNode }) {
  return usePlatform() === 'slack' ? (
    <span className="rounded-[3px] bg-[#1D9BD1]/15 px-0.5 font-medium text-[#1264A3]">{children}</span>
  ) : (
    <span className="font-semibold text-[#5B5FC7]">{String(children).replace('@', '')}</span>
  )
}

/* ------------------------------------------------------------------ */
/* Window                                                              */
/* ------------------------------------------------------------------ */

type WindowProps = {
  platform: ChatPlatform
  workspace: string
  channel: string
  topic?: string
  channels?: string[]
  directMessages?: PersonId[]
  members?: PersonId[]
  /** No title bar or sidebars: for small inline previews. */
  compact?: boolean
  className?: string
  children: ReactNode
  /** Slack's composer, Teams' "start a post" box. */
  composer?: boolean
}

export function ChatWindow(props: WindowProps) {
  return (
    <PlatformContext.Provider value={props.platform}>
      {props.platform === 'slack' ? <SlackWindow {...props} /> : <TeamsWindow {...props} />}
    </PlatformContext.Provider>
  )
}

function SlackWindow({
  workspace,
  channel,
  topic,
  channels = [],
  directMessages = [],
  members = [],
  compact,
  composer = true,
  className = '',
  children,
}: WindowProps) {
  return (
    <div
      data-window
      className={`ring-black/10 flex flex-col overflow-hidden rounded-xl bg-white font-[Lato,'Instrument_Sans_Variable',sans-serif] text-[#1D1C1D] shadow-[0_24px_60px_-20px_rgb(13_31_28/0.55)] ring-1 ${className}`}
    >
      {!compact && (
        <div className="flex h-9 shrink-0 items-center gap-3 bg-[#350D36] px-3">
          <TrafficLights />
          <span className="mx-auto flex h-6 w-full max-w-64 items-center gap-1.5 rounded-md bg-white/15 px-2 text-[11px] text-white/75">
            <MagnifyingGlassIcon size={12} aria-hidden="true" />
            Search {workspace}
          </span>
          <span className="w-10" />
        </div>
      )}
      <div className="flex min-h-0 flex-1">
        {!compact && (
          <aside className="hidden w-44 shrink-0 flex-col bg-[#3F0E40] py-3 text-[13px] text-[#CFC3CF] sm:flex">
            <p className="flex items-center gap-1 px-4 pb-3 text-[15px] font-bold text-white">
              {workspace}
              <CaretDownIcon size={12} weight="bold" aria-hidden="true" />
            </p>
            <div className="border-t border-white/10 pt-2">
              <p className="flex items-center gap-1 px-4 py-1 text-[12px] font-semibold">
                <CaretDownIcon size={10} weight="fill" aria-hidden="true" /> Channels
              </p>
              {channels.map((c) => (
                <p
                  key={c}
                  className={`mx-2 flex items-center gap-1.5 rounded-md px-2 py-[3px] ${
                    c === channel ? 'bg-[#1164A3] font-semibold text-white' : ''
                  }`}
                >
                  <HashIcon size={13} aria-hidden="true" />
                  {c}
                </p>
              ))}
              <p className="mt-3 flex items-center gap-1 px-4 py-1 text-[12px] font-semibold">
                <CaretDownIcon size={10} weight="fill" aria-hidden="true" /> Direct messages
              </p>
              {directMessages.map((id) => (
                <p key={id} className="mx-2 flex items-center gap-2 rounded-md px-2 py-[3px]">
                  <span className="relative">
                    <Photo id={id} size={18} />
                    <Presence id={id} ring="border-[#3F0E40]" />
                  </span>
                  {people[id].name.split(' ')[0]}
                </p>
              ))}
              <p className="mt-3 flex items-center gap-1 px-4 py-1 text-[12px] font-semibold">
                <CaretDownIcon size={10} weight="fill" aria-hidden="true" /> Apps
              </p>
              <p className="mx-2 flex items-center gap-2 rounded-md px-2 py-[3px] text-white">
                <CrewhirAvatar size={18} />
                Crewhir
              </p>
            </div>
          </aside>
        )}
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex h-12 shrink-0 items-center justify-between gap-3 border-b border-[#E2E2E2] px-4">
            <div className="min-w-0">
              <p className="flex items-center gap-1 text-[15px] font-bold">
                <HashIcon size={15} weight="bold" aria-hidden="true" />
                {channel}
                <CaretDownIcon size={11} weight="bold" aria-hidden="true" />
              </p>
              {topic && !compact && <p className="truncate text-[11px] text-[#616061]">{topic}</p>}
            </div>
            {members.length > 0 && (
              <span className="flex items-center gap-1.5 rounded-md border border-[#DDDDDD] py-0.5 pr-2 pl-0.5">
                <span className="flex -space-x-1.5">
                  {members.slice(0, 3).map((id) => (
                    <span key={id} className="rounded-[6px] ring-2 ring-white">
                      <Photo id={id} size={20} />
                    </span>
                  ))}
                </span>
                <span className="text-[12px] font-semibold text-[#616061]">{members.length + 1}</span>
              </span>
            )}
          </div>
          <div className="flex min-h-0 flex-1 flex-col justify-end gap-3 overflow-hidden px-4 py-3">{children}</div>
          {composer && (
            <div className="shrink-0 px-4 pb-3">
              <div className="rounded-lg border border-[#BBBBBB]">
                <p className="px-3 pt-2 text-[13px] text-[#868686]">Message #{channel}</p>
                <div className="flex items-center gap-2.5 px-2.5 pt-1.5 pb-1.5 text-[#868686]">
                  <PlusIcon size={14} aria-hidden="true" />
                  <TextBIcon size={14} aria-hidden="true" />
                  <TextItalicIcon size={14} aria-hidden="true" />
                  <LinkSimpleIcon size={14} aria-hidden="true" />
                  <SmileyIcon size={14} aria-hidden="true" />
                  <AtIcon size={14} aria-hidden="true" />
                  <span className="ml-auto grid size-6 place-items-center rounded bg-[#007A5A] text-white">
                    <PaperPlaneRightIcon size={12} weight="fill" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function TeamsWindow({
  workspace,
  channel,
  channels = [],
  members = [],
  compact,
  composer = true,
  className = '',
  children,
}: WindowProps) {
  const rail = [
    { icon: BellIcon, label: 'Activity' },
    { icon: ChatCircleIcon, label: 'Chat' },
    { icon: UsersThreeIcon, label: 'Teams', active: true },
    { icon: CalendarBlankIcon, label: 'Calendar' },
    { icon: SquaresFourIcon, label: 'Apps' },
  ]
  return (
    <div
      data-window
      className={`ring-black/10 flex flex-col overflow-hidden rounded-xl bg-[#F5F5F5] font-['Segoe_UI','Instrument_Sans_Variable',sans-serif] text-[#242424] shadow-[0_24px_60px_-20px_rgb(13_31_28/0.55)] ring-1 ${className}`}
    >
      {!compact && (
        <div className="flex h-9 shrink-0 items-center gap-3 border-b border-[#E0E0E0] bg-[#EBEBEB] px-3">
          <TrafficLights />
          <span className="mx-auto flex h-6 w-full max-w-64 items-center gap-1.5 rounded-md bg-white px-2 text-[11px] text-[#616161] ring-1 ring-[#E0E0E0]">
            <MagnifyingGlassIcon size={12} aria-hidden="true" />
            Search
          </span>
          <span className="w-10" />
        </div>
      )}
      <div className="flex min-h-0 flex-1">
        {!compact && (
          <nav className="flex w-14 shrink-0 flex-col items-center gap-1 bg-[#EBEBEB] py-2">
            {rail.map(({ icon: Icon, label, active }) => (
              <span
                key={label}
                className={`relative flex w-12 flex-col items-center gap-0.5 rounded-md py-1.5 text-[9px] ${
                  active ? 'bg-white text-[#5B5FC7]' : 'text-[#616161]'
                }`}
              >
                {active && <span className="absolute top-2 bottom-2 -left-1 w-[3px] rounded-full bg-[#5B5FC7]" />}
                <Icon size={18} weight={active ? 'fill' : 'regular'} aria-hidden="true" />
                {label}
              </span>
            ))}
          </nav>
        )}
        {!compact && (
          <aside className="hidden w-32 shrink-0 flex-col border-r border-[#E0E0E0] bg-[#FAFAFA] py-3 text-[12px] md:flex">
            <p className="px-3 pb-2 text-[14px] font-bold">Teams</p>
            <p className="flex items-center gap-2 px-3 py-1 font-semibold">
              <span className="grid size-5 place-items-center rounded bg-[#0F7353] text-[9px] font-bold text-white">
                {workspace
                  .split(' ')
                  .map((w) => w[0])
                  .join('')}
              </span>
              {workspace}
            </p>
            {channels.map((c) => (
              <p
                key={c}
                className={`mx-2 rounded-md py-1 pr-2 pl-7 capitalize ${
                  c.toLowerCase() === channel.toLowerCase() ? 'bg-white font-semibold shadow-sm' : 'text-[#424242]'
                }`}
              >
                {c}
              </p>
            ))}
          </aside>
        )}
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex h-12 shrink-0 items-center gap-2.5 border-b border-[#E0E0E0] bg-white px-4">
            <span className="grid size-6 place-items-center rounded bg-[#0F7353] text-[10px] font-bold text-white">
              {workspace
                .split(' ')
                .map((w) => w[0])
                .join('')}
            </span>
            <p className="text-[14px] font-bold capitalize">{channel}</p>
            <span className="ml-2 border-b-2 border-[#5B5FC7] py-3 text-[12px] font-semibold">Posts</span>
            <span className="py-3 text-[12px] text-[#616161]">Files</span>
            <span className="ml-auto flex items-center gap-2 text-[#616161]">
              {members.length > 0 && (
                <span className="hidden -space-x-1.5 sm:flex">
                  {members.slice(0, 3).map((id) => (
                    <span key={id} className="rounded-full ring-2 ring-white">
                      <Photo id={id} size={20} round />
                    </span>
                  ))}
                </span>
              )}
              <span className="flex items-center gap-1 rounded-md bg-[#5B5FC7] px-2 py-1 text-[11px] font-semibold text-white">
                <VideoCameraIcon size={12} weight="fill" aria-hidden="true" />
                Meet
              </span>
            </span>
          </div>
          <div className="flex min-h-0 flex-1 flex-col justify-end gap-3 overflow-hidden p-3 sm:p-4">{children}</div>
          {composer && (
            <div className="shrink-0 px-3 pb-3 sm:px-4">
              <div className="flex items-center gap-2 rounded-md bg-white px-3 py-2 text-[12px] text-[#616161] ring-1 ring-[#E0E0E0]">
                <ChatsCircleIcon size={14} aria-hidden="true" />
                Start a post
                <PaperPlaneRightIcon size={14} weight="fill" className="ml-auto text-[#5B5FC7]" aria-hidden="true" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Messages                                                            */
/* ------------------------------------------------------------------ */

type MessageProps = {
  /** A teammate, or Crewhir when omitted. */
  from?: PersonId
  time: string
  children: ReactNode
  /** Fades in with the timeline. Off for earlier, static history. */
  animate?: boolean
  /** Teams: render as a reply inside the post above it. */
  reply?: boolean
}

export function Message({ from, time, children, animate = true, reply }: MessageProps) {
  const platform = usePlatform()
  const name = from ? people[from].name : 'Crewhir'
  const anim = animate ? { 'data-anim': 'in', 'data-msg': '' } : {}

  if (platform === 'slack') {
    return (
      <div className="flex gap-2.5" {...anim}>
        {from ? <Photo id={from} size={34} /> : <CrewhirAvatar size={34} />}
        <div className="min-w-0 flex-1 text-[13.5px] leading-[1.45]">
          <p className="flex flex-wrap items-baseline gap-x-1.5">
            <span className="font-bold">{name}</span>
            {!from && (
              <span className="rounded-[3px] bg-[#E8E8E8] px-1 text-[9.5px] font-bold text-[#616061]">APP</span>
            )}
            <span className="text-[11px] text-[#616061]">{time}</span>
          </p>
          <div className="mt-0.5">{children}</div>
        </div>
      </div>
    )
  }

  // Teams: a top-level post is a card; replies sit inside it, indented.
  const body = (
    <div className="flex gap-2.5">
      {from ? <Photo id={from} size={reply ? 26 : 30} round /> : <CrewhirAvatar size={reply ? 26 : 30} />}
      <div className="min-w-0 flex-1 text-[13px] leading-[1.45]">
        <p className="flex flex-wrap items-baseline gap-x-1.5">
          <span className="font-semibold">{name}</span>
          {!from && <span className="rounded bg-[#EBEBEB] px-1 text-[9.5px] font-semibold text-[#616161]">Bot</span>}
          <span className="text-[11px] text-[#616161]">{time}</span>
        </p>
        <div className="mt-0.5">{children}</div>
      </div>
    </div>
  )
  if (reply) {
    return (
      <div
        className="-mt-3 rounded-b-md border-x border-b border-[#E0E0E0] bg-[#FAFAFA] px-3 py-2.5 sm:pl-12"
        {...anim}
      >
        {body}
      </div>
    )
  }
  return (
    <div
      className="rounded-md border border-[#E0E0E0] bg-white px-3 py-2.5 shadow-[0_1px_2px_rgb(0_0_0/0.06)]"
      {...anim}
    >
      {body}
    </div>
  )
}

/** Slack's sticky date pill between days. Teams has none in this view. */
export function DateDivider({ label = 'Today' }: { label?: string }) {
  if (usePlatform() !== 'slack') return null
  return (
    <div className="relative my-1 flex justify-center">
      <span className="absolute inset-x-0 top-1/2 h-px bg-[#E2E2E2]" />
      <span className="relative flex items-center gap-1 rounded-full border border-[#E2E2E2] bg-white px-3 py-0.5 text-[11.5px] font-bold">
        {label}
        <CaretDownIcon size={10} weight="bold" aria-hidden="true" />
      </span>
    </div>
  )
}

/** Teams' "Reply" link under a thread. Slack has none. */
export function ReplyLink() {
  if (usePlatform() === 'slack') return null
  return (
    <p className="-mt-3 flex items-center gap-1.5 rounded-b-md border-x border-b border-[#E0E0E0] bg-white px-3 py-1.5 text-[12px] text-[#5B5FC7] sm:pl-12">
      <ArrowBendUpLeftIcon size={13} aria-hidden="true" />
      Reply
    </p>
  )
}

export function Typing() {
  const platform = usePlatform()
  return (
    <div className="hidden items-center gap-2 text-[11.5px] text-[#616061]" data-typing>
      <span className="flex gap-0.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`size-1.5 animate-typing rounded-full ${platform === 'slack' ? 'bg-[#616061]' : 'bg-[#5B5FC7]'}`}
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </span>
      <span>
        <b className="font-semibold">Crewhir</b> is typing…
      </span>
    </div>
  )
}

export function ToolChip({ name, logo }: { name: string; logo: LogoSlug }) {
  const slack = usePlatform() === 'slack'
  return (
    <span
      data-anim="in"
      data-chip
      className={`inline-flex items-center gap-1.5 border bg-white py-1 pr-2 pl-1.5 text-[11.5px] font-medium ${
        slack ? 'rounded-md border-[#DDDDDD]' : 'rounded-full border-[#E0E0E0]'
      }`}
    >
      <IntegrationLogo slug={logo} size={14} />
      {name}
      <HandoffTick size={13} />
    </span>
  )
}

export function DoneLine({ children }: { children: ReactNode }) {
  return (
    <span className="flex items-start gap-1.5">
      <span data-done-tick className="mt-[3px]">
        <HandoffTick size={15} boxed />
      </span>
      <span>{children}</span>
    </span>
  )
}

export function FileAttachment({ name, meta }: { name: string; meta: string }) {
  const slack = usePlatform() === 'slack'
  return (
    <span
      className={`mt-2 flex max-w-72 items-center gap-2.5 border bg-white p-2 ${
        slack ? 'rounded-lg border-[#DDDDDD]' : 'rounded-md border-[#E0E0E0]'
      }`}
    >
      <span className="grid size-9 shrink-0 place-items-center rounded-md bg-[#E2463C] text-white">
        <FilePdfIcon size={20} weight="fill" aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[12.5px] font-bold">{name}</span>
        <span className="block text-[11px] text-[#616061]">{meta}</span>
      </span>
    </span>
  )
}

/** A link preview with the source tool's mark, like Slack unfurls and Teams cards. */
export function LinkCard({ logo, title, meta }: { logo: LogoSlug; title: string; meta: string }) {
  const slack = usePlatform() === 'slack'
  return (
    <span
      className={`mt-2 flex max-w-80 items-center gap-2.5 bg-white p-2 ${
        slack ? 'border-l-4 border-[#DDDDDD] pl-2.5' : 'rounded-md border border-[#E0E0E0]'
      }`}
    >
      <span className="grid size-8 shrink-0 place-items-center rounded-md bg-[#F4F4F4]">
        <IntegrationLogo slug={logo} size={18} />
      </span>
      <span className="min-w-0">
        <span className={`block truncate text-[12.5px] font-bold ${slack ? 'text-[#1264A3]' : 'text-[#5B5FC7]'}`}>
          {title}
        </span>
        <span className="block truncate text-[11px] text-[#616061]">{meta}</span>
      </span>
    </span>
  )
}

/** Slack Block Kit message / Teams Adaptive Card asking for a yes. Brass marks "Crewhir is asking you". */
export function ApprovalBlock({
  title,
  text,
  detail,
  approve,
  review,
}: {
  title: string
  text: string[]
  detail?: string
  approve: string
  review: string
}) {
  const slack = usePlatform() === 'slack'
  const rich = text.map((part, i) =>
    i % 2 ? (
      <b key={i} className="font-bold">
        {part}
      </b>
    ) : (
      part
    ),
  )
  return (
    <span
      data-anim="in"
      data-approval
      className={`mt-2 block max-w-96 bg-white ${
        slack
          ? 'border-l-4 border-brass py-0.5 pl-3'
          : 'rounded-md border border-t-4 border-[#E0E0E0] border-t-brass p-3'
      }`}
    >
      <span className="flex items-center gap-1.5 text-[12.5px] font-bold">
        <span className="size-2 rounded-full bg-brass" />
        {title}
      </span>
      <span className="mt-1 block text-[13px]">{rich}</span>
      {detail && <span className="mt-1 block text-[11px] text-[#616061]">{detail}</span>}
      <span className="mt-2 flex flex-wrap gap-1.5">
        <span
          className={`px-3 py-1 text-[12px] font-bold text-white ${slack ? 'rounded bg-[#007A5A]' : 'rounded-md bg-[#5B5FC7]'}`}
        >
          {approve}
        </span>
        <span
          className={`border bg-white px-3 py-1 text-[12px] font-bold ${
            slack ? 'rounded border-[#BBBBBB]' : 'rounded-md border-[#D1D1D1]'
          }`}
        >
          {review}
        </span>
        {!slack && (
          <span className="ml-auto grid place-items-center text-[#616161]">
            <DotsThreeIcon size={16} aria-hidden="true" />
          </span>
        )}
      </span>
    </span>
  )
}
