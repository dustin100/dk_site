import { createImageUrlBuilder } from '@sanity/image-url';
import { client } from './sanityClient.js';

const builder = createImageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

/**
 * Build a responsive srcset string and fallback src from a Sanity image object.
 * Respects crop and hotspot metadata set in the Studio.
 * @param {object} photo - Sanity image object with asset, crop, hotspot fields.
 * @param {number[]} [widths] - Widths to generate srcset entries for.
 * @returns {{ src: string, srcset: string }}
 */
export function buildSrcSet(photo, widths = [400, 800, 1200]) {
  if (!photo?.asset) return { src: '', srcset: '' };

  const base = urlFor(photo).fit('crop').auto('format').quality(80);

  const srcset = widths.map((w) => `${base.width(w).url()} ${w}w`).join(', ');
  const src = base.width(800).url();

  return { src, srcset };
}
