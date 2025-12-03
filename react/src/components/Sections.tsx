import type { FC } from 'react';
import type {
  HomePage,
  HomeSection,
  HeroSection,
  WorkLogosGridSection,
  StringsDoc,
  AboutSection,
  SkillsSection,
  StackSection,
  ContactSection,
} from '../types';
import { useSanityData } from '../sanity/useSanityData';
import { Hero } from './Hero';
import { WorkLogosGrid } from './WorkLogosGrid';
import { About } from './About';
import { Skills } from './Skills';
import { Stack } from './Stack';
import { Contact } from './Contact';

type SanityContextShape = {
  home?: HomePage | null;
  strings?: StringsDoc | null;

};

const renderSection = (
  section: HomeSection,
  index: number,
  strings?: StringsDoc | null
) => {
  switch (section._type) {
    case 'heroSection':
      return (
        <Hero
          key={`hero-${index}`}
          hero={section as HeroSection}
        />
      );

    // TODO: Add other sections here
    case 'aboutSection':
      return (
        <About
          key={`about-${index}`}
          section={section as AboutSection}
        />
      );
    case 'workLogosGridSection':
      return <WorkLogosGrid
          key={`work-${index}`}
          section={section as WorkLogosGridSection}
          strings={strings}
        />;
    case 'skillsSection':
      return (
        <Skills
          key={`skills-${index}`}
          section={section as SkillsSection}
        />
      );
    case 'stackSection':
      return (
        <Stack
          key={`stack-${index}`}
          section={section as StackSection}
          strings={strings}
        />
      );
    case 'contactSection':
      return (
        <Contact
          key={`contact-${index}`}
          section={section as ContactSection}
        />
      );

    default: {
      if (import.meta.env.DEV) {

        console.warn('[CMS] Unmapped section type:', section._type);
      }
      return null;
    }
  }
};

export const Sections: FC = () => {
  const { home, strings } = useSanityData() as SanityContextShape;

  const sections = home?.sections ?? [];
  if (!sections.length) return null;


  // Build sections from Sanity
  return (
    <>
      {sections.map((section, index) =>
        renderSection(section, index, strings)
      )}
    </>
  );
};

export default Sections;
