import { html, LiteElement, property, query } from '@vandeurenglenn/lite'
import './../elements/carousel.js'
import { CustomCarousel } from './../elements/carousel.js'
import './../elements/section.js'
import './../elements/card.js'
import './../elements/panel.js'
export default customElements.define(
  'home-view',
  class extends LiteElement {
    @query('custom-carousel') accessor carousel: CustomCarousel
    @property({ type: Number }) accessor activeSlide = 0

    private loadedResolve: (value: boolean) => void
    loaded = new Promise<boolean>((resolve) => {
      this.loadedResolve = resolve
    })

    carouselImages = [
      './assets/__realizations/postbaan schaffen/badkamer_lot3_1200x900.webp',
      './assets/__realizations/postbaan schaffen/keuken_lot3_1200x900.webp',
      './assets/__realizations/oudebaan schulen/IMG-20201207-WA0018_1200x900.webp',
      './assets/__realizations/oudebaan schulen/IMG-20201207-WA0019_1200x900.webp',
      './assets/__realizations/oudebaan schulen/IMG-20201207-WA0015_1200x900.webp',
      './assets/__realizations/sintjansstraat diest/IMG_1345_1200x900.webp',
      './assets/__realizations/postbaan schaffen/IMG_0474_1200x900.webp',
      './assets/__realizations/oudebaan schulen/IMG_7618_1200x900.webp',
      './assets/__realizations/oudebaan schulen/IMG_8033_1200x900.webp',
      './assets/__realizations/sintjansstraat diest/IMG_1343_1200x900.webp'
    ]

    projectHighlights = [
      {
        kicker: 'Badkamerproject',
        title: 'Badkamers waar materiaalrust en technische precisie samenvallen',
        description:
          'Waterdichte detaillering, donkere accenten en een indeling die dagelijks gebruik helder houdt.',
        stats: [
          { label: 'Locatie', value: 'Schaffen' },
          { label: 'Focus', value: 'Sanitair + afwerking' },
          { label: 'Karakter', value: 'Rustig en technisch correct' }
        ],
        notes: [
          'Duidelijke lijnen en onderhoudsvriendelijke materialen.',
          'Verlichting en sanitair afgestemd op comfort en duurzaamheid.'
        ]
      },
      {
        kicker: 'Keukenproject',
        title: 'Keukens waar gebruiksgemak en techniek vanzelf samenvallen',
        description:
          'Gebruiksgemak, maatvoering en afwerking komen samen in een ruimte die ordelijk en logisch werkt.',
        stats: [
          { label: 'Locatie', value: 'Schaffen' },
          { label: 'Focus', value: 'Keuken + technieken' },
          { label: 'Karakter', value: 'Heldere compositie' }
        ],
        notes: [
          'Installaties verdwijnen in een verzorgde totaalindruk.',
          'Materiaalkeuze ondersteunt dagelijks gebruik zonder visuele ruis.'
        ]
      },
      {
        kicker: 'Renovatie',
        title: 'Renovaties met voelbare kwaliteit en technische rust',
        description:
          'Materialen en aansluitingen zijn zo gekozen dat de ruimte tegelijk robuust en verfijnd aanvoelt.',
        stats: [
          { label: 'Locatie', value: 'Schulen' },
          { label: 'Focus', value: 'Renovatie' },
          { label: 'Karakter', value: 'Tactiel en ingetogen' }
        ],
        notes: [
          'Vochtige zones zijn technisch strak afgewerkt.',
          'Texturen zorgen voor warmte zonder de ruimte druk te maken.'
        ]
      },
      {
        kicker: 'Maatwerkbadkamer',
        title: 'Maatwerkbadkamers die comfort en helderheid samenbrengen',
        description:
          'Een combinatie van verzorgd maatwerk en logische technische keuzes voor een duurzame dagelijkse ruimte.',
        stats: [
          { label: 'Locatie', value: 'Schulen' },
          { label: 'Focus', value: 'Maatwerk + sanitair' },
          { label: 'Karakter', value: 'Compact en precies' }
        ],
        notes: [
          'Opbergruimte en gebruikscomfort blijven in balans.',
          'De afwerking ondersteunt een rustige, tijdloze uitstraling.'
        ]
      },
      {
        kicker: 'Interieurdetail',
        title: 'Interieurs waar afwerking de techniek moeiteloos laat verdwijnen',
        description:
          'Afwerking, indeling en aansluitingen zijn samengebracht tot een ruimte die gewoon klopt.',
        stats: [
          { label: 'Locatie', value: 'Schulen' },
          { label: 'Focus', value: 'Interieurdetail' },
          { label: 'Karakter', value: 'Evenwichtig' }
        ],
        notes: [
          'Technische integratie blijft op de achtergrond.',
          'De ruimte leest als één coherent geheel.'
        ]
      },
      {
        kicker: 'Keukenrenovatie',
        title: 'Keukenopstellingen die helder werken en rustig blijven ogen',
        description:
          'Een praktische, heldere werkomgeving waarin materiaal, indeling en installatie elkaar versterken.',
        stats: [
          { label: 'Locatie', value: 'Diest' },
          { label: 'Focus', value: 'Keukenrenovatie' },
          { label: 'Karakter', value: 'Functioneel en rustig' }
        ],
        notes: [
          'Werkzones zijn logisch georganiseerd.',
          'Technische keuzes ondersteunen comfort en onderhoudsgemak.'
        ]
      },
      {
        kicker: 'Werfopvolging',
        title: 'Werven waar structuur, opvolging en afwerking zichtbaar kloppen',
        description:
          'Fases op de werf worden opgevolgd met aandacht voor planning, aansluiting en afwerking op langere termijn.',
        stats: [
          { label: 'Locatie', value: 'Schaffen' },
          { label: 'Focus', value: 'Buitenschil' },
          { label: 'Karakter', value: 'Stevig en doelgericht' }
        ],
        notes: [
          'Uitvoering blijft overzichtelijk ondanks technische samenloop.',
          'De werfopbouw ondersteunt een vlotte volgende fase.'
        ]
      },
      {
        kicker: 'Renovatiefase',
        title: 'Renovatiewerk waarin afwerkingskwaliteit al vroeg zichtbaar wordt',
        description:
          'We tonen niet alleen eindbeelden, maar ook de zorg waarmee materiaal en uitvoering onderweg zijn opgebouwd.',
        stats: [
          { label: 'Locatie', value: 'Schulen' },
          { label: 'Focus', value: 'Renovatie + opvolging' },
          { label: 'Karakter', value: 'Concreet en zorgvuldig' }
        ],
        notes: [
          'Afwerkingskwaliteit begint in de voorbereidende keuzes.',
          'Elke fase wordt technisch en visueel bewaakt.'
        ]
      },
      {
        kicker: 'Afwerking',
        title: 'Interieurwerk dat toont wat zorgvuldige afwerking echt betekent',
        description:
          'De materialisatie en detaillering geven de ruimte een afgewerkt karakter zonder overdaad.',
        stats: [
          { label: 'Locatie', value: 'Schulen' },
          { label: 'Focus', value: 'Afwerking' },
          { label: 'Karakter', value: 'Verzorgd en tijdloos' }
        ],
        notes: [
          'Sterke afwerking werkt op proportie en detail.',
          'Rust in het beeld komt voort uit consequente keuzes.'
        ]
      },
      {
        kicker: 'Oplevering',
        title: 'Opleveringen die technisch kloppen en visueel rust bewaren',
        description:
          'Een interieurbeeld dat toont hoe technische uitvoering en visuele rust samen in de eindfase landen.',
        stats: [
          { label: 'Locatie', value: 'Diest' },
          { label: 'Focus', value: 'Oplevering' },
          { label: 'Karakter', value: 'Licht en coherent' }
        ],
        notes: [
          'De eindindruk blijft rustig door consequente materiaalkeuzes.',
          'Ook in de laatste laag blijft de technische logica voelbaar.'
        ]
      }
    ]

    capabilityPills = ['Sanitair', 'Elektriciteit', 'Automatisatie', 'Dakwerken']

    supportHighlights = ['Eén aanspreekpunt', 'Technische samenhang', 'Uitvoering zonder ruis']

    get activeProject() {
      return this.projectHighlights[this.activeSlide] || this.projectHighlights[0]
    }

    #onSlideChange = (event: CustomEvent<{ index: number }>) => {
      this.activeSlide = event.detail.index || 0
    }

    async firstRender() {
      await this.carousel.loaded
      this.loadedResolve(true)
    }

    render() {
      return html`
        <style>
          :host {
            color: var(--md-sys-color-on-background);
            display: flex;
            flex-direction: column;
            width: 100%;
            align-items: center;
            padding-bottom: 48px;
          }

          main {
            max-width: var(--page-max-width);
            width: 100%;
            display: grid;
            grid-template-columns: minmax(500px, 1.08fr) minmax(560px, 0.92fr);
            gap: clamp(28px, 3vw, 48px);
            align-items: stretch;
          }

          .hero-copy,
          .hero-media {
            box-sizing: border-box;
            height: 100%;
            background: var(--md-sys-color-surface);
            border: var(--surface-border);
            border-radius: var(--panel-radius);
            box-shadow: var(--card-shadow);
            backdrop-filter: blur(18px);
          }

          .hero-copy {
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            padding: clamp(32px, 4vw, 56px);
            min-height: 0;
          }

          .hero-copy::before {
            content: '';
            position: absolute;
            inset: auto -72px -72px auto;
            width: 220px;
            height: 220px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(168, 84, 39, 0.18), transparent 68%);
            pointer-events: none;
          }

          .hero-copy > * {
            position: relative;
            z-index: 1;
          }

          .copy-stack {
            gap: 21px;
            flex: 1 1 auto;
            min-height: 0;
          }

          .copy-footer {
            display: grid;
            gap: 18px;
            align-content: start;
            margin-top: 22px;
          }

          h1 {
            margin: 0 0 14px;
            font-family: var(--font-display);
            font-size: clamp(1.72rem, 1.95vw, 2.4rem);
            line-height: 1.08;
            letter-spacing: var(--hero-title-letter-spacing);
            color: var(--md-sys-color-on-surface);
            min-height: calc(1em * 3.35);
          }

          p {
            margin: 0;
            font-size: 1.06rem;
            line-height: 1.8;
            color: var(--md-sys-color-on-surface-variant);
            max-width: 60ch;
          }

          .lead {
            font-size: 1rem;
            line-height: 1.72;
            max-width: 52ch;
            min-height: calc(1em * 4.1);
          }

          .process-panel {
            display: grid;
            grid-template-columns: minmax(0, 1.08fr) minmax(260px, 0.92fr);
            gap: 14px;
            align-items: stretch;
            margin-top: 56px;
          }

          .process-card {
            display: grid;
            gap: 12px;
            padding: 18px 20px;
            border-radius: 22px;
            background: linear-gradient(180deg, rgba(44, 32, 27, 0.76), rgba(30, 22, 18, 0.9));
            border: 1px solid rgba(204, 173, 150, 0.08);
            align-items: start;
          }

          .process-header,
          .discipline-block {
            display: grid;
            gap: 12px;
          }

          .process-card--trust {
            grid-column: 1 / -1;
            align-content: start;
            width: 100%;
            align-self: stretch;
            height: 100%;
          }

          .process-card strong {
            color: var(--md-sys-color-primary);
            font-size: 0.72rem;
            letter-spacing: 0.12em;
            text-transform: uppercase;
          }

          .process-copy {
            color: var(--md-sys-color-on-surface);
            font-size: 0.96rem;
            line-height: 1.55;
          }

          .discipline-list {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            width: 100%;
          }

          .process-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }

          .process-chip,
          .discipline-pill {
            display: inline-flex;
            align-items: center;
            min-height: 32px;
            padding: 0 12px;
            border-radius: 999px;
            border: 1px solid rgba(204, 173, 150, 0.1);
            color: var(--md-sys-color-on-surface);
            font-size: 0.78rem;
            font-weight: 700;
            letter-spacing: 0.03em;
          }

          .process-chip {
            background: rgba(23, 17, 14, 0.24);
          }

          .discipline-pill {
            background: rgba(36, 27, 23, 0.84);
          }

          .cta-group {
            display: flex;
            flex-wrap: wrap;
            gap: 14px;
            margin-top: 44px;
          }

          .cta,
          .secondary-cta {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-height: 54px;
            padding: 0 22px;
            border-radius: 999px;
            text-decoration: none;
            font-weight: 800;
            transition:
              transform 160ms ease,
              box-shadow 160ms ease,
              background-color 160ms ease;
          }

          .cta {
            background: linear-gradient(135deg, var(--md-sys-color-primary), #8c421b);
            color: var(--md-sys-color-on-primary);
            box-shadow: 0 18px 32px rgba(120, 57, 24, 0.2);
          }

          .secondary-cta {
            border: 1px solid rgba(168, 84, 39, 0.24);
            background: var(--surface-soft);
            color: var(--md-sys-color-on-surface);
          }

          .cta:hover,
          .secondary-cta:hover {
            transform: translateY(-2px);
          }

          .hero-media {
            display: flex;
            flex-direction: column;
            padding: 22px;
            min-height: 0;
            gap: 20px;
          }

          custom-carousel {
            margin: 0;
            overflow: hidden;
            width: 100%;
          }

          .media-caption {
            display: grid;
            gap: 14px;
            padding: 24px;
            border-radius: 24px;
            background: linear-gradient(180deg, rgba(50, 37, 31, 0.52), rgba(31, 24, 20, 0.72));
            border: 1px solid rgba(204, 173, 150, 0.06);
            flex: 1 1 auto;
            min-height: 0;
            align-content: start;
          }

          .media-copy {
            display: grid;
            align-content: start;
            gap: 10px;
            min-height: 11.25rem;
            grid-template-rows: auto auto;
          }

          .media-header {
            display: flex;
            justify-content: space-between;
            align-items: end;
            gap: 20px;
          }

          .media-header > div {
            display: grid;
            gap: 8px;
            align-content: start;
            min-height: 0;
          }

          .media-kicker {
            display: inline-flex;
            width: fit-content;
            padding: 7px 12px;
            border-radius: 999px;
            background: rgba(168, 84, 39, 0.18);
            color: var(--md-sys-color-primary);
            text-transform: uppercase;
            letter-spacing: 0.12em;
            font-size: 11px;
            font-weight: 800;
          }

          .media-title {
            margin: 0;
            font-family: var(--font-display);
            font-size: clamp(1.24rem, 1.35vw, 1.72rem);
            line-height: 1.08;
            color: var(--md-sys-color-on-surface);
            min-height: calc(1em * 2.2);
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }

          .media-description {
            max-width: none;
            font-size: 0.95rem;
            line-height: 1.68;
            min-height: calc(1em * 3.45);
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }

          .media-facts {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 70%));
            padding: 2px 0 4px;
            margin-top: auto;
          }

          .fact {
            display: grid;
            align-content: start;
            padding: 0;
            border-radius: 0;
            background: transparent;
            border: 0;
            gap: 6px;
          }

          .fact strong {
            display: block;
            margin-bottom: 6px;
            color: var(--md-sys-color-primary);
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.08em;
          }

          .fact span {
            min-height: 0;
            color: var(--md-sys-color-on-surface);
            font-size: 0.92rem;
            line-height: 1.45;
          }

          @media (max-width: 1400px) {
            main {
              grid-template-columns: minmax(0, 1fr) minmax(500px, 0.94fr);
              gap: 28px;
            }
          }

          @media (max-width: 1320px) {
            main {
              grid-template-columns: 1fr;
            }
          }

          @media (max-width: 800px) {
            .process-panel,
            .media-facts {
              grid-template-columns: 1fr;
            }

            .process-panel {
              grid-auto-flow: row;
            }

            .process-card {
              min-width: 0;
              width: 100%;
              box-sizing: border-box;
            }

            .discipline-list {
              flex-direction: column;
              gap: 8px;
            }

            .fact + .fact {
              border-left: 0;
              padding-left: 0;
              border-top: 1px solid rgba(204, 173, 150, 0.08);
              padding-top: 12px;
            }

            .copy-footer {
              gap: 14px;
            }

            h1 {
              font-size: clamp(1.56rem, 5.9vw, 2.05rem);
              min-height: 0;
            }

            .hero-copy,
            .hero-media,
            .media-caption {
              padding-left: 20px;
              padding-right: 20px;
            }

            .hero-media {
              gap: 20px;
            }

            .media-caption {
              gap: 20px;
              padding-top: 24px;
              padding-bottom: 24px;
            }

            .media-copy,
            .media-header > div,
            .media-description,
            .media-title,
            .copy-stack,
            .lead {
              min-height: 0;
            }
          }
        </style>
        <main>
          <custom-section
            type="hero"
            title="Technische werken die doordacht voorbereid en zorgvuldig afgewerkt worden."
            description="Dimac focust op technische installaties, slimme automatisatie en dakwerken in en rond Diest. Ook kan u bij ons terecht voor algemene aannemingswerken. Alles wordt zorgvuldig aangepakt, correct uitgevoerd en opgevolgd zonder ruis."
            eyebrow="Bouwen met aandacht">
            <div
              slot="content"
              class="cta-group">
              <a
                class="cta"
                href="#!/contact"
                >Vraag een eerste gesprek aan</a
              >
              <a
                class="secondary-cta"
                href="#!/realizations"
                >Bekijk onze realisaties</a
              >
            </div>

            <custom-panel slot="footer">
              <custom-card
                title="Onze aanpak"
                description="Lokale opvolging, korte lijnen en een
                      technisch samenhangend traject van inschatting tot afwerking. We brengen
                      technieken, materialen en uitvoering samen in een logisch en kloppend geheel."
                class="process-card">
                <div
                  slot="content"
                  class="process-panel"></div>
              </custom-card>

              <custom-card title="Disciplines">
                <div
                  slot="content"
                  class="discipline-list">
                  ${this.capabilityPills.map(
                    (item) => html`<span class="discipline-pill">${item}</span>`
                  )}
                </div>
              </custom-card>

              <custom-card
                title="Vertrouwen en ondersteuning"
                class="process-card--trust">
                <div
                  class="process-tags"
                  slot="content">
                  ${this.supportHighlights.map(
                    (item) => html`<span class="process-chip">${item}</span>`
                  )}
                </div>
              </custom-card>
            </custom-panel>
          </custom-section>

          <custom-section
            type="media"
            .title=${this.activeProject.title}
            .description=${this.activeProject.description}
            .eyebrow=${this.activeProject.kicker}>
            <custom-carousel
              slot="media"
              .images=${this.carouselImages}
              @slide-change=${this.#onSlideChange}></custom-carousel>
            <div slot="content">
              <div class="media-facts">
                ${this.activeProject.stats.map(
                  (item) =>
                    html`<div class="fact media-capture">
                      <strong>${item.label}</strong><span>${item.value}</span>
                    </div>`
                )}
              </div>
            </div>
          </custom-section>
        </main>
      `
    }
  }
)
