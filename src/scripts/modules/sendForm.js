import { clearFormData } from './clearFormData.js';
import { modalState } from './modalState.js';

export const sendForm = (form, modal) => {
    form.submit();

    // очищаю данные формы
    clearFormData(form);

    //показ модалки
    modalState(modal);
}