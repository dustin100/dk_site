import {defineField, defineType} from 'sanity'
import {LinkIcon} from '@sanity/icons'

export const navLink = defineType({
  name: 'navLink',
  title: 'Nav Link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({name: 'label', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'href', type: 'string', validation: (r) => r.required()}),
  ],
})
