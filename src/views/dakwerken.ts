import { html, LiteElement } from '@vandeurenglenn/lite'

export default customElements.define(
  'dakwerken-view',
  class extends LiteElement {
    private loadedResolve!: (value: boolean) => void
    loaded = new Promise<boolean>((resolve) => {
      this.loadedResolve = resolve
    })

    onderdelen = [
      'Renovatie van platte en hellende daken',
      'Herstellingen en waterdichte afwerking',
      'Isolatie met aandacht voor comfort en energieprestaties',
      'Voorbereiding op afwerking en aansluiting met andere werken'
    ]

    async firstRender(): Promise<void> {
      this.loadedResolve(true)
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
            gap: 26px;
          }

          section {
            padding: clamp(32px, 3vw, 56px) 0;
            display: grid;
            gap: 18px;
          }

          section + section {
            border-top: 1px solid rgba(204, 173, 150, 0.08);
          }

          .hero {
            padding-top: 56px;
            position: relative;
            overflow: hidden;
          }

          .hero::after {
            content: '';
            position: absolute;
            top: -80px;
            right: -80px;
            width: 380px;
            height: 380px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(168, 84, 39, 0.13), transparent 65%);
            pointer-events: none;
          }

          .eyebrow {
            display: inline-flex;
            width: fit-content;
            padding: 7px 12px;
            border-radius: 999px;
            background: rgba(168, 84, 39, 0.12);
            color: var(--md-sys-color-primary);
            text-transform: uppercase;
            letter-spacing: 0.12em;
            font-size: 11px;
            font-weight: 800;
          }

          h1,
          h2 {
            margin: 0;
            color: var(--md-sys-color-on-surface);
            font-family: var(--font-display);
            line-height: 1.02;
            letter-spacing: var(--hero-title-letter-spacing);
          }

          h1 {
            font-size: clamp(2rem, 3.1vw, 3.1rem);
            max-width: 22ch;
          }

          h2 {
            font-size: clamp(1.5rem, 2.15vw, 2.2rem);
          }

          p,
          li {
            margin: 0;
            color: var(--md-sys-color-on-surface-variant);
            line-height: 1.75;
          }

          ul {
            margin: 0;
            padding-left: 18px;
            display: grid;
            gap: 8px;
          }

          .cta-row {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
          }

          .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-height: 50px;
            border-radius: 999px;
            padding: 0 22px;
            text-decoration: none;
            font-weight: 800;
          }

          .btn-primary {
            background: linear-gradient(135deg, var(--md-sys-color-primary), #8c421b);
            color: var(--md-sys-color-on-primary);
          }

          .btn-secondary {
            border: 1px solid rgba(168, 84, 39, 0.24);
            color: var(--md-sys-color-on-surface);
            background: var(--surface-soft);
          }
        </style>

        <main>
          <section class="hero">
            <span class="eyebrow">Dienst — Dakwerken</span>
            <h1>Dakwerken in regio Diest</h1>
            <p>
              Van renovatie tot herstelling. Dimac voert dakwerken uit met aandacht voor isolatie,
              duurzaamheid en correcte aansluiting op de rest van uw project.
            </p>
            <div class="cta-row">
              <a
                class="btn btn-primary"
                href="#!/contact"
                >Vraag een offerte aan</a
              >
              <a
                class="btn btn-secondary"
                href="#!/services"
                >Bekijk alle diensten</a
              >
            </div>
          </section>

          <section>
            <h2>Een dak dat technisch klopt</h2>
            <p>
              Dakwerken hebben impact op comfort, energieverbruik en de verdere afwerking van uw
              woning. Daarom bekijken wij dit niet als een los onderdeel, maar als deel van het
              totale geheel.
            </p>
            <ul>
              ${this.onderdelen.map((item) => html`<li>${item}</li>`)}
            </ul>
          </section>
        </main>
      `
    }
  }
)
