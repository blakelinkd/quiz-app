import * as app from '../../main.js';
export class QuizSummary extends HTMLElement {

    constructor() {
        super();
    }

    async connectedCallback() {

        this.attachShadow({ mode: 'open' });
        this.response = await app.quizHTMLLoader("/components/summary/summary_template.html");

        const template = await app.makeTemplate(this.response);

        const unansweredCard = template.querySelector('.unansweredCard');
        let unanswered = unansweredCard.cloneNode(true);

        const correctCard = template.querySelector('.correctCard');
        let correct = correctCard.cloneNode(true);

        const incorrectCard = template.querySelector('.incorrectCard');
        let incorrect = incorrectCard.cloneNode(true);

        const styleLink = template.querySelector('link');
        let style = styleLink.cloneNode(true);

        const spacerDiv = template.querySelector('.spacer');
        let spacer = spacerDiv.cloneNode(true);

        this.shadowRoot.appendChild(style.cloneNode(true));
        this.shadowRoot.appendChild(spacer.cloneNode(true));
        
        const quizObject = await app.getJson();

        console.log(`${quizObject.questionCount} questions loaded.`);
        for(const question of quizObject.questions){
            console.log("evauluating question: " + question.id);
            switch(question.answerStatus)
            {
                case 'unanswered':
                    let unanswered = unansweredCard.cloneNode(true);
                    var slots = unanswered.querySelectorAll('slot');
                    console.log(slots);
                    slots[0].innerHTML = `${question.id}/${quizObject.questionCount}`;
                    slots[1].innerHTML = question.question;
                    this.shadowRoot.appendChild(unanswered);
                    break;

                case 'correct':
                    let correct = correctCard.cloneNode(true);
                    var slots = correct.querySelectorAll('slot');
                    console.log(slots);
                    
                    slots[0].innerHTML = `${question.id}/${quizObject.questionCount}`;
                    slots[1].innerHTML = question.question;
                    this.shadowRoot.appendChild(correct);
                    break;

                case 'incorrect':
                    let incorrect = incorrectCard.cloneNode(true);
                    var slots = incorrect.querySelectorAll('slot');
                    console.log(slots);
                    
                    slots[0].innerHTML = `${question.id}/${quizObject.questionCount}`;
                    slots[1].innerHTML = question.question;
                    this.shadowRoot.appendChild(incorrect);
                    break;

                default:
                    console.log("default case: " + question);

            }
        }
        
        // quizSubject.innerHTML = quizObject.subject;
        // questionCount.innerHTML = Number(quizObject.questionCount);
        
    }

    disconnectedCallback() {
    }
}

customElements.define('quiz-summary', QuizSummary);