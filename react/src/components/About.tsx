import type { FC } from 'react';
import type { AboutSection as AboutSectionData } from '../types';
import { SanityPortableText } from '../sanity/SanityPortableText';

type AboutProps = {
  section: AboutSectionData;
};

export const About: FC<AboutProps> = ({ section }) => {
  const { title, body, subtitle, bullets = [] } = section;
  const hasBullets = bullets.length > 0;

  return (
    <section id="about">
      <div>
        <div className="grid grid-cols-1 gap-m md:grid-cols-2 md:gap-l">
          {/* Left card: main copy */}
          <div>
            <div className="card card--fx">
              {title && <h2 className="h2 mb-m">{title}</h2>}

              <SanityPortableText value={body} />
            </div>
          </div>

          {/* Right card: subtitle + bullets */}
          <div>
            <div className="card card--fx">
              {subtitle && (
                <h3 className="h2 badge--mono mb-m">
                  {subtitle}
                </h3>
              )}

              {hasBullets && (
                <ul className="card__list">
                  {bullets.map((text, index) => (
                    <li key={`${text}-${index}`}>{text}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
