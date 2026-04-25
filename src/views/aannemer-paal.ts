import { html, LiteElement } from '@vandeurenglenn/lite'

export default customElements.define(
  'aannemer-paal-view',
  class extends LiteElement {
    private loadedResolve!: (value: boolean) => void
    loaded = new Promise<boolean>((resolve) => {
      this.loadedResolve = resolve
    })
    async firstRender(): Promise<void> {
      this.loadedResolve(true)
    }
    render() {
      return html`
        <style>
          :host {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            padding-bottom: 48px;
          }
          main {
            width: 100%;
            max-width: var(--page-max-width);
            display: grid;
            gap: 26px;
          }
          section {
            padding: clamp(32px, 3vw, 56px) 0;
            display: grid;
            gap: 18px;
          }

          section + section {
            border-top: 1px solid rgba(204, 173, 150, 0.08);
          }
          .hero {
            padding-top: 56px;
            position: relative;
            overflow: hidden;
          }

          .hero::after {
            content: '';
            position: absolute;
            top: -80px;
            right: -80px;
            width: 380px;
            height: 380px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(168, 84, 39, 0.13), transparent 65%);
            pointer-events: none;
          }
          .eyebrow {
            display: inline-flex;
            width: fit-content;
            padding: 7px 12px;
            border-radius: 999px;
            background: rgba(168, 84, 39, 0.12);
            color: var(--md-sys-color-primary);
            text-transform: uppercase;
            letter-spacing: 0.12em;
            font-size: 11px;
            font-weight: 800;
          }
          h1,
          h2 {
            margin: 0;
            color: var(--md-sys-color-on-surface);
            font-family: var(--font-display);
            line-height: 1.02;
            letter-spacing: var(--hero-title-letter-spacing);
          }
          h1 {
            font-size: clamp(2rem, 3.1vw, 3.1rem);
            max-width: 22ch;
          }
          h2 {
            font-size: clamp(1.5rem, 2.15vw, 2.2rem);
          }
          p,
          li {
            margin: 0;
            color: var(--md-sys-color-on-surface-variant);
            line-height: 1.75;
          }
          ul {
            margin: 0;
            padding-left: 18px;
            display: grid;
            gap: 8px;
          }
        </style>
        <main>
          <section class="hero">
            <span class="eyebrow">Verborgen landingspagina</span>
            <h1>Aannemer in Paal voor renovatie en nieuwbouw</h1>
            <p>
              Dimac begeleidt projecten in Paal van eerste analyse tot uitvoering, met aandacht voor
              kwaliteit, planning en afwerking.
            </p>
          </section>
          <section>
            <h2>Een praktische aanpak voor uw project</h2>
            <ul>
              <li>Renovaties en nieuwbouw in één duidelijke structuur</li>
              <li>Badkamers, keukens en technieken correct afgestemd</li>
              <li>Lokale opvolging met één aanspreekpunt</li>
              <li>Offerte of woningscan als logische volgende stap</li>
            </ul>
          </section>
        </main>
      `
    }
  }
)
