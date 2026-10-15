import { Slot } from 'radix-ui'
import type { ComponentPropsWithRef } from 'react'
import { tv, type VariantProps } from '@/lib/tv'

export const button = tv({
  base: [
    'inline-flex min-h-11 items-center justify-center gap-2 rounded-full font-sans font-semibold whitespace-nowrap',
    'transition-[background-color,color,border-color,transform] duration-200 ease-crew active:scale-[0.98]',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  variants: {
    variant: {
      primary: 'bg-crew text-white hover:bg-crew-deep',
      secondary: 'border border-rope-dark bg-white text-harbor hover:border-harbor',
      ghost: 'text-harbor hover:bg-sand',
      onDark: 'bg-foam text-harbor hover:bg-white',
      outlineDark: 'border border-harbor-line text-foam hover:border-foam-2 hover:bg-harbor-2',
    },
    size: {
      sm: 'px-4 text-small',
      md: 'px-5 text-small',
      lg: 'px-6 text-body',
    },
  },
  defaultVariants: { variant: 'primary', size: 'md' },
})

type ButtonProps = ComponentPropsWithRef<'button'> & VariantProps<typeof button> & { asChild?: boolean }

export function Button({ asChild, variant, size, className, ...props }: ButtonProps) {
  const Comp = asChild ? Slot.Root : 'button'
  return <Comp className={button({ variant, size, className })} {...props} />
}
