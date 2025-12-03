import type { SanityImageSource } from '@sanity/image-url';

// Types for site settings and home page content
export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  style?: string;
}

export interface Cta {
  label: string;
  href: string;
  style?: string;
}

export type SanityImage = SanityImageSource & {
  alt?: string;
};

export interface Seo {
  title?: string;
  description?: string;
  ogImage?: string;
  favicon?: string;
}

export interface SiteSettings {
  siteName?: string;
  versionBadge?: string;
  nav?: NavItem[];
  socials?: SocialLink[];
  seo?: Seo;
}

export type StringsDoc = Record<string, string>;

// Sections
export interface HeroSection {
  _type: 'heroSection';
  kicker?: string;
  title?: string;
  subtitle?: string;
  ctas?: Cta[];
  photo?: SanityImage;
}

export interface AboutSection {
  _type: 'aboutSection';
  title?: string;
  subtitle?: string;
  callout?: unknown;
  body?: unknown;
  bullets?: string[];
}

export interface WorkLogosGridSection {
  _type: 'workLogosGridSection';
  title?: string;
  strapline?: string;
  logos?: {
    name?: string;
    url?: string;
    src?: string;
    alt?: string;
  }[];
}

export interface SkillsSection {
  _type: 'skillsSection';
  title?: string;
  intro?: string;
  tags?: string[];
}

export interface StackSection {
  _type: 'stackSection';
  title?: string;
  tryStack?: string;
  stacks?: {
    label?: string;
    host?: string;
    summary?: string;
    list?: string[];
    builtWith?: string[];
  }[];
}

export interface ContactSection {
  _type?: 'contactSection';
  title?: string;
  body?: unknown; // Portable Text
  emailAddress?: string;
  emailLabel?: string;
  ctas?: Cta[];
}

// Possible sections
export type HomeSection =
  | HeroSection
  | AboutSection
  | WorkLogosGridSection
  | SkillsSection
  | StackSection
  | ContactSection;

export interface HomePage {
  sections?: HomeSection[];
}

// Query result
export interface HomeQueryResult {
  settings: SiteSettings | null;
  strings: StringsDoc | null;
  home: HomePage | null;
}
