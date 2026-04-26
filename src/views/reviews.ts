import { html, LiteElement, property } from '@vandeurenglenn/lite'

type Review = {
  name: string
  rating: number
  text: string
  photo?: string | null
  relativeTime?: string | null
}
type ReviewsPayload = { updatedAt: string | null; source: string; reviews: Review[] }

export default customElements.define(
  'reviews-view',
  class extends LiteElement {
    private loadedResolve!: (value: boolean) => void
    loaded = new Promise<boolean>((resolve) => {
      this.loadedResolve = resolve
    })

    @property({ type: Array }) accessor reviews: Review[] = []
    @property({ type: String }) accessor updatedAt: string | null = null
    @property({ type: Boolean }) accessor fetchFailed = false

    async firstRender(): Promise<void> {
      this.loadedResolve(true)
      try {
        const res = await fetch('./reviews.json', { cache: 'no-cache' })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data: ReviewsPayload = await res.json()
        this.reviews = Array.isArray(data.reviews) ? data.reviews : []
        this.updatedAt = data.updatedAt
      } catch {
        this.fetchFailed = true
      }
    }

    #stars(n: number) {
      return '★★★★★'.slice(0, Math.max(0, Math.min(5, n)))
    }

    #formatDate(iso: string | null) {
      if (!iso) return null
      try {
        return new Date(iso).toLocaleDateString('nl-BE', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })
      } catch {
        return null
      }
    }

    render() {
      const updated = this.#formatDate(this.updatedAt)
      const hasReviews = this.reviews.length > 0

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
            font-size: 1rem;
            font-weight: 700;
          }

          p {
            margin: 0;
            color: var(--md-sys-color-on-surface-variant);
            line-height: 1.75;
          }

          .updated {
            font-size: 0.8rem;
            color: var(--md-sys-color-on-surface-variant);
            opacity: 0.7;
          }

          .grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 16px;
            align-items: stretch;
          }

          .card {
            border-radius: 16px;
            padding: 22px;
            background: rgba(41, 30, 25, 0.5);
            display: flex;
            flex-direction: column;
            gap: 12px;
          }

          .stars {
            color: var(--md-sys-color-primary);
            letter-spacing: 0.16em;
            font-weight: 800;
            font-size: 1rem;
          }

          .card-text {
            font-size: 0.94rem;
            line-height: 1.6;
            flex: 1;
          }

          .card-author {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-top: 4px;
            padding-top: 14px;
            border-top: 1px solid rgba(204, 173, 150, 0.08);
          }

          .card-author img,
          .card-author .avatar-fallback {
            width: 38px;
            height: 38px;
            border-radius: 50%;
            object-fit: cover;
            background: rgba(168, 84, 39, 0.2);
            color: var(--md-sys-color-primary);
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            font-size: 0.95rem;
            flex-shrink: 0;
          }

          .card-meta {
            display: flex;
            flex-direction: column;
            line-height: 1.3;
            min-width: 0;
          }

          .card-name {
            font-size: 0.88rem;
            color: var(--md-sys-color-on-surface);
            font-weight: 700;
          }

          .card-time {
            font-size: 0.78rem;
            color: var(--md-sys-color-on-surface-variant);
            opacity: 0.8;
          }

          .empty {
            padding: 24px;
            border-radius: 16px;
            background: rgba(41, 30, 25, 0.4);
            color: var(--md-sys-color-on-surface-variant);
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
            <h2>Google reviews</h2>
            ${updated ? html`<span class="updated">Laatst bijgewerkt: ${updated}</span>` : ''}
            ${hasReviews
              ? html`
                  <div class="grid">
                    ${this.reviews.map(
                      (r) => html`
                        <article class="card">
                          <span class="stars">${this.#stars(r.rating)}</span>
                          <p class="card-text">${r.text}</p>
                          <div class="card-author">
                            ${r.photo
                              ? html`<img
                                  src="${r.photo}"
                                  alt="${r.name}"
                                  loading="lazy"
                                  referrerpolicy="no-referrer" />`
                              : html`<span class="avatar-fallback"
                                  >${(r.name || '?').charAt(0).toUpperCase()}</span
                                >`}
                            <div class="card-meta">
                              <span class="card-name">${r.name}</span>
                              ${r.relativeTime
                                ? html`<span class="card-time">${r.relativeTime}</span>`
                                : ''}
                            </div>
                          </div>
                        </article>
                      `
                    )}
                  </div>
                `
              : html`
                  <div class="empty">
                    Reviews worden binnenkort weergegeven. Bekijk in tussentijd onze Google-pagina
                    voor de meest recente ervaringen.
                  </div>
                `}
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
