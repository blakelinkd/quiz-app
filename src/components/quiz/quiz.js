
export class QuizApp extends HTMLElement {
    constructor() {
        super();
        
        this.attachShadow({mode: 'open'});
        fetch('components/quiz/quiz_template.html')
        .then((response) => {
            return response.text().then((text) => { 
                let template = document.createRange()
                .createContextualFragment(text);
                this.shadowRoot.appendChild(template.cloneNode(true));
            });
            
        });
        
        
    }
    
    connectedCallback() {
        this.style.display = 'none';

    }
    disconnectedCallback() {
    }
}

customElements.define('quiz-app', QuizApp);