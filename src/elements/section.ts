import { LiteElement, css, html, property } from '@vandeurenglenn/lite'
import './eyebrow.js'
import styles from './styles/section.css' with { type: 'css' }
export class CustomSection extends LiteElement {
  @property({ type: String }) accessor type: 'hero' | 'media' = 'hero'
  @property({ type: String }) accessor title
  @property({ type: String }) accessor subtitle
  @property({ type: String }) accessor description
  @property({ type: String }) accessor eyebrow
  @property({ type: Boolean, reflect: true }) accessor bubbles = false

  #renderLabel() {
    if (this.eyebrow) {
      return html`<custom-eyebrow>${this.eyebrow}</custom-eyebrow>`
    }
    return null
  }
  #renderDescription() {
    if (this.description) {
      return html`<p>${this.description}</p>`
    }
    return null
  }

  #renderTitle() {
    if (this.title) {
      return html`<h1>${this.title}</h1>`
    }
    return null
  }

  #renderSubtitle() {
    if (this.subtitle) {
      return html`<h4>${this.subtitle}</h4>`
    }
    return null
  }

  #renderHero() {
    return html`
      ${this.#renderLabel()} ${this.#renderTitle()} ${this.#renderSubtitle()}
      ${this.#renderDescription()}
      <div class="content">
        <slot name="content"></slot>
        <span class="flex-one"></span>
        <slot name="footer"></slot>
      </div>
    `
  }

  #renderMedia() {
    return html`
      <slot name="media"></slot>

      <div class="container">
        ${this.#renderLabel()} ${this.#renderTitle()} ${this.#renderSubtitle()}
        ${this.#renderDescription()}
        <slot name="content"> </slot>
        <slot name="footer"></slot>
      </div>
    `
  }
  render() {
    return html` ${this.type === 'hero' ? this.#renderHero() : this.#renderMedia()}`
  }

  static styles = [styles]
}

customElements.define('custom-section', CustomSection)
