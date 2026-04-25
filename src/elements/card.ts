import { html, LiteElement, property } from '@vandeurenglenn/lite'
import styles from './styles/card.css' with { type: 'css' }
export class CustomCard extends LiteElement {
  @property({ type: String }) accessor title
  @property({ type: String }) accessor description
  @property({ type: String }) accessor image

  static styles = [styles]

  #renderDescription() {
    if (this.description) {
      return html`<p>${this.description}</p>`
    }
    return null
  }

  #renderTitle() {
    if (this.title) {
      return html`<h3>${this.title}</h3>`
    }
    return null
  }

  render() {
    return html`
      ${this.image
        ? html`<img
            src="${this.image}"
            alt="${this.title}" />`
        : ''}
      ${this.#renderTitle()} ${this.#renderDescription()}
      <slot name="content"></slot>
      <slot name="footer"></slot>
    `
  }
}

customElements.define('custom-card', CustomCard)
