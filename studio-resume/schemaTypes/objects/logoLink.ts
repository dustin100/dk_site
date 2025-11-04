import {defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons'

export const logoLink = defineType({
  name: 'logoLink',
  title: 'Logo Link',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({name: 'name', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'url', type: 'url', validation: (r) => r.required()}),
    defineField({
      name: 'logo',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', type: 'string', validation: (r) => r.required()}],
      validation: (r) => r.required(),
    }),
  ],
})
