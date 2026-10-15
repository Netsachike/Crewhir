import { CaretDownIcon, LinkSimpleIcon } from '@phosphor-icons/react'
import { Fragment, useEffect, useState, type ReactNode } from 'react'
import { Link, NavLink } from 'react-router'
import { Logo } from '@/components/brand/logo'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Container, Eyebrow } from '@/components/ui/layout'
import type { LegalBlock, LegalDocument as Doc } from '@/content/legal'
import { LEGAL_LINKS, LINKS } from '@/lib/site'

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/^\d+\.\s*/, (m) => m.replace('.', '').trim() + '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const LINK_RE = /(https?:\/\/[^\s)]+[^\s).,;]|[\w.+-]+@[\w-]+\.[\w.]+[\w])/g

/** Turns URLs and email addresses in plain legal text into links. */
function Linkify({ text }: { text: string }) {
  const parts = text.split(LINK_RE)
  return (
    <>
      {parts.map((part, i) => {
        if (i % 2 === 0) return <Fragment key={i}>{part}</Fragment>
        const href = part.includes('@') && !part.startsWith('http') ? `mailto:${part}` : part
        return (
          <a key={i} href={href} className="font-medium break-words text-crew underline underline-offset-4 hover:text-crew-deep">
            {part}
          </a>
        )
      })}
    </>
  )
}

function Block({ block }: { block: LegalBlock }) {
  if (block.type === 'h3') return <h3 className="mt-8 font-sans text-body font-semibold text-harbor">{block.text}</h3>
  if (block.type === 'ul')
    return (
      <ul className="mt-4 flex list-disc flex-col gap-2 pl-5 marker:text-rope-dark">
        {block.items.map((item) => (
          <li key={item}>
            <Linkify text={item} />
          </li>
        ))}
      </ul>
    )
  return (
    <p className="mt-4">
      <Linkify text={block.text} />
    </p>
  )
}

function LegalHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-rope bg-white/95 backdrop-blur-sm">
      <Container className="flex min-h-16 flex-wrap items-center justify-between gap-x-6 gap-y-1 py-2">
        <Link to="/" aria-label="Crewhir home" className="-m-1 rounded-lg p-1">
          <Logo />
        </Link>
        <nav aria-label="Legal documents" className="order-3 -mx-3 w-full overflow-x-auto md:order-none md:mx-0 md:w-auto">
          <ul className="flex">
            {LEGAL_LINKS.map((l) => (
              <li key={l.href}>
                <NavLink
                  to={l.href}
                  className="inline-flex min-h-11 items-center rounded-full px-3 text-small font-medium whitespace-nowrap text-slate hover:text-harbor aria-[current=page]:text-crew"
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <Button asChild size="sm">
          <a href={LINKS.signUp}>Start free</a>
        </Button>
      </Container>
    </header>
  )
}

function Toc({ items, active }: { items: { id: string; label: string }[]; active: string | null }) {
  return (
    <ol className="flex flex-col border-l border-rope">
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            aria-current={active === item.id ? 'location' : undefined}
            className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-small text-slate transition-colors hover:text-harbor aria-[current=location]:border-crew aria-[current=location]:font-medium aria-[current=location]:text-harbor"
          >
            {item.label}
          </a>
        </li>
      ))}
    </ol>
  )
}

export function LegalDocument({ doc }: { doc: Doc }) {
  const toc = doc.sections.filter((s) => s.heading).map((s) => ({ id: slugify(s.heading!), label: s.heading! }))
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    setActive(null)
    const headings = toc.map((t) => document.getElementById(t.id)).filter((el): el is HTMLElement => !!el)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-80px 0px -70% 0px' },
    )
    headings.forEach((h) => observer.observe(h))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doc.slug])

  const updated = new Intl.DateTimeFormat('en-GB', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(doc.lastUpdated))

  return (
    <>
      <LegalHeader />
      <main id="main">
        <Container className="grid gap-12 py-12 sm:py-16 lg:grid-cols-[16rem_1fr] lg:gap-16 lg:py-20">
          <aside className="hidden lg:block">
            <nav aria-label="Contents" className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pb-8">
              <p className="mb-3 text-eyebrow text-slate uppercase">Contents</p>
              <Toc items={toc} active={active} />
            </nav>
          </aside>
          <article lang="en" className="max-w-[68ch] min-w-0 text-body text-ink">
            <Eyebrow>Legal</Eyebrow>
            <h1 className="mt-3 text-section text-harbor">{doc.title}</h1>
            <p className="mt-4 text-small text-muted">
              Last updated <time dateTime={doc.lastUpdated}>{updated}</time>
            </p>

            <details className="group mt-8 rounded-card border border-rope bg-white lg:hidden">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between px-4 font-semibold text-harbor [&::-webkit-details-marker]:hidden">
                Contents
                <CaretDownIcon size={18} aria-hidden="true" className="transition-transform group-open:rotate-180" />
              </summary>
              <nav aria-label="Contents" className="px-4 pb-4">
                <Toc items={toc} active={active} />
              </nav>
            </details>

            {doc.sections.map((section, i) => (
              <Section key={i} heading={section.heading}>
                {section.blocks.map((block, j) => (
                  <Block key={j} block={block} />
                ))}
              </Section>
            ))}
          </article>
        </Container>
      </main>
      <Footer />
    </>
  )
}

function Section({ heading, children }: { heading?: string; children: ReactNode }) {
  if (!heading) return <section className="mt-8 text-slate">{children}</section>
  const id = slugify(heading)
  return (
    <section aria-labelledby={id} className="mt-12">
      <h2 id={id} className="group flex items-center gap-2 text-title text-harbor">
        {heading}
        <a
          href={`#${id}`}
          aria-label={`Link to ${heading}`}
          className="grid size-8 place-items-center rounded-full text-muted opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
        >
          <LinkSimpleIcon size={16} aria-hidden="true" />
        </a>
      </h2>
      {children}
    </section>
  )
}
