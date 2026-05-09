import { html, LiteElement } from '@vandeurenglenn/lite'
import './../elements/section.js'

export default customElements.define(
  'about-view',
  class extends LiteElement {
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

          a {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-height: 52px;
            padding: 0 22px;
            border-radius: 999px;
            font-weight: 800;
            text-decoration: none;
            margin-top: 24px;
            background: linear-gradient(135deg, var(--md-sys-color-primary), #8c421b);
            color: var(--md-sys-color-on-primary);
            box-shadow: 0 18px 32px rgba(120, 57, 24, 0.18);
          }

          main {
            width: 100%;
            max-width: var(--page-max-width);
            display: grid;
            gap: 28px;
          }

          .story {
            background: var(--md-sys-color-surface);
            border: var(--surface-border);
            border-radius: var(--panel-radius);
            box-shadow: var(--card-shadow);
          }

          .hero {
            display: grid;
            grid-template-columns: minmax(0, 1.25fr) minmax(360px, 0.75fr);
            align-items: start;
            gap: 28px;
            overflow: hidden;
            position: relative;
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
            margin: 14px 0 10px;
            color: var(--md-sys-color-on-surface);
          }

          h5 {
            font-size: 1.2rem;
            font-weight: 800;
            margin: 0 0 12px;
            color: var(--md-sys-color-primary);
          }

          h6 {
            font-size: 1rem;
            font-weight: 800;
            margin: 0 0 10px;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: var(--md-sys-color-on-surface);
          }

          p {
            margin: 0 0 14px;
            line-height: 1.75;
            color: var(--md-sys-color-on-surface-variant);
            max-width: 58ch;
          }

          .story {
            display: grid;
            grid-template-columns: minmax(0, 1.15fr) minmax(320px, 0.85fr);
            gap: 28px;
            padding: clamp(24px, 3vw, 36px);
          }

          .reasons {
            padding: 16px 0 0;
            display: grid;
            gap: 18px;
          }

          .reasons h6 {
            margin: 0;
            font-family: var(--font-display);
            font-size: 1.6rem;
            font-weight: 800;
            text-transform: none;
            letter-spacing: 0;
            color: var(--md-sys-color-on-surface);
          }

          ul {
            margin: 0;
            padding: 0;
            list-style: none;
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 14px;
          }

          li {
            display: flex;
            align-items: flex-start;
            gap: 14px;
            padding: 18px 20px;
            border-radius: 22px;
            background:
              radial-gradient(circle at top left, rgba(168, 84, 39, 0.1), transparent 65%),
              linear-gradient(180deg, rgba(35, 26, 22, 0.94), rgba(22, 16, 13, 0.96));
            border: 1px solid rgba(168, 84, 39, 0.18);
            transition:
              transform 180ms ease,
              border-color 180ms ease;
          }

          li:hover {
            transform: translateY(-2px);
            border-color: rgba(168, 84, 39, 0.4);
          }

          .reason-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 42px;
            height: 42px;
            border-radius: 14px;
            background: rgba(168, 84, 39, 0.14);
            color: var(--md-sys-color-primary);
            flex-shrink: 0;
          }

          .reason-icon custom-icon {
            --custom-icon-size: 22px;
            font-size: 22px;
          }

          .reason-text {
            display: flex;
            flex-direction: column;
            gap: 2px;
            min-width: 0;
          }

          .reason-text strong {
            font-size: 1rem;
            color: var(--md-sys-color-on-surface);
            font-weight: 800;
            line-height: 1.25;
          }

          .reason-text span {
            font-size: 0.88rem;
            color: var(--md-sys-color-on-surface-variant);
            line-height: 1.5;
          }

          .stat-card {
            box-sizing: border-box;
            display: grid;
            gap: 14px;
            align-content: start;
            align-self: start;
            justify-self: end;
            width: min(100%, 320px);
            min-height: 0;
            padding: 20px;
            border-radius: 22px;
            background: linear-gradient(180deg, rgba(168, 84, 39, 0.22), rgba(168, 84, 39, 0.08));
            border: 1px solid rgba(168, 84, 39, 0.18);
          }

          .stat-card strong {
            font-family: var(--font-display);
            font-size: 1.7rem;
            color: var(--md-sys-color-on-surface);
          }

          .stat-card span {
            line-height: 1.6;
            font-size: 0.95rem;
            color: var(--md-sys-color-on-surface-variant);
          }

          @media (max-width: 1200px) {
            .hero,
            .story {
              grid-template-columns: 1fr;
            }

            ul {
              grid-template-columns: 1fr;
            }

            .stat-card {
              justify-self: stretch;
              width: 100%;
            }
          }
        </style>
        <main>
          <custom-section
            type="hero"
            eyebrow="Over Dimac"
            title="Een bouwpartner die technische kennis, verzorgde uitvoering en betrouwbaar overleg samenbrengt."
            subtitle="Van vastgoed tot vakmanschap">
            <div
              slot="content"
              class="hero">
              <div>
                <p>
                  Dimac BV groeide vanuit een duidelijke voorkeur voor degelijk werk, correcte
                  uitvoering en duurzame keuzes.
                </p>
                <p>
                  Vanuit vastgoed groeiden we door naar het realiseren van betaalbare, hoogwaardig
                  afgewerkte bouwprojecten waarin planning en afwerking even belangrijk zijn.
                </p>
                <p>
                  Wat ons drijft is eenvoudig: oog voor detail, sterke uitvoering en klanten die
                  achteraf met overtuiging terugkijken.
                </p>
                <a href="#!/contact">Bespreek uw project</a>
              </div>
              <aside
                class="stat-card"
                slot="content">
                <strong>1 partner</strong>
                <span
                  >Voor technieken, automatisatie en dakwerken zonder versnipperde
                  communicatie.</span
                >
                <strong>Tijdloze uitvoering</strong>
                <span
                  >Geen vluchtige trends, wel oplossingen die technisch kloppen en esthetisch rustig
                  blijven.</span
                >
              </aside>
            </div>
          </custom-section>
          <section class="hero"></section>

          <section class="story">
            <div>
              <h6>Wat doen we?</h6>
              <p>
                We ontwikkelen en realiseren onze eigen projecten, maar zetten onze kennis en
                vakmanschap ook in voor particuliere klanten.
              </p>
              <p>
                Met een focus op technieken, automatisatie en dakwerken staat Dimac voor heldere
                planning, consequente uitvoering en samenwerking met betrouwbare vakmensen en
                leveranciers.
              </p>
            </div>
            <div>
              <h6>Samenwerken?</h6>
              <p>
                Neem vrijblijvend contact op. We bekijken graag hoe uw project technisch en
                esthetisch juist kan worden aangepakt.
              </p>
            </div>
          </section>

          <section class="reasons">
            <h6>Waarom kiezen voor Dimac?</h6>
            <ul>
              ${[
                {
                  icon: 'engineering',
                  title: 'Eigen team van vaklui',
                  text: 'Vaste mensen en vertrouwde uitvoerende partners.'
                },
                {
                  icon: 'cheer',
                  title: 'Onberispelijke afwerking',
                  text: 'Met aandacht voor proportie, materiaal en detail.'
                },
                {
                  icon: 'phone_in_talk',
                  title: 'Heldere communicatie',
                  text: 'Korte opvolging van offerte tot oplevering.'
                },
                {
                  icon: 'home_repair_service',
                  title: 'Ontwikkelaar én aannemer',
                  text: 'Met ervaring en zicht op het volledige project.'
                },
                {
                  icon: 'checklist',
                  title: 'Correcte prijzen',
                  text: 'Zonder in te boeten op kwaliteit of duurzaamheid.'
                }
              ].map(
                (r) => html`
                  <li>
                    <span class="reason-icon"><custom-icon icon="${r.icon}"></custom-icon></span>
                    <span class="reason-text">
                      <strong>${r.title}</strong>
                      <span>${r.text}</span>
                    </span>
                  </li>
                `
              )}
            </ul>
          </section>
        </main>
      `
    }
  }
)
