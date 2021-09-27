import * as app from '../../main.js';


export class QuizIntro extends HTMLElement {

    constructor() {
        super();
    }

    async connectedCallback() {

        this.attachShadow({ mode: 'open' });
        this.response = await app.quizHTMLLoader("/components/intro/intro_template.html");

        this.template = await app.makeTemplate(this.response);
        this.shadowRoot.appendChild(this.template.cloneNode(true));

        let quizSubject = this.shadowRoot.querySelector('slot[name="quizSubject"]');
        let questionCount = this.shadowRoot.querySelector('slot[name="questionCount"]');
        
        const quizObject = await app.getJson();
        console.log(quizObject);

        quizSubject.innerHTML =   `<b>${quizObject.results[0].category}</b>`;
        questionCount.innerHTML = `<b>${quizObject.results.length}</b>`;

        const button = this.shadowRoot.querySelector('#button-begin');
        button.addEventListener('click', app.componentLoader, false);
        
    }

    disconnectedCallback() {
    }
}

customElements.define('quiz-intro', QuizIntro);