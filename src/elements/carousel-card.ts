import { LiteElement, property, html, css } from '@vandeurenglenn/lite'
import './carousel.js'
export class CustomCarouselCard extends LiteElement {
  @property({ type: String }) accessor title
  @property({ type: String }) accessor description
  @property({ type: Array }) accessor images

  static styles = [
    css`
      :host {
        display: block;
        position: relative;
        border-radius: var(--md-sys-shape-corner-large);
        padding: 16px;
        max-width: 600px;
        background: var(--md-sys-color-surface-container-low);
        box-shadow: var(--md-sys-elevation-level-1);
        max-width: 400px;
      }
    `
  ]

  render() {
    return html`
      <custom-carousel .images=${this.images}></custom-carousel>
      <h2>${this.title}</h2>
      <p>${this.description}</p>
    `
  }
}

customElements.define('custom-carousel-card', CustomCarouselCard)
