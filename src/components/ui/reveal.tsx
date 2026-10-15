import { useRef, type ReactNode } from 'react'
import { drawTick, EASE, gsap, MOTION_OK, useGSAP } from '@/lib/gsap'

/**
 * Fades and lifts its `[data-anim="in"]` descendants in once, staggered, when
 * 30% visible, then draws any handoff ticks inside. Under reduced motion
 * everything renders in its final state.
 */
export function Reveal({
  children,
  className,
  as: Tag = 'div',
  stagger = 0.08,
}: {
  children: ReactNode
  className?: string
  as?: 'div' | 'ul' | 'ol'
  stagger?: number
}) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        const root = ref.current!
        const items = root.querySelectorAll('[data-anim="in"]')
        const ticks = root.querySelectorAll('[data-anim="tick"] path')
        const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: 'top 70%', once: true } })
        if (items.length) {
          tl.fromTo(items, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: EASE, stagger })
        }
        if (ticks.length) drawTick(tl, ticks, items.length ? '-=0.3' : 0)
      })
      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  )
}
