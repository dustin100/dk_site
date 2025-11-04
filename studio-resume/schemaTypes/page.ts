import {defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({name: 'title', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'sections',
      type: 'array',
      of: [
        {type: 'heroSection'},
        {type: 'aboutSection'},
        {type: 'workLogosMarqueeSection'},
        {type: 'skillsSection'},
        {type: 'stackSection'},
        {type: 'contactSection'},
      ],
      validation: (r) => r.min(1),
    }),
  ],
})
