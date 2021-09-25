import { componentLoader } from "../../main.js";

export class NavBar extends HTMLElement {
    constructor() {
        super();
        
        this.attachShadow({mode: 'open'});
        fetch('/components/navbar/navbar_template.html')
        .then((response) => {
            return response.text().then((text) => { 
                let template = document.createRange()
                .createContextualFragment(text);
                this.shadowRoot.appendChild(template.cloneNode(true));
                let list = this.shadowRoot.querySelectorAll('li');
                for(let item of list)
                {
                    item.addEventListener('click', componentLoader, item);
                }
                
            });
            
        });
        
        
    }
    
    
    
    connectedCallback() {
        

    }
    disconnectedCallback() {
    }
}

customElements.define('nav-bar', NavBar);