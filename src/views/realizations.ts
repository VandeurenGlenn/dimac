import { html, LiteElement, property } from '@vandeurenglenn/lite'

import './../elements/carousel-card.js'
export default customElements.define(
  'realizations-view',
  class extends LiteElement {
    @property({ type: Object, consumes: 'realizationsManifest' }) accessor manifest

    private loadedResolve: (value: boolean) => void
    loaded = new Promise<boolean>((resolve) => {
      this.loadedResolve = resolve
    })
    async firstRender(): Promise<void> {
      await this.shadowRoot.querySelector('custom-carousel-card').loaded
      this.loadedResolve(true)
    }
    render() {
      return html`
        <style>
          :host {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          a {
            display: inline-block;
            background: var(--accent-color);
            color: #fff;
            padding: 12px 24px;
            border-radius: 4px;
            font-weight: 700;
            text-decoration: none;
            margin-top: 24px;
          }
          h4 {
            font-size: 24px;
            font-weight: 700;
            margin: 16px 0;
            text-align: center;
            width: 100%;
          }
          h5 {
            font-size: 20px;
            font-weight: 600;
            width: 100%;
            text-align: center;
          }
          h6 {
            font-size: 16px;
            font-weight: 500;
            width: 100%;
            text-align: center;
          }
          main {
            max-width: 1000px;
            align-items: center;
          }

          img {
            position: absolute;
            top: 54px;
            left: 0;
            bottom: 0;
            width: 100%;
            height: calc(100% - 54px);
            opacity: 0.2;
            z-index: -1;
            pointer-events: none;
          }

          .card-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            width: 100%;
            gap: 16px;
          }
          custom-carousel-card {
            max-width: calc(33% - 8px);
            box-sizing: border-box;
            margin-bottom: 16px;
          }
          @media (max-width: 1200px) {
            main {
              box-sizing: border-box;
              padding: 0 16px;
            }
            custom-carousel {
              max-width: 100%;
            }
          }

          @media (max-width: 1300px) {
            custom-carousel-card {
              max-width: calc(50% - 8px);
            }
          }

          @media (max-width: 680px) {
            custom-carousel-card {
              max-width: 100%;
            }
          }
        </style>
        <main>
          <img
            src="./assets/sketch.svg"
            alt="Sketch" />

          <span class="card-container">
            ${Object.entries(this.manifest || {}).map(
              ([key, value]) => html` <custom-carousel-card
                .title=${key}
                .images=${value}></custom-carousel-card>`
            )}
          </span>
        </main>
      `
    }
  }
)
