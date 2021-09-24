const template = document.createElement('template');

template.innerHTML =
`
<link rel="stylesheet" href="style.css">
<link rel="stylesheet" href="reset.css">
<div>
<h1>Hasdff</h1>
</div>
`;

class QuizApp extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

    }


    connectedCallback() {
    }

     disconnectedCallback() {
    }

    
}

window.customElements.define('quiz-app', QuizApp);