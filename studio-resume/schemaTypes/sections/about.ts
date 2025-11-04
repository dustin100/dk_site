import {defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

export const aboutSection = defineType({
  name: 'aboutSection',
  title: 'About',
  type: 'object',
  icon: DocumentIcon,
  fields: [
    defineField({name: 'title', type: 'string', initialValue: 'A bit about me'}),
    defineField({name: 'body', type: 'portableTextSimple'}),
    defineField({name: 'subtitle', type: 'string', initialValue: 'How I can help'}),
    defineField({
      name: 'bullets',
      type: 'array',
      of: [{type: 'string'}],
      validation: (r) => r.min(1),
    }),
    defineField({name: 'callout', type: 'string'}),
  ],
})
