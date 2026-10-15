/**
 * GSAP lives in its own chunk, loaded after hydration by `useMotion`
 * (src/lib/motion.ts), so it never counts toward the initial JS.
 */
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const EASE = 'expo.out'

/** Draws handoff ticks (`[data-anim="tick"] path`) from nothing to full. */
export function drawTick(tl: gsap.core.Timeline, target: gsap.TweenTarget, position?: gsap.Position) {
  return tl.fromTo(
    target,
    { strokeDashoffset: 1 },
    { strokeDashoffset: 0, duration: 0.4, ease: 'power2.out' },
    position,
  )
}

export { gsap, ScrollTrigger }
