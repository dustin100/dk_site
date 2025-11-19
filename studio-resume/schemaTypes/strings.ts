import {defineType, defineField} from 'sanity'

export const strings = defineType({
  name: 'strings',
  title: 'Accessibility & Global Copy',
  type: 'document',
  fields: [
    defineField({
      name: 'skipToContent',
      title: 'Skip to content',
      type: 'string',
      initialValue: 'Skip to content',
    }),
    defineField({
      name: 'mainNavLabel',
      title: 'Main navigation label',
      type: 'string',
      initialValue: 'Main navigation',
    }),
    defineField({
      name: 'menuToggleOpen',
      title: 'Menu toggle (open)',
      type: 'string',
      initialValue: 'Open navigation',
    }),
    defineField({
      name: 'menuToggleClose',
      title: 'Menu toggle (close)',
      type: 'string',
      initialValue: 'Close navigation',
    }),
    defineField({
      name: 'workLogosLabel',
      title: 'Work logos list label',
      type: 'string',
      initialValue: 'Brand logos',
    }),
    defineField({
      name: 'stackSwitcherLabel',
      title: 'Stack switcher ARIA label',
      type: 'string',
      initialValue: 'Site framework switcher',
    }),
  ],
})
