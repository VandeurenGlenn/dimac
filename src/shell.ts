import '@vandeurenglenn/lite-elements/drawer-layout.js'
import '@vandeurenglenn/lite-elements/icon.js'
import '@vandeurenglenn/lite-elements/icon-set.js'
import '@vandeurenglenn/lite-elements/selector.js'
import { LiteElement, html, property, query } from '@vandeurenglenn/lite'
import style from './shell.css' with {type: 'css'}
import icons from './icons.js'

export class DimacShell extends LiteElement {
  @query('custom-selector') accessor selector

  @query('main') accessor main

  @property({ type: String }) accessor selected

  @property({ type: Boolean }) accessor loaded

  @property({ type: Object, provides: 'realizationsManifest' }) accessor realizationsManifest

  #hashBang = '#!/'

  static styles = [style]

  firstRender(): void {
    const mediaQuery = globalThis.matchMedia('(min-width: 1200px)')

    mediaQuery.onchange = this.#onqueryChange.bind(this)
    this.#onqueryChange(mediaQuery)
    this.setAttribute('shown', '')
    onhashchange = this.#onhashchange.bind(this)

    this.#onhashchange()
  }

  #validView(hash) {
    return hash
  }

  #removeHashBang(hash = location.hash) {
    return hash.slice(this.#hashBang.length, hash.length)
  }

  #addHashBang(hash = location.hash) {
    return this.#hashBang + hash
  }

  async #onhashchange() {
    let hash = location.hash
    hash = this.#removeHashBang()
    if (!location.hash || !this.#validView(hash)) return (location.hash = this.#addHashBang('home'))
    if (!customElements.get(`${hash}-view`)) await import(`./${hash}.js`)
    this.selected = hash

    this.main?.scrollTo(0, 0)

    
    if (hash === 'about') {
      document.title = 'Dimac - Over ons'
    }
    if (hash === 'services') {
      document.title = 'Dimac - Onze diensten'
    }
    if (hash === 'realizations') {
      const response = await fetch('./realizations-manifest.json')
      if (response.ok) {
        this.realizationsManifest = await response.json()
      }
      document.title = 'Dimac - Realisaties'
    }
    if (hash === 'contact') {
      document.title = 'Dimac - Contact'
    }
    if (hash === 'home' || hash === '') {
      document.title = 'Dimac - Home'
    }

    await this.shadowRoot.querySelector(`${hash}-view`).loaded

    this.loaded = true
  }

  #onqueryChange({ matches }) {
    if (matches) {
      // this.setAttribute('desktop', '')
      // this.drawerShown = false
    } else {
      // this.removeAttribute('desktop')
      // this.drawerShown = false
    }
  }

  #renderSelected(selected) {
    if (selected === 'services') {
      return html`
      <services-view></services-view>
      `
    }

    if (selected === 'about') {
      return html`
      <about-view></about-view>
      `
    }
    if (selected === 'realizations') {
      return html`
      <realizations-view></realizations-view>
      `
    }
    if (selected === 'contact') {
      return html`
      <contact-view></contact-view>
      `
    }   
    return html`
    <home-view></home-view>
    `
  }

  #renderFooter() {
    return html`
    <footer>
    <div class="footer-content">
      <span><strong>Dimac BV</strong></span>
      <span class="footer-contact">Beringenbaan 43</span>
      <span class="footer-contact">3290 Diest</span>
      <span class="footer-contact">BE 0479.917.693</span>
      <a
        class="footer-email"
        href="mailto:info@dimac.be"
        target="_top"
        >info@dimac.be</a
      >

      <a
        class="footer-instagram"
        href="https://instagram.com/dimac_bv"
        target="_blank"
        rel="noopener"
        title="Instagram"
        style=" margin-top: 14px;"
      >

        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" style="height: 20px; width: 20px; vertical-align: middle; margin-right: 14px;" />
        Instagram
      </a>
    </div>

    <small
    >Made with
    <img
      alt="love"
      src="https://leofcoin.org/sources/icons/heart.svg" />
    by team <strong style="padding-left: 4px;">Dimac</strong></small
  >
    
  </footer>
    `
  }

  render() {
    return html`
    ${icons}
      <custom-drawer-layout>
      <span  slot="drawer-content">

        <img src="./assets/dimac.svg" alt="Dimac Logo" class="logo">
        <custom-selector .selected=${this.selected} attr-for-selected="data-route">
          <a href="#!/home" data-route="home">Home<custom-icon icon="home"></custom-icon></a>
          <a href="#!/about" data-route="about">Over Dimac <custom-icon icon="info"></custom-icon></a>
          <a href="#!/services" data-route="services">Onze diensten <custom-icon icon="home_repair_service"></custom-icon></a>
          <a href="#!/realizations" data-route="realizations">Realisaties <custom-icon icon="cheer"></custom-icon></a>
          <a href="#!/contact" data-route="contact">Contact<custom-icon icon="phone_in_talk"></custom-icon></a>
        </custom-selector>
      </span>

        
      <main slot="content">
         ${this.#renderSelected(this.selected)}
        ${this.loaded?this.#renderFooter(): ''}
        
      </main>
      </custom-drawer-layout>
    `
  }
}
customElements.define('dimac-shell', DimacShell)
