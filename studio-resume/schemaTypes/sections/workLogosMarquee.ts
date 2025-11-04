import {defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons'

export const workLogosMarqueeSection = defineType({
  name: 'workLogosMarqueeSection',
  title: 'Work – Logos Marquee',
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
        title: 'Work / Marquee',
        subtitle: headline || undefined,
        media: ImageIcon,
      }
    },
  },
})
