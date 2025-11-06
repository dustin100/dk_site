/**
 * Render a minimal Portable Text array into paragraph HTML.
 * Only handles simple "block" nodes with plain text spans.
 * @param {PTBlock[]|unknown} blocks
 * @returns {string} HTML string
 */
export function renderPortableText(blocks) {
  if (!Array.isArray(blocks)) return '';
  return blocks
    .map((block) =>
      block?._type === 'block'
        ? `<p>${(block.children || []).map((span) => span.text).join('')}</p>`
        : ''
    )
    .join('');
}

/**
 * Build a Sanity image URL with optional width/height params.
 * Adds `auto=format` and `fit=max` by default.
 * @param {string} src - Base image URL from Sanity.
 * @param {{width?: number, height?: number}} [opts]
 * @returns {string} URL string (empty string if src is falsy)
 */
export function imageUrlWithSize(src, { width, height } = {}) {
  if (!src) return '';
  const params = new URLSearchParams({
    auto: 'format',
    fit: 'max',
    ...(width ? { w: String(width) } : {}),
    ...(height ? { h: String(height) } : {}),
  });
  return `${src}?${params.toString()}`;
}
