import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP, ScrollTrigger)
}

export const EASE = 'expo.out'
export const MOTION_OK = '(prefers-reduced-motion: no-preference)'
export const MOTION_REDUCED = '(prefers-reduced-motion: reduce)'

/** Draws a handoff tick (an svg with `data-anim="tick"`) from 0 to full. */
export function drawTick(tl: gsap.core.Timeline, target: gsap.TweenTarget, position?: gsap.Position) {
  return tl.fromTo(
    target,
    { strokeDashoffset: 1 },
    { strokeDashoffset: 0, duration: 0.4, ease: 'power2.out' },
    position,
  )
}

export { gsap, ScrollTrigger, useGSAP }
