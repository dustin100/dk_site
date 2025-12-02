import type { FC } from 'react';
import type { SanityImage } from '../types';
import { urlFor } from '../sanity/SanityImage';

type ResponsiveImageProps = {
  photo?: SanityImage;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  sizes?: string;
};

export const ResponsiveImage: FC<ResponsiveImageProps> = ({
  photo,
  className,
  width = 1700,
  height = 1125,
  loading = 'lazy',
  sizes = '(min-width: 1024px) 33vw, 100vw',
}) => {
  if (!photo) return null;

  const base = urlFor(photo)
    .fit('crop')
    .auto('format')
    .quality(80);

  const src400 = base.width(400).url();
  const src800 = base.width(800).url();
  const src1200 = base.width(1200).url();

  return (
    <img
      src={src800}
      srcSet={`${src400} 400w, ${src800} 800w, ${src1200} 1200w`}
      sizes={sizes}
      alt={photo.alt ?? ''}
      width={width}
      height={height}
      className={`w-full h-auto object-cover ${className ?? ''}`}
      loading={loading}
      decoding="async"
    />
  );
};

export default ResponsiveImage;
