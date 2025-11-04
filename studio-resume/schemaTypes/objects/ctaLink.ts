import {defineField, defineType} from 'sanity'
import {LinkIcon} from '@sanity/icons'

export const ctaLink = defineType({
  name: 'ctaLink',
  title: 'CTA Link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({name: 'label', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'href', type: 'url', validation: (r) => r.uri({allowRelative: true})}),
    defineField({
      name: 'style',
      type: 'string',
      options: {list: ['primary', 'default'], layout: 'radio', direction: 'horizontal'},
      initialValue: 'default',
    }),
  ],
})
