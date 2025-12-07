// src/components/Footer.tsx
import type { FC } from 'react';
import type { HomePage, SiteSettings } from '../types';
import { useSanityData } from '../sanity/useSanityData';
import { getBuiltWithFromSections } from '../utils/stackHelpers';

type SanityContextShape = {
  home?: HomePage | null;
  settings?: SiteSettings | null;
};

export const Footer: FC = () => {
  const { home, settings } = useSanityData() as SanityContextShape;

  const title = settings?.siteName ?? '';
  const builtWithText = getBuiltWithFromSections(home?.sections ?? []) ?? '';

  const year = new Date().getFullYear();

  return (
    <footer className="py-l">
      <div className="mx-auto max-w-regular grid grid-cols-1 gap-2xs">
        {builtWithText && (
          <p className="text-muted text-base leading-0 tracking-1 m-0">
            {builtWithText}
          </p>
        )}
        <p className="text-accent text-sm m-0">
          © {year} {title}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
