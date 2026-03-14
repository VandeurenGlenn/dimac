import { html, property, LiteElement, query } from '@vandeurenglenn/lite'
import '@vandeurenglenn/lite-elements/icon-button.js'
import styles from './styles/carousel.css' with { type: 'css' }

const DEFAULT_GLOW_RGB = '168, 84, 39'
const dominantColorCache = new Map<string, string>()

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

  static styles = [styles]

  #emitDominantColorChange(rgb: string) {
    this.dispatchEvent(
      new CustomEvent('dominant-color-change', {
        detail: { rgb, color: `rgb(${rgb})` },
        bubbles: true,
        composed: true
      })
    )
  }

  #applyDominantColor(rgb = DEFAULT_GLOW_RGB) {
    this.style.setProperty('--carousel-glow-rgb', rgb)
    this.#emitDominantColorChange(rgb)
  }

  #extractDominantColor(image: HTMLImageElement) {
    const cacheKey = image.currentSrc || image.src
    if (dominantColorCache.has(cacheKey)) return dominantColorCache.get(cacheKey)

    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d', { willReadFrequently: true })
    if (!context) return DEFAULT_GLOW_RGB

    const sampleSize = 24
    canvas.width = sampleSize
    canvas.height = sampleSize
    context.drawImage(image, 0, 0, sampleSize, sampleSize)

    const { data } = context.getImageData(0, 0, sampleSize, sampleSize)
    const buckets = new Map<string, { weight: number; red: number; green: number; blue: number }>()

    for (let index = 0; index < data.length; index += 4) {
      const alpha = data[index + 3]
      if (alpha < 160) continue

      const red = data[index]
      const green = data[index + 1]
      const blue = data[index + 2]

      const maxChannel = Math.max(red, green, blue)
      const minChannel = Math.min(red, green, blue)
      const brightness = (red + green + blue) / 3
      const saturation = maxChannel - minChannel
      if (brightness < 16) continue

      const bucketKey = `${red >> 4}-${green >> 4}-${blue >> 4}`
      const weight = 0.45 + saturation / 140 + brightness / 480
      const bucket = buckets.get(bucketKey) || { weight: 0, red: 0, green: 0, blue: 0 }
      bucket.weight += weight
      bucket.red += red * weight
      bucket.green += green * weight
      bucket.blue += blue * weight
      buckets.set(bucketKey, bucket)
    }

    if (!buckets.size) return DEFAULT_GLOW_RGB

    const [, dominant] = [...buckets.entries()].sort((left, right) => right[1].weight - left[1].weight)[0]

    let red = Math.round(dominant.red / dominant.weight)
    let green = Math.round(dominant.green / dominant.weight)
    let blue = Math.round(dominant.blue / dominant.weight)

    const saturation = Math.max(red, green, blue) - Math.min(red, green, blue)
    if (saturation < 28) {
      red = Math.round(red * 0.72 + 168 * 0.28)
      green = Math.round(green * 0.72 + 84 * 0.28)
      blue = Math.round(blue * 0.72 + 39 * 0.28)
    }

    red = Math.min(235, Math.round(red * 0.92 + 14))
    green = Math.min(235, Math.round(green * 0.92 + 14))
    blue = Math.min(235, Math.round(blue * 0.92 + 14))

    const rgb = `${red}, ${green}, ${blue}`
    dominantColorCache.set(cacheKey, rgb)
    return rgb
  }

  #updateDominantColor(index = this.carouselIndex) {
    const image = this.shadowRoot?.querySelectorAll('.carousel img')?.[index] as HTMLImageElement | undefined
    if (!image) return

    if (!image.complete || !image.naturalWidth) {
      image.addEventListener(
        'load',
        () => {
          if (this.carouselIndex === index) this.#updateDominantColor(index)
        },
        { once: true }
      )
      return
    }

    this.#applyDominantColor(this.#extractDominantColor(image))
  }

  #emitSlideChange() {
    this.dispatchEvent(
      new CustomEvent('slide-change', {
        detail: { index: this.carouselIndex },
        bubbles: true,
        composed: true
      })
    )
  }

  setTimeout() {
    clearTimeout(this.carouselTimeout)
    this.carouselTimeout = setTimeout(() => {
      const prevIndex = this.carouselIndex
      this.carouselIndex = (this.carouselIndex + 1) % this.images.length
      this._setTransitionClasses(prevIndex, this.carouselIndex)
      this.#updateDominantColor(this.carouselIndex)
      this.#emitSlideChange()
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
      this.#updateDominantColor(0)
      this.#emitSlideChange()
      this.setTimeout()
    })

    if (this.firstImage?.complete && this.firstImage.naturalWidth) {
      this.loadedResolve(true)
      this._setTransitionClasses(0, 0)
      this.#updateDominantColor(0)
      this.#emitSlideChange()
      this.setTimeout()
    }
  }

  _goToImage(index) {
    this._setTransitionClasses(this.carouselIndex, index)
    this.carouselIndex = index
    this.#updateDominantColor(index)
    this.#emitSlideChange()
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
      <div
        class="carousel"
        @click=${this._fullscreen}>
        <div class="counter">${(this.carouselIndex || 0) + 1}/${this.images?.length || 0}</div>
        <custom-icon-button
          icon="close"
          @click=${this._closeFullscreen}
          type="tonal"></custom-icon-button>
        <custom-icon-button
          icon="pause"
          @click=${this._togglePause}
          type="tonal"></custom-icon-button>
        <custom-icon-button
          icon="resume"
          @click=${this._resume}
          type="tonal"></custom-icon-button>
        <custom-icon-button
          icon="arrow_back"
          @click=${this._prevImage}
          type="tonal"></custom-icon-button>
        <custom-icon-button
          icon="arrow_forward"
          @click=${this._nextImage}
          type="tonal"></custom-icon-button>

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
    `
  }

  _prevImage = (e) => {
    e.stopPropagation()
    const prevIndex = this.carouselIndex
    const newIndex = (this.carouselIndex - 1 + this.images.length) % this.images.length
    this.carouselIndex = newIndex
    this._setTransitionClasses(prevIndex, newIndex)
    this.#updateDominantColor(newIndex)
    this.#emitSlideChange()
    this.setTimeout()
  }

  _nextImage = (e) => {
    e.stopPropagation()
    const prevIndex = this.carouselIndex
    const newIndex = (this.carouselIndex + 1) % this.images.length
    this.carouselIndex = newIndex
    this._setTransitionClasses(prevIndex, newIndex)
    this.#updateDominantColor(newIndex)
    this.#emitSlideChange()
    this.setTimeout()
  }
}

customElements.define('custom-carousel', CustomCarousel)
