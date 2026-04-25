import { html, LiteElement } from '@vandeurenglenn/lite'

export default customElements.define(
  'nieuwbouw-view',
  class extends LiteElement {
    private loadedResolve!: (value: boolean) => void
    loaded = new Promise<boolean>((resolve) => {
      this.loadedResolve = resolve
    })

    fases = [
      {
        title: 'Voorbereiding en vergunning',
        text: 'Samen met de architect en bevoegde instanties zorgen wij voor de juiste vergunning en voorbereiding.'
      },
      {
        title: 'Ruwbouw en stabilisatie',
        text: 'Funderingen, draagstructuur en dakwerken worden vakkundig gerealiseerd.'
      },
      {
        title: 'Technieken',
        text: 'Elektriciteit, sanitair en HVAC worden geïntegreerd conform de plannen en normen.'
      },
      {
        title: 'Isolatie en afwerking',
        text: 'Energieprestatie staat centraal: correcte isolatie en een hoogwaardige binnenafwerking.'
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

          .grid-2 {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
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

          @media (max-width: 640px) {
            .grid-2 {
              grid-template-columns: 1fr;
            }
          }
        </style>

        <main>
          <section class="hero">
            <span class="eyebrow">Dienst — Nieuwbouw</span>
            <h1>Nieuwbouw in regio Diest</h1>
            <p>
              Van eerste plannen tot oplevering. Dimac realiseert uw nieuwbouwwoning met oog voor
              kwaliteit, detail en een duidelijke aanpak.
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
            <h2>Uw nieuwbouwwoning van A tot Z</h2>
            <p>
              Een nieuwbouwproject vraagt een goede voorbereiding, duidelijke keuzes en een correcte
              uitvoering. Dimac begeleidt uw project van de eerste plannen tot de oplevering, met
              één aanspreekpunt en een gestructureerde aanpak.
            </p>
            <p>Indien gewenst kunnen wij ook instaan voor de afwerking rondom de woning.</p>
          </section>

          <section>
            <h2>Hoe verloopt een nieuwbouwproject?</h2>
            <div class="grid-2">
              ${this.fases.map(
                (item) =>
                  html`<article class="card">
                    <h3>${item.title}</h3>
                    <p>${item.text}</p>
                  </article>`
              )}
            </div>
          </section>

          <section>
            <h2>Wat Dimac biedt</h2>
            <ul>
              <li>Samenwerking met uw architect of aanbeveling van een architect in de regio</li>
              <li>Volledige coördinatie van ruwbouw tot afwerking</li>
              <li>Transparante offerte en duidelijke planning</li>
              <li>Één aanspreekpunt doorheen het hele project</li>
              <li>Energiezuinige uitvoering conform EPB-eisen</li>
            </ul>
          </section>

          <section>
            <h2>Klaar om te starten?</h2>
            <p>
              Vertel ons over uw project. Wij luisteren naar uw plannen, kijken mee naar de
              haalbaarheden en maken een heldere offerte op maat.
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
