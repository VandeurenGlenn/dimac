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

export class DimacShell extends LiteElement {
  static #views = new Set(['', 'home', 'about', 'services', 'realizations', 'contact', 'admin', 'keepit-preview'])

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

    if (hash === 'about') {
      document.title = 'Dimac - Over ons'
    }
    if (hash === 'services') {
      document.title = 'Dimac - Onze diensten'
    }
    if (hash === 'realizations' || hash === 'admin') {
      const response = await fetch('./realizations-manifest.json')
      if (response.ok) {
        this.realizationsManifest = await response.json()
      }
      document.title = hash === 'admin' ? 'Dimac - Admin' : 'Dimac - Realisaties'
    }
    if (hash === 'keepit-preview') {
      document.title = 'Dimac - Preview'
    }
    if (hash === 'contact') {
      document.title = 'Dimac - Contact'
    }
    if (hash === 'home' || hash === '') {
      document.title = 'Dimac - Home'
    }

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
              ${this.#renderNavLink('home', 'Home', 'home')} ${this.#renderNavLink('about', 'Over Dimac', 'info')}
              ${this.#renderNavLink('services', 'Onze diensten', 'home_repair_service')}
              ${this.#renderNavLink('realizations', 'Realisaties', 'cheer')}
              ${this.#renderNavLink('contact', 'Contact', 'phone_in_talk')}
            </custom-selector>
          </nav>

          <div class="contact-panel">
            <div class="contact-panel-header">
              <span class="panel-label">Snel contact</span>
              <p class="panel-note">Bel of mail rechtstreeks voor een snelle afstemming van uw project.</p>
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
          ${this.#renderSelected(this.selected)} ${this.loaded ? html`<custom-footer></custom-footer>` : ''}
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
