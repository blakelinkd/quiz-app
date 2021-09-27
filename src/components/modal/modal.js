import * as app from '../../main.js';

export function toggleModal() {
    
    console.log("clicky");
    let compons = app.getComponents().filter((value) => value.name === 'modal');
    
    if (compons[0].comp.style.display === 'block')
    compons[0].comp.style.display = 'none';
    else
    compons[0].comp.style.display = 'block';
}

export function initModal(event) {
    event.stopPropagation();
    let compons = app.getComponents().filter((value) => value.name === 'modal');
    let p = compons[0].comp.shadowRoot.querySelector('p');
    p.innerHTML = event.target.paragraph;
    toggleModal();

}

function buttonHandler(event) {
    console.log(event.target);
    console.log('target: ' + event.target.innerText);
    if(event.target.innerText === "Yes")
    {
        app.checkAnswer();
        //app.nextQuestion();
    }

    toggleModal();
}

export class ConfirmModal extends HTMLElement {

    constructor() {
        super();

    }

    
    async connectedCallback() {


        this.attachShadow({ mode: 'open' });
        this.response = await app.quizHTMLLoader("/components/modal/modal_template.html");

        const template = await app.makeTemplate(this.response);
        const styleLink = template.querySelector('link');

        this.shadowRoot.appendChild(template.cloneNode(true));

        

        const modalBackground = this.shadowRoot.querySelector('#modalBackground');
        modalBackground.addEventListener('click', toggleModal, false);

        const modalConfirmBox = this.shadowRoot.querySelector('#confirmModal');
        modalConfirmBox.addEventListener('click', (event) => event.stopPropagation(), false);
        
        
        const buttons = modalConfirmBox.querySelectorAll('button');
        buttons.forEach((button) => button.addEventListener('click', (event) => buttonHandler(event), false));
        
        // modalConfirmBox.addEventListener('click', toggleModal, false);
       

        




    }

    disconnectedCallback() {
    }
}

customElements.define('confirm-modal', ConfirmModal);