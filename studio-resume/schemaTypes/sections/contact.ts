import {defineField, defineType} from 'sanity'
import {EnvelopeIcon} from '@sanity/icons'

export const contactSection = defineType({
  name: 'contactSection',
  title: 'Contact',
  type: 'object',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      initialValue: 'Let’s build something',
    }),
    defineField({
      name: 'body',
      type: 'portableTextSimple',
    }),
    defineField({
      name: 'emailAddress',
      title: 'Email address',
      type: 'string',
      description: 'Contact email address',
      validation: (r) => r.email().warning('This should be a valid email'),
    }),
    defineField({
      name: 'emailLabel',
      title: 'Email button label',
      type: 'string',
      initialValue: 'Email me',
    }),
    defineField({
      name: 'ctas',
      type: 'array',
      of: [{type: 'ctaLink'}],
      validation: (r) => r.max(3),
    }),
  ],
  preview: {
    select: {
      headline: 'title',
    },
    prepare({headline}) {
      return {
        title: 'Contact',
        subtitle: headline || undefined,
        media: EnvelopeIcon,
      }
    },
  },
})
