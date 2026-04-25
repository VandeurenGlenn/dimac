import { html, LiteElement } from '@vandeurenglenn/lite'

export default customElements.define(
  'werkwijze-view',
  class extends LiteElement {
    private loadedResolve!: (value: boolean) => void
    loaded = new Promise<boolean>((resolve) => {
      this.loadedResolve = resolve
    })

    stappen = [
      {
        title: 'Kennismaking of woningscan',
        text: 'We bekijken uw woning en situatie, luisteren naar uw plannen en bepalen wat de juiste eerste stap is.'
      },
      {
        title: 'Analyse en advies',
        text: 'U krijgt duidelijke inzichten, concrete mogelijkheden en een aanpak die technisch en praktisch klopt.'
      },
      {
        title: 'Offerte en planning',
        text: 'We maken een transparante offerte op en stemmen de uitvoering af in een heldere planning.'
      },
      {
        title: 'Uitvoering',
        text: 'Dimac coördineert en realiseert uw project van A tot Z met één aanspreekpunt en korte opvolging.'
      },
      {
        title: 'Oplevering',
        text: 'Alles wordt correct afgewerkt, gecontroleerd en opgeleverd zonder losse eindjes.'
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
            padding-bottom: 72px;
          }

          main {
            width: 100%;
            max-width: var(--page-max-width);
            display: grid;
            gap: 0;
          }

          section {
            padding: clamp(32px, 3vw, 56px) 0;
            display: grid;
            gap: 20px;
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
            width: 420px;
            height: 420px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(168, 84, 39, 0.12), transparent 65%);
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

          h1, h2, h3 {
            margin: 0;
            color: var(--md-sys-color-on-surface);
          }

          h1, h2 {
            font-family: var(--font-display);
            line-height: 1.04;
            letter-spacing: var(--hero-title-letter-spacing);
          }

          h1 { font-size: clamp(1.95rem, 2.8vw, 2.9rem); }
          h2 { font-size: clamp(1.4rem, 2vw, 2rem); }
          h3 { font-size: 1.05rem; font-weight: 700; }

          p {
            margin: 0;
            line-height: 1.75;
            color: var(--md-sys-color-on-surface-variant);
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
            font-weight: 700;
            transition: transform 160ms ease, opacity 160ms ease;
          }

          .btn:hover { transform: translateY(-2px); opacity: 0.9; }

          .btn-primary {
            background: linear-gradient(135deg, var(--md-sys-color-primary), #8c421b);
            color: var(--md-sys-color-on-primary);
          }

          .btn-secondary {
            border: 1px solid rgba(168, 84, 39, 0.24);
            color: var(--md-sys-color-on-surface);
          }

          /* Timeline */
          .timeline {
            display: grid;
            grid-template-columns: 80px 1fr;
            gap: 0;
          }

          .tl-spine {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0;
          }

          .tl-num {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: rgba(168, 84, 39, 0.12);
            color: var(--md-sys-color-primary);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.88rem;
            font-weight: 900;
            font-family: var(--font-display);
            flex-shrink: 0;
            position: relative;
            z-index: 1;
          }

          .tl-line {
            width: 1px;
            flex: 1;
            background: rgba(168, 84, 39, 0.15);
            margin: 6px 0;
            min-height: 32px;
          }

          .tl-steps {
            display: flex;
            flex-direction: column;
          }

          .tl-step {
            display: grid;
            gap: 6px;
            padding: 12px 0 36px;
          }

          .tl-step:last-child {
            padding-bottom: 0;
          }

          @media (max-width: 600px) {
            .timeline {
              grid-template-columns: 56px 1fr;
            }
            .tl-num {
              width: 36px;
              height: 36px;
              font-size: 0.78rem;
            }
          }
        </style>

        <main>
          <section class="hero">
            <span class="eyebrow">Werkwijze</span>
            <h1>Zo verloopt een traject bij Dimac</h1>
            <p>
              Van eerste analyse tot oplevering. Dimac houdt uw renovatie- of bouwproject helder,
              gestructureerd en technisch goed afgestemd.
            </p>
          </section>

          <section>
            <h2>De 5 stappen van Dimac</h2>
            <div class="timeline">
              <div class="tl-spine">
                ${this.stappen.map(
                  (_, i) => html`
                    <span class="tl-num">${i + 1}</span>
                    ${i < this.stappen.length - 1 ? html`<div class="tl-line"></div>` : ''}
                  `
                )}
              </div>
              <div class="tl-steps">
                ${this.stappen.map(
                  (item) => html`
                    <div class="tl-step">
                      <h3>${item.title}</h3>
                      <p>${item.text}</p>
                    </div>
                  `
                )}
              </div>
            </div>
          </section>

          <section>
            <h2>Niet zeker waar te beginnen?</h2>
            <p>
              Start met een woningscan. Zo weet u beter wat nodig is vóór de werken starten — en
              wordt de scan verrekend als u met Dimac aan de slag gaat.
            </p>
            <div class="cta-row">
              <a class="btn btn-primary" href="#!/woningscan">Plan uw woningscan</a>
              <a class="btn btn-secondary" href="#!/contact">Vraag een offerte aan</a>
            </div>
          </section>
        </main>
      `
    }
  }
)
