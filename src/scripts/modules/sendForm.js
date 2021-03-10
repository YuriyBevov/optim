import { modalState } from './modalState.js';

export const sendForm = (form, modal) => {
    // тест ! тут должна быть отправка формы, после показ модалки !

    /*inputs.forEach(element => {
        console.log(
            element.value
        )
    });*/

    modalState(modal);
}