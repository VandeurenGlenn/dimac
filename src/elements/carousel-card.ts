import { LiteElement, property, html, css, query } from '@vandeurenglenn/lite'
import './carousel.js'
import { CustomCarousel } from './carousel.js'
export class CustomCarouselCard extends LiteElement {
  @property({ type: String }) accessor title
  @property({ type: String }) accessor description
  @property({ type: Array }) accessor images

  @query('custom-carousel') accessor carousel: CustomCarousel

  private loadedResolve: (value: boolean) => void
  loaded = new Promise<boolean>((resolve) => {
    this.loadedResolve = resolve
  })
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

  async firstRender(): Promise<void> {
    await this.carousel.loaded
    this.loadedResolve(true)
  }

  render() {
    return html`
      <custom-carousel .images=${this.images}></custom-carousel>
      <h4>${this.title}</h4>
      <p>${this.description}</p>
    `
  }
}

customElements.define('custom-carousel-card', CustomCarouselCard)
