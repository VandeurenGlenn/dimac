import { html, LiteElement, property, query } from '@vandeurenglenn/lite'
import './../elements/carousel.js'
import { CustomCarousel } from './../elements/carousel.js'
import './../elements/eyebrow.js'
export default customElements.define(
  'home-view',
  class extends LiteElement {
    @query('custom-carousel') accessor carousel: CustomCarousel
    @property({ type: Number }) accessor activeSlide = 0
    @property({ type: Number }) accessor googleRating: number | null = null
    @property({ type: Number }) accessor googleRatingCount: number | null = null

    private loadedResolve!: (value: boolean) => void
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

    projectLabels = [
      { kicker: 'Badkamer', location: 'Schaffen' },
      { kicker: 'Keuken', location: 'Schaffen' },
      { kicker: 'Renovatie', location: 'Schulen' },
      { kicker: 'Badkamer', location: 'Schulen' },
      { kicker: 'Interieur', location: 'Schulen' },
      { kicker: 'Keuken', location: 'Diest' },
      { kicker: 'Werfopvolging', location: 'Schaffen' },
      { kicker: 'Renovatie', location: 'Schulen' },
      { kicker: 'Afwerking', location: 'Schulen' },
      { kicker: 'Oplevering', location: 'Diest' }
    ]

    get activeProject() {
      return this.projectLabels[this.activeSlide] || this.projectLabels[0]
    }

    #onSlideChange = (event: CustomEvent<{ index: number }>) => {
      this.activeSlide = event.detail.index || 0
    }

    async firstRender() {
      await this.carousel.loaded
      this.loadedResolve(true)
      // Pull live Google rating for the trust bar.
      try {
        const res = await fetch('./reviews.json', { cache: 'no-cache' })
        if (res.ok) {
          const data = await res.json()
          if (typeof data.rating === 'number') this.googleRating = data.rating
          if (typeof data.ratingCount === 'number') this.googleRatingCount = data.ratingCount
        }
      } catch {
        /* silent — fall back to default trust item */
      }
    }

    #icon(_name: string) {
      return html``
    }

    render() {
      return html`
        <style>
          :host {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            padding-bottom: 72px;
            color: var(--md-sys-color-on-background);
          }

          *,
          *::before,
          *::after {
            box-sizing: border-box;
          }

          main {
            display: flex;
            flex-direction: column;
            gap: 48px;
            width: 100%;
            max-width: var(--page-max-width);
            min-width: 0;
          }

          /* ── Hero ─────────────────────────────────── */
          .hero {
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
            gap: clamp(32px, 4vw, 56px);
            align-items: center;
            padding-top: 48px;
          }

          .hero-copy {
            display: flex;
            flex-direction: column;
            padding-top: 8px;
          }

          custom-eyebrow {
            margin-bottom: 20px;
          }

          h1 {
            margin: 0 0 20px;
            font-family: var(--font-display);
            font-size: clamp(2rem, 2.8vw, 3.2rem);
            line-height: 1.06;
            letter-spacing: var(--hero-title-letter-spacing);
            color: var(--md-sys-color-on-surface);
          }

          .lead {
            margin: 0 0 36px;
            font-size: 1.06rem;
            line-height: 1.78;
            color: var(--md-sys-color-on-surface-variant);
            max-width: 50ch;
          }

          .cta-group {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            margin-bottom: 40px;
          }

          .cta,
          .secondary-cta {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-height: 52px;
            padding: 0 24px;
            border-radius: 999px;
            text-decoration: none;
            font-weight: 700;
            font-size: 0.97rem;
            transition:
              transform 160ms ease,
              opacity 160ms ease;
          }

          .cta {
            background: linear-gradient(135deg, var(--md-sys-color-primary), #8c421b);
            color: var(--md-sys-color-on-primary);
            box-shadow: 0 8px 24px rgba(120, 57, 24, 0.28);
          }

          .secondary-cta {
            border: 1px solid rgba(168, 84, 39, 0.28);
            color: var(--md-sys-color-on-surface);
          }

          .cta:hover,
          .secondary-cta:hover {
            transform: translateY(-2px);
            opacity: 0.9;
          }

          .trust-bar {
            display: flex;
            gap: 28px;
            padding-top: 28px;
            border-top: 1px solid rgba(204, 173, 150, 0.1);
          }

          .trust-item {
            display: flex;
            flex-direction: column;
            gap: 3px;
          }

          .trust-item strong {
            font-size: 1.08rem;
            font-weight: 800;
            color: var(--md-sys-color-primary);
            display: inline-flex;
            align-items: center;
            gap: 4px;
          }

          .trust-item .stars {
            color: var(--md-sys-color-primary);
            font-size: 0.9em;
            letter-spacing: 0.05em;
          }

          .trust-item span {
            font-size: 0.82rem;
            color: var(--md-sys-color-on-surface-variant);
          }

          /* ── Media ─────────────────────────────────── */
          .hero-media {
            display: flex;
            flex-direction: column;
            gap: 14px;
          }

          custom-carousel {
            border-radius: 20px;
            overflow: hidden;
            width: 100%;
          }

          .media-label {
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .media-kicker {
            display: inline-flex;
            padding: 5px 12px;
            border-radius: 999px;
            background: rgba(168, 84, 39, 0.14);
            color: var(--md-sys-color-primary);
            font-size: 11px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            white-space: nowrap;
          }

          .media-location {
            font-size: 0.88rem;
            color: var(--md-sys-color-on-surface-variant);
          }

          /* ── Services grid ──────────────────────────── */
          .services-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 6px;
            margin-top: 20px;
          }

          .svc-tile {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 8px;
            padding: 8px;
            border-radius: 18px;
            text-decoration: none;
            color: var(--md-sys-color-on-surface);
            transition:
              background 180ms ease,
              border-color 180ms ease,
              transform 180ms ease;
          }

          .svc-tile:hover {
            background: rgba(168, 84, 39, 0.07);
            transform: translateY(-3px);
          }

          .svc-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 52px;
            height: 52px;
            border-radius: 16px;
            background: rgba(168, 84, 39, 0.1);
            color: var(--md-sys-color-primary);
            flex-shrink: 0;
          }

          .svc-icon custom-icon {
            --custom-icon-size: 26px;
            font-size: 26px;
          }

          .svc-label {
            font-size: 0.88rem;
            font-weight: 600;
            line-height: 1.3;
          }

          /* ── Responsive ─────────────────────────────── */

          @media (max-width: 860px) {
            .hero {
              grid-template-columns: 1fr;
            }

            .hero-media {
              order: -1;
            }

            .services-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }

          @media (max-width: 600px) {
            .trust-bar {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 8px;
              padding-top: 20px;
            }

            .trust-item strong {
              font-size: 0.92rem;
            }

            .trust-item span {
              font-size: 0.7rem;
              line-height: 1.3;
            }

            main {
              gap: 36px;
            }

            .hero {
              padding-top: 16px;
              gap: 18px;
            }

            .hero-copy {
              padding-top: 0;
            }

            .lead {
              font-size: 0.98rem;
              margin-bottom: 24px;
            }

            .cta-group {
              margin-bottom: 24px;
              flex-direction: column;
              gap: 10px;
            }

            .cta,
            .secondary-cta {
              width: 100%;
            }

            custom-eyebrow {
              margin-bottom: 14px;
            }

            .services-grid {
              gap: 4px;
              margin-top: 12px;
            }

            .svc-tile {
              flex-direction: column;
              align-items: center;
              text-align: center;
              padding: 12px 6px;
              gap: 6px;
            }

            .svc-icon {
              width: 44px;
              height: 44px;
            }

            .svc-label {
              font-size: 0.8rem;
            }

            h1 {
              font-size: clamp(1.75rem, 7vw, 2.4rem);
              margin-bottom: 14px;
            }
          }
        </style>

        <main>
          <div class="hero">
            <div class="hero-copy">
              <custom-eyebrow>Renovatie- en bouwpartner in regio Diest</custom-eyebrow>
              <h1>Alles onder één dak, van A tot Z.</h1>
              <p class="lead">
                Dimac begeleidt uw bouw- of renovatieproject van eerste analyse tot volledige
                afwerking — technieken, ruwbouw en afwerking via één aanspreekpunt.
              </p>
              <div class="cta-group">
                <a
                  class="cta"
                  href="#!/contact"
                  >Vraag een offerte aan</a
                >
                <a
                  class="secondary-cta"
                  href="#!/woningscan"
                  >Plan uw woningscan</a
                >
              </div>
              <div class="trust-bar">
                <div class="trust-item">
                  <strong>20+</strong>
                  <span>jaar ervaring</span>
                </div>
                ${this.googleRating
                  ? html`
                      <a
                        class="trust-item"
                        href="#!/reviews"
                        style="text-decoration:none;color:inherit">
                        <strong
                          >${this.googleRating.toLocaleString('nl-BE')}
                          <span class="stars">★</span></strong
                        >
                        <span
                          >${this.googleRatingCount
                            ? `${this.googleRatingCount} Google reviews`
                            : 'Google reviews'}</span
                        >
                      </a>
                    `
                  : html`
                      <div class="trust-item">
                        <strong>Regio Diest</strong>
                        <span>lokale opvolging</span>
                      </div>
                    `}
                <div class="trust-item">
                  <strong>Alles-in-één</strong>
                  <span>van ruwbouw tot afwerking</span>
                </div>
              </div>
              <div class="services-grid">
                ${[
                  { label: 'Totaalrenovatie', href: '#!/totaalrenovatie', icon: 'home' },
                  { label: 'Badkamer', href: '#!/badkamerrenovatie', icon: 'bathtub' },
                  { label: 'Keuken', href: '#!/keukenrenovatie', icon: 'kitchen' },
                  { label: 'Elektriciteit', href: '#!/elektriciteit', icon: 'bolt' },
                  { label: 'Sanitair', href: '#!/sanitair', icon: 'water_drop' },
                  { label: 'Dakwerken', href: '#!/dakwerken', icon: 'roofing' }
                ].map(
                  (s) => html`
                    <a
                      class="svc-tile"
                      href="${s.href}">
                      <span class="svc-icon"><custom-icon icon="${s.icon}"></custom-icon></span>
                      <span class="svc-label">${s.label}</span>
                    </a>
                  `
                )}
              </div>
            </div>

            <div class="hero-media">
              <custom-carousel
                .images=${this.carouselImages}
                @slide-change=${this.#onSlideChange}></custom-carousel>
              <div class="media-label">
                <span class="media-kicker">${this.activeProject.kicker}</span>
                <span class="media-location">${this.activeProject.location}</span>
              </div>
            </div>
          </div>
        </main>
      `
    }
  }
)
