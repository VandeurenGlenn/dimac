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
            height: 100%;
            width: 100%;
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
            text-align: center;
            margin: 16px 0;
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
          <h4>Dimac</h4>
          <h4>Wie we zijn</h4>
        </main>
      `
    }
  }
)
