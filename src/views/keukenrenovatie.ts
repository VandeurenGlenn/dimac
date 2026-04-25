import { html, LiteElement } from '@vandeurenglenn/lite'

export default customElements.define(
  'keukenrenovatie-view',
  class extends LiteElement {
    private loadedResolve!: (value: boolean) => void
    loaded = new Promise<boolean>((resolve) => {
      this.loadedResolve = resolve
    })

    onderdelen = [
      {
        title: 'Afbraak en voorbereiding',
        text: 'De bestaande keuken wordt verwijderd en de ruimte klaargezet voor de nieuwe installatie.'
      },
      {
        title: 'Elektriciteit en sanitair',
        text: 'Leidingen en bekabeling worden aangepast aan de indeling van uw nieuwe keuken.'
      },
      {
        title: 'Vloer en wand',
        text: 'Tegelwerk, vloer of achterwand naar keuze, vakkundig verwerkt.'
      },
      {
        title: 'Plaatsing keuken',
        text: 'Uw keukenmeubels, toestellen en afzuigkap worden correct geplaatst en aangesloten.'
      },
      {
        title: 'Werkblad en afwerking',
        text: 'Werkblad op maat, correcte aansluiting en een verzorgd eindresultaat.'
      },
      {
        title: 'Ventilatie',
        text: 'Correcte afvoer voor dampkap en ventilatie, conform de geldende normen.'
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
            <span class="eyebrow">Dienst — Keuken renovatie</span>
            <h1>Keuken renovatie in regio Diest</h1>
            <p>
              Van voorbereiding tot afwerking. Dimac realiseert uw keuken met aandacht voor
              functionaliteit, technieken en een doordachte indeling.
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
            <h2>Uw keuken volledig vernieuwd</h2>
            <p>
              De keuken is één van de meest gebruikte ruimtes in uw woning en vraagt een doordachte
              aanpak. Een renovatie gaat verder dan enkel het plaatsen van kasten en toestellen.
            </p>
            <p>
              Indeling, leidingen en technieken moeten correct op elkaar afgestemd zijn. Dimac
              begeleidt uw keuken renovatie van begin tot einde, met één aanspreekpunt en een
              duidelijke aanpak.
            </p>
          </section>

          <section>
            <h2>Wat is inbegrepen?</h2>
            <div class="grid-3">
              ${this.onderdelen.map(
                (item) =>
                  html`<article class="card">
                    <h3>${item.title}</h3>
                    <p>${item.text}</p>
                  </article>`
              )}
            </div>
          </section>

          <section>
            <h2>Combineer met andere werken</h2>
            <p>
              Plant u naast de keuken ook andere renovatiewerken? Dimac kan uw keukenrenovatie
              eenvoudig integreren in een ruimer renovatietraject, zodat alles efficiënt en
              kostenbesparend wordt uitgevoerd.
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
              Neem contact op voor een eerste gesprek. Wij luisteren naar uw plannen en maken een
              duidelijke offerte op maat.
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
