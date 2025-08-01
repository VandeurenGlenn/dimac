import { html, LiteElement, property, query } from '@vandeurenglenn/lite'
import Typed from 'typed.js'
import '@vandeurenglenn/lite-elements/button.js'
import './../elements/carousel.js'
import { CustomCarousel } from './../elements/carousel.js'
export default customElements.define(
  'home-view',
  class extends LiteElement {
    @query('custom-carousel') accessor carousel: CustomCarousel

    private loadedResolve: (value: boolean) => void
    loaded = new Promise<boolean>((resolve) => {
      this.loadedResolve = resolve
    })

    carouselImages = [
      './assets/postbaan schaffen/badkamer_lot3_1200x900.webp',
      './assets/postbaan schaffen/keuken_lot3_1200x900.webp',
      './assets/oudebaan schulen/IMG-20201207-WA0018_1200x900.webp',
      './assets/oudebaan schulen/IMG-20201207-WA0019_1200x900.webp',
      './assets/oudebaan schulen/IMG-20201207-WA0015_1200x900.webp',
      './assets/sintjansstraat diest/IMG_1345_1200x900.webp',
      './assets/postbaan schaffen/IMG_0474_1200x900.webp',
      './assets/oudebaan schulen/IMG_7618_1200x900.webp',
      './assets/oudebaan schulen/IMG_8033_1200x900.webp',
      './assets/sintjansstraat diest/IMG_1343_1200x900.webp'
    ]

    startTyping() {
      var typed3 = new Typed(this.shadowRoot.querySelector('.typer'), {
        strings: ['Meerwaarde creëren aan jouw woning?'],
        typeSpeed: 100,
        backSpeed: 25,
        cursorChar: '_',
        smartBackspace: true, // this is a default
        loop: false
      })
    }

    async firstRender() {
      await this.carousel.loaded
      this.loadedResolve(true)
      this.startTyping()
    }

    render() {
      return html`
        <style>
          :host {
            color: var(--primary-text-color);
            display: flex;
            flex-direction: column;
            height: 100%;
            width: 100%;
            align-items: center;
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
            font-size: 24px;
            font-weight: 700;
            text-align: center;
            margin: 16px 0;
          }
          main {
            max-width: 740px;
          }

          section {
            flex-direction: column;
            display: flex;
            align-items: center;
          }

          p {
            text-align: center;
            font-size: 18px;
            margin-bottom: 32px;
          }

          custom-button {
            margin-top: 36px;
          }

          @media (max-width: 1200px) {
            main {
              box-sizing: border-box;
              padding: 0 16px;
            }
          }
        </style>
        <main>
          <custom-carousel .images=${this.carouselImages}></custom-carousel>

          <section>
            <h4>Van huis naar thuis, stap voor stap</h4>

            <div>
              <span class="typer"> </span>
            </div>

            <custom-button
              @click=${() => {
                location.hash = '#!/contact'
              }}
              label="Vraag vandaag nog een gratis offerte aan"
              type="tonal"></custom-button>
          </section>
        </main>
      `
    }
  }
)
