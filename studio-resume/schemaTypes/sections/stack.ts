import {defineField, defineType} from 'sanity'
import {CodeBlockIcon} from '@sanity/icons'

export const stackSection = defineType({
  name: 'stackSection',
  title: 'Stack',
  type: 'object',
  icon: CodeBlockIcon,
  fields: [
    defineField({name: 'title', type: 'string', initialValue: 'Under the hood'}),
    defineField({name: 'summary', type: 'portableTextSimple'}),
    defineField({name: 'list', type: 'array', of: [{type: 'string'}]}),
    defineField({
      name: 'switcher',
      title: 'Switcher Buttons',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', type: 'string'},
            {name: 'host', type: 'string'},
          ],
        },
      ],
      validation: (r) => r.max(3),
    }),
  ],
  preview: {
    select: {
      headline: 'title',
    },
    prepare({headline}) {
      return {
        title: 'Stack',
        subtitle: headline || undefined,
        media: CodeBlockIcon,
      }
    },
  },
})
