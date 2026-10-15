import { logoUrl, WORDMARKS, type LogoSlug } from '@/lib/assets'

/**
 * An official integration mark, shown as published (never redrawn or
 * recoloured, plan §2.6). Wordmarks get twice the width of square marks.
 */
export function IntegrationLogo({
  slug,
  size = 20,
  alt = '',
  className = '',
}: {
  slug: LogoSlug
  size?: number
  alt?: string
  className?: string
}) {
  const wide = WORDMARKS.includes(slug)
  return (
    <img
      src={logoUrl(slug)}
      alt={alt}
      width={wide ? size * 2.4 : size}
      height={size}
      loading="lazy"
      decoding="async"
      className={`shrink-0 object-contain ${className}`}
      style={{ width: wide ? size * 2.4 : size, height: size }}
    />
  )
}
