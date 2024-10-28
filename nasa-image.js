import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";


export class NasaImage extends DDDSuper(LitElement) {

    constructor() {
        super();
        this.title = '';
        this.source = '';
        this.alt = '';
        this.secondary_creator = '';
    }

    static get properties() {
        return {
            source: { type: String },
            title: { type: String },
            alt: { type: String },
            secondary_creator: { type: String },
        };
    }

    static get styles() {
        return [css`
    

    .card {
    display: inline-block;
    box-shadow: var(--ddd-boxShadow-sm);
    border: var(-ddd-border-sm);
    background-color: var(--ddd-theme-default-potential0);
    width: 240px;
    height: 320px;
    padding: 10px;
    margin: 4px;

    }

    .card div {
    max-width: 200px;
    font-size: 16px;
    font-weight: bold;
    }

    .card img {
    display: block;
    width: 240px;
    height: 180px;
    }

    .card:hover{
        background-color: var(--ddd-theme-default-navy40);
    
    }



    `];
    }

    render() {
        return html`
    <div class="card">
        <a href="${this.source}" target="_blank"> 
        <img src="${this.source}" alt="${this.alt}" />
    </a>
        <div>${this.title}</div>
        <div> Owner: ${this.secondary_creator}</div>
        
    </div>
    `;
    }
    static get tag() {
        return "nasa-image";
    }
}
customElements.define(NasaImage.tag, NasaImage);