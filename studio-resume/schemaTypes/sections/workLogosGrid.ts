import {defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons'

export const workLogosGridSection = defineType({
  name: 'workLogosGridSection',
  title: 'Work – Logos Grid',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({name: 'title', type: 'string', initialValue: 'Work'}),
    defineField({
      name: 'logos',
      type: 'array',
      of: [{type: 'logoLink'}],
      validation: (r) => r.min(4),
    }),
    defineField({name: 'strapline', type: 'string'}),
  ],

  preview: {
    select: {
      headline: 'title',
    },
    prepare({headline}) {
      return {
        title: 'Work – Logos Grid',
        subtitle: headline || undefined,
        media: ImageIcon,
      }
    },
  },
})
