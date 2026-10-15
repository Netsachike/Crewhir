import { ListIcon, XIcon } from '@phosphor-icons/react'
import { Dialog, NavigationMenu } from 'radix-ui'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { Logo } from '@/components/brand/logo'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/layout'
import { LINKS, NAV } from '@/lib/site'

/** Sticky header: transparent at the top, White with a Rope border after 8px. */
export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let last = window.scrollY > 8
    setScrolled(last)
    const onScroll = () => {
      const next = window.scrollY > 8
      if (next !== last) setScrolled((last = next))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-300 ease-crew ${
        scrolled ? 'border-rope bg-white/95 backdrop-blur-sm' : 'border-transparent bg-paper'
      }`}
    >
      <Container className="flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
        <Link to="/" aria-label="Crewhir home" className="-m-1 rounded-lg p-1">
          <Logo />
        </Link>

        <NavigationMenu.Root aria-label="Main" className="hidden lg:block">
          <NavigationMenu.List className="flex items-center gap-1">
            {NAV.map((item) => (
              <NavigationMenu.Item key={item.href}>
                <NavigationMenu.Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center rounded-full px-4 text-small font-medium text-slate transition-colors duration-200 hover:bg-sand hover:text-harbor"
                >
                  {item.label}
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            ))}
          </NavigationMenu.List>
        </NavigationMenu.Root>

        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild variant="ghost">
            <a href={LINKS.signIn}>Log in</a>
          </Button>
          <Button asChild>
            <a href={LINKS.signUp}>Start free</a>
          </Button>
        </div>

        <MobileNav />
      </Container>
    </header>
  )
}

function MobileNav() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="-mr-2 grid size-11 place-items-center rounded-full text-harbor hover:bg-sand lg:hidden"
          aria-label="Open menu"
        >
          <ListIcon size={24} aria-hidden="true" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-harbor/40" />
        <Dialog.Content className="fixed inset-x-0 top-0 z-50 rounded-b-panel bg-paper px-4 pt-3 pb-6 shadow-soft sm:px-6">
          <div className="flex h-12 items-center justify-between">
            <Logo />
            <Dialog.Close asChild>
              <button
                type="button"
                className="-mr-2 grid size-11 place-items-center rounded-full text-harbor hover:bg-sand"
                aria-label="Close menu"
              >
                <XIcon size={24} aria-hidden="true" />
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Title className="sr-only">Menu</Dialog.Title>
          <Dialog.Description className="sr-only">Site navigation</Dialog.Description>
          <nav aria-label="Main" className="mt-4">
            <ul className="flex flex-col">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={close}
                    className="flex min-h-12 items-center border-b border-rope font-display text-title text-harbor"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-6 flex flex-col gap-3">
            <Button asChild size="lg">
              <a href={LINKS.signUp}>Start free</a>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <a href={LINKS.signIn}>Log in</a>
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
