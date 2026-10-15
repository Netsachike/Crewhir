import { useEffect, type DependencyList, type RefObject } from 'react'

type Kit = typeof import('./gsap')

const MOTION_OK = '(prefers-reduced-motion: no-preference)'
let kit: Promise<Kit> | null = null

/**
 * Runs a GSAP setup scoped to `scope` once GSAP has loaded, and reverts it on
 * unmount (safe under Strict Mode). Under reduced motion nothing runs and the
 * CSS in globals.css leaves every element in its final state.
 */
export function useMotion(
  scope: RefObject<HTMLElement | null>,
  setup: (kit: Kit, root: HTMLElement) => void,
  deps: DependencyList = [],
) {
  useEffect(() => {
    if (!window.matchMedia(MOTION_OK).matches || !scope.current) return
    let cancelled = false
    let ctx: gsap.Context | undefined
    kit ??= import('./gsap')
    kit.then(
      (k) => {
        if (cancelled || !scope.current) return
        const root = scope.current
        ctx = k.gsap.context(() => setup(k, root), root)
      },
      // If the chunk fails to load, show everything rather than leave it hidden.
      () => document.documentElement.classList.remove('js'),
    )
    return () => {
      cancelled = true
      ctx?.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
