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

  carouselPaused = false
  isFullscreen = false

  setTimeout() {
    clearInterval(this.carouselTimeout)
    this.carouselTimeout = setTimeout(() => {
      const prevIndex = this.carouselIndex
      this.carouselIndex = (this.carouselIndex + 1) % this.images.length
      this._setTransitionClasses(prevIndex, this.carouselIndex)
      this.setTimeout()
    }, this.timeout)
  }

  _setTransitionClasses(prevIndex, currentIndex) {
    const images = this.shadowRoot.querySelectorAll('.carousel img')
    images.forEach((img, idx) => {
      img.classList.remove('active', 'previous', 'first')
      if (idx === 0 && currentIndex === 0) {
        img.classList.add('first', 'active')
      } else {
        if (idx === prevIndex) {
          img.classList.add('previous')
        }
        if (idx === currentIndex) {
          img.classList.add('active')
        }
      }
    })
  }

  firstRender() {
    const img = this.shadowRoot.querySelector('img')
    img?.addEventListener('load', () => {
      // Ensure the first image is fully loaded before starting the carousel
      this.loadedResolve(true)
      this._setTransitionClasses(0, 0)
      this.setTimeout()
    })
  }

  _goToImage(index) {
    const prevIndex = this.carouselIndex
    this.carouselIndex = index
    this._setTransitionClasses(prevIndex, index)
    this.setTimeout()
  }

  _togglePause = (e) => {
    // Only toggle pause if in fullscreen and not clicking on controls
    if (!this.isFullscreen) return
    if (e.target.closest('.close-btn, .arrow-btn')) return
    this.carouselPaused = !this.carouselPaused
    if (this.carouselPaused) {
      clearInterval(this.carouselTimeout)
    } else {
      this.setTimeout()
    }
  }

  _fullscreen = (e) => {
    // Only trigger fullscreen if the click is on the carousel container, not on indicators
    if (e.target.closest('.close-btn, .arrow-btn, .indicator-wrapper')) return
    this.isFullscreen = true
    this.requestRender()
    setTimeout(() => {
      const btn = this.shadowRoot.querySelector('.close-btn')
      if (btn && 'style' in btn) (btn as HTMLElement).style.display = 'flex'
    }, 200)
  }

  _closeFullscreen = (e) => {
    e.stopPropagation()
    this.isFullscreen = false
    this.requestRender()
    setTimeout(() => {
      const btn = this.shadowRoot.querySelector('.close-btn')
      if (btn && 'style' in btn) (btn as HTMLElement).style.display = 'none'
    }, 200)
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
        .close-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          z-index: 10;
          background: rgba(0,0,0,0.6);
          color: white;
          border: none;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          font-size: 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.8;
          transition: opacity 0.2s;
        }
        .close-btn:hover {
          opacity: 1;
        }
        .arrow-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          background: rgba(0,0,0,0.6);
          color: white;
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          font-size: 24px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.8;
          transition: opacity 0.2s;
        }
        .arrow-btn.left {
          left: 12px;
        }
        .arrow-btn.right {
          right: 12px;
        }
        .arrow-btn:hover {
          opacity: 1;
        }
        .fixed-fullscreen {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          width: 100%;
          height: 100%;
          z-index: 9999 !important;
          background: rgba(0,0,0,0.98) !important;
          border-radius: 0 !important;
          margin: 0 !important;
          padding: 0 !important;
          box-sizing: border-box !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          transition: none !important;
        }
        .fixed-fullscreen img {
          margin: auto;
          border-radius: 8px;
          box-sizing: border-box;
          padding: 48px;
        }
        .fixed-fullscreen .close-btn,
        .fixed-fullscreen .arrow-btn {
          z-index: 10000 !important;
        }
      </style>
      <div class="carousel ${this.isFullscreen ? 'fixed-fullscreen' : ''}" @click=${(e) => {
      if (this.isFullscreen && !e.target.closest('.close-btn, .arrow-btn, .indicator-wrapper')) this._togglePause(e)
      else if (!this.isFullscreen && !e.target.closest('.close-btn, .arrow-btn, .indicator-wrapper'))
        this._fullscreen(e)
    }}>
        <button class="close-btn" @click=${this._closeFullscreen} title="Close" style="display:none">✕</button>
        <button class="arrow-btn left" @click=${this._prevImage} title="Previous">&#x2039;</button>
        <button class="arrow-btn right" @click=${this._nextImage} title="Next">&#x203A;</button>
        ${this.images?.map(
          (image, index) => html`
            <img
              loading=${index === 0 ? 'eager' : 'lazy'}
              fetchpriority=${index === 0 ? 'high' : 'low'}
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
