import {defineField, defineType} from 'sanity'
import {HomeIcon} from '@sanity/icons'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({name: 'title', type: 'string', initialValue: 'Home', readOnly: true}),
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
