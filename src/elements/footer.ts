import { html, css, LiteElement } from '@vandeurenglenn/lite'
export class CustomFooter extends LiteElement {
  static get styles() {
    return [
      css`
        :host {
          display: flex;
          flex-direction: column;
          width: 100%;
          box-sizing: border-box;
          font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji',
            'Segoe UI Emoji';
          margin-top: 86px;
          align-items: center;
        }
        .column {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          height: 100%;
          padding-left: 48px;
          box-sizing: border-box;
        }
        .column img {
          height: 100%;
        }
        footer {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: var(--md-sys-color-surface);
          box-sizing: border-box;
          padding: 32px 24px 16px 24px;
          color: #fff;
          font-size: 16px;
          font-weight: 500;
          margin-top: 128px;
          border-top: 1px solid var(--md-sys-color-outline);
          color: var(--md-sys-color-on-surface);

          /* border-radius: 12px 12px 0 0; */
        }

        a {
          color: inherit;
          text-decoration: none;
          display: flex;
        }
        custom-icon,
        strong {
          margin-right: 16px;
          font-size: 10px;
        }
        .footer-content {
          margin-top: 48px;
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 8px;
          width: 100%;
          max-width: 820px;
        }
        .footer-contact {
          margin-top: 8px;
          font-size: 15px;
          height: 24px;
          display: flex;
          align-items: center;
        }

        .footer-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 8px;
          flex: 1;
          display: flex;
          align-items: flex-start;
          color: var(--md-sys-color-on-surface);
        }

        small {
          display: flex;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;
          padding: 8px 12px;
          margin-top: 48px;
          width: 100%;
          background: var(--md-sys-color-primary-container);
          color: var(--md-sys-color-on-primary-container);
        }

        small img {
          width: 24px;
          height: 24px;
          padding: 0 8px;
        }
        @media (max-width: 1000px) {
          .footer-content {
            flex-direction: column;
            align-items: center;
          }
          .column {
            padding-left: 0;
            padding-right: 0;
            width: 100%;
            align-items: center;
          }
          .footer-title {
            margin-top: 32px;
          }

          .footer-contact {
            max-width: 180px;
            width: 100%;
            margin-top: 4px;
          }
          img {
            width: 100%;
            max-width: 180px;
          }

          .footer-title {
            text-align: start;
            justify-content: start;
            width: 100%;
            max-width: 180px;
          }
        }
      `
    ]
  }

  render() {
    return html`<div class="footer-content">
        <span class="column img-column">
          <img
            src="https://dimac.be/assets/dimac.svg"
            alt="Dimac Logo" />
        </span>
        <span class="column">
          <span class="footer-title">Adres</span>
          <span class="footer-contact"><custom-icon icon="road"></custom-icon>Beringenbaan 43</span>
          <span class="footer-contact"><custom-icon icon="location_city"></custom-icon>3290 Diest</span>
          <span class="footer-contact"><strong>BTW</strong>BE 0479.917.693</span>
        </span>

        <span class="column">
          <span class="footer-title">Contact</span>

          <a
            class="footer-contact"
            href="tel:+32 473 71 11 23"
            ><custom-icon icon="call"></custom-icon>+32 473 71 11 23</a
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
            Instagram
          </a>
        </span>
      </div>

      <small
        >Made with
        <img
          alt="love"
          src="https://leofcoin.org/sources/icons/heart.svg" />
        by team <strong style="padding-left: 4px;">Dimac</strong></small
      >`
  }
}
customElements.define('custom-footer', CustomFooter)
