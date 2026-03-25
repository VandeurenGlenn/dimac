import { html, LiteElement, property } from '@vandeurenglenn/lite'
import '@material/web/textfield/outlined-text-field.js'
import '@material/web/select/outlined-select.js'
import '@material/web/select/select-option.js'
import './../elements/data-input.js'
import { DataInput } from '../elements/data-input.js'
import { MdOutlinedTextField } from '@material/web/textfield/outlined-text-field.js'
import './../elements/section.js'
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
          alert(
            'Er is een fout opgetreden bij het verzenden van uw bericht. Probeer het later opnieuw.'
          )
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
            padding-bottom: 56px;
          }

          main {
            width: 100%;
            max-width: var(--page-max-width);
            display: grid;
            gap: 30px;
          }

          .contact-shell {
            display: grid;
            grid-template-columns: minmax(360px, 0.88fr) minmax(640px, 1.12fr);
            gap: 30px;
            align-items: stretch;
          }

          .intro,
          .form-panel,
          .map-panel {
            position: relative;
            overflow: hidden;
            background: var(--md-sys-color-surface);
            border: var(--surface-border);
            border-radius: var(--panel-radius);
            box-shadow: var(--card-shadow);
          }

          .intro,
          .form-panel {
            padding: clamp(30px, 4vw, 48px);
          }

          .intro > *,
          .form-panel > *,
          .map-panel > * {
            position: relative;
            z-index: 1;
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
            margin: 20px 0 14px;
            font-family: var(--font-display);
            font-size: clamp(2.2rem, 3.35vw, 3.35rem);
            line-height: 0.98;
            color: var(--md-sys-color-on-surface);
          }

          h6 {
            margin: 0;
            font-size: 1.08rem;
            font-weight: 800;
            color: var(--md-sys-color-primary);
          }

          p,
          small {
            color: var(--md-sys-color-on-surface-variant);
            line-height: 1.75;
          }

          .intro-lead {
            margin: 0;
            font-size: 1.04rem;
            line-height: 1.8;
            max-width: 40ch;
          }

          .contact-links {
            display: grid;
            gap: 12px;
            margin-top: 30px;
          }

          .contact-links a {
            display: grid;
            grid-template-columns: auto minmax(0, 1fr);
            align-items: center;
            gap: 12px;
            min-height: 64px;
            padding: 0 18px;
            border-radius: 20px;
            text-decoration: none;
            color: var(--md-sys-color-on-surface);
            background: linear-gradient(180deg, rgba(57, 40, 32, 0.82), rgba(43, 31, 26, 0.94));
            border: 1px solid rgba(204, 173, 150, 0.08);
            transition:
              transform 160ms ease,
              border-color 160ms ease,
              box-shadow 160ms ease;
          }

          .contact-links a:hover {
            transform: translateY(-1px);
            border-color: rgba(168, 84, 39, 0.26);
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.16);
          }

          .contact-links custom-icon {
            font-size: 19px;
            color: var(--md-sys-color-on-surface);
          }

          .contact-links .link-copy {
            display: grid;
            gap: 2px;
          }

          .contact-links .link-label {
            color: var(--md-sys-color-primary);
            font-size: 0.7rem;
            font-weight: 800;
            letter-spacing: 0.12em;
            text-transform: uppercase;
          }

          .contact-links .link-value {
            color: var(--md-sys-color-on-surface);
            font-size: 0.96rem;
            font-weight: 700;
            line-height: 1.25;
          }

          .row {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 18px;
          }

          .column {
            display: flex;
            flex-direction: column;
            gap: 12px;
            width: 100%;
          }

          .form-panel {
            display: grid;
            align-content: start;
            gap: 18px;
          }

          .form-header {
            display: grid;
            gap: 12px;
            margin-bottom: 6px;
          }

          .form-header p {
            margin: 0;
            max-width: 62ch;
          }

          .form-meta {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
          }

          .form-meta span {
            display: inline-flex;
            align-items: center;
            min-height: 34px;
            padding: 0 12px;
            border-radius: 999px;
            background: rgba(36, 27, 23, 0.82);
            border: 1px solid rgba(204, 173, 150, 0.1);
            color: var(--md-sys-color-on-surface);
            font-size: 0.76rem;
            font-weight: 700;
            letter-spacing: 0.04em;
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
            width: 100%;
            margin-top: 0;
            margin-bottom: 0;
            --md-outlined-field-container-shape: 18px;
            --md-outlined-text-field-container-shape: 18px;
            --md-outlined-select-text-field-container-shape: 18px;
            --md-outlined-text-field-outline-color: rgba(204, 173, 150, 0.28);
            --md-outlined-text-field-hover-outline-color: rgba(204, 173, 150, 0.44);
            --md-outlined-text-field-focus-outline-color: var(--md-sys-color-primary);
            --md-outlined-text-field-input-text-color: var(--md-sys-color-on-surface);
            --md-outlined-text-field-label-text-color: rgba(244, 231, 221, 0.72);
            --md-outlined-text-field-focus-label-text-color: var(--md-sys-color-primary);
            --md-outlined-text-field-hover-label-text-color: rgba(244, 231, 221, 0.86);
            --md-outlined-select-text-field-input-text-color: var(--md-sys-color-on-surface);
            --md-outlined-select-text-field-label-text-color: rgba(244, 231, 221, 0.72);
            --md-outlined-select-text-field-focus-label-text-color: var(--md-sys-color-primary);
            --md-outlined-select-text-field-outline-color: rgba(204, 173, 150, 0.28);
            --md-outlined-select-text-field-hover-outline-color: rgba(204, 173, 150, 0.44);
            --md-outlined-select-text-field-focus-outline-color: var(--md-sys-color-primary);
            --md-outlined-select-text-field-container-color: rgba(34, 25, 21, 0.56);
            --md-outlined-text-field-container-color: rgba(34, 25, 21, 0.56);
          }

          md-outlined-text-field[textarea] {
            min-height: 154px;
          }

          .field-block {
            display: grid;
            gap: 18px;
            padding: 22px;
            border-radius: 24px;
            background: linear-gradient(180deg, rgba(48, 35, 29, 0.56), rgba(32, 24, 20, 0.42));
            border: 1px solid rgba(204, 173, 150, 0.08);
          }

          .submit-row {
            margin-top: 8px;
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
            transition:
              transform 160ms ease,
              box-shadow 160ms ease;
          }

          .submit-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 22px 34px rgba(120, 57, 24, 0.22);
          }

          .map-panel {
            overflow: hidden;
          }

          .map-copy {
            padding: 30px 32px 18px;
            display: grid;
            gap: 12px;
          }

          .map-copy p {
            margin: 0;
            max-width: 62ch;
          }

          .map-badges {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
          }

          .map-badges span {
            display: inline-flex;
            align-items: center;
            min-height: 34px;
            padding: 0 12px;
            border-radius: 999px;
            background: rgba(36, 27, 23, 0.82);
            border: 1px solid rgba(204, 173, 150, 0.1);
            color: var(--md-sys-color-on-surface);
            font-size: 0.76rem;
            font-weight: 700;
            letter-spacing: 0.04em;
          }

          @media (max-width: 1200px) {
            .contact-shell {
              grid-template-columns: 1fr;
            }

            h5 {
              font-size: clamp(1.95rem, 6.8vw, 2.85rem);
            }
          }

          @media (max-width: 800px) {
            .row {
              grid-template-columns: 1fr;
            }

            .intro,
            .form-panel {
              padding: 24px;
            }

            .map-copy {
              padding: 24px 24px 16px;
            }
          }
        </style>
        <main>
          <section class="contact-shell">
            <custom-section
              type="hero"
              title="Bespreek uw project met een partner die helder werkt en zorgvuldig oplevert."
              subtitle="We reageren snel, helder en zonder omwegen."
              description="Gebruik het formulier voor een offerte, een technische vraag of een eerste verkenning van uw plannen. Liever rechtstreeks contact? Dat kan ook telefonisch, via e-mail of via WhatsApp."
              eyebrow="Contact">
              <div
                class="contact-links"
                slot="content">
                <a href="tel:013335335"
                  ><custom-icon icon="call"></custom-icon>
                  <span class="link-copy"
                    ><span class="link-label">Telefonisch</span
                    ><span class="link-value">013 33 53 35</span></span
                  ></a
                >
                <a href="mailto:info@dimac.be"
                  ><custom-icon icon="mail"></custom-icon>
                  <span class="link-copy"
                    ><span class="link-label">E-mail</span
                    ><span class="link-value">info@dimac.be</span></span
                  ></a
                >
                <a href="https://wa.me/32473711123"
                  ><custom-icon icon="whatsapp"></custom-icon>
                  <span class="link-copy"
                    ><span class="link-label">WhatsApp</span
                    ><span class="link-value">Stuur ons direct een bericht</span></span
                  ></a
                >
              </div>
            </custom-section>

            <custom-section
              type="hero"
              eyebrow="Formulier">
              <div
                class="field-block"
                slot="content"
                style="margin-top: 0; margin-bottom: 12px;">
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
                    <md-select-option value="projectontwikkeling"
                      >Projectontwikkeling</md-select-option
                    >
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
              </div>
              <span
                class="submit-row"
                slot="footer">
                <button
                  class="submit-button"
                  @click=${this.#send}>
                  Verstuur aanvraag
                </button>
              </span>
            </custom-section>
          </section>

          <section class="map-panel">
            <div class="map-copy">
              <h6>Regio Diest</h6>
              <p>
                We werken in en rond Diest en komen graag ter plaatse kijken om uw project correct
                in te schatten.
              </p>
              <div class="map-badges">
                <span>Ter plaatse bekeken</span>
                <span>Heldere inschatting</span>
                <span>Korte opvolging</span>
              </div>
            </div>
            <iframe
              src="https://maps.google.com/maps?q=Dimac schansstraat&t=&z=17&ie=UTF8&iwloc=&output=embed"></iframe>
          </section>
        </main>
      `
    }
  }
)
