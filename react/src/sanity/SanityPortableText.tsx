
import type { FC } from 'react';
import {
  PortableText,
  type PortableTextComponents,
} from '@portabletext/react';

type SanityPortableTextProps = {
  value?: unknown;
};

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="body-m mb-m text-base text-text">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-outside ml-l mb-m space-y-2xs">
        {children}
      </ul>
    ),
  },
};

export const SanityPortableText: FC<SanityPortableTextProps> = ({ value }) => {
  if (!value) return null;

  return <PortableText value={value as any} components={components} />;
};

export default SanityPortableText;
