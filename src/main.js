import { NavBar } from './components/navbar/navbar.js';
import { QuizApp } from './components/quiz/quiz.js';
import { QuizIntro } from './components/intro/intro.js';
import { QuizSummary } from './components/summary/summary.js';
import { ConfirmModal } from './components/modal/modal.js';


export function getComponents() {
    return components;
}

const jsonPath = "quizes/quiz1.json";

let quizJson = await quizJsonLoader(jsonPath)
.then(function (data) { return data })
.catch((error) => console.error(error));

initApp();
const navbar = document.querySelector('nav-bar');
const quiz = document.querySelector('quiz-app');
const intro = document.querySelector('quiz-intro');
const summary = document.querySelector('quiz-summary');
const modal = document.querySelector('confirm-modal');

const components = [ 
    { name: "navbar", comp: navbar}, 
    { name: "modal", comp: modal},
    { name: "quiz", comp: quiz}, 
    { name: "intro", comp: intro}, 
    { name: "summary", comp: summary}];

export async function getJson() {
    return quizJson;
}

let quizState = {
    "activeQuestion": 1,
    "selectedAnswer": "",
    "lastAnswer": ""
}

export function setSelectedAnswer(text) {
    quizState.selectedAnswer = text.target.getAttribute('value');
    console.log(quizState.selectedAnswer);
    if (!quizState.lastAnswer) {
        console.log("no last anwer");
        quizState.lastAnswer = text.target;
        text.target.classList.add('card--background-color-blue');
        return;
    }

    if(quizState.lastAnswer !== text.target) {
        quizState.lastAnswer.classList.remove('card--background-color-blue');
        text.target.classList.add('card--background-color-blue');
        quizState.lastAnswer = text.target;
    }
}
export async function checkAnswer(event) {
    console.log(quizJson);
    console.log(quizJson.questions[quizState.activeQuestion - 1].correctAnswer + " ?= " + quizState.selectedAnswer);
    if(quizJson.questions[quizState.activeQuestion - 1].correctAnswer === quizState.selectedAnswer) {
        console.log("You are Correct!");
       quizJson.questions[quizState.activeQuestion - 1].answerStatus = "correct";
       refreshApp('quiz-summary');
       
       return;
    }
    quizJson.questions[quizState.activeQuestion - 1].answerStatus = "incorrect";
       refreshApp('quiz-summary');
    
    console.log(JSON.stringify(quizJson));

}
export function getQuizState() {
    return quizState;
}

function initApp() {
    const Nav = document.createElement('nav-bar');
    const Modal = document.createElement('confirm-modal');
    Modal.style.display = 'none';
    const Intro = document.createElement('quiz-intro');
    const App = document.createElement('quiz-app');
    App.style.display = 'none';
    const Summary = document.createElement('quiz-summary');
    Summary.style.display = 'none';
    document.body.appendChild(Nav);
    document.body.appendChild(Modal);
    document.body.appendChild(Intro);
    document.body.appendChild(App);
    document.body.appendChild(Summary);

}

export function refreshApp(target) {
    let component = document.querySelector(target);
    component.remove();
    const newComponent = document.createElement(target);
    newComponent.style.display = 'none';
    document.body.appendChild(newComponent);
}

export function getActiveQuestion() {
    return quizState.activeQuestion;
}
export function nextQuestion() {
    console.log(quizJson.questionCount);
    if(quizState.activeQuestion < quizJson.questionCount)  {
        quizState.activeQuestion++
    }
    else {
        quizState.activeQuestion = 1;
    }
    console.log(quizState.activeQuestion);

    refreshApp();
}

export async function componentLoader(hi) {
    for(const comp of components)
    {
        if (comp.name !== hi.target.id && comp.name !== "navbar")
        {
            comp.comp.style.display = 'none';
            
        }
        else {
            comp.comp.style.display = "block";
        }
    }
    
}
export async function quizJsonLoader(pathToJson) {
    const response = await fetch(pathToJson);
    return response.json();
}

export async function quizHTMLLoader(pathToHtml) {
    const response = await fetch(pathToHtml);
    return response.text();
    }




export async function makeTemplate(response) {
    let template = document.createRange()
            .createContextualFragment(response);
    return template;
}

