import { LiteElement, property, html, css } from '@vandeurenglenn/lite'
export class CustomPanel extends LiteElement {
  @property({ type: String }) accessor title = 'hello world'
  @property({ type: String }) accessor description = undefined

  static styles = [
    css`
      :host {
        display: grid;
        grid-template-columns: minmax(0, 1.08fr) minmax(260px, 0.92fr);
        gap: 14px;
        align-items: stretch;
        margin-top: 56px;
      }

      @media (max-width: 800px) {
        :host {
          display: flex;
          flex-direction: column;
          gap: 18px;
          margin-top: 32px;
        }
      }
    `
  ]

  render() {
    return html`<slot></slot>`
  }
}

customElements.define('custom-panel', CustomPanel)
