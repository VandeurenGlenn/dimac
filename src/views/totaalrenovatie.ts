import { html, LiteElement } from '@vandeurenglenn/lite'

export default customElements.define(
  'totaalrenovatie-view',
  class extends LiteElement {
    private loadedResolve!: (value: boolean) => void
    loaded = new Promise<boolean>((resolve) => {
      this.loadedResolve = resolve
    })

    onderdelen = [
      {
        title: 'Afbraak en ruwbouw',
        text: 'Wij starten met een grondige voorbereiding: sloop, stabilisatie en ruwbouw conform de plannen.'
      },
      {
        title: 'Technieken',
        text: 'Elektriciteit, sanitair en verwarming worden correct aangelegd en geïntegreerd in het project.'
      },
      {
        title: 'Isolatie en bepleistering',
        text: 'Energetisch correct uitgewerkt met aandacht voor normen en comfort.'
      },
      {
        title: 'Schrijnwerk en deuren',
        text: 'Binnendeuren, trappen en schrijnwerk op maat of uit ons aanbod.'
      },
      {
        title: 'Tegelwerk en vloeren',
        text: 'Keramische tegels, parket of vinyl — correct verwerkt met zorgzame afwerking.'
      },
      {
        title: 'Schilderwerken en afwerking',
        text: 'Een verzorgd eindresultaat met gyproc, schilderwerken en decoratieve afwerking.'
      }
    ]

    voordelen = [
      'Één aanspreekpunt voor het volledige project',
      'Geen coördinatieproblemen tussen aannemers',
      'Duidelijke planning en transparante prijs',
      'Van analyse tot oplevering door hetzelfde team',
      'Jarenlange ervaring in regio Diest'
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

          .grid-2 {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 14px;
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
            .grid-2,
            .grid-3 {
              grid-template-columns: 1fr;
            }
          }
        </style>

        <main>
          <section class="hero">
            <span class="eyebrow">Dienst — Totaalrenovatie</span>
            <h1>Totaalrenovatie in regio Diest</h1>
            <p>
              Van afbraak tot afwerking. Dimac begeleidt uw volledige renovatie met één
              aanspreekpunt en een duidelijke aanpak.
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

          <section>
            <h2>Uw woning volledig vernieuwen</h2>
            <p>
              Een totaalrenovatie vraagt een doordachte aanpak en een goede coördinatie van alle
              werken. Dimac begeleidt uw renovatie van begin tot einde, zodat u niet hoeft te werken
              met meerdere aannemers en alles correct op elkaar afgestemd is.
            </p>
          </section>

          <section>
            <h2>Wat doet Dimac bij een totaalrenovatie?</h2>
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
            <h2>Waarom kiezen voor Dimac?</h2>
            <p>
              Een totaalrenovatie impliceert meerdere vakgebieden. Dimac bundelt die expertise en
              stuurt het volledige traject aan, zodat u zich geen zorgen hoeft te maken over
              coördinatie tussen aannemers.
            </p>
            <ul>
              ${this.voordelen.map((v) => html`<li>${v}</li>`)}
            </ul>
          </section>

          <section>
            <h2>Weet u nog niet wat uw woning nodig heeft?</h2>
            <p>
              Start met een woningscan. Dimac brengt uw woning in kaart op meer dan 25 punten en
              geeft u concreet inzicht in de staat, de prioriteiten en de aanpak. Het ideale
              startpunt voor uw totaalrenovatie.
            </p>
            <div class="cta-row">
              <a
                class="btn btn-primary"
                href="#!/woningscan"
                >Ontdek de woningscan</a
              >
              <a
                class="btn btn-secondary"
                href="#!/contact"
                >Stel uw vraag</a
              >
            </div>
          </section>

          <section>
            <h2>Klaar om uw renovatie te starten?</h2>
            <p>
              Neem contact op voor een vrijblijvend gesprek over uw project. Wij luisteren, kijken
              mee en maken een heldere offerte op maat.
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
        </main>
      `
    }
  }
)
