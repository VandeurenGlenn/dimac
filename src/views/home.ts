import { html, LiteElement, property, query } from '@vandeurenglenn/lite'
import Typed from 'typed.js'
import '@vandeurenglenn/lite-elements/button.js'
import './../elements/carousel.js'
export default customElements.define(
  'home-view',
  class extends LiteElement {
    @query('custom-carousel') accessor carousel

    carouselImages = [
      './assets/postbaan/IMG_0142.webp',
      './assets/postbaan/IMG_0460.webp',
      './assets/postbaan/IMG_0468.webp',
      './assets/postbaan/IMG_0474.webp',
      './assets/schulen/IMG_7616.webp',
      './assets/schulen/IMG_7618.webp',
      './assets/schulen/IMG_8033.webp',
      './assets/sintjansstraatdiest/IMG_1345.webp',
      './assets/sintjansstraatdiest/IMG_1343.webp'
    ]

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

    firstRender() {
      this.startTyping()
      this.carousel.images = this.carouselImages
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
            font-size: 32px;
            font-weight: 700;
            text-align: center;
            margin: 16px 0;
          }

          .carousel-container {
            width: 100%;
            max-width: 900px;
            margin: 0 auto 32px auto;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
            position: relative;
            background: #eee;
            display: flex;
          }
          .carousel-image {
            width: 100%;
            height: 100%;
            object-fit: fill;
            aspect-ratio: 16 / 10;
            transition: opacity 0.7s;
            opacity: 1;
            display: block;
          }

          main {
            max-width: 860px;
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
            margin-top: 64px;
          }

          @media (max-width: 1200px) {
            main {
              box-sizing: border-box;
              padding: 0 16px;
            }
          }
        </style>
        <main>
          <custom-carousel></custom-carousel>

          <section>
            <h4>Van huis naar thuis, stap voor stap</h4>

            <div>
              <span class="typer"> </span>
            </div>

            <custom-button
              label="Vraag vandaag nog een gratis offerte aan"
              type="tonal"></custom-button>
          </section>
        </main>
      `
    }
  }
)
