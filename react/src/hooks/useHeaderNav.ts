import { useEffect, useRef, useState } from 'react';

type FocusableElement = HTMLElement & {
  focus(options?: FocusOptions): void;
};

const focusWithPreventScroll = (element: FocusableElement | null) => {
  if (!element) return;
  try {
    element.focus({ preventScroll: true });
  } catch {
    element.focus();
  }
};

export const useHeaderNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  // scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('nav-open');
    } else {
      document.body.classList.remove('nav-open');
    }
    return () => {
      document.body.classList.remove('nav-open');
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      focusWithPreventScroll(firstLinkRef.current as FocusableElement | null);
    }
  }, [isOpen]);

  // close on Escape
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  const handleToggle = () => setIsOpen((prev) => !prev);

  const closeMenu = () => {
    setIsOpen(false);
    focusWithPreventScroll(toggleRef.current as FocusableElement | null);
  };

  return {
    isOpen,
    handleToggle,
    closeMenu,
    toggleRef,
    firstLinkRef,
  };
};
