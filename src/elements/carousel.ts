import { html, property, LiteElement, query } from '@vandeurenglenn/lite'
import '@vandeurenglenn/lite-elements/icon-button.js'
export class CustomCarousel extends LiteElement {
  @query('img') accessor firstImage: HTMLImageElement
  @property({ type: Number }) accessor carouselIndex = 0
  @property({ type: Array }) accessor images
  @property({ type: Boolean, reflect: true }) accessor fullscreen = false
  @property({ type: Boolean, reflect: true }) accessor paused = false

  @property({ type: Number, attribute: 'delay' }) accessor timeout = 4500
  carouselTimeout

  private loadedResolve: (value: boolean) => void

  loaded = new Promise<boolean>((resolve) => {
    this.loadedResolve = resolve
  })

  setTimeout() {
    clearTimeout(this.carouselTimeout)
    this.carouselTimeout = setTimeout(() => {
      const prevIndex = this.carouselIndex
      this.carouselIndex = (this.carouselIndex + 1) % this.images.length
      this._setTransitionClasses(prevIndex, this.carouselIndex)
      this.setTimeout()
    }, this.timeout)
  }

  _setTransitionClasses(prevIndex, currentIndex) {
    const images = this.shadowRoot.querySelectorAll('.carousel img')
    for (let i = 0; i < images.length; i++) {
      images[i].classList.remove('active', 'previous', 'first')
      if (i === 0 && currentIndex === 0) {
        images[i].classList.add('first', 'active')
      } else {
        if (i === prevIndex) {
          images[i].classList.add('previous')
        }
        if (i === currentIndex) {
          images[i].classList.add('active')
        }
      }
    }
  }

  firstRender() {
    this.firstImage?.addEventListener('load', () => {
      // Ensure the first image is fully loaded before starting the carousel
      this.loadedResolve(true)
      this._setTransitionClasses(0, 0)
      this.setTimeout()
    })
  }

  _goToImage(index) {
    this._setTransitionClasses(this.carouselIndex, index)
    this.carouselIndex = index
    this.setTimeout()
  }

  _togglePause = (e) => {
    // Only toggle pause if in fullscreen and not clicking on controls
    if (!this.fullscreen) return
    this.paused = !this.paused
    if (this.paused) {
      clearTimeout(this.carouselTimeout)
    } else {
      this.setTimeout()
    }
  }

  _fullscreen = (e) => {
    // Only trigger fullscreen if the click is on the carousel container, not on indicators
    if (e.target.closest('.close-btn, .arrow-btn, .indicator-wrapper')) return
    this.fullscreen = true
    this.requestRender()
  }

  _closeFullscreen = (e) => {
    if (this.paused) {
      this.paused = false
      clearTimeout(this.carouselTimeout)
      this.setTimeout()
    }
    e.stopPropagation()
    this.fullscreen = false
    this.requestRender()
  }

  _resume = (e) => {
    e.stopPropagation()
    this.paused = false
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
          left: 0;
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

          border-radius: 16px;
        }
        .carousel img.previous {
          transform-origin: left;
          transform: translateX(-100%);
          opacity: 0;
          z-index: 1;
        }
        .carousel img.active {
          opacity: 1;
          transform: translateX(0);
          pointer-events: auto;
          z-index: 2;
        }
        .carousel img.first {
          transform: none !important;
          opacity: 1 !important;
        }
        .indicators {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          z-index: 3;
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
        :host([fullscreen]) img {
          margin: auto;
          box-sizing: border-box;
          padding: 48px;
        }

        custom-icon-button {
          position: absolute;
          opacity: 0;
          transition: opacity 0.2s ease-out;
          width: 32px;
          height: 32px;
        }

        custom-icon-button[icon="arrow_back"],
        custom-icon-button[icon="arrow_forward"]
        {
          transition: opacity 0.2s ease-in;
          opacity: 1;
        }

        
        custom-icon-button[icon="arrow_back"] {
          left: 12px;
        }
        
        custom-icon-button[icon="arrow_forward"] {
          right: 12px;
        }

        custom-icon-button[icon="arrow_back"],
        custom-icon-button[icon="arrow_forward"] {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
        }

        :host([fullscreen]) .carousel {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          z-index: 9999;
          padding: 0;
          background: rgba(0, 0, 0, 0.98);
          box-sizing: border-box;
        }

        :host([fullscreen]) .carousel img {
          height: 100%;
          width: 100%;
          padding: 0;
          box-sizing: border-box;
          border-radius: 16px;
        }
        :host([fullscreen]) custom-icon-button {
          width: 48px;
          height: 48px;
        }

        :host([fullscreen]) custom-icon-button[icon="arrow_back"] {
          left: 48px;
        }

        :host([fullscreen]) custom-icon-button[icon="arrow_forward"] {
          right: 48px;
        }

        :host([fullscreen]) custom-icon-button[icon="close"] {
          top: 24px;
          right: 48px;
          z-index: 10;
          opacity: 1;

          transition: opacity 0.2s ease-in;
        }

        :host([fullscreen]:not([paused])) custom-icon-button[icon="pause"] {
          bottom: 24px;
          z-index: 10;
          left: 50%;
          transform: translateX(-50%);
          opacity: 1;
        }

        :host([fullscreen][paused]) custom-icon-button[icon="resume"] {
          bottom: 24px;
          z-index: 10;
          left: 50%;
          transform: translateX(-50%);
          opacity: 1;
        }
        
        :host([fullscreen]) custom-icon-button[icon="arrow_back"], :host([fullscreen]) custom-icon-button[icon="arrow_forward"] {
          bottom: 24px;
          top: auto;
          transform: translateY(0);
        }

      </style>
      <div class="carousel" @click=${this._fullscreen}>
        <custom-icon-button icon="close" @click=${this._closeFullscreen} type="tonal"></custom-icon-button>
        <custom-icon-button icon="pause" @click=${this._togglePause} type="tonal"></custom-icon-button>
        <custom-icon-button icon="resume" @click=${this._resume} type="tonal"></custom-icon-button>
        <custom-icon-button icon="arrow_back" @click=${this._prevImage} type="tonal"></custom-icon-button>
        <custom-icon-button icon="arrow_forward" @click=${this._nextImage} type="tonal"></custom-icon-button>
        
        ${this.images?.map(
          (image, index) => html`
            <img
              loading=${index === 0 ? 'eager' : 'lazy'}
              fetchPriority=${index === 0 ? 'high' : 'low'}
              src="${image}"
              class="${index === 0 ? 'first' : ''}"
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

  _prevImage = (e) => {
    e.stopPropagation()
    const prevIndex = this.carouselIndex
    const newIndex = (this.carouselIndex - 1 + this.images.length) % this.images.length
    this.carouselIndex = newIndex
    this._setTransitionClasses(prevIndex, newIndex)
    this.setTimeout()
  }

  _nextImage = (e) => {
    e.stopPropagation()
    const prevIndex = this.carouselIndex
    const newIndex = (this.carouselIndex + 1) % this.images.length
    this.carouselIndex = newIndex
    this._setTransitionClasses(prevIndex, newIndex)
    this.setTimeout()
  }
}

customElements.define('custom-carousel', CustomCarousel)
