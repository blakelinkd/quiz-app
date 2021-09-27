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
        quizSubject.innerHTML = quizObject.subject;
        questionCount.innerHTML = Number(quizObject.questionCount);
        
    }

    disconnectedCallback() {
    }
}

customElements.define('quiz-intro', QuizIntro);