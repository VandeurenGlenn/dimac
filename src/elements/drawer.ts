import { LiteElement, css, html, property, query } from '@vandeurenglenn/lite'
import styles from './styles/drawer.css' with { type: 'css' }

import '@vandeurenglenn/lite-elements/icon.js'

export class DimacDrawer extends LiteElement {
  @property({ type: Boolean, reflect: true }) accessor narrow = false

  @property({ type: Boolean, reflect: true, attribute: 'drawer-open' }) accessor drawerOpen = false

  @query('.drawer-region') accessor drawerRegion: HTMLElement

  @query('.scrim') accessor scrim: HTMLElement

  #dragMode: 'open' | 'close' | null = null

  #dragStartX = 0

  #dragStartY = 0

  #dragCurrentX = 0

  #dragPreviousX = 0

  #dragPreviousTime = 0

  #dragVelocityX = 0

  #dragAxis: 'x' | 'y' | null = null

  #edgeSwipeWidth = 28

  #velocityThreshold = 0.42

  static styles = [styles]

  connectedCallback() {
    super.connectedCallback()
    globalThis.addEventListener('keydown', this.#onKeydown)
  }

  disconnectedCallback() {
    globalThis.removeEventListener('keydown', this.#onKeydown)
    super.disconnectedCallback()
  }

  firstRender() {
    this.drawerOpen = !this.narrow
  }

  onChange(propertyKey: string, value: boolean) {
    if (propertyKey === 'narrow') this.drawerOpen = !value
  }

  openDrawer() {
    this.drawerOpen = true
  }

  closeDrawer() {
    if (this.narrow) this.drawerOpen = false
  }

  #drawerWidth() {
    return this.drawerRegion?.getBoundingClientRect().width || 0
  }

  #setDragVisual(offset: number) {
    if (!this.narrow || !this.drawerRegion) return
    const width = this.#drawerWidth()
    const clamped = Math.max(-width, Math.min(0, offset))
    const progress = width ? 1 - Math.abs(clamped) / width : 0
    this.drawerRegion.style.transition = 'none'
    this.scrim.style.transition = 'none'
    this.drawerRegion.style.transform = `translateX(${clamped}px)`
    this.scrim.style.opacity = `${Math.max(0, Math.min(1, progress))}`
    this.scrim.style.pointerEvents = progress > 0.02 ? 'auto' : 'none'
  }

  #clearDragVisual() {
    if (!this.drawerRegion) return
    this.drawerRegion.style.transition = ''
    this.scrim.style.transition = ''
    this.drawerRegion.style.transform = ''
    this.scrim.style.opacity = ''
    this.scrim.style.pointerEvents = ''
  }

  #onTouchStart = (event: TouchEvent) => {
    if (!this.narrow) return
    const touch = event.touches[0]
    if (!touch) return
    const width = this.#drawerWidth()
    if (!this.drawerOpen && touch.clientX <= this.#edgeSwipeWidth) {
      this.#dragMode = 'open'
    } else if (this.drawerOpen && touch.clientX <= width) {
      this.#dragMode = 'close'
    } else {
      this.#dragMode = null
      return
    }
    this.#dragStartX = touch.clientX
    this.#dragStartY = touch.clientY
    this.#dragCurrentX = touch.clientX
    this.#dragPreviousX = touch.clientX
    this.#dragPreviousTime = event.timeStamp
    this.#dragVelocityX = 0
    this.#dragAxis = null
  }

  #onTouchMove = (event: TouchEvent) => {
    if (!this.#dragMode) return
    const touch = event.touches[0]
    if (!touch) return
    const deltaX = touch.clientX - this.#dragStartX
    const deltaY = touch.clientY - this.#dragStartY
    if (!this.#dragAxis && Math.abs(deltaX) + Math.abs(deltaY) > 8) {
      this.#dragAxis = Math.abs(deltaX) >= Math.abs(deltaY) ? 'x' : 'y'
    }
    if (this.#dragAxis === 'y') {
      this.#dragMode = null
      this.#clearDragVisual()
      return
    }
    if (event.cancelable) event.preventDefault()
    this.#dragCurrentX = touch.clientX
    const elapsed = Math.max(1, event.timeStamp - this.#dragPreviousTime)
    this.#dragVelocityX = (touch.clientX - this.#dragPreviousX) / elapsed
    this.#dragPreviousX = touch.clientX
    this.#dragPreviousTime = event.timeStamp
    const width = this.#drawerWidth()
    if (this.#dragMode === 'open') {
      this.#setDragVisual(-width + Math.max(0, deltaX))
    } else {
      this.#setDragVisual(Math.min(0, deltaX))
    }
  }

  #onTouchEnd = () => {
    if (!this.#dragMode) return
    const width = this.#drawerWidth()
    const deltaX = this.#dragCurrentX - this.#dragStartX
    const threshold = Math.max(72, width * 0.22)
    if (this.#dragMode === 'open') {
      this.drawerOpen = deltaX > threshold || this.#dragVelocityX > this.#velocityThreshold
    } else {
      this.drawerOpen = !(deltaX < -threshold || this.#dragVelocityX < -this.#velocityThreshold)
    }
    this.#dragMode = null
    this.#dragAxis = null
    this.#dragVelocityX = 0
    this.#clearDragVisual()
  }

  #toggleDrawer = () => {
    this.drawerOpen = !this.drawerOpen
  }

  #onKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') this.closeDrawer()
  }

  render() {
    return html`
      <div
        class="layout"
        @touchstart=${this.#onTouchStart}
        @touchmove=${this.#onTouchMove}
        @touchend=${this.#onTouchEnd}
        @touchcancel=${this.#onTouchEnd}>
        <div class="mobile-bar">
          <button
            class="drawer-toggle"
            type="button"
            aria-label=${this.drawerOpen ? 'Sluit menu' : 'Open menu'}
            aria-expanded=${this.drawerOpen ? 'true' : 'false'}
            @click=${this.#toggleDrawer}>
            <custom-icon .icon=${this.drawerOpen ? 'menu_open' : 'menu'}></custom-icon>
          </button>

          <span class="mobile-brand">
            <span class="mobile-copy">
              <span class="mobile-name"><slot name="mobile-brand">DIMAC</slot></span>
              <span class="mobile-status"><slot name="mobile-status">Regio Diest</slot></span>
            </span>
          </span>

          <span class="mobile-bar-spacer"></span>
        </div>

        <div
          class="scrim"
          @click=${() => this.closeDrawer()}></div>

        <aside class="drawer-region">
          <button
            class="drawer-close"
            type="button"
            aria-label="Sluit menu"
            @click=${() => this.closeDrawer()}>
            <custom-icon .icon=${'close'}></custom-icon>
          </button>
          <div class="drawer-slot">
            <slot name="drawer-content"></slot>
          </div>
        </aside>

        <div class="content-region">
          <div class="content-slot">
            <slot name="content"></slot>
          </div>
        </div>
      </div>
    `
  }
}

customElements.define('dimac-drawer', DimacDrawer)
