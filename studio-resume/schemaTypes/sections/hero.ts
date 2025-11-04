import {defineField, defineType} from 'sanity'
import {StarIcon} from '@sanity/icons'

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero',
  type: 'object',
  icon: StarIcon,
  fields: [
    defineField({name: 'kicker', type: 'string'}),
    defineField({name: 'title', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'subtitle', type: 'text'}),
    defineField({
      name: 'ctas',
      type: 'array',
      of: [{type: 'ctaLink'}],
      validation: (r) => r.max(2),
    }),
    defineField({
      name: 'summaryBullets',
      title: 'Summary (mono card)',
      type: 'array',
      of: [{type: 'string'}],
    }),
  ],
  preview: {
    select: {
      headline: 'title',
    },
    prepare(selection) {
      const {headline} = selection
      return {
        title: 'Hero',
        subtitle: headline || undefined,
        media: StarIcon,
      }
    },
  },
})
