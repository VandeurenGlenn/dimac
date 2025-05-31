import { html, css, LiteElement, property, query } from '@vandeurenglenn/lite'
import '@vandeurenglenn/lite-elements/dropdown.js'
import { CustomDropdown } from '@vandeurenglenn/lite-elements/dropdown.js'

import '@vandeurenglenn/lite-elements/icon.js'
import '@vandeurenglenn/lite-elements/list-item.js'
import { CustomSelector } from '@vandeurenglenn/lite-elements/selector'
import '@vandeurenglenn/lite-elements/selector.js'
import '@material/web/textfield/outlined-text-field.js'

export class DataInput extends LiteElement {
  @property({ type: String }) accessor label = ''

  @property({ type: String }) accessor value = ''

  @property({ type: String }) accessor type: 'text' | 'number' | 'place' = 'text'

  @property({ type: Object }) accessor place: { formattedAddress: string; displayName: string }
  @property({ type: Boolean }) accessor required

  @query('custom-dropdown') accessor dropdown: CustomDropdown
  @query('custom-selector') accessor selector: CustomSelector

  checkValidity = () => {
    const input = this.shadowRoot.querySelector('md-outlined-text-field')
    if (input) {
      return input.checkValidity()
    }
    return true
  }
  reportValidity = () => {
    const input = this.shadowRoot.querySelector('md-outlined-text-field')
    if (input) {
      if (this.type === 'place' && !this.place) {
        input.setCustomValidity('Please select a place from the suggestions.')
      } else {
        input.setCustomValidity('')
      }
      return input.reportValidity()
    }
    return true
  }

  static styles = [
    css`
      :host {
        display: flex;
        height: 56px;
        width: 100%;
        flex: 1;
        position: relative;
      }
      li {
        appearance: none;
        display: flex;
        flex-direction: row;
        padding: 16px;
        box-sizing: border-box;
        border-bottom: 1px solid var(--md-sys-color-outline);
        cursor: pointer;
      }

      li * {
        pointer-events: none;
      }

      custom-icon {
        margin-right: 12px;
      }

      custom-dropdown {
        overflow-y: auto;
        max-height: 300px;
        margin-top: 64px;
        max-width: 320px;
        min-width: 200px;
        width: fit-content;
        border-radius: 8px;
        border: 2px solid var(--md-sys-color-outline);
      }

      md-outlined-text-field {
        flex: 1;
        width: 100%;
      }
      custom-icon {
        margin-left: 12px;
      }
    `
  ]

  _change = (e: Event) => {
    const value = (e.target as HTMLInputElement).value

    if (this.timeout) clearTimeout(this.timeout)
    this.timeout = setTimeout(async () => {
      this.value = value
      this.dispatchEvent(
        new CustomEvent('data-input-changed', {
          detail: { value: this.value },
          bubbles: true,
          composed: true
        })
      )
      if (this.type === 'place') {
        // Add an initial request body.
        const { Place, AutocompleteSessionToken, AutocompleteSuggestion } = await google.maps.importLibrary('places')
        let request = {
          input: this.value
        }

        // Create a session token.
        const token = new AutocompleteSessionToken()
        // Add the token to the request.
        // @ts-ignore
        request.sessionToken = token
        // Fetch autocomplete suggestions.
        const { suggestions } = await AutocompleteSuggestion.fetchAutocompleteSuggestions(request)

        const selector = this.selector
        selector.innerHTML = '' // Clear previous results.
        this.suggestions = suggestions
        let i = 0
        for (let suggestion of suggestions) {
          const placePrediction = suggestion.placePrediction
          console.log(placePrediction)

          // Create a new list element.
          const listItem = document.createElement('li')
          const body = `
        <custom-icon icon="location_on"></custom-icon>
        <div class="body">
          <div class="title">${placePrediction.mainText}</div>
          ${
            placePrediction.secondaryText && placePrediction.secondaryText !== 'null'
              ? `<div class="subtitle">${placePrediction.secondaryText}</div>`
              : ''
          }
          
        </div>
        `
          listItem.innerHTML = body
          listItem.dataset.index = i.toString()
          i++
          selector.appendChild(listItem)
        }

        if (suggestions.length > 0) {
          // @ts-ignore

          this.dropdown.open = true
        }
        // let place = suggestions[0].placePrediction.toPlace() // Get first predicted place.
        // await place.fetchFields({
        //   fields: ['displayName', 'formattedAddress']
        // })
      }
    }, 300)
  }

  select = async (event: CustomEvent) => {
    console.log(event.detail)
    let place = this.suggestions[event.detail].placePrediction.toPlace() // Get first predicted place.
    const fields = await place.fetchFields({
      fields: ['displayName', 'formattedAddress']
    })
    console.log(fields)

    console.log(fields.place.displayName)

    this.place = fields.place

    this.value = fields.place.displayName
    this.dispatchEvent(
      new CustomEvent('data-input-changed', {
        detail: { value: this.value },
        bubbles: true,
        composed: true
      })
    )
    this.dropdown.open = false
  }
  render() {
    return html`
      <md-outlined-text-field
        @input=${(e) => this._change(e)}
        .type=${this.type}
        .label=${this.label}
        ?required=${this.required}
        .value=${this.value}>
        ${this.type === 'place'
          ? html`<custom-icon
              slot="leading-icon"
              icon="location_on"></custom-icon>`
          : html`<custom-icon
              slot="leading-icon"
              icon="info"></custom-icon>`}</md-outlined-text-field
      >

      <custom-dropdown
        ><custom-selector
          attr-for-selected="data-index"
          @selected=${(event) => this.select(event)}></custom-selector>
      </custom-dropdown>
    `
  }
}
customElements.define('data-input', DataInput)
