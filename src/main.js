import { NavBar } from './components/navbar/navbar.js';
import { QuizApp } from './components/quiz/quiz.js';
import { QuizIntro } from './components/intro/intro.js';
import { QuizSummary } from './components/summary/summary.js';
import { ConfirmModal } from './components/modal/modal.js';


export function getComponents() {
    return components;
}

const jsonPath = "quizes/quiz1.json";
const openTriviaURL = "https://opentdb.com/api.php?amount=5&category=20&difficulty=easy&type=multiple";


let quizJson = await quizJsonLoader(openTriviaURL)
.then(function (data) { 
    data.results.forEach((question) => question.answer_status = "unanswered");
    return data
 })
.catch((error) => console.error(error));


console.log(quizJson);
initApp();

const components = [ 'quiz-app', 'quiz-intro', 'quiz-summary'];

export async function getJson() {
    return quizJson;
}

export let quizState = {
    "activeQuestion": 1,
    "selectedAnswer": "",
    "lastAnswer": "",
    "percentageComplete": "0%"
}

export function progressPercentage() {
    const length = quizJson.results.length;
    let questions_left = 0;
    quizJson.results.forEach((question) => { 
        if(question.answer_status === "unanswered") 
            questions_left++;
        });

    const percentage = (length - questions_left)/length * 100;
    quizState.percentageComplete = `${percentage}%`;
}


export function updateInfoPanel() {
    console.log('update info');
    console.log(document);
    let quizElem = document.querySelector('quiz-app');
    let infoPanel = quizElem.shadowRoot.querySelector('#percent_complete');
    infoPanel.innerHTML = quizState.percentageComplete;

    console.log(infoPanel);
}

export function setSelectedAnswer(text) {
    quizState.selectedAnswer = text.target.getAttribute('value');
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
    console.log(quizJson.results[quizState.activeQuestion - 1].correct_answer.trim() + " ?= " + quizState.selectedAnswer);
    if(quizJson.results[quizState.activeQuestion - 1].correct_answer.trim() === quizState.selectedAnswer) {
        console.log("You are Correct!");
       quizJson.results[quizState.activeQuestion - 1].answer_status = "correct";
       quizState.lastAnswer.classList.add('card--background-color-green');
       reloadComponent('quiz-summary');
       progressPercentage();
       updateInfoPanel();
       
       return;
    }
    quizJson.results[quizState.activeQuestion - 1].answer_status = "incorrect";
    quizState.lastAnswer.classList.add('card--background-color-red');
    reloadComponent('quiz-summary');
    progressPercentage();
    updateInfoPanel();
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


export function getActiveQuestion() {
    return quizState.activeQuestion;
}
export function nextQuestion() {
    if(quizState.activeQuestion < quizJson.results.length)  {
        quizState.activeQuestion++
    }
    else {
        quizState.activeQuestion = 1;
    }
    reloadComponent('quiz-app');
    
}

export function prevQuestion() {
    if(quizState.activeQuestion > 1)  {
        quizState.activeQuestion--
    }
    else {
        quizState.activeQuestion = quizJson.results.length;
    }
    reloadComponent('quiz-app');
    
}


export function unloadComponent(target) {
    let component = document.querySelector(target);
    if(component == null) {
        return;
    }
    component.remove();
}

export function loadComponent(target) {
    const newComponent = document.createElement(target);
    document.body.appendChild(newComponent);
}

export function reloadComponent(target) {
    let component = document.querySelector(target);
    if(component == null) {
        return;
    }
    component.remove();
    const newComponent = document.createElement(target);
    document.body.appendChild(newComponent);
}

export async function componentLoader(component) {
    let componentName = component.target.getAttribute('name');
    console.log("component: " + componentName);
    components.forEach((name) => {
        unloadComponent(name);
    });
    loadComponent(componentName);
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

