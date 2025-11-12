import {defineField, defineType} from 'sanity'
import {StarIcon} from '@sanity/icons'

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero',
  type: 'object',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'kicker',
      type: 'string',
      title: 'Kicker',
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'subtitle',
      type: 'text',
      title: 'Subtitle',
    }),
    defineField({
      name: 'ctas',
      title: 'CTAs',
      type: 'array',
      of: [{type: 'ctaLink'}],
      validation: (r) => r.max(2),
    }),
    defineField({
      name: 'photo',
      title: 'Hero image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt text',
          description: 'Describe the image for screen readers.',
          validation: (r) => r.required().min(4),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      headline: 'title',
      media: 'photo',
    },
    prepare(selection) {
      const {headline, media} = selection
      return {
        title: 'Hero',
        subtitle: headline || undefined,
        media: media || StarIcon,
      }
    },
  },
})
