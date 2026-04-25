import { html, LiteElement } from '@vandeurenglenn/lite'

export default customElements.define(
  'afwerking-view',
  class extends LiteElement {
    private loadedResolve!: (value: boolean) => void
    loaded = new Promise<boolean>((resolve) => {
      this.loadedResolve = resolve
    })

    onderdelen = [
      {
        title: 'Gyproc werken',
        href: '#!/gyprocwerken',
        text: 'Strakke wanden, plafonds en scheidingswanden als basis voor een verzorgde binnenafwerking.'
      },
      {
        title: 'Schilderwerken',
        href: '#!/schilderwerken',
        text: 'Een nette eindlaag met aandacht voor voorbereiding, detail en duurzaamheid.'
      },
      {
        title: 'Vloerwerken',
        href: '#!/vloerwerken',
        text: 'Tegels, vinyl of parket die technisch correct geplaatst en mooi afgewerkt worden.'
      }
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
          h2,
          h3 {
            margin: 0;
            color: var(--md-sys-color-on-surface);
          }
          h1,
          h2 {
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
          h3 {
            font-size: 1.05rem;
            font-weight: 800;
          }
          p {
            margin: 0;
            color: var(--md-sys-color-on-surface-variant);
            line-height: 1.75;
          }
          .grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 14px;
          }
          .card {
            border-radius: 16px;
            padding: 18px;
            background: rgba(41, 30, 25, 0.5);
            display: grid;
            gap: 10px;
          }
          a.link {
            color: var(--md-sys-color-primary);
            font-weight: 800;
            text-decoration: none;
          }
          @media (max-width: 900px) {
            .grid {
              grid-template-columns: 1fr;
            }
          }
        </style>
        <main>
          <section class="hero">
            <span class="eyebrow">Dienst — Afwerking</span>
            <h1>Afwerking die het verschil maakt</h1>
            <p>
              Gyproc, schilderwerken en vloerwerken bepalen hoe een woning uiteindelijk aanvoelt.
              Dimac zorgt voor een verzorgde afwerking met oog voor detail en samenhang.
            </p>
          </section>

          <section>
            <h2>Onderdeel van een groter geheel</h2>
            <div class="grid">
              ${this.onderdelen.map(
                (item) => html`
                  <article class="card">
                    <h3>${item.title}</h3>
                    <p>${item.text}</p>
                    <a
                      class="link"
                      href=${item.href}
                      >Meer over ${item.title.toLowerCase()}</a
                    >
                  </article>
                `
              )}
            </div>
          </section>
        </main>
      `
    }
  }
)
