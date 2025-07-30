import { html, LiteElement, property } from '@vandeurenglenn/lite'
import '@vandeurenglenn/lite-elements/button.js'
import '@material/web/textfield/outlined-text-field.js'
import '@material/web/select/outlined-select.js'
import '@material/web/select/select-option.js'
import './../elements/data-input.js'
import { DataInput } from '../elements/data-input.js'
import { MdOutlinedTextField } from '@material/web/textfield/outlined-text-field.js'
export default customElements.define(
  'contact-view',
  class extends LiteElement {
    firstRender(): void {
      this.addListener('click', (e) => {
        this.shadowRoot.querySelector('data-input').dropdown.open = false
      })

      // iOS keyboard fix using Visual Viewport API
      if ('visualViewport' in window) {
        window.visualViewport.addEventListener('resize', () => {
          const active = this.shadowRoot.activeElement as HTMLElement
          if (
            active &&
            (active.tagName === 'MD-OUTLINED-TEXT-FIELD' ||
              active.tagName === 'DATA-INPUT' ||
              active.tagName === 'MD-OUTLINED-SELECT')
          ) {
            // Scroll the active input into view if it's hidden by the keyboard
            setTimeout(() => {
              active.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }, 100)
          }
        })
      }
    }

    #send = async () => {
      const inputs = this.shadowRoot.querySelectorAll(
        'md-outlined-text-field, md-outlined-select, data-input'
      ) as NodeListOf<DataInput | MdOutlinedTextField>
      const values = Array.from(inputs).map((input) => input.value)
      console.log('Values:', values)
      console.log('Inputs:', inputs)

      let valid = true
      const data = {}
      for (const input of inputs) {
        if (input.required && !input.value) {
          valid = false
          input.reportValidity()
        } else {
          data[input.dataset.label] = input.place?.formattedAddress || input.value
        }
      }
      if (valid) {
        const response = await fetch('https://keepit.dimac.be/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        if (!response.ok) {
          alert('Er is een fout opgetreden bij het verzenden van uw bericht. Probeer het later opnieuw.')
          return
        }
        inputs.forEach((input) => {
          input.value = ''
        })
        alert('Bedankt voor uw bericht! We nemen zo snel mogelijk contact met u op.')
      }
    }
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

            gap: 8px;
          }
          .column {
            display: flex;
            flex-direction: column;

            gap: 8px;
            width: 100%;
          }
          ul {
            align-items: center;
            display: flex;
            flex-direction: column;
          }

          iframe {
            width: 100%;
            min-height: 420px;
            margin-top: 72px;
            border: none;
            border-radius: var(--md-sys-shape-corner-medium);
          }

          md-outlined-text-field,
          md-outlined-select,
          data-input {
            flex: 1;
            margin-top: 16px;
            margin-bottom: 16px;
          }

          @media (max-width: 1200px) {
            main {
              box-sizing: border-box;
              padding: 0 16px;
            }
            .row md-outlined-text-field,
            .row md-outlined-select,
            md-outlined-select-option {
              max-width: 100%;
            }
          }
        </style>
        <main>
          <h5>Heeft u vragen of wilt u een offerte aanvragen?</h5>
          <h6>Vul onderstaand formulier in en we nemen zo snel mogelijk contact met u op.</h6>
          <span class="row">
            <md-outlined-text-field
              label="Naam"
              data-label="name"
              required></md-outlined-text-field>
            <data-input
              label="adres"
              data-label="address"
              required
              type="place">
              <custom-icon
                slot="leading-icon"
                icon="location_on"></custom-icon
            ></data-input>
            <custom-dropdown></custom-dropdown>
          </span>

          <span class="row">
            <md-outlined-text-field
              data-label="phoneNumber"
              label="Telefoon"
              type="tel"
              pattern="^+?[0-9s-()]{7,15}$"
              required></md-outlined-text-field>
            <md-outlined-text-field
              label="E-mail"
              data-label="email"
              type="email"
              pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
              required></md-outlined-text-field>
          </span>
          <span class="row">
            <md-outlined-select
              label="Project type"
              data-label="projectType"
              required>
              <md-select-option value="nieuwbouw">Nieuwbouw</md-select-option>
              <md-select-option value="renovatie">Renovatie</md-select-option>
              <md-select-option value="projectontwikkeling">Projectontwikkeling</md-select-option>
              <md-select-option value="overig">Overig</md-select-option>
            </md-outlined-select>
            <md-outlined-select
              label="Onderwerp"
              data-label="subject"
              required>
              <md-select-option value="offerte">Offerte</md-select-option>
              <md-select-option value="vraag">Vraag</md-select-option>
              <md-select-option value="samenwerking">Samenwerking</md-select-option>
              <md-select-option value="overig">Overig</md-select-option>
            </md-outlined-select>
          </span>
          <md-outlined-text-field
            label="Bericht"
            data-label="message"
            type="textarea"
            required
            textarea></md-outlined-text-field>
          <span
            class="column"
            style="align-items: center;">
            <small><strong>tip:</strong> U kan ons ook bereiken via e-mail of whatsapp.</small>
            <custom-button
              type="tertiary"
              style="width: 100%; max-width: 400px; margin-top: 16px;"
              label="Verstuur"
              @click=${this.#send}></custom-button>
          </span>

          <iframe
            src="https://maps.google.com/maps?q=Dimac&t=&z=17&ie=UTF8&iwloc=&output=embed"
            }></iframe>
        </main>
      `
    }
  }
)
