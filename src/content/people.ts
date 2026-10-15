import type { AvatarSlug } from '@/lib/assets'

/**
 * The fictional Lumen Bikes team who appear in the product mockups. Names,
 * roles and numbers are invented examples, not customers.
 */
export type Person = { name: string; role: string; avatar: AvatarSlug; status?: 'active' | 'away' }

export const people = {
  maya: { name: 'Maya Chen', role: 'Head of Growth', avatar: 'maya', status: 'active' },
  daniel: { name: 'Daniel Brooks', role: 'CEO', avatar: 'daniel', status: 'active' },
  priya: { name: 'Priya Shah', role: 'Marketing Lead', avatar: 'priya', status: 'active' },
  sam: { name: 'Sam Rivera', role: 'Engineering Lead', avatar: 'sam', status: 'active' },
  marcus: { name: 'Marcus Webb', role: 'Finance Director', avatar: 'marcus', status: 'away' },
  leo: { name: 'Leo Martins', role: 'Performance Marketer', avatar: 'leo', status: 'active' },
  kwame: { name: 'Kwame Asante', role: 'Ops Manager', avatar: 'kwame', status: 'away' },
  ana: { name: 'Ana Novak', role: 'Designer', avatar: 'ana', status: 'active' },
} satisfies Record<string, Person>

export type PersonId = keyof typeof people
