import { LiteElement, property, html, css, query } from '@vandeurenglenn/lite'
import './carousel.js'
import { CustomCarousel } from './carousel.js'
import styles from './styles/carousel-card.css' with { type: 'css' }
export class CustomCarouselCard extends LiteElement {
  @property({ type: String }) accessor title
  @property({ type: String }) accessor kicker
  @property({ type: String }) accessor description
  @property({ type: Array }) accessor images

  @query('custom-carousel') accessor carousel: CustomCarousel

  private loadedResolve: (value: boolean) => void
  loaded = new Promise<boolean>((resolve) => {
    this.loadedResolve = resolve
  })

  #onDominantColorChange = (event: CustomEvent<{ rgb?: string }>) => {
    event.stopPropagation()
    this.style.setProperty('--card-glow-rgb', event.detail?.rgb || '168, 84, 39')
  }

  static styles = [styles]

  async firstRender(): Promise<void> {
    await this.carousel.loaded
    this.loadedResolve(true)
  }

  get imageCountLabel() {
    const count = this.images?.length || 0
    return `${count} foto${count === 1 ? '' : "'s"}`
  }

  render() {
    return html`
      <custom-carousel
        .images=${this.images}
        @dominant-color-change=${this.#onDominantColorChange}></custom-carousel>
      <div class="meta">
        ${this.kicker ? html`<span class="kicker">${this.kicker}</span>` : html`<span></span>`}
        <span class="count">${this.imageCountLabel}</span>
      </div>
      <h4>${this.title}</h4>
      <p>${this.description}</p>
    `
  }
}

customElements.define('custom-carousel-card', CustomCarouselCard)
