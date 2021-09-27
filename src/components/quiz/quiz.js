import * as app from '../../main.js';
import * as Modal from '../modal/modal.js';
export class QuizApp extends HTMLElement {

    constructor() {
        super();
    }

    setNextQuestion() {
        console.log("setNextQuestion()");
    }

    async connectedCallback() {

        this.attachShadow({ mode: 'open' });
        this.response = await app.quizHTMLLoader("/components/quiz/quiz_template.html");

        const template = await app.makeTemplate(this.response);
        
        const answerCard = template.querySelector('.answer');
        const questionCard = template.querySelector('.question');
        const appContainer = template.querySelector('.app-container');
        appContainer.removeChild(appContainer.firstElementChild);
        
        // Clear out the template elements
        const answersContainer = template.querySelector('.answers');
        while(answersContainer.firstChild) {
            answersContainer.removeChild(answersContainer.firstChild);
        }

        
        const quizObject = await app.getJson();
        let activeQuestionIndex = app.getActiveQuestion();
        console.log(activeQuestionIndex + '   index');
        let activeQuestion = quizObject.questions[ activeQuestionIndex-1 ];
        console.log(activeQuestion);
        let question = questionCard.cloneNode(true);
        var slots = question.querySelectorAll('slot');
        slots[0].innerHTML = `${activeQuestion.id}/${quizObject.questionCount}`;
        slots[1].innerHTML = activeQuestion.question;
        appContainer.prepend(question.cloneNode(true));


        activeQuestion.answers.forEach((value, i) => {
            let answer = answerCard.cloneNode(true);
            let paragraph = answer.querySelector('p');
            let answerchar = String.fromCharCode(i+65);
            answer.setAttribute("value", value);
            paragraph.innerHTML = 
            `<span>${answerchar}</span> ${value}`;
            answersContainer.appendChild(answer);
            
        });
        
        
        
        this.shadowRoot.appendChild(template.cloneNode(true));
        
        let answers = this.shadowRoot.querySelectorAll('.answer');

        for (let answer of answers) {
            let paragraph = answer.querySelector('p');
            answer.addEventListener('click', app.setSelectedAnswer, false);
            
            answer.addEventListener('click', Modal.initModal, false);
            
            answer.paragraph = paragraph.innerHTML;
        }

        
        
        
        
        
        


        
        
        
    }

    disconnectedCallback() {
    }
}

customElements.define('quiz-app', QuizApp);