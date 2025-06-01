import { html, LiteElement, property } from '@vandeurenglenn/lite'

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
          }

          a {
            display: inline-block;
            background: var(--accent-color);
            color: #fff;
            padding: 12px 24px;
            border-radius: 4px;
            font-weight: 700;
            text-decoration: none;
            margin-top: 24px;
          }
          h4 {
            font-size: 32px;
            font-weight: 700;
          }
          h5 {
            font-size: 24px;
            font-weight: 600;
          }
          h6 {
            font-size: 20px;
            font-weight: 500;
          }
          p {
            margin-bottom: 24px;
          }
          main {
            max-width: 860px;
            margin-bottom: 24px;
            box-sizing: border-box;
            height: 100%;
          }

          img {
            position: absolute;
            top: 54px;
            left: 0;
            bottom: 0;
            width: 100%;
            height: calc(100% - 54px);
            opacity: 0.2;
            z-index: -1;
            pointer-events: none;
          }

          @media (max-width: 1200px) {
            main {
              box-sizing: border-box;
              padding: 0 16px;
            }
          }
        </style>
        <main>
          <img
            src="./assets/sketch.svg"
            alt="Sketch" />
          <h4>Dimac BV</h4>
          <h5>Bouwkwaliteit tot in de puntjes.</h5>

          <h6>Van vastgoed tot vakmanschap</h6>
          <p>Dimac BV is gegroeid uit een passie voor kwaliteit.</p>
          <p>
            Waar we ooit begonnen als immokantoor, vonden we onze echte voldoening in het realiseren van betaalbare,
            hoogwaardig afgewerkte bouwprojecten.
          </p>
          <p>Wat ons drijft? Oog voor detail, sterke uitvoering en klanten die écht tevreden zijn.</p>
          <h6>Wat doen we?</h6>
          <p>
            We ontwikkelen en realiseren onze eigen projecten, maar vanaf nu zetten we onze kennis en vakmanschap ook in
            voor particuliere klanten. Of het nu gaat om een nieuwbouw, renovatie of totaalproject: Dimac staat voor een
            strakke planning, afwerking tot in de kleinste details en samenwerking met betrouwbare vakmannen en
            leveranciers.
          </p>
          <h6>Waarom kiezen voor Dimac?</h6>
          <ul>
            <li>Eigen team van vaklui</li>
            <li>Onberispelijke afwerking</li>
            <li>Heldere communicatie en opvolging</li>
            <li>Ervaring als ontwikkelaar én aannemer</li>
            <li>Correcte prijzen zonder in te boeten op kwaliteit</li>
          </ul>
          <h6>Samenwerken?</h6>
          <p>Neem vrijblijvend contact op. We bekijken graag hoe we jouw droomproject kunnen realiseren.</p>
        </main>
      `
    }
  }
)
