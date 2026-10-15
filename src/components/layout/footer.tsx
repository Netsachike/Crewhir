import { Link } from 'react-router'
import { Logo } from '@/components/brand/logo'
import { Container } from '@/components/ui/layout'
import { COMPANY, LEGAL_LINKS, LINKS, NAV, SITE } from '@/lib/site'

const linkClass = 'inline-flex min-h-11 items-center text-small text-foam-2 transition-colors duration-200 hover:text-foam'

export function Footer() {
  return (
    <footer className="on-dark grain bg-harbor text-foam">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo tone="reversed" />
            <p className="mt-4 font-display text-title text-foam">{SITE.tagline}</p>
          </div>
          <nav aria-labelledby="footer-product">
            <h2 id="footer-product" className="font-sans text-eyebrow text-foam uppercase">
              Product
            </h2>
            <ul className="mt-3">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={linkClass}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-labelledby="footer-company">
            <h2 id="footer-company" className="font-sans text-eyebrow text-foam uppercase">
              Company
            </h2>
            <ul className="mt-3">
              <li>
                <a href={LINKS.contact} className={linkClass}>
                  Contact
                </a>
              </li>
              <li>
                <a href={LINKS.demo} className={linkClass}>
                  Book a demo
                </a>
              </li>
            </ul>
          </nav>
          <nav aria-labelledby="footer-legal">
            <h2 id="footer-legal" className="font-sans text-eyebrow text-foam uppercase">
              Legal
            </h2>
            <ul className="mt-3">
              {LEGAL_LINKS.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-harbor-line pt-6 text-xs text-foam-2 lg:flex-row lg:justify-between">
          <p>
            © {COMPANY.copyrightYear} {COMPANY.name}
          </p>
          <p className="max-w-2xl lg:text-right">
            Slack is a trademark of Slack Technologies, LLC. Microsoft Teams is a trademark of Microsoft Corporation.
            Crewhir is not affiliated with either.
          </p>
        </div>
      </Container>
    </footer>
  )
}

export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only-focusable fixed top-3 left-3 z-[60] rounded-full bg-harbor px-5 py-3 text-small font-semibold text-foam"
    >
      Skip to content
    </a>
  )
}
