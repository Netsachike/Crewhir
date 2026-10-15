import { createTV } from 'tailwind-variants'

/**
 * `tv` with tailwind-merge taught about the custom type scale, so
 * `text-section` and `text-foam` aren't treated as the same class group.
 */
export const tv = createTV({
  twMergeConfig: {
    extend: {
      theme: {
        text: ['hero', 'section', 'title', 'lead', 'body', 'small', 'eyebrow'],
      },
    },
  },
})

export type { VariantProps } from 'tailwind-variants'
