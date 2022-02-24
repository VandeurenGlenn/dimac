import { s, y } from './lit-element-82e06d17.js';

customElements.define('flex-column', class FlexColumn extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = this.template;
  }
  get template() {
    return `<style>
      :host {
        display: flex;
        flex-direction: column;
      }      
    </style>
    <slot></slot>
    `
  }
});

customElements.define('flex-row', class FlexRow extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = this.template;
  }
  get template() {
    return `<style>
      :host {
        display: flex;
        flex-direction: row;
      }      
    </style>
    <slot></slot>
    `
  }
});

customElements.define('flex-one', class FlexOne extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = this.template;
  }
  get template() {
    return `<style>
      :host {
        flex: 1;
      }
    </style>
    
    <slot></slot>`
  }
});

customElements.define('flex-two', class FlexTwo extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = this.template;
  }
  get template() {
    return `<style>
      :host {
        flex: 2;
      }
    </style>
    
    <slot></slot>`
  }
});

customElements.define('flex-three', class FlexThree extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = this.template;
  }
  get template() {
    return `<style>
      :host {
        flex: 3;
      }
    </style>
    
    <slot></slot>`
  }
});

customElements.define('flex-four', class FlexFour extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = this.template;
  }
  get template() {
    return `<style>
      :host {
        flex: 4;
      }
    </style>
    
    <slot></slot>`
  }
});

customElements.define('flex-wrap-around', class FlexWrapAround extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = this.template;
  }
  get template() {
    return `<style>
      :host {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-around;
      }      
    </style>
    <slot></slot>
    `
  }
});

customElements.define('flex-wrap-evenly', class FlexWrapEvenly extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = this.template;
  }
  get template() {
    return `<style>
      :host {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-evenly;
      }      
    </style>
    <slot></slot>
    `
  }
});

customElements.define('flex-wrap-between', class FlexWrapBetween extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = this.template;
  }
  get template() {
    return `<style>
      :host {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
      }      
    </style>
    <slot></slot>
    `
  }
});

/**
 * @extends HTMLElement
 */
((base = HTMLElement) => {
  globalThis.svgIconset = globalThis.svgIconset || {};

  customElements.define('custom-svg-iconset', class CustomSvgIconset extends base {
    #icons = {}
    constructor() {
      super();
      this.#icons = this.#createIconMap();
    }
    connectedCallback() {
      !this.name && this.setAttribute('name', 'icons');
      globalThis.svgIconset[this.name] = this;
      globalThis.dispatchEvent(new CustomEvent('svg-iconset-update'));
      globalThis.dispatchEvent(new CustomEvent('svg-iconset-added', {detail: this.name}));

      this.style.display = 'none';
    }
    /**
     * The name of the iconset
     * @default {string} icons
     */
    get name() {
      return this.getAttribute('name');
    }

    /**
     * The width of the viewBox
     * @default {Number} 24
     */
    get width() {
      return this.getAttribute('width') || 24
    }

    /**
     * The height of the viewBox
     * @default {Number} 24
     */
    get height() {
      return this.getAttribute('height') || 24
    }

    /* from https://github.com/PolymerElements/iron-iconset-svg */
    /**
     * Applies an icon to given element
     * @param {HTMLElement} element the element appending the icon to
     * @param {string} icon The name of the icon to show
     */
    applyIcon(element, icon) {
      element = element.shadowRoot || element;
      this.removeIcon(element);
      this.#cloneIcon(icon).then(icon => {
        element.insertBefore(icon, element.childNodes[0]);
        element._iconSetIcon = icon;
      });
    }
    /**
     * Remove an icon from the given element by undoing the changes effected
     * by `applyIcon`.
     *
     * @param {Element} element The element from which the icon is removed.
     */
    removeIcon(element) {
      // Remove old svg element
      element = element.shadowRoot || element;
      if (element._iconSetIcon) {
        element.removeChild(element._iconSetIcon);
        element._iconSetIcon = null;
      }
    }
    /**
     * Produce installable clone of the SVG element matching `id` in this
     * iconset, or `undefined` if there is no matching element.
     *
     * @return {Element} Returns an installable clone of the SVG element
     * matching `id`.
     * @private
     */
    #cloneIcon(id) {
      return new Promise((resolve, reject) => {
        try {
          let svgClone = this.#prepareSvgClone(this.#icons[id]);
          resolve(svgClone);
        } catch (error) {
          reject(error);
        }
      });
    }
    // TODO: Update icon-map on child changes
    /**
     * Create a map of child SVG elements by id.
     *
     * @return {!Object} Map of id's to SVG elements.
     * @private
     */
    #createIconMap() {
      const icons = {};
      for (const icon of Array.from(this.querySelectorAll('[id]'))) {
        icons[icon.id] = icon;
      }
      return icons;
    }
    /**
     * @private
     */
    #prepareSvgClone(sourceSvg) {
      if (sourceSvg) {
        var content = sourceSvg.cloneNode(true),
            svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
            viewBox = content.getAttribute('viewBox') || '0 0 ' + this.width + ' ' + this.height,
            cssText = 'pointer-events: none; display: block; width: 100%; height: 100%;';
        svg.setAttribute('viewBox', viewBox);
        svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        svg.style.cssText = cssText;
        svg.appendChild(content).removeAttribute('id');
        return svg;
      }
      return null;
    }
  });
})();

((base = HTMLElement) => {
  customElements.define('custom-svg-icon', class CustomSvgIcon extends base {
    #lastIcon
    /**
     * Attributes observer
     * @return {Array} ['icon']
     */
    static get observedAttributes() {
      return ['icon'];
    }

    /**
     * Iconset
     * @return {object} globalThis.svgIconset
     * [checkout](svg-iconset.html) for more info.
     */
    get iconset() {
      return globalThis.svgIconset
    }

    /**
     * icon
     * @param {string} value icon to display.
     * optional: you can create multiple iconsets
     * by setting a different name on svg-iconset.
     *
     * **example:** ```html
     * <svg-iconset name="my-icons">
     *   <g id="menu">....</g>
     * </svg-iconset>
     * ```
     * This means we can ask for the icon using a prefix
     * **example:** ```html
     * <reef-icon-button icon="my-icons::menu"></reef-icon-button>
     * ```
     */
    set icon(value) {
      this.__iconChanged__({value: value});
    }

    get icon() {
      return this.getAttribute('icon');
    }

    get template() {
      return `
        <style>
          :host {
            width: var(--svg-icon-size, 24px);
            height: var(--svg-icon-size, 24px);
            display: inline-flex;
            display: -ms-inline-flexbox;
            display: -webkit-inline-flex;
            display: inline-flex;
            -ms-flex-align: center;
            -webkit-align-items: center;
            align-items: center;
            -ms-flex-pack: center;
            -webkit-justify-content: center;
            justify-content: center;
            position: relative;
            vertical-align: middle;
            fill: var(--svg-icon-color, #111);
            stroke: var(--svg-icon-stroke, none);
          }
        </style>
      `;
    }

    constructor() {
      super();
      this.attachShadow({mode: 'open'});
      this._onIconsetReady = this._onIconsetReady.bind(this);
    }

    /**
     * Basic render template, can be called from host using super.render() or extended
     *
     * @example ```js
     * const iconTempl = super.template();
     * ```
     */
    render() {
      this.shadowRoot.innerHTML = this.template;
    }

    connectedCallback() {
      this.icon = this.getAttribute('icon') || null;
      if (!super.render) this.render();
    }

    _onIconsetReady() {
      globalThis.removeEventListener('svg-iconset-added', this._onIconsetReady);
      this.__iconChanged__({value: this.icon});
    }

    __iconChanged__(change) {
      if (!this.iconset) {
        globalThis.addEventListener('svg-iconset-added', this._onIconsetReady);
        return;
      }
      if (this.#lastIcon === change.value) return
      if (!change.value) return
      if (this.#lastIcon) this.shadowRoot.removeChild(this.shadowRoot.querySelector('svg'));

      let parts = change.value.split('::');
      if (parts.length === 1) {
        this.iconset['icons'].applyIcon(this, change.value);
      } else if (this.iconset[parts[0]]) {
        this.iconset[parts[0]].applyIcon(this, parts[1]);
      }
      this.#lastIcon = change.value;
    }

    /**
     * Runs when attribute changes.
     * @param {string} name The name of the attribute that changed.
     * @param {string|object|array} oldValue
     * @param {string|object|array} newValue
     */
    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue !== newValue) this[name] = newValue;
    }
  });
})();

window.Backed = window.Backed || {};
// binding does it's magic using the propertyStore ...
window.Backed.PropertyStore = window.Backed.PropertyStore || new Map();

// TODO: Create & add global observer
var PropertyMixin = base => {
  return class PropertyMixin extends base {
    static get observedAttributes() {
      return Object.entries(this.properties).map(entry => {if (entry[1].reflect) {return entry[0]} else return null});
    }

    get properties() {
      return customElements.get(this.localName).properties;
    }

    constructor() {
      super();
      if (this.properties) {
        for (const entry of Object.entries(this.properties)) {
          entry[1];
          // allways define property even when renderer is not found.
          this.defineProperty(entry[0], entry[1]);
        }
      }
    }

    connectedCallback() {
      if (super.connectedCallback) super.connectedCallback();
      if (this.attributes)
        for (const attribute of this.attributes) {
          if (String(attribute.name).includes('on-')) {
            const fn = attribute.value;
            const name = attribute.name.replace('on-', '');
            this.addEventListener(String(name), event => {
              let target = event.path[0];
              while (!target.host) {
                target = target.parentNode;
              }
              if (target.host[fn]) {
                target.host[fn](event);
              }
            });
          }
      }
    }

    attributeChangedCallback(name, oldValue, newValue) {
      this[name] = newValue;
    }

    /**
     * @param {function} options.observer callback function returns {instance, property, value}
     * @param {boolean} options.reflect when true, reflects value to attribute
     * @param {function} options.render callback function for renderer (example: usage with lit-html, {render: render(html, shadowRoot)})
     */
    defineProperty(property = null, {strict = false, observer, reflect = false, renderer, value}) {
      Object.defineProperty(this, property, {
        set(value) {
          if (value === this[`___${property}`]) return;
          this[`___${property}`] = value;

          if (reflect) {
            if (value) this.setAttribute(property, String(value));
            else this.removeAttribute(property);
          }

          if (observer) {
            if (observer in this) this[observer]();
            else console.warn(`observer::${observer} undefined`);
          }

          if (renderer) {
            const obj = {};
            obj[property] = value;
            if (renderer in this) this.render(obj, this[renderer]);
            else console.warn(`renderer::${renderer} undefined`);
          }

        },
        get() {
          return this[`___${property}`];
        },
        configurable: strict ? false : true
      });
      // check if attribute is defined and update property with it's value
      // else fallback to it's default value (if any)
      const attr = this.getAttribute(property);
      this[property] = attr || this.hasAttribute(property) || value;
    }
  }
};

/**
 * @mixin Backed
 * @module utils
 * @export merge
 *
 * some-prop -> someProp
 *
 * @param {object} object The object to merge with
 * @param {object} source The object to merge
 * @return {object} merge result
 */
var merge = (object = {}, source = {}) => {
  // deep assign
  for (const key of Object.keys(object)) {
    if (source[key]) {
      Object.assign(object[key], source[key]);
    }
  }
  // assign the rest
  for (const key of Object.keys(source)) {
    if (!object[key]) {
      object[key] = source[key];
    }
  }
  return object;
};

var SelectMixin = base => {
  return class SelectMixin extends PropertyMixin(base) {

    static get properties() {
      return merge(super.properties, {
        selected: {
          value: 0,
          observer: '__selectedObserver__'
        }
      });
    }

    constructor() {
      super();
    }

    get slotted() {
      return this.shadowRoot ? this.shadowRoot.querySelector('slot') : this;
    }

    get _assignedNodes() {
      const nodes = 'assignedNodes' in this.slotted ? this.slotted.assignedNodes() : this.children;
      const arr = [];
      for (var i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (node.nodeType === 1) arr.push(node);
      }
      return arr;
    }

    /**
    * @return {String}
    */
    get attrForSelected() {
      return this.getAttribute('attr-for-selected') || 'name';
    }

    set attrForSelected(value) {
      this.setAttribute('attr-for-selected', value);
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue !== newValue) {
        // check if value is number
        if (!isNaN(newValue)) {
          newValue = Number(newValue);
        }
        this[name] = newValue;
      }
    }

    /**
     * @param {string|number|HTMLElement} selected
     */
    select(selected) {
      if (selected) this.selected = selected;
      // TODO: fix selectedobservers
      if (this.multi) this.__selectedObserver__();
    }

    next(string) {
      const index = this.getIndexFor(this.currentSelected);
      if (index !== -1 && index >= 0 && this._assignedNodes.length > index &&
          (index + 1) <= this._assignedNodes.length - 1) {
        this.selected = this._assignedNodes[index + 1];
      }
    }

    previous() {
      const index = this.getIndexFor(this.currentSelected);
      if (index !== -1 && index >= 0 && this._assignedNodes.length > index &&
          (index - 1) >= 0) {
        this.selected = this._assignedNodes[index - 1];
      }
    }

    getIndexFor(element) {
      if (element && element instanceof HTMLElement === false)
        return console.error(`${element} is not an instanceof HTMLElement`);

      return this._assignedNodes.indexOf(element || this.selected);
    }

    _updateSelected(selected) {
      selected.classList.add('custom-selected');
      if (this.currentSelected && this.currentSelected !== selected) {
        this.currentSelected.classList.remove('custom-selected');
      }
      this.currentSelected = selected;
    }

    /**
     * @param {string|number|HTMLElement} change.value
     */
    __selectedObserver__(value) {
      const type = typeof this.selected;
      if (Array.isArray(this.selected)) {
        for (const child of this._assignedNodes) {
          if (child.nodeType === 1) {
            if (this.selected.indexOf(child.getAttribute(this.attrForSelected)) !== -1) {
              child.classList.add('custom-selected');
            } else {
              child.classList.remove('custom-selected');
            }
          }
        }
        return;
      } else if (type === 'object') return this._updateSelected(this.selected);
      else if (type === 'string') {
        for (const child of this._assignedNodes) {
          if (child.nodeType === 1) {
            if (child.getAttribute(this.attrForSelected) === this.selected) {
              return this._updateSelected(child);
            }
          }
        }
      } else {
        // set selected by index
        const child = this._assignedNodes[this.selected];
        if (child && child.nodeType === 1) this._updateSelected(child);
        // remove selected even when nothing found, better to return nothing
      }
    }
  }
};

/**
 * @extends HTMLElement
 */
class CustomPages extends SelectMixin(HTMLElement) {
  constructor() {
    super();
    this.slotchange = this.slotchange.bind(this);
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          flex: 1;
          position: relative;
          --primary-background-color: #ECEFF1;
          overflow: hidden;
        }
        ::slotted(*) {
          display: flex;
          position: absolute;
          opacity: 0;
          pointer-events: none;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          transition: transform ease-out 160ms, opacity ease-out 60ms;
          /*transform: scale(0.5);*/
          transform-origin: left;
        }
        ::slotted(.animate-up) {
          transform: translateY(-120%);
        }
        ::slotted(.animate-down) {
          transform: translateY(120%);
        }
        ::slotted(.custom-selected) {
          opacity: 1;
          pointer-events: auto;
          transform: translateY(0);
          transition: transform ease-in 160ms, opacity ease-in 320ms;
          max-height: 100%;
          max-width: 100%;
        }
      </style>
      <!-- TODO: scale animation, ace doesn't resize that well ... -->
      <div class="wrapper">
        <slot></slot>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.shadowRoot.querySelector('slot').addEventListener('slotchange', this.slotchange);
  }

  isEvenNumber(number) {
    return Boolean(number % 2 === 0)
  }

  /**
   * set animation class when slot changes
   */
  slotchange() {
    let call = 0;
    for (const child of this.slotted.assignedNodes()) {
      if (child && child.nodeType === 1) {
        child.style.zIndex = 99 - call;
        if (this.isEvenNumber(call++)) {
          child.classList.add('animate-down');
        } else {
          child.classList.add('animate-up');
        }
        this.dispatchEvent(new CustomEvent('child-change', {detail: child}));
      }
    }
  }
}customElements.define('custom-pages', CustomPages);

var SelectorMixin = base => {
  return class SelectorMixin extends SelectMixin(base) {

  static get properties() {
      return merge(super.properties, {
        selected: {
          value: 0,
          observer: '__selectedObserver__'
        },
        multi: {
          value: false,
          reflect: true
        }
      });
    }
    constructor() {
      super();
    }
    connectedCallback() {
      super.connectedCallback();
      this._onClick = this._onClick.bind(this);
      this.addEventListener('click', this._onClick);
    }
    disconnectedCallback() {
      this.removeEventListener('click', this._onClick);
    }
    _onClick(event) {
      const target = event.path ? event.path[0] : event.composedPath()[0];
      const attr = target.getAttribute(this.attrForSelected);
      let selected;

      if (target.localName !== this.localName) {
        selected = attr ? attr : target;
      } else {
        selected = attr;
      }
      if (this.multi) {
        if (!Array.isArray(this.selected)) this.selected = [];
        const index = this.selected.indexOf(selected);
        if (index === -1) this.selected.push(selected);
        else this.selected.splice(index, 1);
        // trigger observer
        this.select(this.selected);

      } else this.selected = selected;

      this.dispatchEvent(new CustomEvent('selected', { detail: selected }));
    }
  }
};

const define  = klass => customElements.define('custom-selector', klass);
define(class CustomSelector extends SelectorMixin(HTMLElement) {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = '<slot></slot>';
  }
});

var shell = customElements.define('dimac-shell', class DimacShell extends s {

  #hashBang = '#!/';

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.init();
    document.addEventListener('custom-scroll', this.#onscroll.bind(this));
  }

  #validView(hash) {
    return hash
  }

  #removeHashBang(hash = location.hash) {    
    return hash.slice(this.#hashBang.length, hash.length)
  }

  #addHashBang(hash = location.hash) {    
    return this.#hashBang + hash
  }

  async #onhashchange() {
    let hash = location.hash;
    hash = this.#removeHashBang();
    if (!location.hash || !this.#validView(hash)) return location.hash = this.#addHashBang('home')
    if (!customElements.get(`${hash}-view`)) await import(`./${hash}.js`);
    if (this.shadowRoot.querySelector(`${hash}-view`).shadowRoot.querySelector('img.logo')) {
      this.shadowRoot.querySelector(`${hash}-view`).shadowRoot.querySelector('img.logo').src = this.shadowRoot.querySelector('img.logo').src;
    }
    this.shadowRoot.querySelector('custom-pages').select(hash);
    console.log(hash);
  }

  set drawerShown(value) {
    this._drawerShown = value;
    if (value) {
      this.setAttribute('drawer-shown', '');
    } else this.removeAttribute('drawer-shown');
  }

  get drawerShown() {
    return this._drawerShown
  }

  #onqueryChange({matches}) {
    
  }

  #onscroll({detail}) {
    if (this.lastTop > detail.scrollTop) {
      this.setAttribute('up', '');
    } else if (this.lastTop < detail.scrollTop && detail.scrollTop !== 86) {
      this.removeAttribute('up');
      // this.shadowRoot.querySelector('custom-pages').style.top = `-${detail.scrollTop}px`;
    }
    if (detail.scrollTop > 0) {
      this.setAttribute('scrolling', 'true');
    } else if (detail.scrollTop === 0) {
      this.removeAttribute('scrolling');
    }
    this.lastTop = detail.scrollTop;
    console.log(detail.scrollTop);
  }

  async init() {    
    const mediaQuery = globalThis.matchMedia('(min-width: 1200px)');

    mediaQuery.onchange = this.#onqueryChange.bind(this);
    this.#onqueryChange(mediaQuery);
    
    await this.setTheme();
    await this.updateComplete;
    // await import('./drawer.js');
    await this.setTheme();
    this.setAttribute('shown', '');
    onhashchange = this.#onhashchange.bind(this);
    
    this.#onhashchange();
  }

  set logo(value) {
    const imgs = Array.from(this.shadowRoot.querySelectorAll('img.logo'));
    for (const img of imgs) {
      img.src =  value === 'dark' ? './assets/dimac-dark.svg' : './assets/dimac.svg';
    }
    
  }

  async setTheme(theme = 'default') {
    if (theme === 'dark') this.logo = 'dark';
    else this.logo = 'default';

    const values = (await import(`./themes/${theme}.js`)).default;
    for (const key of Object.keys(values)) {
      this.style.setProperty(`--${key}`, values[key]);
    }
  }

  render() {
    return y`
    <style>
    
    :host {
      display: flex;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      overflow: hidden;
      background: var(--primary-background-color);
      flex-direction: column;
    }

    img {
      max-height: 480px;
      height: 100%;
    }

    header {
      display: flex;
      height: 82px;
      background: var(--primary-background-color);
      box-sizing: border-box;
      padding: 12px 6px;
      align-items: center;
      justify-content: center;
      width: 100%;
      left: 0;
      right: 0;
      opacity: 0;
      pointer-events: none;
      transition: opacity ease-out 360ms, transform ease-in 160ms;
      transform: translateY(-110%);
    }

    :host([shown]) header {      
      opacity: 1;
      pointer-events: auto;
      transition: opacity ease-in 360ms, transform ease-in 160ms;
      transform: translateY(0);
    }

    :host([scrolling]) header {
      transform: translateY(-110%);
    }

    :host([scrolling][up]) header {
      transform: translateY(0);
      border-bottom: 1px solid var(--accent-color);
    }

    custom-pages {
      position: absolute;
      top: 86px;
      left: 0;
      bottom: 0;
      right: 0;
    }

    header custom-svg-icon[icon="menu"] {
      --svg-icon-color: var(--accent-color);
      --svg-icon-size: 36px;
      pointer-event: auto;
      cursor: pointer;
    }

    header img.logo {
      max-height: 40px;
      height: 0;
    }
    custom-selector {
      display: flex;
      flex-direction: row;
    }

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      font-size: 16px;
      font-weight: 500;
      color: #555;
    }

    custom-selector a {      
      padding: 12px;
    }

    custom-selector .custom-selected {
      background: #000;
      color: var(--accent-color);
    }

    .container {
      max-width: 1200px;
      width: 100%;
    }

    a img {
      width: 72px;
    }

    @media(min-width: 460px) {

      header img.logo {
        height: 100%; 
      }
    }
    </style>

    
    <header>
      <flex-row class="container">
        <custom-selector>
          <a href="#!/home">HOME</a>
          <a href="#!/info">INFO</a>
          <a href="#!/team">TEAM</a>
          <a href="#!/projecten">PROJECTEN</a>
        </custom-selector>
        <flex-one></flex-one>
        <a title="home" class="logo" href="/"><img class="logo" alt="logo"></img></a>
      </flex-row>
    </header>

    <custom-pages attr-for-selected="data-route" default-selected="1">
      <home-view data-route="home"></home-view>
    </custom-pages>
    `
  }
});

export { shell as default };
