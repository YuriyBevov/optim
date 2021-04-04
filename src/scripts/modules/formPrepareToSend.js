import { formValidation } from "./formValidation.js";
import { sendForm } from "./sendForm.js";
import { formErrorMsg } from "./formErrorMsg.js";

export const formSend = () => {
    const form = document.querySelector('.application-form');
    const sendBtn = document.querySelector('.application-form__btn');

    const onClickSendForm = (evt) => {
        evt.preventDefault();

        const formControls = form.querySelectorAll('.form-control');
        
        if(formValidation(formControls)) {

            const dataModal = form.getAttribute('data-modal');
            const modal = document.querySelector('.' + dataModal);
            
            sendForm(form, modal);
        } else {
            formErrorMsg(form.querySelector('.error-msg'));
        }
    }

    sendBtn.addEventListener('click', onClickSendForm);
}

formSend();