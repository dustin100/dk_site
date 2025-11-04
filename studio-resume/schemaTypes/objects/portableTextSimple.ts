import {defineType} from 'sanity'
import {TextIcon} from '@sanity/icons'

export const portableTextSimple = defineType({
  name: 'portableTextSimple',
  title: 'Portable Text',
  type: 'array',
  icon: TextIcon,
  of: [{type: 'block'}],
})
