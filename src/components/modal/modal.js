import * as app from '../../main.js';

export function toggleModal() {
    
    console.log("clicky");
    let modal = document.querySelector('confirm-modal');
    console.log(modal);
    console.log(modal.style);
    if (modal.style.display === 'none')
        modal.style.display = 'block';
    else
    modal.style.display = 'none';
}

export function initModal(event) {
    event.stopPropagation();
    let modal = document.querySelector('confirm-modal');
    let p = modal.shadowRoot.querySelector('p');
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

    }

    disconnectedCallback() {
    }
}

customElements.define('confirm-modal', ConfirmModal);