import { html, LitElement } from "lit"
// import Typed from 'typed.js/src/typed'
export default customElements.define('home-view', class extends LitElement {
  constructor() {
    super()
    this.attachShadow({mode: 'open'})
  }
  
  connectedCallback() {
    super.connectedCallback()
    this.#init()
  }

  async #init() {
    await this.updateComplete
    this.shadowRoot.querySelector('main').addEventListener('scroll', event => {
      event.preventDefault()
      document.dispatchEvent(new CustomEvent('custom-scroll', { detail: this.shadowRoot.querySelector('main') }))
    })
    // this.startTyping()
  }

  // startTyping() {
  //   var typed3 = new Typed(this.shadowRoot.querySelector('.typer'), {
  //     strings: ['WE ARE CONSTRUCTION', 'WE ARE <strong>under</strong> CONSTRUCTION'],
  //     typeSpeed: 30,
  //     backSpeed: 25,
  //     cursorChar: '_',
  //     smartBackspace: true, // this is a default
  //     loop: true
  //   });

    
  
  // }

  render() {
    return html`
    <style>
      :host {
        color: var(--primary-text-color);
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow-y: auto;
      }

      a {
        text-decoration: none;
        color: #fff;
      }

      section {
        display: flex;
        min-height: 720px;
        max-height: 720px;
        height: 100%;
        align-items: center;
        justify-content: center;
      }

      footer {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: var(--accent-color);
        height: 440px;
        box-sizing: border-box;
        padding: 48px 24px;
        color: #fff;
        font-size: 20px;
        font-weight: 700;
      }
      main {
        
        overflow-y: auto;
      }

      .typer {
        font-size: 22px;
        font-weight: 700;
        text-transform: uppercase;
      }

      .container {
        max-width: 1200px;
        width: 100%;
      }

      flex-row {
        align-items: center;
      }

      small {
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        padding: 8px 12px;
      }

      small img {
        width: 24px;
    height: 24px;
    padding: 0 8px;
      }
    </style>
    <main>
      <section>
      </section>
        
      
      <footer>
        <flex-row class="container">
          <flex-column>
            
            <span>Dimac BV</span>
            <span>Beringenbaan 43, 3290 Diest</span>
            
            <p> BE 0479.917.693</p>
            <a href="mailto:info@dimac.be" target="_top">info@dimac.be</a>
          </flex-column>
          <flex-one></flex-one>
          <flex-column>
            
          </flex-column>
        </flex-row>
        
      </footer>
      <small>Made with <img alt="love" src="https://leofcoin.org/sources/icons/heart.svg"></img> by team <strong style="padding-left: 4px;" >Dimac</strong></small>
    </main>
    `
  }
})