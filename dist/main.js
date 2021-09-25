import { NavBar } from './components/navbar/navbar.js';
import { QuizApp } from './components/quiz/quiz.js';
import { QuizIntro } from './components/intro/intro.js';
import { QuizSummary } from './components/summary/summary.js';

const navbar = document.querySelector('nav-bar');
const quiz = document.querySelector('quiz-app');
const intro = document.querySelector('quiz-intro');
const summary = document.querySelector('quiz-summary');

const components = [ { name: "navbar", comp: navbar}, { name: "quiz", comp: quiz}, { name: "intro", comp: intro}, { name: "summary", comp: summary}];

const quizJson = document.getElementById('quiz-app').getAttribute('quizJson');

testJsonLoader(quizJson);

function testJsonLoader(json) {
    fetch(json)
  .then(response => response.json())
  .then(data => console.log(data)).catch(error => console.log(error));
}





export const componentLoader = function(hi) {
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