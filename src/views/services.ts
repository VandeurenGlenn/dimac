import { html, LiteElement, property } from '@vandeurenglenn/lite'

export default customElements.define(
  'services-view',
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
            font-size: 24px;
            font-weight: 700;
            text-align: center;
            margin: 16px 0;
          }
          h5 {
            font-size: 20px;
            font-weight: 600;
            text-align: center;
          }
          h6 {
            font-size: 16px;
            font-weight: 500;
            text-align: center;
          }
          main {
            max-width: 860px;
          }

          @media (max-width: 1200px) {
            main {
              box-sizing: border-box;
              padding: 0 16px;
            }
          }
        </style>
        <main>
          <h4>Onze diensten</h4>

          <h5>Nieuwbouw/ruwbouw</h5>
          <h6>Wij bouwen uw woning van A tot Z, volledig naar uw wensen.</h6>

          <h5>Renovaties</h5>
          <h6>Wij renoveren uw woning, van keuken tot badkamer, van zolder tot kelder.</h6>

          <h5>Projectontwikkeling</h5>
          <h6>Wij ontwikkelen uw project, van idee tot realisatie.</h6>

          <h5>Algemene aannemingen (Electriciteit, sanitair...)</h5>
          <h6>Wij verzorgen alle algemene aannemingen, van elektriciteit tot sanitair.</h6>

          <h5>Afwerking (Gyproc, schilderwerken, vloeren...)</h5>
          <h6>Wij zorgen voor de afwerking van uw woning, van gyproc tot schilderwerken en vloeren.</h6>
          <h5>Tuinaanleg</h5>
          <h6>Wij leggen uw tuin aan, van gras tot terras, van beplanting tot verlichting.</h6>
        </main>
      `
    }
  }
)
