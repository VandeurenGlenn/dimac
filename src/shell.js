import { LitElement, html } from "lit"
import '@vandeurenglenn/flex-elements/src/flex-elements'
import 'custom-svg-iconset'
import 'custom-svg-icon'
import 'custom-pages'

import 'custom-selector/src/index'

export default customElements.define('dimac-shell', class DimacShell extends LitElement {

  #hashBang = '#!/';

  constructor() {
    super()
    this.attachShadow({mode: 'open'})
    this.init()
    document.addEventListener('custom-scroll', this.#onscroll.bind(this))
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
    if (!location.hash || !this.#validView(hash)) return location.hash = this.#addHashBang('home')
    if (!customElements.get(`${hash}-view`)) await import(`./${hash}.js`)
    if (this.shadowRoot.querySelector(`${hash}-view`).shadowRoot.querySelector('img.logo')) {
      this.shadowRoot.querySelector(`${hash}-view`).shadowRoot.querySelector('img.logo').src = this.shadowRoot.querySelector('img.logo').src
    }
    this.shadowRoot.querySelector('custom-pages').select(hash)
    console.log(hash);
  }

  set drawerShown(value) {
    this._drawerShown = value
    if (value) {
      this.setAttribute('drawer-shown', '')
    } else this.removeAttribute('drawer-shown')
  }

  get drawerShown() {
    return this._drawerShown
  }

  #onqueryChange({matches}) {
    if (matches) {
      // this.setAttribute('desktop', '')
      // this.drawerShown = false
    }
    else {
      // this.removeAttribute('desktop')
      // this.drawerShown = false
    }
    
  }

  #onscroll({detail}) {
    if (this.lastTop > detail.scrollTop) {
      this.setAttribute('up', '')
    } else if (this.lastTop < detail.scrollTop && detail.scrollTop !== 86) {
      this.removeAttribute('up')
      // this.shadowRoot.querySelector('custom-pages').style.top = `-${detail.scrollTop}px`;
    }
    if (detail.scrollTop > 0) {
      this.setAttribute('scrolling', 'true')
    } else if (detail.scrollTop === 0) {
      this.removeAttribute('scrolling')
    }
    this.lastTop = detail.scrollTop
    console.log(detail.scrollTop);
  }

  async init() {    
    const mediaQuery = globalThis.matchMedia('(min-width: 1200px)');

    mediaQuery.onchange = this.#onqueryChange.bind(this)
    this.#onqueryChange(mediaQuery);
    
    await this.setTheme();
    await this.updateComplete;
    // await import('./drawer.js');
    await this.setTheme()
    this.setAttribute('shown', '')
    onhashchange = this.#onhashchange.bind(this)
    
    this.#onhashchange()
  }

  set logo(value) {
    const imgs = Array.from(this.shadowRoot.querySelectorAll('img.logo'))
    for (const img of imgs) {
      img.src =  value === 'dark' ? './assets/dimac-dark.svg' : './assets/dimac.svg'
    }
    
  }

  async setTheme(theme = 'default') {
    if (theme === 'dark') this.logo = 'dark'
    else this.logo = 'default'

    const values = (await import(`./themes/${theme}.js`)).default;
    for (const key of Object.keys(values)) {
      this.style.setProperty(`--${key}`, values[key]);
    }
  }

  render() {
    return html`
    <style>
    
    :host {
      display: flex;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      overflow: hidden;
      background: var(--primary-background-color);
      flex-direction: column;
    }

    img {
      max-height: 480px;
      height: 100%;
    }

    header {
      display: flex;
      height: 82px;
      background: var(--primary-background-color);
      box-sizing: border-box;
      padding: 12px 6px;
      align-items: center;
      justify-content: center;
      width: 100%;
      left: 0;
      right: 0;
      opacity: 0;
      pointer-events: none;
      transition: opacity ease-out 360ms, transform ease-in 160ms;
      transform: translateY(-110%);
    }

    :host([shown]) header {      
      opacity: 1;
      pointer-events: auto;
      transition: opacity ease-in 360ms, transform ease-in 160ms;
      transform: translateY(0);
    }

    :host([scrolling]) header {
      transform: translateY(-110%);
    }

    :host([scrolling][up]) header {
      transform: translateY(0);
      border-bottom: 1px solid var(--accent-color);
    }

    custom-pages {
      position: absolute;
      top: 86px;
      left: 0;
      bottom: 0;
      right: 0;
    }

    header custom-svg-icon[icon="menu"] {
      --svg-icon-color: var(--accent-color);
      --svg-icon-size: 36px;
      pointer-event: auto;
      cursor: pointer;
    }

    header img.logo {
      max-height: 40px;
      height: 0;
    }
    custom-selector {
      display: flex;
      flex-direction: row;
    }

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      font-size: 16px;
      font-weight: 500;
      color: #555;
    }

    custom-selector a {      
      padding: 12px;
    }

    custom-selector .custom-selected {
      background: #000;
      color: var(--accent-color);
    }

    .container {
      max-width: 1200px;
      width: 100%;
    }

    a img {
      width: 72px;
    }

    @media(min-width: 460px) {

      header img.logo {
        height: 100%; 
      }
    }
    </style>

    
    <header>
      <flex-row class="container">
        <custom-selector>
          <a href="#!/home">HOME</a>
          <a href="#!/info">INFO</a>
          <a href="#!/team">TEAM</a>
          <a href="#!/projecten">PROJECTEN</a>
        </custom-selector>
        <flex-one></flex-one>
        <a title="home" class="logo" href="/"><img class="logo" alt="logo"></img></a>
      </flex-row>
    </header>

    <custom-pages attr-for-selected="data-route" default-selected="1">
      <home-view data-route="home"></home-view>
    </custom-pages>
    `
  }
})
