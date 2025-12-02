// src/components/Hero.tsx
import type { FC } from 'react';
import type { HeroSection as HeroSectionData } from '../types';
import { ResponsiveImage } from './ResponsiveImage';
import { Button } from './ui/Button';

type HeroProps = {
  hero: HeroSectionData;
};

export const Hero: FC<HeroProps> = ({ hero }) => {
  const { kicker, title, subtitle, ctas = [], photo } = hero;
  const hasPhoto = Boolean(photo);

  return (
    <section id="hero">
      <div className="mx-auto max-w-regular">
        <div className="grid grid-cols-1 items-center gap-m md:grid-cols-[1.2fr_0.8fr] md:gap-l">
          {/* Intro */}
          <div>
            {kicker && (
              <div className="badge--mono text-muted text-xs leading-baseline uppercase tracking-2">
                {kicker}
              </div>
            )}

            <h1 className="h1 mt-xs mb-m">{title ?? ''}</h1>

            {subtitle && (
              <p className="text-muted text-base md:text-lg leading-2 max-w-[60ch] mb-l">
                {subtitle}
              </p>
            )}

            <div className="flex flex-wrap gap-s">
              {ctas.map(({ label, href, style }) => (
                <Button
                  key={`${label}-${href}`}
                  href={href}
                  variant={style === 'default' ? 'default' : 'primary'}
                >
                  {label}

                </Button>
              ))}
            </div>
          </div>

          {/* Media */}
          <div
            className="flex self-stretch justify-start mt-l md:mt-0 md:justify-end"
            aria-hidden={hasPhoto ? undefined : true}
          >
            {hasPhoto && (
              <figure className="relative overflow-hidden p-[1px] rounded-3xl bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.18),transparent_55%),radial-gradient(circle_at_100%_100%,rgba(0,255,255,0.18),transparent_55%),rgba(0,0,0,0.7)] shadow-card max-w-[420px] w-full">
                <ResponsiveImage
                  photo={photo}
                  width={1700}
                  height={1125}
                  loading="eager"
                  className="block h-full max-h-[420px] w-full rounded-[23px] object-cover object-top"
                  sizes="(min-width: 768px) 420px, 100vw"
                />
              </figure>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
