import { html, css, LiteElement } from '@vandeurenglenn/lite'
import styles from './styles/footer.css' with { type: 'css' }
export class CustomFooter extends LiteElement {
  static styles = [styles]

  render() {
    return html`<footer>
      <div class="footer-intro">
        <div class="footer-brand-copy footer-brand-copy--lead">
          <span class="footer-kicker">Dimac BV</span>
          <div class="footer-heading">Professioneel bouwen zonder ruis.</div>
          <div class="footer-subtitle">Technisch juist, helder uitgewerkt en verzorgd afgewerkt.</div>
        </div>
        <div class="footer-copy">
          Van technieken en automatisatie tot dakwerken: Dimac werkt met duidelijke afspraken, verzorgde uitvoering en
          oplossingen die technisch blijven kloppen.
        </div>
      </div>

      <div class="footer-content">
        <section class="footer-card">
          <span class="footer-title">Adres</span>
          <div class="footer-stack">
            <span class="footer-contact"><custom-icon icon="road"></custom-icon>Schansstraat 8</span>
            <span class="footer-contact"><custom-icon icon="location_city"></custom-icon>3290 Diest</span>
          </div>
          <div class="footer-meta">
            <span class="footer-contact footer-contact--meta"><strong class="tax">BTW</strong>BE 0479.917.693</span>
          </div>
        </section>

        <section class="footer-card footer-card--contact">
          <span class="footer-title">Contact</span>

          <div class="footer-stack">
            <a
              class="footer-contact"
              href="tel:013335335"
              ><custom-icon icon="call"></custom-icon>013 33 53 35</a
            >
            <a
              class="footer-contact"
              href="mailto:info@dimac.be"
              target="_blank"
              rel="noopener"
              title="Email"
              ><custom-icon icon="mail"></custom-icon>info@dimac.be</a
            >
          </div>

          <div class="footer-meta">
            <a
              class="footer-contact footer-contact--meta"
              href="https://instagram.com/dimac_bv"
              target="_blank"
              rel="noopener"
              title="Instagram">
              <custom-icon
                icon="instagram"
                alt="Instagram"></custom-icon>
              @dimac_bv
            </a>
          </div>
        </section>
      </div>

      <small>Dimac BV · Algemene technieken, renovatie en afwerking.</small>
    </footer>`
  }
}
customElements.define('custom-footer', CustomFooter)
