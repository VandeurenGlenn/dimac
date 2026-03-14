import { html, LiteElement, property } from '@vandeurenglenn/lite'

import './../elements/carousel-card.js'
import { CustomCarouselCard } from './../elements/carousel-card.js'
export default customElements.define(
  'realizations-view',
  class extends LiteElement {
    @property({ type: Object, consumes: 'realizationsManifest' }) accessor manifest

    private loadedResolve: (value: boolean) => void
    loaded = new Promise<boolean>((resolve) => {
      this.loadedResolve = resolve
    })
    async firstRender(): Promise<void> {
      await (this.shadowRoot.querySelector('custom-carousel-card') as CustomCarouselCard | null)?.loaded
      this.loadedResolve(true)
    }

    async onChange(propertyKey: string, value: any): Promise<void> {
      if (propertyKey === 'manifest') {
        await (this.shadowRoot.querySelector('custom-carousel-card') as CustomCarouselCard | null)?.loaded
        this.loadedResolve(true)
      }
    }

    #formatTitle(value: string) {
      const normalized = value
        .split(/\s+/)
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      if (normalized.length <= 1) return normalized.join(' ')
      const place = normalized.pop()
      return `${normalized.join(' ')}, ${place}`
    }

    #projectKicker(value: string) {
      const lower = value.toLowerCase()
      if (lower.includes('diest')) return 'Project in Diest'
      if (lower.includes('schulen')) return 'Project in Schulen'
      if (lower.includes('paal')) return 'Project in Paal'
      if (lower.includes('herk')) return 'Project in Herk-de-Stad'
      if (lower.includes('okselaar')) return 'Project in Okselaar'
      if (lower.includes('schaffen')) return 'Project in Schaffen'
      return 'Uitgevoerd project'
    }

    #projectDescription(value: string, images: string[]) {
      const lower = value.toLowerCase()
      const imageCount = images?.length || 0
      if (lower.includes('postbaan')) {
        return `Residentiele afwerking en interieurbeelden uit een projectdossier met ${imageCount} foto${imageCount === 1 ? '' : "'s"}.`
      }
      if (lower.includes('oudebaan')) {
        return `Renovatie- en afwerkingsmomenten die de technische en visuele opbouw van het project tonen in ${imageCount} beelden.`
      }
      if (lower.includes('sintjan') || lower.includes('koning') || lower.includes('demer')) {
        return `Interieur- en afwerkingsdetails uit een residentieel project, samengebracht in ${imageCount} geselecteerde beelden.`
      }
      if (lower.includes('turnhoutsebaan') || lower.includes('bosbessenstraat')) {
        return `Een selectie beelden die materiaal, uitvoering en voortgang binnen dit project overzichtelijk tonen.`
      }
      return `Een beknopte selectie van ${imageCount} beelden die het uitgevoerde werk en de afwerkingsgraad zichtbaar maakt.`
    }

    #sortedProjects() {
      return Object.entries(this.manifest || {}).sort(([left], [right]) => left.localeCompare(right, 'nl'))
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

          .intro {
            background: var(--md-sys-color-surface);
            border: var(--surface-border);
            border-radius: var(--panel-radius);
            box-shadow: var(--card-shadow);
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

          .card-container {
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            width: 100%;
            gap: 28px;
          }

          custom-carousel-card {
            width: 100%;
            box-sizing: border-box;
            max-width: none;
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
            .card-container {
              grid-template-columns: 1fr;
            }
          }
        </style>
        <main>
          <section class="intro">
            <span class="eyebrow">Realisaties</span>
            <h4>Projecten die overtuigen door materiaalkeuze, uitvoering en technische samenhang.</h4>
            <p>
              Een selectie van uitgevoerde werken die toont hoe Dimac ruimtes opwaardeert: helder opgebouwd, zorgvuldig
              gedetailleerd en professioneel afgewerkt. Geen losse snapshots, maar projectbeelden die de kwaliteit van
              de uitvoering tastbaar maken.
            </p>
          </section>

          <span class="card-container">
            ${this.#sortedProjects().map(
              ([key, value]) =>
                html` <custom-carousel-card
                  .title=${this.#formatTitle(key)}
                  .kicker=${this.#projectKicker(key)}
                  .description=${this.#projectDescription(key, value as string[])}
                  .images=${value}></custom-carousel-card>`
            )}
          </span>
        </main>
      `
    }
  }
)
