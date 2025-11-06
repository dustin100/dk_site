// sections/stack.ts
import {defineField, defineType} from 'sanity'
import {CodeBlockIcon} from '@sanity/icons'

export const stackSection = defineType({
  name: 'stackSection',
  title: 'Stack',
  type: 'object',
  icon: CodeBlockIcon,
  fields: [
    defineField({name: 'title', type: 'string', initialValue: 'Under the hood'}),
    defineField({
      name: 'stacks',
      title: 'Stacks',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Stack Variant',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (r) => r.required(),
            }), // e.g., HTML, React, Vue
            defineField({name: 'host', title: 'Host / Domain', type: 'string'}), // e.g., react.dustinkelly.dev
            defineField({name: 'summary', title: 'Summary', type: 'portableTextSimple'}),
            defineField({
              name: 'list',
              title: 'Highlights',
              type: 'array',
              of: [{type: 'string'}],
            }),
          ],
          preview: {
            select: {label: 'label', host: 'host'},
            prepare({label, host}) {
              return {title: label || 'Stack', subtitle: host || ''}
            },
          },
        },
      ],
      validation: (r) => r.min(1),
    }),
  ],
  preview: {
    select: {headline: 'title', count: 'stacks.length'},
    prepare({headline, count}) {
      return {
        title: 'Stack',
        subtitle: `${headline || 'Under the hood'}`,
        media: CodeBlockIcon,
      }
    },
  },
})
