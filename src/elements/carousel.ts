import { html, property, LiteElement } from '@vandeurenglenn/lite'

export class CustomCarousel extends LiteElement {
  @property({ type: Number }) accessor carouselIndex = 0
  @property({ type: Array }) accessor images

  @property({ type: Number, attribute: 'delay' }) accessor timeout = 4500
  carouselTimeout

  private loadedResolve: (value: boolean) => void

  loaded = new Promise<boolean>((resolve) => {
    this.loadedResolve = resolve
  })

  setTimeout() {
    clearInterval(this.carouselTimeout)
    this.carouselTimeout = setTimeout(() => {
      this.carouselIndex = (this.carouselIndex + 1) % this.images.length
      this.setTimeout()
    }, this.timeout)
  }

  firstRender() {
    const img = this.shadowRoot.querySelector('img')
    img?.addEventListener('load', () => {
      // Ensure the first image is fully loaded before starting the carousel
      this.loadedResolve(true)
      this.setTimeout()
    })
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    clearTimeout(this.carouselTimeout)
  }

  _goToImage(index) {
    this.carouselIndex = index
    this.setTimeout()
  }

  render() {
    return html`
      <style>
        :host {
          position: relative;
          overflow: hidden;
          border-radius: 16px;
          height: auto;
          display: block;
        }
        .carousel {
          display: flex;
          transition: transform 0.5s ease-in-out opacity 1s;
          transform: translateX(-${this.carouselIndex * 100}%);
        }
        .carousel img {
          width: 100%;
          flex-shrink: 0;

          aspect-ratio: 4/3;
          object-fit: scale-down;
          background-color: var(--md-sys-color-surface);
        }
        img[active] {
          opacity: 1;
          transition: opacity 0.5s ease-in-out;
        }
        img:not([active]) {
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
        }
        .indicators {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
        }
        .indicator-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          box-sizing: border-box;
          padding: 4px;
          cursor: pointer;
        }
        .indicator {
          width: 10px;
          height: 10px;
          background: gray;
          border-radius: 50%;
          transition: background 0.3s;
        }
        .indicator.active {
          background: white;
        }
      </style>
      <div class="carousel">
        ${this.images?.map(
          (image, index) => html`
            <img
              loading=${index === 0 ? 'eager' : 'lazy'}
              src="${image}"
              ?active="${this.carouselIndex === index}"
              alt="Carousel Image ${index + 1}" />
          `
        )}
      </div>
      <div class="indicators">
        ${this.images?.map(
          (image, index) => html`
            <div
              class="indicator-wrapper"
              @click="${() => this._goToImage(index)}">
              <div class="indicator ${this.carouselIndex === index ? 'active' : ''}"></div>
            </div>
          `
        )}
        </div>
      </div>
    `
  }
}

customElements.define('custom-carousel', CustomCarousel)
