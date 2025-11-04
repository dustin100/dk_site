// schemaTypes/deskStructure.ts
import type {StructureResolver} from 'sanity/structure'
import {HomeIcon, CogIcon, DocumentIcon} from '@sanity/icons'

const deskStructure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Home Page')
        .id('homePage')
        .icon(HomeIcon)
        .child(S.editor().id('homePageEditor').schemaType('homePage').documentId('homePage')),

      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .icon(CogIcon)
        .child(
          S.editor().id('siteSettingsEditor').schemaType('siteSettings').documentId('siteSettings'),
        ),

      S.divider(),

      // Regular list for multi-doc types
      S.documentTypeListItem('page').title('Pages').icon(DocumentIcon),
    ])

export default deskStructure
