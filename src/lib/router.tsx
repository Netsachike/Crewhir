import { createContext, useContext, type ComponentPropsWithRef } from 'react'

/**
 * Every page is prerendered to its own HTML file, so links are plain anchors
 * and the only routing state is the current path (set by the server render
 * or read from `location` in the browser).
 */
const PathContext = createContext('/')

export const PathProvider = PathContext.Provider

export const usePathname = () => useContext(PathContext)

export const normalizePath = (path: string) => (path.length > 1 ? path.replace(/\/+$/, '') : path)

export function Link({ to, ...props }: Omit<ComponentPropsWithRef<'a'>, 'href'> & { to: string }) {
  return <a href={to} {...props} />
}

/** A link that marks itself `aria-current="page"` on its own page. */
export function NavLink({ to, ...props }: Omit<ComponentPropsWithRef<'a'>, 'href'> & { to: string }) {
  const current = usePathname() === to
  return <a href={to} aria-current={current ? 'page' : undefined} {...props} />
}
