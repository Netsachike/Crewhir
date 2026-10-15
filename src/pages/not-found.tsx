import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/layout'
import { Link } from '@/lib/router'

export default function NotFound() {
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
