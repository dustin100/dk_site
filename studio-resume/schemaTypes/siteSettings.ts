import {defineField, defineType} from 'sanity'
import {CogIcon} from '@sanity/icons'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({name: 'siteName', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'versionBadge', type: 'string'}),
    defineField({
      name: 'nav',
      title: 'Navigation',
      type: 'array',
      of: [{type: 'navLink'}],
      validation: (r) => r.max(8),
    }),
    defineField({
      name: 'socials',
      title: 'Social Links',
      type: 'array',
      of: [{type: 'ctaLink'}],
    }),
    defineField({
      name: 'seo',
      title: 'Default SEO',
      type: 'object',
      fields: [
        {name: 'title', type: 'string'},
        {name: 'description', type: 'text'},
        {name: 'ogImage', type: 'image', options: {hotspot: true}},
      ],
    }),
    defineField({
      name: 'contactEmail',
      type: 'string',
      validation: (r) => r.email(),
    }),
  ],
})
