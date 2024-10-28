import { LitElement, html, css } from 'lit';
import "./nasa-image.js";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class NasaSearch extends DDDSuper(LitElement) {
  static get properties() {
    return {
      title: { type: String },
      loading: { type: Boolean, reflect: true },
      items: { type: Array, },
      value: { type: String },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
      :host([loading]) .results {
        opacity: 0.1;
        visibility: hidden;
        height: 1px;
      }
      .results {
        visibility: visible;
        height: 100%;
        opacity: 1;
        transition-delay: .5s;
        transition: .5s all ease-in-out;
        justify-content: center;
        gap: 90px;
      }

      details {
        margin: 16px;
        padding: 16px;
        background-color: blue;
      }
      summary {
        font-size: 24px;
        padding: 8px;
        color: white;
        font-size: 42px;
        color: var(--ddd-theme-default-coalyGray)''
      }
      input {
        font-size: 20px;
        line-height: 40px;
        width: 100%;
      }
    `;
  }

  constructor() {
    super();
    this.value = null;
    this.title = '';
    this.loading = false;
    this.items = [];
  }

  render() {
    return html`
    <h2>${this.title}</h2>
    <details open>
      <summary>Search inputs</summary>
      <div>
        <input id="input" placeholder="Search NASA images" @input="${this.inputChanged}" />
      </div>
    </details>
    <div class="results">


      ${this.items.map((item, index) => html`
      <nasa-image
        source="${item.links[0].href}"
        title="${item.data[0].title}"
        alt="${item.data[0].title}"
        secondary_creator= "${item.data[0].secondary_creator}"
      ></nasa-image>
      `)}
    </div>
    `;
  }

  inputChanged(e) {
    this.value = this.shadowRoot.querySelector('#input').value;
  }
  // life cycle will run when anything defined in `properties` is modified
  updated(changedProperties) {
    // see if value changes from user input and is not empty
    if (changedProperties.has('value') && this.value) {
      this.updateResults(this.value);
    }
    else if (changedProperties.has('value') && !this.value) {
      this.items = [];
    }
    // @debugging purposes only
    if (changedProperties.has('items') && this.items.length > 0) {
      console.log(this.items);
    }
  }

  updateResults(value) {
    this.loading = true;
    fetch(`https://images-api.nasa.gov/search?media_type=image&q=${value}`).then(d => d.ok ? d.json() : {}).then(data => {
      if (data.collection) {
        this.items = [];
        this.items = data.collection.items;
        this.loading = false;
      }
    });
  }

  static get tag() {
    return 'nasa-search';
  }
}
customElements.define(NasaSearch.tag, NasaSearch);