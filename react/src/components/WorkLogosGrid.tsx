// src/components/WorkLogosGrid.tsx
import type { FC } from 'react';
import type { StringsDoc, WorkLogosGridSection as WorkSectionData } from '../types';

type WorkLogosGridProps = {
  section: WorkSectionData;
  strings?: StringsDoc | null;
};

export const WorkLogosGrid: FC<WorkLogosGridProps> = ({ section, strings }) => {
  const { title, strapline, logos = [] } = section;

  if (!logos || logos.length === 0) return null;

  const ariaLabel = strings?.workLogosLabel ?? 'Brand logos';

  return (
    <section id="work">
      <div className="mx-auto max-w-regular">
        {title && <h2 className="h2 mb-m">{title}</h2>}

        <div className="card card--fx">
          {strapline && (
            <p className="text-muted max-w-160 mb-l">
              {strapline}
            </p>
          )}

          <ul
            className="grid list-none m-0 p-0 gap-xl items-center justify-items-center grid-cols-[repeat(auto-fit,minmax(120px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(180px,1fr))]"
            aria-label={ariaLabel}
          >
            {logos.map((logo, index) => {
              if (!logo) return null;

              const { url, name, src, alt } = logo;
              if (!src) return null;

              const safeAlt = alt ?? name ?? '';
              const href = url || '#';

              return (
                <li key={`${name ?? 'logo'}-${index}`} className="m-0">
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full max-w-[180px] rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] opacity-80 transition-[opacity,transform,border-color,box-shadow] duration-150 ease-out hover:opacity-100 hover:-translate-y-px hover:border-line hover:shadow-card focus-visible:opacity-100 focus-visible:-translate-y-px focus-visible:border-line focus-visible:shadow-card"
                  >
                    <img
                      src={src}
                      alt={safeAlt}
                      width={180}
                      height={120}
                      loading="lazy"
                      decoding="async"
                      className="block max-w-full h-auto"
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default WorkLogosGrid;
