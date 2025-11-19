import { client } from './sanityClient.js';
import { HOME_QUERY } from './queries.js';
import { sectionRegistry } from './registry.js';
import { findStackSection, selectStackVariant } from './utils.js';
import './components.js';

/**
 * Render the header web component with site settings.
 * @param {SiteSettings} siteSettings
 * @param {Strings} strings
 * @returns {void}
 */
function renderHeader(settings, strings) {
  const headerElement = document.querySelector('site-header');
  if (!headerElement) return;

  headerElement.data = {
    ...settings,
    strings,
  };
}

/**
 * Replace dynamic sections in <main> with components mapped by sectionRegistry.
 * @param {SectionData[]} sectionArray
 * @param {Strings} strings
 * @returns {void}
 */
function renderSections(sectionArray = [], strings = {}) {
  const mainContainer = document.querySelector('#main');
  if (!mainContainer) return;

  mainContainer.querySelectorAll('[data-dynamic-section]').forEach((node) => node.remove());

  (sectionArray || []).forEach((sectionData) => {
    const tagName = sectionRegistry[sectionData._type];
    if (!tagName) {
      console.warn('[CMS] Unmapped section type:', sectionData._type);
      return;
    }
    const sectionElement = document.createElement(tagName);
    sectionElement.setAttribute('data-dynamic-section', '');
    sectionElement.data = { ...sectionData, strings };
    mainContainer.appendChild(sectionElement);
  });
}

/**
 * Get the "built with" info from the stackSection in sections.
 * @param {SectionData[]} sections
 * @returns {string|null}
 */
function getBuiltWithFromSections(sections = []) {
  const stackSection = findStackSection(sections);
  if (!stackSection) return null;

  const currentStack = selectStackVariant(stackSection.stacks, 'html');
  if (!currentStack) return null;

  return currentStack.builtWith || currentStack.label || null;
}

/**
 * Render the footer web component with site settings and builtWith info.
 * @param {SiteSettings} settings
 * @param {SectionData[]} sections
 * @returns {void}
 */
function renderFooter(settings, sections) {
  const footerElement = document.querySelector('site-footer');
  if (!footerElement) return;

  const builtWith = getBuiltWithFromSections(sections);
  footerElement.data = { settings, builtWith };
}

/**
 * Starts the app: fetch CMS data then renders header + sections.
 * @returns {Promise<void>}
 */
async function startApp() {
  try {
    const { settings, home, strings } = await client.fetch(HOME_QUERY);

    renderHeader(settings, strings);
    renderSections(home?.sections, strings);
    renderFooter(settings, home?.sections);
  } catch (error) {
    console.error('[SANITY] fetch failed:', error.message, error.response?.body);
  }
}

startApp();
