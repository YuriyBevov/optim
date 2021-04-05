import { clearFormData } from './clearFormData.js';
import { modalState } from './modalState.js';

export const sendForm = (form, data, modalSuccess, modalError) => {

    /* 
        form.submit();

        // очищаю данные формы
        clearFormData(form);

        //показ модалки
        modalState(modal);
    */

    const currentPageURL = window.location.href;
    const testURL = 'https://httpbin.org/post';

    const sendFormData = (url, requestBody) => {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();

            request.open("POST", url, true);
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            request.addEventListener('load', () => {               
                request.status < 400 ? resolve(request.responseText) : reject(new Error("Ошибка: " + request.statusText));
            });

            request.addEventListener('error', () => {
                reject(new Error("Ошибка сети"));
            });

            request.send(requestBody);
        });
    }
       
    sendFormData(currentPageURL, data).then(() => {

        // очищаю данные формы
        clearFormData(form);

        //показ модалки
        modalState(modalSuccess);
    }, error => {
        // console.log(error)
        // показ сообщения об ошибке
        modalState(modalError);
    });
}