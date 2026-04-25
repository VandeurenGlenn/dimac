import { html, LiteElement } from '@vandeurenglenn/lite'

export default customElements.define(
  'sanitair-view',
  class extends LiteElement {
    private loadedResolve!: (value: boolean) => void
    loaded = new Promise<boolean>((resolve) => {
      this.loadedResolve = resolve
    })

    diensten = [
      {
        title: 'Nieuwe sanitaire installatie',
        text: 'Volledige aanleg van leidingen, afvoeren en aansluitingen voor nieuwbouw of renovatie.'
      },
      {
        title: 'Vervanging en aanpassing',
        text: 'Verouderde leidingen worden veilig vervangen. Aansluitingen worden aangepast aan uw nieuwe indeling.'
      },
      {
        title: 'Plaatsing sanitair',
        text: 'Lavabo, toilet, douche, bad, bidet en bijhorende toestellen — correct geplaatst en aangesloten.'
      },
      {
        title: 'Keuken en wasmachineaansluiting',
        text: 'Aansluitingen voor vaatwasmachine, wasmachine, droogkast en keukentoestellen.'
      },
      {
        title: 'Regenwaterrecuperatie',
        text: 'Installatie van regenwaterputten en distributiepompen voor hergebruik van regenwater.'
      },
      {
        title: 'Lekkages en herstellingen',
        text: 'Opsporing en correcte herstelling van lekken in leidingen of sanitaire toestellen.'
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

          .grid-3 {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 14px;
          }

          .card {
            border-radius: 20px;
            border: 1px solid rgba(204, 173, 150, 0.12);
            padding: 18px;
            background: rgba(41, 30, 25, 0.72);
            display: grid;
            gap: 8px;
          }

          @media (max-width: 900px) {
            .grid-3 {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
          }

          @media (max-width: 640px) {
            .grid-3 {
              grid-template-columns: 1fr;
            }
          }
        </style>

        <main>
          <section class="hero">
            <span class="eyebrow">Dienst — Sanitair</span>
            <h1>Sanitair als onderdeel van uw bouw- of renovatieproject</h1>
            <p>
              Dimac integreert sanitaire installaties binnen totaalprojecten, met een correcte
              afstemming op alle andere werken.
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
                >Contacteer ons</a
              >
            </div>
          </section>

          <section>
            <h2>Sanitair als deel van het geheel</h2>
            <p>
              Sanitair is een essentieel onderdeel van elke woning en moet correct geïntegreerd
              worden in het volledige project.
            </p>
            <p>
              Binnen een bouw- of renovatieproject zorgen wij ervoor dat leidingen, aansluitingen en
              toestellen afgestemd zijn op de indeling en afwerking.
            </p>
          </section>

          <section>
            <h2>Onze sanitaire diensten</h2>
            <div class="grid-3">
              ${this.diensten.map(
                (item) =>
                  html`<article class="card">
                    <h3>${item.title}</h3>
                    <p>${item.text}</p>
                  </article>`
              )}
            </div>
          </section>

          <section>
            <h2>Sanitair als onderdeel van uw renovatie</h2>
            <p>
              Renoveren vraagt om goede coördinatie tussen sanitair, elektriciteit en afwerking.
              Dimac bundelt deze disciplines in één traject, zodat leidingen en aansluitingen
              correct zitten voor de vloeren en tegels worden gelegd.
            </p>
            <a
              class="btn btn-secondary"
              href="#!/badkamerrenovatie"
              >Meer over badkamerrenovatie</a
            >
          </section>

          <section>
            <h2>Vrijblijvend uw project bespreken?</h2>
            <p>
              Neem contact op voor een eerste gesprek. Dimac geeft u een duidelijk beeld van de
              aanpak en een transparante offerte op maat.
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
