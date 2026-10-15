import type { ComponentPropsWithRef, ReactNode } from 'react'
import { tv } from '@/lib/tv'

const container = tv({ base: 'mx-auto w-full max-w-[76rem] px-4 sm:px-6 lg:px-8' })

export function Container({ className, ...props }: ComponentPropsWithRef<'div'>) {
  return <div className={container({ className })} {...props} />
}

const section = tv({
  variants: {
    size: {
      lg: 'py-20 sm:py-24 lg:py-32',
      md: 'py-16 sm:py-20 lg:py-24',
    },
    tone: {
      paper: '',
      white: 'bg-white',
      sand: 'bg-sand',
      harbor: 'on-dark grain bg-harbor text-foam',
    },
  },
  defaultVariants: { tone: 'paper', size: 'lg' },
})

type SectionProps = ComponentPropsWithRef<'section'> & {
  tone?: 'paper' | 'white' | 'sand' | 'harbor'
  size?: 'lg' | 'md'
}

export function Section({ tone, size, className, ...props }: SectionProps) {
  return <section className={section({ tone, size, className })} {...props} />
}

const eyebrow = tv({
  base: 'text-eyebrow uppercase',
  variants: { dark: { true: 'text-foam-2', false: 'text-crew' } },
  defaultVariants: { dark: false },
})

export function Eyebrow({ dark, className, ...props }: ComponentPropsWithRef<'p'> & { dark?: boolean }) {
  return <p className={eyebrow({ dark, className })} {...props} />
}

const pill = tv({
  base: 'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-small font-medium',
  variants: {
    tone: {
      light: 'border-rope bg-white text-slate',
      dark: 'border-harbor-line bg-harbor-2 text-foam-2',
      mint: 'border-transparent bg-mint text-crew-deep',
    },
  },
  defaultVariants: { tone: 'light' },
})

export function Pill({
  tone,
  className,
  ...props
}: ComponentPropsWithRef<'span'> & { tone?: 'light' | 'dark' | 'mint' }) {
  return <span className={pill({ tone, className })} {...props} />
}

/** A section's eyebrow, h2 and optional sub, centred or left-aligned. */
export function SectionHeading({
  eyebrow: label,
  title,
  sub,
  dark,
  align = 'center',
  id,
}: {
  eyebrow?: string
  title: ReactNode
  sub?: ReactNode
  dark?: boolean
  align?: 'center' | 'left'
  id?: string
}) {
  const centered = align === 'center'
  return (
    <div className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'}>
      {label && <Eyebrow dark={dark}>{label}</Eyebrow>}
      <h2 id={id} className={`mt-4 text-section ${dark ? 'text-foam' : 'text-harbor'}`}>
        {title}
      </h2>
      {sub && (
        <p className={`mt-5 text-lead ${dark ? 'text-foam-2' : 'text-slate'} ${centered ? 'mx-auto max-w-2xl' : ''}`}>
          {sub}
        </p>
      )}
    </div>
  )
}
