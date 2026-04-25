import { html, LiteElement } from '@vandeurenglenn/lite'

// ── Elfsight widget-ID ──────────────────────────────────────────────────────
// Ga naar https://elfsight.com, maak een Google Reviews-widget aan,
// koppel uw Google-locatie en vervang de string hieronder door uw widget-ID.
// Het ID staat in de embed-code als class="elfsight-app-XXXXXXXX-..."
// ───────────────────────────────────────────────────────────────────────────
const ELFSIGHT_WIDGET_ID = 'JOUW-ELFSIGHT-WIDGET-ID'

// De widget wordt in een srcdoc-iframe geladen zodat Elfsight's script
// werkt buiten het Shadow DOM van deze component.
const widgetDoc = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<script src="https://static.elfsight.com/platform/platform.js" async><\/script>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { background: transparent; overflow: hidden; }
</style>
</head>
<body>
<div class="elfsight-app-${ELFSIGHT_WIDGET_ID}" data-elfsight-app-lazy></div>
</body>
</html>`

export default customElements.define(
  'reviews-view',
  class extends LiteElement {
    private loadedResolve!: (value: boolean) => void
    loaded = new Promise<boolean>((resolve) => {
      this.loadedResolve = resolve
    })

    async firstRender(): Promise<void> {
      this.loadedResolve(true)

      // Auto-resize iframe as Elfsight renders (srcdoc = same-origin, so
      // contentDocument is accessible)
      const iframe = this.shadowRoot?.querySelector<HTMLIFrameElement>('iframe.reviews-widget')
      if (!iframe) return

      const autoResize = () => {
        const doc = iframe.contentDocument
        if (!doc?.body) return
        const h = doc.documentElement.scrollHeight
        if (h > 100) iframe.style.height = h + 'px'
      }

      iframe.addEventListener('load', () => {
        autoResize()
        const ro = new ResizeObserver(autoResize)
        ro.observe(iframe.contentDocument!.documentElement)
      })
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
          h2,
          h3 {
            margin: 0;
            color: var(--md-sys-color-on-surface);
          }

          h1,
          h2 {
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

          h3 {
            font-size: 1.05rem;
            font-weight: 800;
          }

          p {
            margin: 0;
            color: var(--md-sys-color-on-surface-variant);
            line-height: 1.75;
          }

          .reviews-widget {
            width: 100%;
            border: none;
            min-height: 120px;
            height: 600px;
            display: block;
          }

          .cta-row {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            margin-top: 6px;
          }

          .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-height: 50px;
            border-radius: 999px;
            padding: 0 22px;
            text-decoration: none;
            font-weight: 800;
          }

          .btn-primary {
            background: linear-gradient(135deg, var(--md-sys-color-primary), #8c421b);
            color: var(--md-sys-color-on-primary);
          }

          .btn-secondary {
            border: 1px solid rgba(168, 84, 39, 0.24);
            color: var(--md-sys-color-on-surface);
            background: var(--surface-soft);
          }

          @media (max-width: 900px) {
          }
        </style>

        <main>
          <section class="hero">
            <span class="eyebrow">Reviews</span>
            <h1>Wat klanten zeggen over Dimac</h1>
            <p>
              Heldere communicatie, correcte opvolging en een verzorgd eindresultaat. Dat is wat
              klanten het vaakst benoemen wanneer ze met Dimac samenwerken.
            </p>
          </section>

          <section>
            <h2>Ervaringen van klanten</h2>
            <iframe
              class="reviews-widget"
              .srcdoc=${widgetDoc}
              title="Google Reviews Dimac"
              scrolling="no"
              loading="lazy"
              allow="autoplay; camera; microphone; payment">
            </iframe>
          </section>

          <section>
            <h2>Ook uw project bespreken?</h2>
            <p>
              Wil u weten hoe Dimac uw renovatie of bouwproject kan aanpakken? Neem contact op of
              plan eerst een woningscan voor extra duidelijkheid.
            </p>
            <div class="cta-row">
              <a
                class="btn btn-primary"
                href="#!/contact"
                >Vraag een offerte aan</a
              >
              <a
                class="btn btn-secondary"
                href="#!/woningscan"
                >Plan uw woningscan</a
              >
            </div>
          </section>
        </main>
      `
    }
  }
)
