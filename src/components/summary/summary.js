
export class QuizSummary extends HTMLElement {
    
    constructor() {
        super();
        
        this.attachShadow({mode: 'open'});
        fetch('/components/summary/summary_template.html')
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

customElements.define('quiz-summary', QuizSummary);