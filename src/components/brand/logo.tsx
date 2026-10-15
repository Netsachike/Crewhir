import { tv } from '@/lib/tv'

/**
 * The Crewhir symbol: a speech bubble drawn in one stroke whose tail turns
 * into a check, ending in the Brass signature dot (plan §2.6).
 * Shared with scripts/brand-assets.mjs, which renders the icon files.
 */
export const MARK_PATH =
  'M27 11V9.5a5.5 5.5 0 0 0-5.5-5.5h-12A5.5 5.5 0 0 0 4 9.5v8A5.5 5.5 0 0 0 9.5 23H10l4.5 4.5L24.5 17.5'
export const MARK_DOT = { cx: 27.3, cy: 14.7, r: 2.1 }

const symbol = tv({
  base: 'shrink-0',
  variants: {
    tone: { primary: 'text-harbor', reversed: 'text-foam', onGreen: 'text-white' },
  },
  defaultVariants: { tone: 'primary' },
})

type Tone = 'primary' | 'reversed' | 'onGreen'

export function LogoMark({ tone, className, size = 28 }: { tone?: Tone; className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      className={symbol({ tone, className })}
    >
      <path
        d={MARK_PATH}
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle {...MARK_DOT} fill="#F5B83D" />
    </svg>
  )
}

/** Horizontal lockup: symbol + lowercase wordmark. */
export function Logo({ tone = 'primary', className }: { tone?: Tone; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ''}`}>
      <LogoMark tone={tone} />
      <span
        className={`font-display text-[1.375rem] leading-none font-bold tracking-[-0.03em] ${
          tone === 'primary' ? 'text-harbor' : tone === 'reversed' ? 'text-foam' : 'text-white'
        }`}
      >
        crewhir
      </span>
    </span>
  )
}
