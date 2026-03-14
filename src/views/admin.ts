import { html, LiteElement, property } from '@vandeurenglenn/lite'
import { adminAuthEnabled, isAdminLoggedIn, loginAdmin, logoutAdmin, onAdminSessionChange } from './../admin-session.js'

export default customElements.define(
  'admin-view',
  class extends LiteElement {
    @property({ type: Object, consumes: 'realizationsManifest' }) accessor manifest

    @property({ type: Boolean }) accessor adminEnabled = adminAuthEnabled

    @property({ type: Boolean }) accessor adminLoggedIn = isAdminLoggedIn()

    @property({ type: Boolean }) accessor adminManagerReady = false

    @property({ type: String }) accessor adminPassword = ''

    @property({ type: String }) accessor adminMessage = ''

    @property({ type: Boolean }) accessor adminBusy = false

    accessor removeAdminSessionListener: (() => void) | undefined

    private loadedResolve: (value: boolean) => void
    loaded = new Promise<boolean>((resolve) => {
      this.loadedResolve = resolve
    })

    async firstRender(): Promise<void> {
      this.removeAdminSessionListener = onAdminSessionChange(async (loggedIn) => {
        this.adminLoggedIn = loggedIn
        if (loggedIn) await this.#ensureAdminManager()
      })

      if (this.adminLoggedIn) {
        await this.#ensureAdminManager()
      }

      this.loadedResolve(true)
    }

    disconnectedCallback(): void {
      super.disconnectedCallback()
      this.removeAdminSessionListener?.()
    }

    async #ensureAdminManager() {
      if (this.adminManagerReady) return
      await import('./../elements/image-manager.js')
      this.adminManagerReady = true
    }

    async #handleAdminLogin(event: Event) {
      event.preventDefault()
      this.adminMessage = ''
      this.adminBusy = true

      try {
        const success = await loginAdmin(this.adminPassword)
        if (!success) {
          this.adminMessage = this.adminEnabled
            ? 'Aanmelden mislukt. Controleer het admin-wachtwoord.'
            : 'Admin-auth staat nog niet aan. Stel eerst DIMAC_ADMIN_PASSWORD_HASH in voor deze build.'
          return
        }

        this.adminPassword = ''
        this.adminMessage = 'Admin-sessie actief.'
        await this.#ensureAdminManager()
      } finally {
        this.adminBusy = false
      }
    }

    #handleAdminLogout() {
      logoutAdmin()
      this.adminMessage = 'Admin-sessie afgesloten.'
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
            gap: 28px;
          }

          .intro,
          .admin-panel,
          .security-panel {
            background: var(--md-sys-color-surface);
            border: var(--surface-border);
            border-radius: var(--panel-radius);
            box-shadow: var(--card-shadow);
            padding: clamp(28px, 3vw, 40px);
          }

          .intro,
          .admin-panel,
          .security-panel,
          .admin-toolbar {
            display: grid;
            gap: 16px;
          }

          .eyebrow {
            display: inline-flex;
            width: fit-content;
            padding: 8px 14px;
            border-radius: 999px;
            background: rgba(168, 84, 39, 0.1);
            color: var(--md-sys-color-primary);
            text-transform: uppercase;
            letter-spacing: 0.12em;
            font-size: 12px;
            font-weight: 800;
          }

          h4,
          h5,
          p {
            margin: 0;
          }

          h4,
          h5 {
            font-family: var(--font-display);
            color: var(--md-sys-color-on-surface);
          }

          h4 {
            font-size: var(--hero-title-size);
            line-height: var(--hero-title-line-height);
          }

          h5 {
            font-size: 1.5rem;
          }

          p,
          li,
          .admin-note,
          .admin-status {
            color: var(--md-sys-color-on-surface-variant);
            line-height: 1.8;
          }

          .admin-status {
            color: var(--md-sys-color-primary);
            font-weight: 700;
          }

          .admin-form,
          .action-row {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            align-items: center;
          }

          .admin-form input {
            flex: 1 1 280px;
            min-width: 240px;
            border-radius: 16px;
            border: 1px solid rgba(204, 173, 150, 0.14);
            background: rgba(14, 11, 9, 0.76);
            color: var(--md-sys-color-on-surface);
            padding: 14px 16px;
            font: inherit;
          }

          button,
          .ghost-link {
            border: 0;
            border-radius: 16px;
            padding: 14px 18px;
            font: inherit;
            font-weight: 800;
            cursor: pointer;
            text-decoration: none;
          }

          button {
            color: var(--md-sys-color-on-primary);
            background: linear-gradient(135deg, #a85427 0%, #cf7540 100%);
          }

          .ghost-link,
          .logout-button {
            color: var(--md-sys-color-on-surface);
            background: rgba(168, 84, 39, 0.12);
            border: 1px solid rgba(168, 84, 39, 0.22);
          }

          ul {
            margin: 0;
            padding-left: 18px;
          }
        </style>

        <main>
          <section class="intro">
            <span class="eyebrow">Verborgen route</span>
            <h4>Adminbeheer voor beelden en projectmappen via #!/admin.</h4>
            <p>
              Deze route staat bewust niet in de publieke navigatie. Pas na een geldige admin-login worden de
              beheercomponenten lazy-loaded en kan je lokale assets beheren.
            </p>
            <div class="action-row">
              <a
                class="ghost-link"
                href="#!/realizations">
                Terug naar realisaties
              </a>
              ${this.adminLoggedIn ? html`<span class="admin-status">Admin ingelogd</span>` : ''}
            </div>
          </section>

          <section class="admin-panel">
            <div class="admin-toolbar">
              <span class="eyebrow">Beheer</span>
              <h5>Image manager</h5>
              <p>
                De huidige manager werkt nog lokaal op de gekozen src/assets-map, zodat je bestaande Rollup-build de
                afgeleide webp-bestanden en het manifest kan blijven genereren. Uploaden kan via picker of
                drag-and-drop, projectmappen kan je hernoemen en lokale beelden kan je in volgorde zetten.
              </p>
            </div>

            ${this.adminLoggedIn
              ? html`
                  <div class="action-row">
                    <span class="admin-status">Admin-sessie actief</span>
                    <button
                      class="logout-button"
                      @click=${() => this.#handleAdminLogout()}>
                      Afmelden
                    </button>
                  </div>
                  ${this.adminManagerReady
                    ? html`<dimac-image-manager .manifest=${this.manifest || {}}></dimac-image-manager>`
                    : html`<p class="admin-note">Admin-tools laden...</p>`}
                `
              : html`
                  <form
                    class="admin-form"
                    @submit=${(event) => this.#handleAdminLogin(event)}>
                    <input
                      type="password"
                      .value=${this.adminPassword}
                      @input=${(event) => (this.adminPassword = (event.target as HTMLInputElement).value)}
                      placeholder="Admin-wachtwoord" />
                    <button ?disabled=${this.adminBusy}>Aanmelden</button>
                  </form>
                  <p class="admin-note">
                    ${this.adminEnabled
                      ? 'Na login krijg je toegang tot uploaden, verwijderen en projectmappen beheren.'
                      : 'Admin-auth is nog niet geconfigureerd. Gebruik DIMAC_ADMIN_PASSWORD_HASH om deze route lokaal of in CI te activeren.'}
                  </p>
                `}
            ${this.adminMessage ? html`<p class="admin-note">${this.adminMessage}</p>` : ''}
          </section>

          <section class="security-panel">
            <span class="eyebrow">Volgende stap</span>
            <h5>Server-backed variant</h5>
            <p>
              Voor echte productiebeveiliging is de client-side hashgate niet genoeg. De uitwerking staat klaar in
              docs/admin-upload-architecture.md en vertrekt van HttpOnly sessies, een aparte upload-API en opslag buiten
              GitHub Pages.
            </p>
            <ul>
              <li>Admin-auth via server of edge backend in plaats van sessionStorage.</li>
              <li>Uploads via gevalideerde API met logging, rate limiting en rolcontrole.</li>
              <li>Publiek manifest losgekoppeld van lokale bestandsselectie.</li>
            </ul>
          </section>
        </main>
      `
    }
  }
)
