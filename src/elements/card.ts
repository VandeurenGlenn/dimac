import { html, LiteElement, property } from '@vandeurenglenn/lite'
import styles from './styles/card.css' with { type: 'css' }
export class CustomCard extends LiteElement {
  @property({ type: String }) accessor title = ''
  @property({ type: String }) accessor description = ''
  @property({ type: String }) accessor image = ''

  static styles = [styles]

  render() {
    return html`
      ${this.image
        ? html`<img
            src="${this.image}"
            alt="${this.title}" />`
        : ''}
      <h3>${this.title}</h3>
      <p>${this.description}</p>
    `
  }
}

customElements.define('custom-card', CustomCard)
