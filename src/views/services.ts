import { html, LiteElement, property } from '@vandeurenglenn/lite'

import './../elements/carousel-card.js'
export default customElements.define(
  'services-view',
  class extends LiteElement {
    private loadedResolve: (value: boolean) => void
    loaded = new Promise<boolean>((resolve) => {
      this.loadedResolve = resolve
    })
    async firstRender(): Promise<void> {
      this.loadedResolve(true)
    }
    get carousel1Images() {
      return ['./assets/postbaan schaffen/IMG_0474_1200x900.webp']
    }

    get bathroomImages() {
      return [
        './assets/postbaan schaffen/badkamer_lot2_1200x900.webp',
        './assets/postbaan schaffen/badkamer_lot3_1200x900.webp',
        './assets/oudebaan schulen/IMG-20201207-WA0018_1200x900.webp',
        './assets/oudebaan schulen/IMG-20201207-WA0019_1200x900.webp'
      ]
    }

    get kitchenImages() {
      return [
        './assets/postbaan schaffen/keuken_lot3_1200x900.webp',
        './assets/postbaan schaffen/keuken_lot4_1200x900.webp',
        './assets/sintjansstraat diest/IMG_1345_1200x900.webp',
        './assets/postbaan schaffen/keuken_lot1_1200x900.webp',
        './assets/bosbessenstraat paal/3d5f1cc3-6869-494d-ae28-e3436c192e07_1200x1600.webp',
        './assets/oudebaan schulen/IMG_20201205_144603_1200x550.webp',
        './assets/oudebaan schulen/IMG_20201205_144617_1200x550.webp',
        './assets/oudebaan schulen/IMG-20201207-WA0016_1200x900.webp',
        './assets/oudebaan schulen/IMG-20201207-WA0017_1200x900.webp'
      ]
    }

    get renovationImages() {
      return [
        './assets/oudebaan schulen/IMG_7616_1200x900.webp',
        './assets/oudebaan schulen/IMG_7618_1200x900.webp',
        './assets/turnhoutsebaan okselaar/IMG_8025_1200x900.webp',
        './assets/turnhoutsebaan okselaar/IMG_8026_1200x900.webp'
      ]
    }

    get finishingImages() {
      return [
        './assets/postbaan schaffen/IMG_0474_1200x900.webp',
        './assets/IMG_0681_1200x900.webp',
        './assets/oudebaan schulen/IMG_8033_1200x900.webp',
        './assets/sintjansstraat diest/IMG_1343_1200x900.webp',
        './assets/koning albertstraat diest/IMG_2283_1200x900.webp',
        './assets/koning albertstraat diest/IMG_2285_1200x900.webp',
        './assets/oudebaan schulen/IMG-20201207-WA0002_1200x900.webp',
        './assets/oudebaan schulen/IMG-20201207-WA0003_1200x900.webp',
        './assets/oudebaan schulen/IMG-20201207-WA0009_1200x900.webp',
        './assets/oudebaan schulen/IMG-20201207-WA0010_1200x900.webp',
        './assets/oudebaan schulen/IMG-20201207-WA0007_1200x1600.webp'
      ]
    }

    get electricityImages() {
      return [
        './assets/oudebaan schulen/IMG-20201207-WA0013_1200x900.webp',
        './assets/IMG_20211104_154440_1200x547.webp',
        './assets/IMG_20200910_105958_1200x547.webp',
        './assets/IMG_20200910_172445_1200x547.webp',
        './assets/IMG_1030_1200x900.webp'
      ]
    }

    get sanitairImages() {
      return ['./assets/oudebaan schulen/IMG-20201207-WA0011_1200x900.webp']
    }
    get renewingEnergyImages() {
      return ['./assets/IMG_6168_1200x900.webp']
    }
    get insulationImages() {
      return ['./assets/IMG_0658_1200x900.webp', './assets/IMG_5257_1200x900.webp']
    }
    render() {
      return html`
        <style>
          :host {
            display: flex;
            flex-direction: column;
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
            margin: 16px 0;
            text-align: center;
            width: 100%;
          }
          h5 {
            font-size: 20px;
            font-weight: 600;
            width: 100%;
            text-align: center;
          }
          h6 {
            font-size: 16px;
            font-weight: 500;
            width: 100%;
            text-align: center;
          }
          main {
            max-width: 1000px;
            align-items: center;
          }

          img {
            position: absolute;
            top: 54px;
            left: 0;
            bottom: 0;
            width: 100%;
            height: calc(100% - 54px);
            opacity: 0.2;
            z-index: -1;
            pointer-events: none;
          }

          .card-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            width: 100%;
            gap: 16px;
          }
          custom-carousel-card {
            max-width: calc(33% - 8px);
            box-sizing: border-box;
            margin-bottom: 16px;
          }

          @media (max-width: 1200px) {
            main {
              box-sizing: border-box;
              padding: 0 16px;
            }
            custom-carousel {
              max-width: 100%;
            }
          }

          @media (max-width: 1300px) {
            custom-carousel-card {
              max-width: calc(50% - 8px);
            }
          }

          @media (max-width: 680px) {
            custom-carousel-card {
              max-width: 100%;
            }
          }
        </style>
        <main>
          <img
            src="./assets/sketch.svg"
            alt="Sketch" />

          <span class="card-container">
            <custom-carousel-card
              title="Badkamers"
              description="Wij ontwerpen en installeren uw droom badkamer, van modern tot klassiek."
              .images=${this.bathroomImages}></custom-carousel-card>

            <custom-carousel-card
              title="Keukens"
              description="Wij ontwerpen en installeren uw droom keuken, van modern tot klassiek."
              .images=${this.kitchenImages}></custom-carousel-card>

            <custom-carousel-card
              title="Elektriciteit"
              description="Wij verzorgen de elektriciteit in uw woning, van installatie tot herstelling."
              .images=${this.electricityImages}></custom-carousel-card>

            <custom-carousel-card
              title="Sanitair"
              description="Wij installeren en renoveren uw sanitair, van leidingen tot toestellen."
              .images=${this.sanitairImages}></custom-carousel-card>

            <custom-carousel-card
              title="Hernieuwbare energie"
              description="Wij installeren zonnepanelen, warmtepompen en andere hernieuwbare energie systemen."
              .images=${this.renewingEnergyImages}></custom-carousel-card>

            <custom-carousel-card
              title="Dakwerken"
              description="Wij verzorgen al uw dakwerken, van hellende daken tot platte daken."
              .images=${this.carousel1Images}></custom-carousel-card>

            <custom-carousel-card
              title="Afwerking"
              description="Wij zorgen voor de afwerking van uw woning, van gyproc tot schilderwerken en vloeren."
              .images=${this.finishingImages}></custom-carousel-card>

            <custom-carousel-card
              title="Bouwadvies"
              description="Wij geven u advies over uw bouwproject, van vergunning tot uitvoering."
              .images=${this.carousel1Images}></custom-carousel-card>

            <custom-carousel-card
              title="Verhuur"
              description="Wij verhuren bouwmachines en -materialen, van kranen tot steigers."
              .images=${this.carousel1Images}></custom-carousel-card>
          </span>
        </main>
      `
    }
  }
)
