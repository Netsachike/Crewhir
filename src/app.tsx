import { Analytics } from '@vercel/analytics/react'
import { useEffect } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router'
import { Footer, SkipLink } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { LegalDocument } from '@/components/legal/legal-document'
import { Comparison, HowItWorks, Pillars } from '@/components/sections/why'
import { AskAi, Faq, FinalCta, PricingTeaser, Testimonials } from '@/components/sections/closing'
import { Hero, WorksWith } from '@/components/sections/hero'
import { Control, Security, UseCases } from '@/components/sections/teams'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/layout'
import { legalDocuments } from '@/content/legal'
import { metaFor } from '@/lib/meta'

function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <WorksWith />
        <Comparison />
        <Pillars />
        <HowItWorks />
        <UseCases />
        <Control />
        <Security />
        <Testimonials />
        <AskAi />
        <PricingTeaser />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}

function NotFound() {
  return (
    <>
      <Header />
      <main id="main">
        <Container className="flex min-h-[60vh] flex-col items-start justify-center py-24">
          <p className="font-mono text-small text-muted">404</p>
          <h1 className="mt-3 text-section text-harbor">This page isn't on the list.</h1>
          <p className="mt-4 text-lead text-slate">The link may be old, or the page may have moved.</p>
          <Button asChild size="lg" className="mt-8">
            <Link to="/">Back to home</Link>
          </Button>
        </Container>
      </main>
      <Footer />
    </>
  )
}

/** Keeps the title and description right on client-side navigation; the prerender sets them first. */
function RouteEffects() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    const meta = metaFor(pathname)
    document.title = meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description)
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export function App() {
  return (
    <>
      <SkipLink />
      <RouteEffects />
      <Routes>
        <Route path="/" element={<Home />} />
        {legalDocuments.map((doc) => (
          <Route key={doc.slug} path={`/${doc.slug}`} element={<LegalDocument doc={doc} />} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Analytics />
    </>
  )
}
