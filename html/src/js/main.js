import { client } from './sanityClient.js';
import { HOME_QUERY } from './queries.js';
import { sectionRegistry } from './registry.js';
import './components.js';

/**
 * Render the header web component with site settings.
 * @param {SiteSettings} siteSettings
 * @returns {void}
 */
function renderHeader(siteSettings) {
  const headerElement = document.querySelector('site-header');
  if (headerElement) headerElement.data = siteSettings;
}

/**
 * Replace dynamic sections in <main> with components mapped by sectionRegistry.
 * @param {SectionData[]} sectionArray
 * @returns {void}
 */
function renderSections(sectionArray) {
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
    sectionElement.data = sectionData;
    mainContainer.appendChild(sectionElement);
  });
}

/**
 * Starts the app: fetch CMS data then renders header + sections.
 * @returns {Promise<void>}
 */
async function startApp() {
  try {
    const { settings, home } = await client.fetch(HOME_QUERY);
    renderHeader(settings);
    renderSections(home?.sections);
  } catch (error) {
    console.error('[SANITY] fetch failed:', error.message, error.response?.body);
  }
}

startApp();

document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
