import type { FC } from 'react';
import { useSanityData } from '../sanity/SanityProvider';
import { useHeaderNav } from '../hooks/useHeaderNav';
import { Brand } from './ui/Brand';
import { DesktopNav, type NavItem } from './DesktopNav';
import { Hamburger } from './ui/Hamburger';
import { MobileDrawer } from './MobileDrawer';

type HeaderSettings = {
  siteName?: string;
  versionBadge?: string;
  nav?: NavItem[];
  strings?: {
    mainNavLabel?: string;
    menuToggleOpen?: string;
    menuToggleClose?: string;
  };
};

export const Header: FC = () => {
  const { settings } = useSanityData() as {
    settings?: HeaderSettings;
  };

  const {
    isOpen,
    handleToggle,
    closeMenu,
    toggleRef,
    firstLinkRef,
  } = useHeaderNav();

  const navItems = settings?.nav ?? [];

  const mainNavLabel =
    settings?.strings?.mainNavLabel ?? 'Primary navigation';
  const menuToggleOpen =
    settings?.strings?.menuToggleOpen ?? 'Open menu';
  const menuToggleClose =
    settings?.strings?.menuToggleClose ?? 'Close menu';

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-primary backdrop-blur-md backdrop-saturate-150">
      <div className="container-regular flex items-center justify-between gap-m py-s">
        {/* Brand: badge + logo */}
        <Brand
          siteName={settings?.siteName}
          versionBadge={settings?.versionBadge}
        />

        {/* Right side: desktop nav + mobile toggle */}
        <div className="flex items-center gap-m">
          <DesktopNav label={mainNavLabel} items={navItems} />

          <Hamburger
            isOpen={isOpen}
            labelOpen={menuToggleOpen}
            labelClose={menuToggleClose}
            onClick={handleToggle}
            buttonRef={toggleRef}
          />
        </div>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden">
        {/* Overlay */}
        <button
          type="button"
          aria-hidden="true"
          onClick={closeMenu}
          className={[
            'fixed inset-0 z-30 bg-primary/60 backdrop-blur-sm transition-opacity duration-200',
            isOpen ? 'opacity-70 pointer-events-auto' : 'opacity-0 pointer-events-none',
          ]
            .filter(Boolean)
            .join(' ')}
        />

        {/* Slide-in panel */}
        <MobileDrawer
          isOpen={isOpen}
          mainNavLabel={mainNavLabel}
          menuToggleCloseLabel={menuToggleClose}
          items={navItems}
          onClose={closeMenu}
          firstLinkRef={firstLinkRef}
        />
      </div>
    </header>
  );
};

export default Header;
