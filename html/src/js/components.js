import { renderPortableText, imageUrlWithSize, selectStackVariant } from './utils.js';
import { buildSrcSet } from './sanityImage.js';

class SectionBase extends HTMLElement {
  _data;

  set data(incomingData) {
    this._data = incomingData;
    this.render?.(incomingData);
  }

  get data() {
    return this._data;
  }
}

customElements.define(
  'site-header',
  class SiteHeader extends SectionBase {
    render(settings = {}) {
      const { versionBadge, siteName, nav = [], strings = {} } = settings;
      const { mainNavLabel, menuToggleOpen, menuToggleClose } = strings;

      this.innerHTML = `
        <div class="container site-header__bar">
          <div class="site-header__brand">
            ${versionBadge ? `<span class="badge badge--mono">${versionBadge}</span>` : ''}
            <div class="site-header__logo">
              ${siteName ?? ''}
            </div>
          </div>

          <!-- Mobile toggle -->
          <button class="nav__toggle"
                  type="button"
                  aria-label="${menuToggleOpen}"
                  aria-controls="primary-nav"
                  aria-expanded="false">
            <span class="nav__toggle-icon" aria-hidden="true"></span>
          </button>

          <nav class="nav" aria-label="${mainNavLabel}">
            <div id="primary-nav" class="nav__links">
              <button class="nav__close" type="button" aria-label="${menuToggleClose}" data-close>
                <span class="nav__close-icon" aria-hidden="true"></span>
              </button>
              ${nav.map(({ label, href }) => `<a class="nav__link link" href="${href}">${label}</a>`).join('')}
            </div>
            <div class="nav__overlay" data-close></div>
          </nav>
        </div>
      `;

      this.wireUpMenu({ menuToggleOpen, menuToggleClose });
    }

    wireUpMenu(labels = {}) {
      const { menuToggleOpen, menuToggleClose } = labels;

      const nav = this.querySelector('.nav');
      const panel = this.querySelector('#primary-nav');
      const toggle = this.querySelector('.nav__toggle');
      const overlay = this.querySelector('.nav__overlay');
      if (!nav || !panel || !toggle) return;

      const open = () => {
        nav.classList.add('nav--open');
        document.body.classList.add('nav-open');
        toggle.setAttribute('aria-expanded', 'true');
        toggle.setAttribute('aria-label', menuToggleClose);
        const firstLink = panel.querySelector('a');
        if (firstLink) firstLink.focus({ preventScroll: true });
      };

      const close = () => {
        nav.classList.remove('nav--open');
        document.body.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', menuToggleOpen);
        toggle.focus({ preventScroll: true });
      };

      const toggleMenu = () => (nav.classList.contains('nav--open') ? close() : open());

      toggle.addEventListener('click', toggleMenu);
      overlay?.addEventListener('click', close);
      panel.addEventListener('click', (e) => {
        if (e.target.closest('a')) close();
      });
      this.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') close();
      });

      const closeEls = this.querySelectorAll('[data-close]');
      closeEls.forEach((el) => el.addEventListener('click', close));
    }
  }
);

customElements.define(
  'section-hero',
  class SectionHero extends SectionBase {
    render(hero = {}) {
      const { kicker, title, subtitle, ctas = [], photo } = hero;

      const { src: photoSrc, srcset: photoSrcset } = buildSrcSet(photo);
      const photoAlt = photo?.alt || '';

      this.innerHTML = `
        <section id="hero" class="hero">
          <div class="hero__grid">
            <div class="hero__intro">
              ${kicker ? `<div class="hero__kicker badge--mono">${kicker}</div>` : ''}
              <h1 class="hero__title">${title ?? ''}</h1>
              ${subtitle ? `<p class="hero__subtitle">${subtitle}</p>` : ''}
              <div class="hero__cta">
                ${ctas
                  .map(
                    ({ label, href, style }) =>
                      `<a class="btn ${style === 'primary' ? 'btn--primary' : ''}" href="${href}">${label}</a>`
                  )
                  .join('')}
              </div>
            </div>

            <div class="hero__media"${photoSrc ? '' : ' aria-hidden="true"'}>
              ${
                photoSrc
                  ? `
                <figure class="hero__photo">
                  <img
                    class="hero__photo-img"
                    src="${photoSrc}"
                    srcset="${photoSrcset}"
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    alt="${photoAlt}"
                    width="1700"
                    height="1125"
                    loading="eager"
                    decoding="async"
                  />
                </figure>
              `
                  : ''
              }
            </div>
          </div>
        </section>
      `;
    }
  }
);

customElements.define(
  'section-about',
  class SectionAbout extends SectionBase {
    render(about = {}) {
      const { title, body, subtitle, bullets = [], callout } = about;

      this.innerHTML = `
      <section id="about" class="about">
        <div class="grid">
          <div class="col-6">
            <article class="card card--fx">
              <div>
                <h2 class="about__title">${title ?? ''}</h2>
                ${renderPortableText(body)}
              </div>
            </article>
          </div>

          <div class="col-6">
            <article class="card card--fx">
              <div>
                ${subtitle ? `<h3 class="about__subtitle badge--mono h2">${subtitle}</h3>` : ''}
                <ul class="card__list">
                  ${bullets.map((text) => `<li>${text}</li>`).join('')}
                </ul>
              </div>
            </article>
          </div>
        </div>
      </section>
    `;
    }
  }
);

customElements.define(
  'section-work',
  class SectionWork extends SectionBase {
    render(data = {}) {
      const { title = '', strapline, logos = [], strings = {} } = data;
      const { workLogosLabel = '' } = strings;

      if (!logos.length) {
        this.innerHTML = '';
        return;
      }

      const renderLogo = ({ url = '#', name = '', src, alt }) => {
        const w = 360;
        const h = 240;
        const imgUrl = imageUrlWithSize(src, { width: w, height: h });
        const safeAlt = alt ?? name ?? '';

        return `
          <li class="work__item">
            <a class="work__logo-link" href="${url}" target="_blank" rel="noopener">
              <img
                class="work__logo"
                src="${imgUrl}"
                alt="${safeAlt}"
                width="${w}" height="${h}"
                loading="lazy" decoding="async"
              />
            </a>
          </li>
        `;
      };

      const grid = logos.map(renderLogo).join('');

      this.innerHTML = `
        <section id="work" class="work">
          <h2 class="work__title">${title}</h2>
          <article class="card card--fx work__logos">
            <div>
              ${strapline ? `<p class="work__strap">${strapline}</p>` : ''}
              <ul class="work__grid" aria-label="${workLogosLabel}">
                ${grid}
              </ul>
            </div>
          </article>
        </section>
      `;
    }
  }
);

customElements.define(
  'section-skills',
  class SectionSkills extends SectionBase {
    render(skills = {}) {
      const { title = '', intro, tags = [] } = skills;

      const tagsHtml = tags.map((label) => `<li class="skills__tag">${label}</li>`).join('');

      this.innerHTML = `
        <section id="skills" class="skills">
          <div class="grid">
            <div class="col-12">
              <h2 class="skills__title">${title}</h2>
            </div>
            <div class="col-12">
              <article class="card card--fx">
                ${intro ? `<p class="skills__intro">${intro}</p>` : ''}
                ${
                  tags.length
                    ? `
                    <ul class="skills__tags">
                      ${tagsHtml}
                    </ul>
                  `
                    : ''
                }
              </article>
            </div>
          </div>
        </section>
      `;
    }
  }
);

customElements.define(
  'section-stack',
  class SectionStack extends SectionBase {
    render(data = {}) {
      const { title = '', tryStack = '', stacks = [], strings = {} } = data;

      const { stackSwitcherLabel = '' } = strings;
      const currentStack = selectStackVariant(stacks, 'html') || {};

      this.innerHTML = `
        <section id="stack" class="stack">
          <h2 class="stack__title">${title}</h2>
          <article class="card card--fx">
            <div>
              <div class="stack__grid">
                <div class="stack__summary">
                  ${renderPortableText(currentStack.summary)}
                  <ul class="stack__list">
                    ${currentStack?.list.map((item) => `<li>${item}</li>`).join('')}
                  </ul>
                </div>
                <div class="stack__switcher" role="group" aria-label="${stackSwitcherLabel}">
                  <p class="stack__try">${tryStack}</p>
                  <div class="stack__buttons">
                    ${stacks
                      .map(({ label, host }) => {
                        const isCurrent = host === currentStack.host;
                        return isCurrent
                          ? `<a class="btn stack__btn" aria-disabled="true" href="https://${host}" target="_self">${label}</a>`
                          : `<a class="btn stack__btn" href="https://${host}" target="_self" rel="noopener">${label}</a>`;
                      })
                      .join('')}
                  </div>
                </div>
              </div>
            </div>
          </article>
        </section>
      `;
    }
  }
);

customElements.define(
  'section-contact',
  class SectionContact extends SectionBase {
    render(contact = {}) {
      const { title = '', body, ctas = [], emailAddress, emailLabel } = contact;

      const emailHref = emailAddress ? `mailto:${emailAddress}` : '';

      this.innerHTML = `
        <section id="contact" class="contact">
          <div class="contact__panel">
            <article class="card card--fx">
              <div>
                <h2 class="contact__title">${title}</h2>
                ${renderPortableText(body)}
                <div class="contact__cta">
                  ${
                    emailHref
                      ? `<a class="btn" href="${emailHref}">
                           ${emailLabel || 'Email me'}
                         </a>`
                      : ''
                  }
                  ${ctas
                    .map(
                      ({ label, href, style }) =>
                        `<a class="btn ${
                          style === 'primary' ? 'btn--primary' : ''
                        }" href="${href}" rel="noopener" target="_blank">${label}</a>`
                    )
                    .join('')}
                </div>
              </div>
            </article>
          </div>
        </section>
      `;
    }
  }
);

customElements.define(
  'site-footer',
  class SiteFooter extends SectionBase {
    render(data = {}) {
      const { settings = {}, builtWith } = data;

      const title = settings.siteName || '';
      const builtWithText = builtWith || '';
      const year = new Date().getFullYear();

      this.innerHTML = `
        <footer class="site-footer">
          <div class="container site-footer__grid">
            <p class="site-footer__built-with">
              ${builtWithText}
            </p>
            <p class="site-footer__copyright">
              © ${year} ${title}
            </p>
          </div>
        </footer>
      `;
    }
  }
);
