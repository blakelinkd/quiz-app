import * as app from '../../main.js';

export class QuizSummary extends HTMLElement {

    constructor() {
        super();
    }

    async connectedCallback() {
        console.log("connected");

        this.attachShadow({ mode: 'open' });
        this.response = await app.quizHTMLLoader("/components/summary/summary_template.html");

        const template = await app.makeTemplate(this.response);
        const unansweredCard = template.querySelector('.unansweredCard');
        const correctCard = template.querySelector('.correctCard');
        const incorrectCard = template.querySelector('.incorrectCard');
        const styleLink = template.querySelector('link');
        const spacerDiv = template.querySelector('.spacer');

        this.shadowRoot.appendChild(styleLink.cloneNode(true));
        this.shadowRoot.appendChild(spacerDiv.cloneNode(true));
        
        const quizObject = await app.getJson();

        for(const question of quizObject.questions){
            switch(question.answerStatus)
            {
                case 'unanswered':
                    let unanswered = unansweredCard.cloneNode(true);
                    var slots = unanswered.querySelectorAll('slot');
                    slots[0].innerHTML = `${question.id}/${quizObject.questionCount}`;
                    slots[1].innerHTML = question.question;
                    this.shadowRoot.appendChild(unanswered);
                    break;

                case 'correct':
                    let correct = correctCard.cloneNode(true);
                    var slots = correct.querySelectorAll('slot');
                    
                    slots[0].innerHTML = `${question.id}/${quizObject.questionCount}`;
                    slots[1].innerHTML = question.question;
                    this.shadowRoot.appendChild(correct);
                    break;

                case 'incorrect':
                    let incorrect = incorrectCard.cloneNode(true);
                    var slots = incorrect.querySelectorAll('slot');
                    
                    slots[0].innerHTML = `${question.id}/${quizObject.questionCount}`;
                    slots[1].innerHTML = question.question;
                    this.shadowRoot.appendChild(incorrect);
                    break;

                default:
                    console.log("default case: " + question);

            }
        }
        
    }

    disconnectedCallback() {
    }
}

customElements.define('quiz-summary', QuizSummary);