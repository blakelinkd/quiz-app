let card_template = document.createElement('template');

customElements.define('custom-card',
class CustomCard extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        fetch('/card_template.html')
        .then((response) => {
            return response.text().then((text) => { 
                let template = document.createRange()
                .createContextualFragment(text);
                this.shadowRoot.appendChild(template.cloneNode(true));
            });
        
        });


    }

    connectedCallback() {
    }
     disconnectedCallback() {
    }
}

);