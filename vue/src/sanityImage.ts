import { createImageUrlBuilder } from '@sanity/image-url'
import { client } from './sanityClient'

const builder = createImageUrlBuilder(client)

export function urlFor(source: unknown) {
  return builder.image(source as Parameters<typeof builder.image>[0])
}
