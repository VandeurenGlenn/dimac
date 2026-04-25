import { html, LiteElement } from '@vandeurenglenn/lite'

export default customElements.define(
  'woningscan-view',
  class extends LiteElement {
    private loadedResolve!: (value: boolean) => void
    loaded = new Promise<boolean>((resolve) => {
      this.loadedResolve = resolve
    })

    faq = [
      {
        q: 'Wat kost een woningscan?',
        a: 'De prijs hangt af van de grootte en situatie van uw woning. U ontvangt steeds een duidelijke prijs vooraf.'
      },
      {
        q: 'Is de scan verplicht om met Dimac samen te werken?',
        a: 'Nee. De scan is een aparte dienst. U beslist nadien zelf hoe u verder gaat.'
      },
      {
        q: 'Wordt de scan altijd verrekend?',
        a: 'De scan wordt verrekend wanneer u beslist om de renovatie door Dimac te laten uitvoeren.'
      },
      {
        q: 'Hoe lang duurt een woningscan?',
        a: 'Gemiddeld duurt een scan ongeveer 1,5 tot 2 uur, afhankelijk van de woning.'
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
          h3 { font-size: 1rem; font-weight: 700; }

          p, li {
            margin: 0;
            line-height: 1.75;
            color: var(--md-sys-color-on-surface-variant);
          }

          ul {
            margin: 0;
            padding: 0;
            list-style: none;
            display: grid;
            gap: 10px;
          }

          ul li::before {
            content: '→';
            color: var(--md-sys-color-primary);
            margin-right: 10px;
            font-weight: 700;
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

          /* Two-col info blocks */
          .two-col {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }

          .info-block {
            padding: 24px;
            border-radius: 18px;
            background: rgba(41, 30, 25, 0.5);
            display: grid;
            gap: 12px;
          }

          /* Steps */
          .steps {
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 0;
          }

          .step {
            display: grid;
            gap: 8px;
            padding-right: 20px;
            position: relative;
          }

          .step:not(:last-child)::after {
            content: '';
            position: absolute;
            top: 20px;
            right: 0;
            width: 1px;
            height: 40px;
            background: rgba(168, 84, 39, 0.2);
          }

          .step-num {
            font-size: 2.4rem;
            font-weight: 900;
            font-family: var(--font-display);
            color: rgba(168, 84, 39, 0.25);
            line-height: 1;
          }

          /* FAQ */
          .faq {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }

          .faq-item {
            display: grid;
            gap: 6px;
          }

          @media (max-width: 900px) {
            .two-col, .faq { grid-template-columns: 1fr; }
            .steps { grid-template-columns: 1fr 1fr; }
          }

          @media (max-width: 560px) {
            .steps { grid-template-columns: 1fr; }
            .step::after { display: none; }
          }
        </style>

        <main>
          <section class="hero">
            <span class="eyebrow">Woningscan</span>
            <h1>Woningscan in regio Diest</h1>
            <p>
              Eerst inzicht, daarna de juiste keuzes. De woningscan van Dimac brengt de staat van uw
              woning en de beste aanpak in kaart — zodat u zonder verrassingen kan renoveren.
            </p>
            <div class="cta-row">
              <a class="btn btn-primary" href="#!/contact">Plan uw woningscan</a>
              <a class="btn btn-secondary" href="#!/contact">Vraag een offerte aan</a>
            </div>
          </section>

          <section>
            <h2>Wat krijgt u concreet?</h2>
            <div class="two-col">
              <div class="info-block">
                <h3>25-punten rapport</h3>
                <ul>
                  <li>Structurele staat van de woning</li>
                  <li>Technische installaties</li>
                  <li>Mogelijke gebreken en aandachtspunten</li>
                  <li>Renovatieprioriteiten en inschatting</li>
                </ul>
              </div>
              <div class="info-block">
                <h3>Geschikt voor</h3>
                <ul>
                  <li>Woningen die u wil renoveren</li>
                  <li>Woningen die u overweegt te kopen</li>
                  <li>Projecten waarbij u twijfelt over aanpak of budget</li>
                  <li>Totaalrenovaties in voorbereiding</li>
                </ul>
              </div>
            </div>
            <p>
              De scan wordt verrekend als u beslist de werken door Dimac te laten uitvoeren.
            </p>
          </section>

          <section>
            <h2>Hoe verloopt een woningscan?</h2>
            <div class="steps">
              ${['Afspraak inplannen', 'Analyse ter plaatse', 'Advies en bespreking', 'Volgende stap'].map(
                (title, i) =>
                  html`<div class="step">
                    <span class="step-num">0${i + 1}</span>
                    <h3>${title}</h3>
                  </div>`
              )}
            </div>
          </section>

          <section>
            <h2>Veelgestelde vragen</h2>
            <div class="faq">
              ${this.faq.map(
                (item) => html`
                  <div class="faq-item">
                    <h3>${item.q}</h3>
                    <p>${item.a}</p>
                  </div>
                `
              )}
            </div>
          </section>

          <section>
            <h2>Klaar om te starten?</h2>
            <p>Plan een woningscan en maak doordachte renovatiekeuzes van bij het begin.</p>
            <div class="cta-row">
              <a class="btn btn-primary" href="#!/contact">Plan uw woningscan</a>
              <a class="btn btn-secondary" href="#!/werkwijze">Bekijk onze werkwijze</a>
            </div>
          </section>
        </main>
      `
    }
  }
)

