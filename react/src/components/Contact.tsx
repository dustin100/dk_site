// src/components/Contact.tsx
import type { FC } from 'react';
import type { ContactSection as ContactSectionData } from '../types';
import { SanityPortableText } from '../sanity/SanityPortableText';
import { Button } from './ui/Button';

type ContactProps = {
  section: ContactSectionData;
};

export const Contact: FC<ContactProps> = ({ section }) => {
  const { title, body, ctas = [], emailAddress, emailLabel } = section;

  const emailHref = emailAddress ? `mailto:${emailAddress}` : undefined;
  const hasCtas = Boolean(emailHref || ctas.length);

  return (
    <section id="contact">
      <div className="mx-auto max-w-regular">
        <div className="grid grid-cols-1 gap-m items-start md:grid-cols-2">
          <div className="card card--fx">
            {title && <h2 className="h2 mb-m">{title}</h2>}

            <SanityPortableText value={body} />

            {hasCtas && (
              <div className="mt-m flex flex-wrap gap-s">
                {emailHref && (
                  <Button
                    href={emailHref}
                    variant="primary"
                  >
                    {emailLabel || 'Email me'}
                  </Button>
                )}

                {ctas.map(({ label, href, style }, index) => {
                  if (!href || !label) return null;
                  const variant = style === 'primary' ? 'primary' : 'default';

                  return (
                    <Button
                      key={`${label}-${index}`}
                      href={href}
                      variant={variant}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {label}
                    </Button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
