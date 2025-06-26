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
      this.shadowRoot.querySelector('.previous')?.classList.remove('previous')
      const currentImage = this.shadowRoot.querySelector(`img:nth-child(${this.carouselIndex})`)
      if (currentImage) {
        currentImage.classList.add('previous')
      }
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

    const images = this.shadowRoot.querySelectorAll('img')
    for (let i = 0; i < images.length; i++) {
      if (i % 2 === 0) {
        images[i].classList.add('even')
      } else {
        images[i].classList.add('odd')
      }
    }
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
          position: relative;
          width: 100%;
          height: 0;
          padding-bottom: 75%; /* 4:3 aspect ratio */
        }
        .carousel img {
          position: absolute;
          top: 0;
          right: 0;
          width: 100%;
          height: 100%;
          flex-shrink: 0;

          aspect-ratio: 4/3;
          object-fit: scale-down;
          background-color: var(--md-sys-color-surface);
          opacity: 0;
          transform: translateX(100%);
          transition: transform 2s cubic-bezier(.4,0,.2,1), opacity 2s cubic-bezier(.4,0,.2,1);
          pointer-events: none;
          will-change: transform, opacity;
          
        }
        .previous {
          transform-origin: left;
          transform: translateX(-100%);
        }
        .carousel img[active] {
          opacity: 1;
          transform: translateX(0);
          pointer-events: auto;
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
              fetchpriority=${index === 0 ? 'high' : 'low'}
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
