import { html, LiteElement } from '@vandeurenglenn/lite'

export default customElements.define(
  'reviews-view',
  class extends LiteElement {
    private loadedResolve!: (value: boolean) => void
    loaded = new Promise<boolean>((resolve) => {
      this.loadedResolve = resolve
    })

    reviews = [
      {
        title: 'Heldere communicatie',
        text: 'Zeer tevreden over de communicatie en het eindresultaat. Alles verliep volgens afspraak.'
      },
      {
        title: 'Correcte planning',
        text: 'Correcte planning, duidelijke offerte en mooie afwerking. Aanrader.'
      },
      {
        title: 'Professioneel uitgevoerd',
        text: 'Goede opvolging en professioneel uitgevoerd werk. Wij zijn zeer tevreden.'
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
            padding: 22px;
            background: rgba(41, 30, 25, 0.5);
            display: grid;
            gap: 10px;
          }

          .stars {
            color: var(--md-sys-color-primary);
            letter-spacing: 0.16em;
            font-weight: 800;
          }

          .cta-row {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            margin-top: 6px;
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

          @media (max-width: 900px) {
            .grid {
              grid-template-columns: 1fr;
            }
          }
        </style>

        <main>
          <section class="hero">
            <span class="eyebrow">Reviews</span>
            <h1>Wat klanten zeggen over Dimac</h1>
            <p>
              Heldere communicatie, correcte opvolging en een verzorgd eindresultaat. Dat is wat
              klanten het vaakst benoemen wanneer ze met Dimac samenwerken.
            </p>
          </section>

          <section>
            <h2>Ervaringen uit echte trajecten</h2>
            <div class="grid">
              ${this.reviews.map(
                (item) => html`
                  <article class="card">
                    <span class="stars">★★★★★</span>
                    <h3>${item.title}</h3>
                    <p>${item.text}</p>
                  </article>
                `
              )}
            </div>
          </section>

          <section>
            <h2>Ook uw project bespreken?</h2>
            <p>
              Wil u weten hoe Dimac uw renovatie of bouwproject kan aanpakken? Neem contact op of
              plan eerst een woningscan voor extra duidelijkheid.
            </p>
            <div class="cta-row">
              <a
                class="btn btn-primary"
                href="#!/contact"
                >Vraag een offerte aan</a
              >
              <a
                class="btn btn-secondary"
                href="#!/woningscan"
                >Plan uw woningscan</a
              >
            </div>
          </section>
        </main>
      `
    }
  }
)
