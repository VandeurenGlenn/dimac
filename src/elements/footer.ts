import { html, css, LiteElement } from '@vandeurenglenn/lite'
import styles from './styles/footer.css' with { type: 'css' }
export class CustomFooter extends LiteElement {
  static styles = [styles]

  render() {
    return html`<footer>
      <div class="footer-intro">
        <div>
          <span class="footer-kicker">Dimac BV</span>
          <div class="footer-title">Professioneel bouwen zonder ruis.</div>
        </div>
        <div class="footer-copy">
          Van technieken en automatisatie tot dakwerken: Dimac werkt met duidelijke afspraken, verzorgde uitvoering en
          oplossingen die technisch blijven kloppen.
        </div>
      </div>

      <div class="footer-content">
        <span class="column img-column">
          <img
            src="./assets/dimac.svg"
            alt="Dimac Logo" />
        </span>
        <span class="column">
          <span class="footer-title">Adres</span>
          <span class="footer-contact"><custom-icon icon="road"></custom-icon>Schansstraat 8</span>
          <span class="footer-contact"><custom-icon icon="location_city"></custom-icon>3290 Diest</span>
          <span class="footer-contact"><strong class="tax">BTW</strong>BE 0479.917.693</span>
        </span>

        <span class="column">
          <span class="footer-title">Contact</span>

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

          <a
            class="footer-contact"
            href="https://instagram.com/dimac_bv"
            target="_blank"
            rel="noopener"
            title="Instagram">
            <custom-icon
              icon="instagram"
              alt="Instagram"></custom-icon>
            @dimac_bv
          </a>
        </span>
      </div>

      <small>Dimac BV</small>
    </footer>`
  }
}
customElements.define('custom-footer', CustomFooter)
