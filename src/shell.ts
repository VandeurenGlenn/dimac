import '@vandeurenglenn/lite-elements/icon.js'
import '@vandeurenglenn/lite-elements/icon-button.js'
import '@vandeurenglenn/lite-elements/icon-set.js'
import '@vandeurenglenn/lite-elements/selector.js'
import { LiteElement, html, property, query } from '@vandeurenglenn/lite'
import style from './shell.css' with { type: 'css' }
import icons from './icons.js'
import './elements/drawer.js'
import './elements/footer.js'
import { DimacDrawer } from './elements/drawer.js'
import { routeMeta } from './route-meta.js'

export class DimacShell extends LiteElement {
  static #views = new Set([
    '',
    'home',
    'about',
    'services',
    'woningscan',
    'totaalrenovatie',
    'nieuwbouw',
    'badkamerrenovatie',
    'keukenrenovatie',
    'elektriciteit',
    'sanitair',
    'werkwijze',
    'reviews',
    'dakwerken',
    'hernieuwbare-energie',
    'afwerking',
    'gyprocwerken',
    'schilderwerken',
    'vloerwerken',
    'technieken',
    'aannemer-diest',
    'aannemer-herk-de-stad',
    'aannemer-paal',
    'realizations',
    'contact',
    'admin',
    'keepit-preview'
  ])

  @query('custom-selector') accessor selector

  @query('main') accessor main

  @query('dimac-drawer') accessor drawer: DimacDrawer

  @property({ type: String }) accessor selected

  @property({ type: Boolean }) accessor loaded

  @property({ type: Boolean, reflect: true }) accessor narrow

  @property({ type: Object, provides: 'realizationsManifest' }) accessor realizationsManifest

  @property({ type: Object, provides: 'keepitPreview' }) accessor keepitPreview

  declare shadowRoot: ShadowRoot

  #hashBang = '#!/'

  #onPreviewMessage = (event: MessageEvent<{ type?: string; payload?: unknown }>) => {
    if (event.data?.type !== 'keepit-preview') return
    this.keepitPreview = event.data.payload
  }

  static styles = [style]

  firstRender(): void {
    const mediaQuery = globalThis.matchMedia('(min-width: 1700px)')

    mediaQuery.onchange = this.#onqueryChange.bind(this)
    this.#onqueryChange(mediaQuery)
    this.setAttribute('shown', '')
    onhashchange = this.#onhashchange.bind(this)
    globalThis.addEventListener('message', this.#onPreviewMessage)

    this.#onhashchange()
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    globalThis.removeEventListener('message', this.#onPreviewMessage)
  }

  #validView(hash) {
    return DimacShell.#views.has(hash)
  }

  #removeHashBang(hash = location.hash) {
    return hash.slice(this.#hashBang.length, hash.length)
  }

  #addHashBang(hash = location.hash) {
    return this.#hashBang + hash
  }

  #updateHeadMeta(hash: string) {
    const metaKey = hash || 'home'
    const meta = routeMeta[metaKey]

    if (!meta) return

    document.title = meta.title

    const updateMetaTag = (selector: string, value: string) => {
      const element = document.head.querySelector(selector)
      if (element) {
        element.setAttribute('content', value)
      }
    }

    updateMetaTag('meta[name="title"]', meta.title)
    updateMetaTag('meta[name="description"]', meta.description)
    updateMetaTag('meta[property="og:title"]', meta.title)
    updateMetaTag('meta[property="og:description"]', meta.description)
    updateMetaTag('meta[name="twitter:title"]', meta.title)
    updateMetaTag('meta[name="twitter:description"]', meta.description)

    const canonical = document.head.querySelector('link[rel="canonical"]')
    canonical?.setAttribute('href', `https://dimac.be${meta.path}`)
  }

  #renderNavLink(route, label, icon) {
    return html`
      <a
        href="#!/${route}"
        data-route=${route}
        @click=${() => this.drawer?.closeDrawer()}
        class="nav-link ${this.selected === route ? 'active' : ''}">
        <span class="nav-icon"><custom-icon .icon=${icon}></custom-icon></span>
        <span class="nav-label">${label}</span>
      </a>
    `
  }

  async #onhashchange() {
    let hash = location.hash
    hash = this.#removeHashBang()
    if (!location.hash || !this.#validView(hash)) return (location.hash = this.#addHashBang('home'))
    if (!customElements.get(`${hash}-view`)) await import(`./${hash}.js`)
    this.selected = hash
    this.drawer?.closeDrawer()

    this.main?.scrollTo(0, 0)

    if (hash === 'realizations' || hash === 'admin') {
      const response = await fetch('./realizations-manifest.json')
      if (response.ok) {
        this.realizationsManifest = await response.json()
      }
    }

    this.#updateHeadMeta(hash)

    await (this.shadowRoot.querySelector(`${hash}-view`) as { loaded?: Promise<boolean> })?.loaded

    this.loaded = true
  }

  #onqueryChange({ matches }) {
    if (matches) {
      this.narrow = false
    } else {
      this.narrow = true
    }
  }

  #renderSelected(selected) {
    if (selected === 'services') {
      return html` <services-view></services-view> `
    }
    if (selected === 'woningscan') {
      return html` <woningscan-view></woningscan-view> `
    }
    if (selected === 'totaalrenovatie') {
      return html` <totaalrenovatie-view></totaalrenovatie-view> `
    }
    if (selected === 'nieuwbouw') {
      return html` <nieuwbouw-view></nieuwbouw-view> `
    }
    if (selected === 'badkamerrenovatie') {
      return html` <badkamerrenovatie-view></badkamerrenovatie-view> `
    }
    if (selected === 'keukenrenovatie') {
      return html` <keukenrenovatie-view></keukenrenovatie-view> `
    }
    if (selected === 'elektriciteit') {
      return html` <elektriciteit-view></elektriciteit-view> `
    }
    if (selected === 'sanitair') {
      return html` <sanitair-view></sanitair-view> `
    }
    if (selected === 'werkwijze') {
      return html` <werkwijze-view></werkwijze-view> `
    }
    if (selected === 'reviews') {
      return html` <reviews-view></reviews-view> `
    }
    if (selected === 'dakwerken') {
      return html` <dakwerken-view></dakwerken-view> `
    }
    if (selected === 'hernieuwbare-energie') {
      return html` <hernieuwbare-energie-view></hernieuwbare-energie-view> `
    }
    if (selected === 'afwerking') {
      return html` <afwerking-view></afwerking-view> `
    }
    if (selected === 'gyprocwerken') {
      return html` <gyprocwerken-view></gyprocwerken-view> `
    }
    if (selected === 'schilderwerken') {
      return html` <schilderwerken-view></schilderwerken-view> `
    }
    if (selected === 'vloerwerken') {
      return html` <vloerwerken-view></vloerwerken-view> `
    }
    if (selected === 'technieken') {
      return html` <technieken-view></technieken-view> `
    }
    if (selected === 'aannemer-diest') {
      return html` <aannemer-diest-view></aannemer-diest-view> `
    }
    if (selected === 'aannemer-herk-de-stad') {
      return html` <aannemer-herk-de-stad-view></aannemer-herk-de-stad-view> `
    }
    if (selected === 'aannemer-paal') {
      return html` <aannemer-paal-view></aannemer-paal-view> `
    }

    if (selected === 'about') {
      return html` <about-view></about-view> `
    }
    if (selected === 'realizations') {
      return html` <realizations-view></realizations-view> `
    }
    if (selected === 'admin') {
      return html` <admin-view></admin-view> `
    }
    if (selected === 'keepit-preview') {
      return html` <keepit-preview-view></keepit-preview-view> `
    }
    if (selected === 'contact') {
      return html` <contact-view></contact-view> `
    }
    return html` <home-view></home-view> `
  }

  render() {
    return html`
      ${icons}
      <dimac-drawer .narrow=${this.narrow}>
        <span slot="mobile-brand">Dimac</span>
        <span slot="mobile-status">Technieken en meer</span>
        <div
          slot="drawer-content"
          class="drawer-content">
          <div class="brand-stack">
            <div class="brand-panel">
              <img
                src="./assets/dimac.svg"
                alt="Dimac Logo"
                class="logo" />
              <span class="eyebrow">Aannemer in en rond Diest</span>
            </div>
          </div>

          <nav
            class="nav-panel"
            aria-label="Hoofdnavigatie">
            <custom-selector
              .selected=${this.selected}
              attr-for-selected="data-route">
              ${this.#renderNavLink('home', 'Home', 'home')}
              ${this.#renderNavLink('about', 'Over Dimac', 'info')}
              ${this.#renderNavLink('services', 'Diensten', 'home_repair_service')}
              ${this.#renderNavLink('woningscan', 'Woningscan', 'home_health')}
              ${this.#renderNavLink('werkwijze', 'Werkwijze', 'checklist')}
              ${this.#renderNavLink('realizations', 'Realisaties', 'cheer')}
              ${this.#renderNavLink('reviews', 'Reviews', 'star')}
              ${this.#renderNavLink('contact', 'Contact', 'phone_in_talk')}
            </custom-selector>
          </nav>

          <div class="contact-panel">
            <div class="contact-panel-header">
              <span class="panel-label">Snel contact</span>
              <p class="panel-note">
                Bel of mail rechtstreeks voor een snelle afstemming van uw project.
              </p>
            </div>
            <a
              class="contact-link"
              href="tel:013335335">
              <custom-icon icon="call"></custom-icon>
              <span class="contact-copy">
                <span class="contact-kicker">Telefonisch</span>
                <span class="contact-value">013 33 53 35</span>
              </span>
            </a>
            <a
              class="contact-link"
              href="mailto:info@dimac.be">
              <custom-icon icon="mail"></custom-icon>
              <span class="contact-copy">
                <span class="contact-kicker">E-mail</span>
                <span class="contact-value">info@dimac.be</span>
              </span>
            </a>

            <a
              aria-label="Chat on WhatsApp"
              class="contact-link contact-link--whatsapp"
              href="https://wa.me/32473711123">
              <custom-icon icon="whatsapp"></custom-icon>
              <span class="contact-copy">
                <span class="contact-kicker">WhatsApp</span>
                <span class="contact-value">Stel uw vraag direct</span>
              </span>
            </a>
          </div>
        </div>

        <main
          slot="content"
          class="page-content">
          ${this.#renderSelected(this.selected)}
          ${this.loaded ? html`<custom-footer></custom-footer>` : ''}
        </main>
      </dimac-drawer>

      <a
        aria-label="Chat on WhatsApp"
        href="https://wa.me/32473711123">
        <custom-icon-button
          class="wa-mobile-button"
          icon="whatsapp"></custom-icon-button>
      </a>
    `
  }
}
customElements.define('dimac-shell', DimacShell)
