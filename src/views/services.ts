import { html, LiteElement } from '@vandeurenglenn/lite'

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
            width: 100%;
            padding-bottom: 48px;
          }

          main {
            width: 100%;
            max-width: var(--page-max-width);
            display: grid;
            gap: 28px;
          }

          .intro,
          .process {
            background: var(--md-sys-color-surface);
            border: var(--surface-border);
            border-radius: var(--panel-radius);
            box-shadow: var(--card-shadow);
          }

          .intro {
            padding: clamp(32px, 4vw, 52px);
            display: grid;
            gap: 16px;
          }

          .eyebrow {
            display: inline-flex;
            width: fit-content;
            padding: 8px 14px;
            border-radius: 999px;
            background: rgba(168, 84, 39, 0.1);
            color: var(--md-sys-color-primary);
            text-transform: uppercase;
            letter-spacing: 0.12em;
            font-size: 12px;
            font-weight: 800;
          }

          h4 {
            font-family: var(--font-display);
            font-size: var(--hero-title-size);
            line-height: var(--hero-title-line-height);
            margin: 0;
            color: var(--md-sys-color-on-surface);
          }

          p {
            margin: 0;
            max-width: 60ch;
            line-height: 1.8;
            color: var(--md-sys-color-on-surface-variant);
          }

          .process {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 22px;
            padding: 28px 32px;
          }

          .process article {
            display: grid;
            gap: 8px;
          }

          .process strong {
            color: var(--md-sys-color-primary);
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-size: 12px;
          }

          .card-container {
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 28px;
            width: 100%;
          }

          custom-carousel-card {
            box-sizing: border-box;
            max-width: none;
            width: 100%;
          }

          @media (max-width: 1500px) {
            .card-container {
              grid-template-columns: repeat(3, minmax(0, 1fr));
            }
          }

          @media (max-width: 1200px) {
            .card-container {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
          }

          @media (max-width: 800px) {
            .process,
            .card-container {
              grid-template-columns: 1fr;
            }
          }
        </style>
        <main>
          <section class="intro">
            <span class="eyebrow">Onze diensten</span>
            <h4>Technische oplossingen met structuur in voorbereiding, uitvoering en afwerking.</h4>
            <p>
              Dimac focust op technische installaties, automatisatie en dakwerken, aangevuld met sanitair en afwerking
              waar nodig. Zo blijft het proces overzichtelijk en het resultaat technisch correct uitgevoerd.
            </p>
          </section>

          <section class="process">
            <article>
              <strong>Analyse</strong>
              <span
                >We vertalen uw technische vraag naar een haalbare aanpak met aandacht voor gebruik en
                betrouwbaarheid.</span
              >
            </article>
            <article>
              <strong>Uitvoering</strong>
              <span
                >Eigen vakkennis en betrouwbare partners houden de uitvoering consequent en correct van begin tot
                einde.</span
              >
            </article>
            <article>
              <strong>Afwerking</strong>
              <span
                >Ook de afregeling en afwerking krijgen evenveel aandacht als de technische kern van het project.</span
              >
            </article>
          </section>

          <span class="card-container">
            <custom-carousel-card
              title="Badkamers"
              kicker="Interieur"
              description="Badkamers met logische indeling, degelijk sanitair en een afwerking die rust uitstraalt."
              .images=${this.bathroomImages}></custom-carousel-card>

            <custom-carousel-card
              title="Keukens"
              kicker="Interieur"
              description="Keukens waarin materiaalkeuze, gebruiksgemak en technische integratie samenkomen."
              .images=${this.kitchenImages}></custom-carousel-card>

            <custom-carousel-card
              title="Elektriciteit"
              kicker="Technieken"
              description="Van nieuwe installaties tot vernieuwing en uitbreiding, helder en veilig uitgevoerd."
              .images=${this.electricityImages}></custom-carousel-card>

            <custom-carousel-card
              title="Automatisatie"
              kicker="Smart Control"
              description="Slimme sturingen en automatisatie die comfort, overzicht en gebruiksgemak tastbaar verbeteren."
              .images=${this.electricityImages}></custom-carousel-card>

            <custom-carousel-card
              title="Sanitair"
              kicker="Technieken"
              description="Sanitaire installaties en renovaties met aandacht voor comfort, detail en betrouwbare werking."
              .images=${this.sanitairImages}></custom-carousel-card>

            <custom-carousel-card
              title="Hernieuwbare energie"
              kicker="Duurzaamheid"
              description="Energieoplossingen die rendement combineren met een nette technische integratie in het geheel."
              .images=${this.renewingEnergyImages}></custom-carousel-card>

            <custom-carousel-card
              title="Dakwerken"
              kicker="Buitenschil"
              description="Dakwerken die structuur, waterdichtheid en afwerking correct samenbrengen in één verzorgd geheel."
              .images=${this.carousel1Images}></custom-carousel-card>

            <custom-carousel-card
              title="Afwerking"
              kicker="Afwerking"
              description="Gyproc, schilderwerken, vloeren en interieurelementen die het project visueel samenbrengen."
              .images=${this.finishingImages}></custom-carousel-card>

            <custom-carousel-card
              title="Verhuur"
              kicker="Ondersteuning"
              description="Materieel en ondersteuning voor werven die tijdelijk extra capaciteit nodig hebben."
              .images=${this.carousel1Images}></custom-carousel-card>
          </span>
        </main>
      `
    }
  }
)
