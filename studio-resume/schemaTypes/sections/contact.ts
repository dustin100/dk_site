import {defineField, defineType} from 'sanity'
import {EnvelopeIcon} from '@sanity/icons'

export const contactSection = defineType({
  name: 'contactSection',
  title: 'Contact',
  type: 'object',
  icon: EnvelopeIcon,
  fields: [
    defineField({name: 'title', type: 'string', initialValue: 'Let’s build something'}),
    defineField({name: 'body', type: 'portableTextSimple'}),
    defineField({
      name: 'ctas',
      type: 'array',
      of: [{type: 'ctaLink'}],
      validation: (r) => r.max(3),
    }),
  ],
})
