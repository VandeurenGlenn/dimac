import { html, LiteElement } from '@vandeurenglenn/lite'

export default customElements.define(
  'badkamerrenovatie-view',
  class extends LiteElement {
    private loadedResolve!: (value: boolean) => void
    loaded = new Promise<boolean>((resolve) => {
      this.loadedResolve = resolve
    })

    stappen = [
      {
        nr: '01',
        title: 'Afbraak en voorbereiding',
        text: 'De bestaande badkamer wordt volledig afgebroken en de ruimte klaargezet voor de nieuwe inrichting.'
      },
      {
        nr: '02',
        title: 'Leidingen en technieken',
        text: 'Sanitaire leidingen, elektrische installatie en ventilatie worden correct aangelegd of aangepast.'
      },
      {
        nr: '03',
        title: 'Tegelwerk en waterdichting',
        text: 'Vloer- en wandtegels worden waterdicht en vakkundig geplaatst, op maat van uw keuze.'
      },
      {
        nr: '04',
        title: 'Plaatsing en afwerking',
        text: 'Sanitair, douchecabine of bad, meubels en accessoires worden geplaatst en correct afgewerkt.'
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
            background: var(--md-sys-color-surface);
            border: var(--surface-border);
            border-radius: var(--panel-radius);
            box-shadow: var(--card-shadow);
            padding: clamp(24px, 3.2vw, 42px);
            display: grid;
            gap: 14px;
          }

          .hero {
            background:
              radial-gradient(circle at right top, rgba(168, 84, 39, 0.2), transparent 44%),
              var(--md-sys-color-surface);
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

          .steps {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 14px;
          }

          .step {
            border-radius: 20px;
            border: 1px solid rgba(204, 173, 150, 0.12);
            padding: 18px;
            background: rgba(41, 30, 25, 0.72);
            display: grid;
            gap: 8px;
          }

          .step-nr {
            font-size: 2rem;
            font-weight: 900;
            color: var(--md-sys-color-primary);
            opacity: 0.5;
            line-height: 1;
          }

          @media (max-width: 640px) {
            .steps {
              grid-template-columns: 1fr;
            }
          }
        </style>

        <main>
          <section class="hero">
            <span class="eyebrow">Dienst — Badkamer renovatie</span>
            <h1>Badkamer renovatie in regio Diest</h1>
            <p>
              Van afbraak tot afwerking. Dimac realiseert uw badkamer met oog voor detail,
              technieken en een doordachte aanpak.
            </p>
            <div class="cta-row">
              <a
                class="btn btn-primary"
                href="#!/contact"
                >Vraag een offerte aan</a
              >
              <a
                class="btn btn-secondary"
                href="#!/contact"
                >Contacteer Dimac</a
              >
            </div>
          </section>

          <section>
            <h2>Uw badkamer volledig vernieuwd</h2>
            <p>
              Een badkamer renovatie vraagt meer dan alleen afwerking. Leidingen, technieken en
              materialen moeten correct op elkaar afgestemd zijn om een duurzaam en kwalitatief
              resultaat te garanderen.
            </p>
            <ul>
              <li>Afbraak en constructie</li>
              <li>Sanitaire en elektrische installatie</li>
              <li>Vloer- en wandtegels naar keuze</li>
              <li>Douche, bad, lavabo of inloopdouche</li>
              <li>Meubels en accessoires</li>
              <li>Ventilatie conform normen</li>
            </ul>
          </section>

          <section>
            <h2>Zo verloopt uw badkamerrenovatie</h2>
            <div class="steps">
              ${this.stappen.map(
                (item) => html`
                  <article class="step">
                    <span class="step-nr">${item.nr}</span>
                    <h3>${item.title}</h3>
                    <p>${item.text}</p>
                  </article>
                `
              )}
            </div>
          </section>

          <section>
            <h2>Combineer met een totaalrenovatie</h2>
            <p>
              Plant u ook andere werken in uw woning? Dan is het interessant om de badkamerrenovatie
              te integreren in een ruimer renovatietraject. Zo werken alle onderdelen op elkaar in
              en vermijdt u dubbele kosten.
            </p>
            <a
              class="btn btn-secondary"
              href="#!/totaalrenovatie"
              >Meer over totaalrenovatie</a
            >
          </section>

          <section>
            <h2>Vrijblijvend uw project bespreken?</h2>
            <p>
              Vertel ons wat u voor ogen hebt. Wij bekijken de mogelijkheden en maken een heldere
              offerte op maat.
            </p>
            <div class="cta-row">
              <a
                class="btn btn-primary"
                href="#!/contact"
                >Neem contact op</a
              >
              <a
                class="btn btn-secondary"
                href="#!/services"
                >Bekijk alle diensten</a
              >
            </div>
          </section>
        </main>
      `
    }
  }
)
