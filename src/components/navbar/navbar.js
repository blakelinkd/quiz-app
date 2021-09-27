import { componentLoader } from "../../main.js";
import * as app from '../../main.js';
export class NavBar extends HTMLElement {

    constructor() {
        super();
    }

    async connectedCallback() {

        this.attachShadow({ mode: 'open' });
        this.response = await app.quizHTMLLoader("/components/navbar/navbar_template.html");

        const template = await app.makeTemplate(this.response);

        this.shadowRoot.appendChild(template.cloneNode(true));
        
        let list = this.shadowRoot.querySelectorAll('li');
        for (let item of list) {
            item.addEventListener('click', componentLoader, item);
        }



    }

    disconnectedCallback() {
    }
}

customElements.define('nav-bar', NavBar);