import { renderPortableText, imageUrlWithSize } from './utils.js';

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
      const { versionBadge, siteName, nav = [] } = settings;

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
                  aria-label="Open menu"
                  aria-controls="primary-nav"
                  aria-expanded="false">
            <span class="nav__toggle-icon" aria-hidden="true"></span>
          </button>

          <nav class="nav" aria-label="Primary">
            <div id="primary-nav" class="nav__links">
            <button class="nav__close" type="button" aria-label="Close menu" data-close>
              <span class="nav__close-icon" aria-hidden="true"></span>
            </button>
              ${nav.map(({ label, href }) => `<a class="nav__link link" href="${href}">${label}</a>`).join('')}
            </div>
            <div class="nav__overlay" data-close></div>
          </nav>
        </div>
      `;

      this.wireUpMenu();
    }

    wireUpMenu() {
      const nav = this.querySelector('.nav');
      const panel = this.querySelector('#primary-nav');
      const toggle = this.querySelector('.nav__toggle');
      const overlay = this.querySelector('.nav__overlay');
      if (!nav || !panel || !toggle) return;

      const open = () => {
        nav.classList.add('nav--open');
        document.body.classList.add('nav-open');
        toggle.setAttribute('aria-expanded', 'true');
        toggle.setAttribute('aria-label', 'Close menu');
        const firstLink = panel.querySelector('a');
        if (firstLink) firstLink.focus({ preventScroll: true });
      };

      const close = () => {
        nav.classList.remove('nav--open');
        document.body.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
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
      console.log('Rendering hero:', hero);

      const hasPhoto = !!photo.src;
      const w = 880;
      const h = 560;
      const photoUrl = hasPhoto ? imageUrlWithSize(photo.src, { width: w, height: h }) : '';
      const photoAlt = photo?.alt || '';

      this.innerHTML = `
        <section id="hero" class="hero" aria-labelledby="intro-title">
          <div class="hero__grid">
            <div class="hero__intro">
              ${kicker ? `<div class="hero__kicker badge--mono">${kicker}</div>` : ''}
              <h1 id="intro-title" class="hero__title">${title ?? ''}</h1>
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

            <div class="hero__media"${photoUrl ? '' : ' aria-hidden="true"'}>
              ${
                photoUrl
                  ? `
                <figure class="hero__photo">
                  <img
                    class="hero__photo-img"
                    src="${photoUrl}"
                    alt="${photoAlt}"
                    width="${w}"
                    height="${h}"
                    loading="lazy"
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
      <section id="about" class="about" aria-labelledby="about-title">
        <div class="grid">
          <div class="col-6">
            <article class="card card--fx">
              <div class="card__body card__body--p-22">
                <h2 id="about-title" class="about__title">${title ?? ''}</h2>
                ${renderPortableText(body)}
              </div>
            </article>
          </div>

          <div class="col-6">
            <article class="card card--fx">
              <div class="card__body card__body--p-22">
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
    render(work = {}) {
      const { title = 'Work', strapline, logos = [] } = work;

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
        <section id="work" class="work" aria-labelledby="work-title">
          <h2 id="work-title" class="work__title">${title}</h2>
          <article class="card card--fx work__logos">
            <div class="card__body card__body--p-24">
              ${strapline ? `<p class="work__strap">${strapline}</p>` : ''}
              <ul class="work__grid" aria-label="Brand logos">
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

      this.innerHTML = `
      <section id="skills" class="skills" aria-labelledby="skills-title">
        <div class="grid">
          <div class="col-12">
            <h2 id="skills-title" class="skills__title">${title}</h2>
          </div>
          <div class="col-12">
            <article class="card card--fx">
              <div class="card__body card__body--p-18">
                ${intro ? `<p class="u-muted" style="margin-top:0">${intro}</p>` : ''}
                <div class="tags">
                  ${tags.map((label) => `<span class="tags__item tags__item--mono">${label}</span>`).join('')}
                </div>
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
  'section-stack',
  class SectionStack extends SectionBase {
    render(stack = {}) {
      const { title = '', list = [], stacks = [] } = stack;

      const currentStack = stacks.find((s) => s.label?.toLowerCase() === 'html') || {};

      this.innerHTML = `
      <section id="stack" class="stack" aria-labelledby="stack-title">
        <h2 id="stack-title" class="stack__title">${title}</h2>
        <article class="card card--fx">
          <div class="card__body card__body--p-22">
            <div class="stack__grid">
              <div class="stack__summary">
                ${renderPortableText(currentStack.summary)}
                <ul class="stack__list">
                  ${currentStack?.list.map((item) => `<li>${item}</li>`).join('')}
                </ul>
              </div>
              <div class="stack__switcher" role="group" aria-label="Site framework switcher">
                <p class="u-muted">Try the same site in different stacks: (coming soon)</p>
                <div class="stack__buttons">
                  ${stacks
                    .map(
                      ({ label, host }) =>
                        `<a class="btn stack__btn" data-target-host="${host}" href="https://${host}">${label}</a>`
                    )
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
      const { title = '', body, ctas = [] } = contact;

      this.innerHTML = `
      <section id="contact" class="contact" aria-labelledby="contact-title">
        <div class="contact__panel">
          <article class="card card--fx">
            <div class="card__body card__body--p-22">
              <h2 id="contact-title" class="contact__title">${title}</h2>
              ${renderPortableText(body)}
              <div class="contact__cta">
                ${ctas
                  .map(
                    ({ label, href, style }) =>
                      `<a class="btn ${style === 'primary' ? 'btn--primary' : ''}" href="${href}" rel="noopener">${label}</a>`
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
