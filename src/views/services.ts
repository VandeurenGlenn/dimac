import { html, LiteElement } from '@vandeurenglenn/lite'

import './../elements/section.js'
import './../elements/panel.js'
import './../elements/card.js'
export default customElements.define(
  'services-view',
  class extends LiteElement {
    private loadedResolve!: (value: boolean) => void
    loaded = new Promise<boolean>((resolve) => {
      this.loadedResolve = resolve
    })
    async firstRender(): Promise<void> {
      this.loadedResolve(true)
    }

    services = [
      {
        title: 'Totaalrenovatie',
        kicker: 'Renovatie',
        description:
          'Volledige renovatie van A tot Z, van afbraak en technieken tot afwerking — met één aanspreekpunt.',
        href: '#!/totaalrenovatie',
        icon: 'engineering'
      },
      {
        title: 'Badkamers',
        kicker: 'Interieur',
        description:
          'Badkamers met logische indeling, degelijk sanitair en een afwerking die rust uitstraalt.',
        href: '#!/badkamerrenovatie',
        icon: 'bathtub'
      },
      {
        title: 'Keukens',
        kicker: 'Interieur',
        description:
          'Keukens waarin materiaalkeuze, gebruiksgemak en technische integratie samenkomen.',
        href: '#!/keukenrenovatie',
        icon: 'kitchen'
      },
      {
        title: 'Uitbreidingen & aanbouw',
        kicker: 'Renovatie',
        description:
          'Meer ruimte creëren met een doordachte uitbreiding die logisch aansluit op uw woning.',
        href: '#!/totaalrenovatie',
        icon: 'add_home'
      },
      {
        title: 'Elektriciteit',
        kicker: 'Technieken',
        description:
          'Van nieuwe installaties tot vernieuwing en uitbreiding, helder en veilig uitgevoerd.',
        href: '#!/elektriciteit',
        icon: 'bolt'
      },
      {
        title: 'Sanitair',
        kicker: 'Technieken',
        description:
          'Sanitaire installaties en renovaties met aandacht voor comfort, detail en betrouwbare werking.',
        href: '#!/sanitair',
        icon: 'water_drop'
      },
      {
        title: 'Hernieuwbare energie',
        kicker: 'Duurzaamheid',
        description:
          'Energieoplossingen die rendement combineren met een nette technische integratie in het geheel.',
        href: '#!/hernieuwbare-energie',
        icon: 'solar_power'
      },
      {
        title: 'Dakwerken',
        kicker: 'Buitenschil',
        description:
          'Dakwerken die structuur, waterdichtheid en afwerking correct samenbrengen in één verzorgd geheel.',
        href: '#!/dakwerken',
        icon: 'roofing'
      },
      {
        title: 'Afwerking',
        kicker: 'Afwerking',
        description:
          'Vloeren, schilderwerken en gyproc omkastingen — alle afwerking strak weggewerkt in één traject.',
        href: '#!/afwerking',
        icon: 'format_paint'
      }
    ]

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

          *,
          *::before,
          *::after {
            box-sizing: border-box;
          }

          main {
            width: 100%;
            max-width: var(--page-max-width);
            display: grid;
            gap: 28px;
          }

          .intro,
          .process {
            background: var(--md-sys-color-surface);
            border: var(--surface-border);
            border-radius: var(--panel-radius);
            box-shadow: var(--card-shadow);
          }

          .intro {
            padding: clamp(32px, 4vw, 52px);
            display: grid;
            gap: 16px;
          }

          .eyebrow {
            display: inline-flex;
            width: fit-content;
            padding: 8px 14px;
            border-radius: 999px;
            background: rgba(168, 84, 39, 0.1);
            color: var(--md-sys-color-primary);
            text-transform: uppercase;
            letter-spacing: 0.12em;
            font-size: 12px;
            font-weight: 800;
          }

          h4 {
            font-family: var(--font-display);
            font-size: var(--hero-title-size);
            line-height: var(--hero-title-line-height);
            margin: 0;
            color: var(--md-sys-color-on-surface);
          }

          p {
            margin: 0;
            max-width: 60ch;
            line-height: 1.8;
            color: var(--md-sys-color-on-surface-variant);
          }

          .process {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 22px;
            padding: 28px 32px;
          }

          .process article {
            display: grid;
            gap: 8px;
          }

          .process strong {
            color: var(--md-sys-color-primary);
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-size: 12px;
          }

          .card-container {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 18px;
            width: 100%;
          }

          .svc-card {
            display: flex;
            flex-direction: column;
            gap: 12px;
            padding: 22px;
            border-radius: 18px;
            text-decoration: none;
            color: inherit;
            background:
              radial-gradient(circle at top left, rgba(168, 84, 39, 0.1), transparent 60%),
              linear-gradient(180deg, rgba(35, 26, 22, 0.94), rgba(22, 16, 13, 0.96));
            border: 1px solid rgba(168, 84, 39, 0.2);
            position: relative;
            top: 0;
            transition:
              top 180ms ease,
              border-color 220ms ease,
              background 220ms ease;
          }

          .svc-card:hover {
            top: -3px;
            border-color: rgba(168, 84, 39, 0.5);
          }

          .svc-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 56px;
            height: 56px;
            border-radius: 16px;
            background: rgba(168, 84, 39, 0.12);
            color: var(--md-sys-color-primary);
            margin-bottom: 4px;
          }

          .svc-icon custom-icon {
            --custom-icon-size: 30px;
            font-size: 30px;
          }

          .svc-kicker {
            display: inline-flex;
            width: fit-content;
            padding: 4px 10px;
            border-radius: 999px;
            background: rgba(168, 84, 39, 0.14);
            color: var(--md-sys-color-primary);
            text-transform: uppercase;
            letter-spacing: 0.1em;
            font-size: 10px;
            font-weight: 800;
          }

          .svc-card h3 {
            margin: 0;
            font-family: var(--font-display);
            font-size: 1.3rem;
            line-height: 1.15;
            color: var(--md-sys-color-on-surface);
          }

          .svc-card p {
            font-size: 0.9rem;
            line-height: 1.6;
            margin: 0;
          }

          @media (max-width: 1100px) {
            .card-container {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
          }

          @media (max-width: 800px) {
            .process,
            .card-container {
              grid-template-columns: 1fr;
            }
          }
        </style>
        <main>
          <custom-section
            type="hero"
            title="Renovatie en bouw in regio Diest"
            description="Van technieken tot afwerking. Dimac begeleidt uw project van A tot Z met één aanspreekpunt en duidelijke opvolging."
            eyebrow="onze diensten">
            <custom-panel slot="content">
              <custom-card
                title="Analyse"
                description="We luisteren naar uw project en vertalen het naar een haalbare aanpak met aandacht voor gebruik en kwaliteit."></custom-card>

              <custom-card
                title="Uitvoering"
                description="Eigen vakkennis en betrouwbare partners houden de uitvoering consequent en correct, van begin tot einde."></custom-card>

              <custom-card
                title="Oplevering"
                description="Alles wordt correct afgewerkt en opgeleverd. U heeft één aanspreekpunt doorheen het hele traject."></custom-card>
            </custom-panel>
          </custom-section>

          <div class="card-container">
            ${this.services.map(
              (s) => html`
                <a
                  class="svc-card"
                  href="${s.href}">
                  <span class="svc-icon"><custom-icon icon="${s.icon}"></custom-icon></span>
                  <span class="svc-kicker">${s.kicker}</span>
                  <h3>${s.title}</h3>
                  <p>${s.description}</p>
                </a>
              `
            )}
          </div>
        </main>
      `
    }
  }
)
