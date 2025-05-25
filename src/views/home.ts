import { html, LitElement } from 'lit'
import Typed from 'typed.js/src/typed'
export default customElements.define(
  'home-view',
  class extends LitElement {
    static properties = {
      carouselIndex: { type: Number }
    }

    constructor() {
      super()
      this.carouselIndex = 0
      this.carouselImages = [
        'https://images.unsplash.com/photo-1503389152951-9c3d8b6e9c94?auto=format&fit=crop&w=1200&q=80', // Construction site
        'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1200&q=80', // Workers on scaffolding
        'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=80', // Building framework
        'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80', // Crane and construction
        'https://images.unsplash.com/photo-1523413363574-c30aa1c2a516?auto=format&fit=crop&w=1200&q=80', // Concrete pouring
        'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=1200&q=80', // Construction machinery
        'https://images.unsplash.com/photo-1468421870903-4df1664ac249?auto=format&fit=crop&w=1200&q=80', // Workers on site
        'https://images.unsplash.com/photo-1465101178521-c1a9136a3c5c?auto=format&fit=crop&w=1200&q=80' // Building at sunset
      ]
      this.carouselInterval = null
    }

    connectedCallback() {
      super.connectedCallback()
      this.#init()
    }

    async #init() {
      await this.updateComplete
      this.shadowRoot.querySelector('main').addEventListener('scroll', (event) => {
        event.preventDefault()
        document.dispatchEvent(
          new CustomEvent('custom-scroll', {
            detail: this.shadowRoot.querySelector('main')
          })
        )
      })
    }

    startTyping() {
      var typed3 = new Typed(this.shadowRoot.querySelector('.typer'), {
        strings: ['Topkwaliteit', 'wij maken jouw droom', 'betaalbaar', 'duurzaam', 'nieuwbouw', 'automatisatie'],
        typeSpeed: 100,
        backSpeed: 25,
        cursorChar: '_',
        smartBackspace: true, // this is a default
        loop: true
      })
    }

    firstUpdated() {
      this.carouselInterval = setInterval(() => {
        this.carouselIndex = (this.carouselIndex + 1) % this.carouselImages.length
      }, 3500)

      this.startTyping()
    }

    disconnectedCallback() {
      super.disconnectedCallback()
      clearInterval(this.carouselInterval)
    }

    _nextImage() {
      this.carouselIndex = (this.carouselIndex + 1) % this.carouselImages.length
    }

    _prevImage() {
      this.carouselIndex = (this.carouselIndex - 1 + this.carouselImages.length) % this.carouselImages.length
    }

    _goToImage(index) {
      this.carouselIndex = index
    }

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
        display: inline-block;
        background: var(--accent-color);
        color: #fff;
        padding: 12px 24px;
        border-radius: 4px;
        font-weight: 700;
        text-decoration: none;
        margin-top: 24px;
      }
      h4 {
        font-size: 32px;
        font-weight: 700;
        text-align: center;
        margin: 0;
        padding: 0 24px;
      }


      footer a {
        text-decoration: none;
        color: #fff;
      }

      section {
        flex-direction: column;
        display: flex;
        min-height: 720px;
        max-height: 720px;
        height: 100%;
        align-items: center;
      }

      footer {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: var(--accent-color);
        min-height: 180px;
        box-sizing: border-box;
        padding: 32px 24px 16px 24px;
        color: #fff;
        font-size: 16px;
        font-weight: 500;
        border-radius: 12px 12px 0 0;
        margin-top: 48px;
      }
      .footer-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
      }
      .footer-contact {
        margin-top: 8px;
        font-size: 15px;
        opacity: 0.85;
      }
      .footer-email {
        margin-top: 8px;
        font-size: 15px;
        color: #fff;
        text-decoration: underline;
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

      .carousel-container {
        width: 100%;
        max-width: 900px;
        margin: 0 auto 32px auto;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 4px 24px rgba(0,0,0,0.08);
        position: relative;
        background: #eee;
        display: flex;
      }
      .carousel-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: opacity 0.7s;
        opacity: 1;
        display: block;
      }
    </style>
    <main>
      <div class="carousel-container">
        <img
          class="carousel-image"
          src="${this.carouselImages[this.carouselIndex]}"
          alt="Project foto ${this.carouselIndex + 1}"
        />
        <div class="carousel-dots">
          ${this.carouselImages.map(
            (_, idx) => html`
              <button
                class="carousel-dot ${this.carouselIndex === idx ? 'active' : ''}"
                @click="${() => this._goToImage(idx)}"
                aria-label="Ga naar afbeelding ${idx + 1}"></button>
            `
          )}
        </div>
      </div>
      <section>
      <h4>Bouwen met vertrouwen </h4>
      <p style="margin: 32px 0;">Van ruwbouw tot renovatie, wij realiseren jouw project.</p>

      <div>
      <span class="typer">
      </span>
      </div>
      
      <a>Vraag vandaag nog een gratis offerte aan</a>
      </section>
        
      
      <footer>
        <div class="footer-content">
          <span><strong>Dimac BV</strong></span>
          <span class="footer-contact">Beringenbaan 43, 3290 Diest</span>
          <span class="footer-contact">BE 0479.917.693</span>
          <a class="footer-email" href="mailto:info@dimac.be" target="_top">info@dimac.be</a>
        </div>
      </footer>
      <small>Made with <img alt="love" src="https://leofcoin.org/sources/icons/heart.svg"></img> by team <strong style="padding-left: 4px;" >Dimac</strong></small>
    </main>
    `
    }
  }
)
