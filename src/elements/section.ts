import { LiteElement, css, html, property } from '@vandeurenglenn/lite'
import './eyebrow.js'
export class CustomSection extends LiteElement {
  @property({ type: String }) accessor type: 'hero' | 'media' = 'hero'
  @property({ type: String }) accessor title
  @property({ type: String }) accessor subtitle
  @property({ type: String }) accessor description
  @property({ type: String }) accessor eyebrow

  #renderLabel() {
    if (this.eyebrow) {
      return html`<custom-eyebrow>${this.eyebrow}</custom-eyebrow>`
    }
    return null
  }
  #renderDescription() {
    if (this.description) {
      return html`<p>${this.description}</p>`
    }
    return null
  }

  #renderTitle() {
    if (this.title) {
      return html`<h1>${this.title}</h1>`
    }
    return null
  }

  #renderSubtitle() {
    if (this.subtitle) {
      return html`<h4>${this.subtitle}</h4>`
    }
    return null
  }

  #renderHero() {
    return html`
      ${this.#renderLabel()} ${this.#renderTitle()} ${this.#renderSubtitle()}
      ${this.#renderDescription()}
      <div class="content">
        <slot name="content"></slot>
        <span class="flex-one"></span>
        <slot name="footer"></slot>
      </div>
    `
  }

  #renderMedia() {
    return html`
      <slot name="media"></slot>

      <div class="container">
        ${this.#renderLabel()} ${this.#renderTitle()} ${this.#renderSubtitle()}
        ${this.#renderDescription()}
        <slot name="content"> </slot>
        <slot name="footer"></slot>
      </div>
    `
  }
  render() {
    return html` ${this.type === 'hero' ? this.#renderHero() : this.#renderMedia()}`
  }

  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding: 24px;
        width: 100%;
        box-sizing: border-box;
        height: 100%;
        background: var(--md-sys-color-surface);
        border: var(--surface-border);
        border-radius: var(--panel-radius);
        box-shadow: var(--card-shadow);
        backdrop-filter: blur(18px);
        overflow: hidden;
      }
      :host::before {
        content: '';
        position: absolute;
        inset: auto -72px -72px auto;
        width: 220px;
        height: 220px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(168, 84, 39, 0.18), transparent 68%);
        pointer-events: none;
      }

      :host([type='hero']) {
        display: flex;
        flex-direction: column;
        padding: 48px 32px 32px 32px;
      }

      .container {
        display: flex;
        flex-direction: column;
        margin-top: 24px;
        display: flex;
        padding: 24px;
        border-radius: 24px;
        background: linear-gradient(180deg, rgba(44, 32, 27, 0.76), rgba(30, 22, 18, 0.9));
        border: 1px solid rgba(204, 173, 150, 0.06);
        flex: 1 1 auto;
        z-index: 1;
      }

      custom-eyebrow {
        margin-bottom: 16px;
      }

      h1 {
        font-family: var(--font-display);
        line-height: 1.08;
        letter-spacing: var(--hero-title-letter-spacing);
        color: var(--md-sys-color-on-surface);
      }

      h2 {
        font-family: var(--font-display);
        line-height: 1.08;
        letter-spacing: var(--media-title-letter-spacing);
        color: var(--md-sys-color-on-surface);
        height: 38px;
      }

      h4 {
        margin: 0;
        font-size: 1.08rem;
        font-weight: 800;
        color: var(--md-sys-color-primary);
      }
      p {
        margin: 0;
        line-height: 1.75;
        color: var(--md-sys-color-on-surface-variant);
        font-size: 1rem;
        max-width: 860px;
      }

      slot::slotted(*) {
        margin-top: 44px;
      }
      @media (max-width: 600px) {
        :host,
        :host([type='hero']) {
          padding: 6px;
          background: none;
          border: none;
          box-shadow: none;
          backdrop-filter: none;
        }
        :host::before {
          display: none;
        }
        .container {
          padding: 12px;
          background: none;
          border: none;
          box-shadow: none;
        }
      }
    `
  ]
}

customElements.define('custom-section', CustomSection)
