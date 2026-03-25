import { LiteElement, html, css } from '@vandeurenglenn/lite'

export class CustomEyebrow extends LiteElement {
  static styles = [
    css`
      :host {
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
    `
  ]

  render() {
    return html`<slot></slot>`
  }
}

customElements.define('custom-eyebrow', CustomEyebrow)
