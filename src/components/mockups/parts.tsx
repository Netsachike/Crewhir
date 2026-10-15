/**
 * The "handoff tick": a Crew Green check that draws itself when Crewhir
 * finishes something (plan §2.5). `pathLength=1` lets GSAP and CSS animate
 * `stroke-dashoffset` from 1 to 0 regardless of size.
 */
export function HandoffTick({
  size = 16,
  className = '',
  boxed = false,
}: {
  size?: number
  className?: string
  boxed?: boolean
}) {
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
