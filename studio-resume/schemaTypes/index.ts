import {siteSettings} from './siteSettings'
import {page} from './page'
import {homePage} from './homePage'
import {strings} from './strings'

import {navLink} from './objects/navLink'
import {ctaLink} from './objects/ctaLink'
import {logoLink} from './objects/logoLink'
import {portableTextSimple} from './objects/portableTextSimple'

import {heroSection} from './sections/hero'
import {aboutSection} from './sections/about'
import {workLogosGridSection} from './sections/workLogosGrid'
import {skillsSection} from './sections/skills'
import {stackSection} from './sections/stack'
import {contactSection} from './sections/contact'

export const schemaTypes = [
  // documents
  siteSettings,
  page,
  homePage,
  strings,

  // objects
  navLink,
  ctaLink,
  logoLink,
  portableTextSimple,

  // sections
  heroSection,
  aboutSection,
  workLogosGridSection,
  skillsSection,
  stackSection,
  contactSection,
]
