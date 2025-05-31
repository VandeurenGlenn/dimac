import { html, LiteElement, property } from '@vandeurenglenn/lite'
import '@vandeurenglenn/lite-elements/button.js'
import '@material/web/textfield/outlined-text-field.js'
export default customElements.define(
  'contact-view',
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
          h5 {
            font-size: 24px;
            font-weight: 600;
            text-align: center;
          }
          h6 {
            font-size: 20px;
            font-weight: 500;
            text-align: center;
          }
          p {
            text-align: center;
            margin-bottom: 24px;
          }
          main {
            max-width: 860px;
            margin-bottom: 24px;
            box-sizing: border-box;
            height: 100%;
            display: flex;
            flex-direction: column;
          }
          .row {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-between;
          }
          ul {
            align-items: center;
            display: flex;
            flex-direction: column;
          }

          md-outlined-text-field {
            margin-top: 16px;
            margin-bottom: 8px;
          }

          .row md-outlined-text-field {
            max-width: 48%;
            gap: 16px;
            width: 100%;
          }

          @media (max-width: 1200px) {
            main {
              box-sizing: border-box;
              padding: 0 16px;
            }
            .row md-outlined-text-field {
              max-width: 100%;
            }
          }
        </style>
        <main>
          <h5>Heeft u vragen of wilt u een offerte aanvragen?</h5>
          <h6>Vul onderstaand formulier in en we nemen zo snel mogelijk contact met u op.</h6>
          <small>U kan ons ook bereiken via e-mail of sociale media.</small>
          <span class="row">
            <md-outlined-text-field label="Naam"></md-outlined-text-field>
            <md-outlined-text-field label="E-mail"></md-outlined-text-field>
          </span>
          <md-outlined-text-field label="Onderwerp"></md-outlined-text-field>
          <md-outlined-text-field
            label="Bericht"
            type="textarea"
            textarea></md-outlined-text-field>
          <span
            class="row"
            style="justify-content: center;">
            <custom-button
              type="tertiary"
              style="width: 100%; max-width: 400px; margin-top: 16px;"
              label="Verstuur"
              @click=${() => {
                alert('Bedankt voor uw bericht! We nemen zo snel mogelijk contact met u op.')
              }}></custom-button>
          </span>
        </main>
      `
    }
  }
)
