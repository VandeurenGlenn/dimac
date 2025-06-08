import { html, property, LiteElement } from '@vandeurenglenn/lite'

export class CustomCarousel extends LiteElement {
  @property({ type: Number }) accessor carouselIndex = 0
  @property({ type: Array }) accessor images

  @property({ type: Number, attribute: 'delay' }) accessor timeout = 4500
  carouselTimeout

  setTimeout() {
    clearInterval(this.carouselTimeout)
    this.carouselTimeout = setTimeout(() => {
      this.carouselIndex = (this.carouselIndex + 1) % this.images.length
      this.setTimeout()
    }, this.timeout)
  }

  firstRender() {
    this.setTimeout()
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
          max-height: 645px;
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
          gap: 5px;
        }
        .indicator {
          width: 10px;
          height: 10px;
          background: gray;
          border-radius: 50%;
          cursor: pointer;
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
              class="indicator ${this.carouselIndex === index ? 'active' : ''}"
              @click="${() => this._goToImage(index)}"></div>
          `
        )}
      </div>
    `
  }
}

customElements.define('custom-carousel', CustomCarousel)
