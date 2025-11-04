import {defineField, defineType} from 'sanity'
import {TagIcon} from '@sanity/icons'

export const skillsSection = defineType({
  name: 'skillsSection',
  title: 'Skills',
  type: 'object',
  icon: TagIcon,
  fields: [
    defineField({name: 'title', type: 'string', initialValue: 'What I work with'}),
    defineField({name: 'intro', type: 'string'}),
    defineField({
      name: 'tags',
      type: 'array',
      of: [{type: 'string'}],
      validation: (r) => r.unique().min(4),
    }),
  ],
  preview: {
    select: {
      headline: 'title',
    },
    prepare({headline}) {
      return {
        title: 'Skills',
        subtitle: headline || undefined,
        media: TagIcon,
      }
    },
  },
})
