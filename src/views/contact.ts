import { html, LiteElement, property } from '@vandeurenglenn/lite'
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
        ;(this.shadowRoot.querySelector('data-input') as DataInput | null)?.dropdown &&
          ((this.shadowRoot.querySelector('data-input') as DataInput).dropdown.open = false)
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
          data[input.dataset.label] = (input as DataInput).place?.formattedAddress || input.value
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
            width: 100%;
            padding-bottom: 48px;
          }

          main {
            width: 100%;
            max-width: var(--page-max-width);
            display: grid;
            gap: 28px;
          }

          .contact-shell {
            display: grid;
            grid-template-columns: minmax(360px, 0.78fr) minmax(720px, 1.22fr);
            gap: 28px;
          }

          .intro,
          .form-panel,
          .map-panel {
            background: var(--md-sys-color-surface);
            border: var(--surface-border);
            border-radius: var(--panel-radius);
            box-shadow: var(--card-shadow);
          }

          .intro,
          .form-panel {
            padding: clamp(28px, 4vw, 48px);
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

          h5 {
            margin: 18px 0 12px;
            font-family: var(--font-display);
            font-size: var(--hero-title-size);
            line-height: var(--hero-title-line-height);
            color: var(--md-sys-color-on-surface);
          }

          h6 {
            margin: 0 0 16px;
            font-size: 1.15rem;
            font-weight: 700;
            color: var(--md-sys-color-primary);
          }

          p,
          li,
          small {
            color: var(--md-sys-color-on-surface-variant);
            line-height: 1.75;
          }

          ul {
            list-style: none;
            padding: 0;
            margin: 24px 0 0;
            display: grid;
            gap: 12px;
          }

          li {
            padding: 14px 16px;
            border-radius: 18px;
            background: var(--surface-soft);
            border: 1px solid rgba(204, 173, 150, 0.08);
          }

          .contact-links {
            display: grid;
            gap: 12px;
            margin-top: 24px;
          }

          .contact-links a {
            display: inline-flex;
            align-items: center;
            gap: 12px;
            min-height: 52px;
            padding: 0 18px;
            border-radius: 18px;
            text-decoration: none;
            color: var(--md-sys-color-on-surface);
            background: var(--surface-soft);
            border: 1px solid rgba(204, 173, 150, 0.08);
          }

          .row {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-between;
            gap: 18px;
          }
          .column {
            display: flex;
            flex-direction: column;
            gap: 12px;
            width: 100%;
          }

          iframe {
            width: 100%;
            min-height: 420px;
            border: none;
            border-radius: 0 0 var(--panel-radius) var(--panel-radius);
          }

          md-outlined-text-field,
          md-outlined-select,
          data-input {
            flex: 1;
            margin-top: 0;
            margin-bottom: 0;
          }

          .submit-row {
            margin-top: 20px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 14px;
          }

          .submit-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-height: 54px;
            padding: 0 24px;
            border: none;
            border-radius: 999px;
            background: linear-gradient(135deg, var(--md-sys-color-primary), #8c421b);
            color: var(--md-sys-color-on-primary);
            font-weight: 800;
            cursor: pointer;
            box-shadow: 0 18px 32px rgba(120, 57, 24, 0.18);
          }

          .map-panel {
            overflow: hidden;
          }

          .map-copy {
            padding: 28px 32px 0;
          }

          @media (max-width: 1200px) {
            .contact-shell {
              grid-template-columns: 1fr;
            }
          }

          @media (max-width: 800px) {
            .row {
              flex-direction: column;
            }
          }
        </style>
        <main>
          <section class="contact-shell">
            <aside class="intro">
              <span class="eyebrow">Contact</span>
              <h5>Bespreek uw project met een partner die helder werkt en zorgvuldig oplevert.</h5>
              <h6>We reageren snel, helder en zonder omwegen.</h6>
              <p>
                Gebruik het formulier voor een offerte, een technische vraag of een eerste verkenning van uw plannen.
                Liever rechtstreeks contact? Dat kan ook telefonisch, via e-mail of via WhatsApp.
              </p>

              <ul>
                <li>Een realistische eerste inschatting van scope, timing en aanpak.</li>
                <li>Korte communicatielijnen tijdens voorbereiding en uitvoering.</li>
                <li>Focus op haalbaarheid, kwaliteit en een verzorgde oplevering.</li>
              </ul>

              <div class="contact-links">
                <a href="tel:013335335"><custom-icon icon="call"></custom-icon>013 33 53 35</a>
                <a href="mailto:info@dimac.be"><custom-icon icon="mail"></custom-icon>info@dimac.be</a>
                <a href="https://wa.me/32473711123"><custom-icon icon="whatsapp"></custom-icon>WhatsApp</a>
              </div>
            </aside>

            <section class="form-panel">
              <span class="row">
                <md-outlined-text-field
                  label="Naam"
                  data-label="name"
                  required></md-outlined-text-field>
                <data-input
                  label="Adres"
                  data-label="address"
                  required
                  type="place"></data-input>
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
              <span class="submit-row">
                <small><strong>Tip:</strong> U kan ons ook bereiken via e-mail of WhatsApp.</small>
                <button
                  class="submit-button"
                  @click=${this.#send}>
                  Verstuur aanvraag
                </button>
              </span>
            </section>
          </section>

          <section class="map-panel">
            <div class="map-copy">
              <h6>Regio Diest</h6>
              <p>We werken in en rond Diest en komen graag ter plaatse kijken om uw project correct in te schatten.</p>
            </div>
            <iframe
              src="https://maps.google.com/maps?q=Dimac schansstraat&t=&z=17&ie=UTF8&iwloc=&output=embed"></iframe>
          </section>
        </main>
      `
    }
  }
)
