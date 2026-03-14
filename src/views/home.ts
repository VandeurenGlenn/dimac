import { html, LiteElement, property, query } from '@vandeurenglenn/lite'
import './../elements/carousel.js'
import { CustomCarousel } from './../elements/carousel.js'
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

    projectHighlights = [
      {
        kicker: 'Projectselectie',
        title: 'Badkamers waar materiaalrust en technische precisie samenvallen',
        description: 'Waterdichte detaillering, donkere accenten en een indeling die dagelijks gebruik helder houdt.',
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
        kicker: 'Projectselectie',
        title: 'Keukens waar gebruiksgemak en techniek vanzelf samenvallen',
        description: 'Gebruiksgemak, maatvoering en afwerking komen samen in een ruimte die ordelijk en logisch werkt.',
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
        kicker: 'Projectselectie',
        title: 'Renovaties met voelbare kwaliteit en technische rust',
        description: 'Materialen en aansluitingen zijn zo gekozen dat de ruimte tegelijk robuust en verfijnd aanvoelt.',
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
        kicker: 'Projectselectie',
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
        kicker: 'Projectselectie',
        title: 'Interieurs waar afwerking de techniek moeiteloos laat verdwijnen',
        description: 'Afwerking, indeling en aansluitingen zijn samengebracht tot een ruimte die gewoon klopt.',
        stats: [
          { label: 'Locatie', value: 'Schulen' },
          { label: 'Focus', value: 'Interieurdetail' },
          { label: 'Karakter', value: 'Evenwichtig' }
        ],
        notes: ['Technische integratie blijft op de achtergrond.', 'De ruimte leest als één coherent geheel.']
      },
      {
        kicker: 'Projectselectie',
        title: 'Keukenopstellingen die helder werken en rustig blijven ogen',
        description:
          'Een praktische, heldere werkomgeving waarin materiaal, indeling en installatie elkaar versterken.',
        stats: [
          { label: 'Locatie', value: 'Diest' },
          { label: 'Focus', value: 'Keukenrenovatie' },
          { label: 'Karakter', value: 'Functioneel en rustig' }
        ],
        notes: ['Werkzones zijn logisch georganiseerd.', 'Technische keuzes ondersteunen comfort en onderhoudsgemak.']
      },
      {
        kicker: 'Projectselectie',
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
        kicker: 'Projectselectie',
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
        kicker: 'Projectselectie',
        title: 'Interieurwerk dat toont wat zorgvuldige afwerking echt betekent',
        description: 'De materialisatie en detaillering geven de ruimte een afgewerkt karakter zonder overdaad.',
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
        kicker: 'Projectselectie',
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
            grid-template-columns: minmax(0, 0.9fr) minmax(760px, 1.12fr);
            gap: clamp(28px, 3vw, 48px);
            align-items: stretch;
          }

          .hero-copy,
          .hero-media {
            background: var(--md-sys-color-surface);
            border: var(--surface-border);
            border-radius: var(--panel-radius);
            box-shadow: var(--card-shadow);
            backdrop-filter: blur(18px);
          }

          .hero-copy {
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: clamp(32px, 4vw, 56px);
            min-height: 0;
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

          h1 {
            margin: 18px 0 18px;
            font-family: var(--font-display);
            font-size: var(--hero-title-size);
            line-height: var(--hero-title-line-height);
            letter-spacing: var(--hero-title-letter-spacing);
            color: var(--md-sys-color-on-surface);
          }

          p {
            margin: 0;
            font-size: 1.06rem;
            line-height: 1.8;
            color: var(--md-sys-color-on-surface-variant);
            max-width: 52ch;
          }

          .cta-group {
            display: flex;
            flex-wrap: wrap;
            gap: 14px;
            margin-top: 28px;
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

          .support-grid {
            list-style: none;
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 16px;
            padding: 0;
            margin: 36px 0 0;
          }

          .support-card {
            padding: 18px;
            border-radius: 20px;
            background: var(--surface-soft);
            border: 1px solid rgba(204, 173, 150, 0.08);
          }

          .support-card:last-child {
            grid-column: 1 / -1;
          }

          .support-card strong {
            display: block;
            margin-bottom: 8px;
            font-size: 14px;
            color: var(--md-sys-color-primary);
            text-transform: uppercase;
            letter-spacing: 0.08em;
          }

          .support-card span {
            color: var(--md-sys-color-on-surface-variant);
            line-height: 1.6;
            font-size: 0.95rem;
          }

          .hero-media {
            display: flex;
            flex-direction: column;
            padding: 20px;
            min-height: 0;
            gap: 18px;
          }

          custom-carousel {
            margin: 0;
            overflow: hidden;
            width: 100%;
          }

          .media-caption {
            display: grid;
            gap: 18px;
            padding: 22px 24px 24px;
            border-radius: 24px;
            background: linear-gradient(180deg, rgba(56, 40, 33, 0.66), rgba(35, 26, 22, 0.82));
            border: 1px solid rgba(204, 173, 150, 0.08);
          }

          .media-header {
            display: flex;
            justify-content: space-between;
            align-items: end;
            gap: 16px;
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
            font-size: clamp(1.4rem, 1.8vw, 2.1rem);
            line-height: 0.96;
            color: var(--md-sys-color-on-surface);
          }

          .media-description {
            max-width: none;
            font-size: 1rem;
          }

          .media-facts,
          .media-notes {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 14px;
          }

          .media-note {
            grid-column: span 3;
          }

          .fact,
          .media-note {
            padding: 14px 16px;
            border-radius: 18px;
            background: rgba(23, 17, 14, 0.38);
            border: 1px solid rgba(204, 173, 150, 0.08);
          }

          .fact strong,
          .media-note strong {
            display: block;
            margin-bottom: 6px;
            color: var(--md-sys-color-primary);
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.08em;
          }

          .fact span,
          .media-note span {
            color: var(--md-sys-color-on-surface-variant);
            line-height: 1.6;
            font-size: 0.94rem;
          }

          @media (max-width: 1400px) {
            main {
              grid-template-columns: minmax(0, 1fr) minmax(560px, 0.95fr);
              gap: 28px;
            }
          }

          @media (max-width: 1200px) {
            main {
              grid-template-columns: 1fr;
            }
          }

          @media (max-width: 800px) {
            .support-grid,
            .media-facts {
              grid-template-columns: 1fr;
            }

            .media-note {
              grid-column: auto;
            }

            .media-notes {
              grid-template-columns: 1fr;
            }
          }
        </style>
        <main>
          <section class="hero-copy">
            <span class="eyebrow">Bouwen met aandacht</span>
            <h1>Technische werken die doordacht voorbereid, zorgvuldig uitgevoerd en rustig afgewerkt worden.</h1>
            <p>
              Dimac focust op technische installaties, slimme automatisatie en dakwerken in en rond Diest. Praktisch
              aangepakt, correct uitgevoerd en opgevolgd zonder ruis.
            </p>

            <div class="cta-group">
              <a
                class="cta"
                href="#!/contact"
                >Vraag een eerste gesprek aan</a
              >
              <a
                class="secondary-cta"
                href="#!/realizations"
                >Bekijk geselecteerde projecten</a
              >
            </div>

            <div class="support-grid">
              <article class="support-card">
                <strong>Totaalaanpak</strong>
                <span>Een vast aanspreekpunt voor coördinatie, uitvoering en afwerking zonder losse schakels.</span>
              </article>
              <article class="support-card">
                <strong>Technische breedte</strong>
                <span>Sanitair, elektriciteit, automatisatie en dakwerken in één samenhangende aanpak.</span>
              </article>
              <article class="support-card">
                <strong>Dakwerken met zorg</strong>
                <span>Snelle communicatie, realistische afspraken en overzicht tijdens iedere projectfase.</span>
              </article>
            </div>
          </section>

          <section class="hero-media">
            <custom-carousel
              .images=${this.carouselImages}
              @slide-change=${this.#onSlideChange}></custom-carousel>

            <div class="media-caption">
              <div class="media-header">
                <div>
                  <span class="media-kicker">${this.activeProject.kicker}</span>
                  <h2 class="media-title">${this.activeProject.title}</h2>
                </div>
              </div>

              <p class="media-description">${this.activeProject.description}</p>

              <div class="media-facts">
                ${this.activeProject.stats.map(
                  (item) => html`<div class="fact"><strong>${item.label}</strong><span>${item.value}</span></div>`
                )}
              </div>

              <div class="media-notes">
                ${this.activeProject.notes.map(
                  (note, index) =>
                    html`<div class="media-note">
                      <strong>${index === 0 ? 'Detail' : 'Waarom dit werkt'}</strong><span>${note}</span>
                    </div>`
                )}
              </div>
            </div>
          </section>
        </main>
      `
    }
  }
)
