import { formValidation } from "./formValidation.js";
import { sendForm } from "./sendForm.js";
import { formErrorMsg } from "./formErrorMsg.js";

export const quiz = () => {

    const quizInvitationBlock = document.querySelector('.quiz__invitation');
    const startBtn = document.querySelector('.quiz__btn');
    const questions = document.querySelectorAll('.quiz-form__content');
    const nextBtns = document.querySelectorAll('.quiz-form__content .quiz-form__btn');
    const submitBtn = document.querySelector('.quiz-form__btn--submit');

    let currentQuestion = 0;
    let previousQuestion = null;
    let finalQuestion = questions.length - 1;
    let nextBtn = nextBtns[currentQuestion];

    const showEl = (el) => {
        el != quizInvitationBlock ? el.style.display = 'flex' : el.style.display = 'grid';

        let posX = -150;
        const timer = setInterval(() => {
            if (posX >= 0){
                clearInterval(timer);
            }

            el.style.transform = 'translateX(' + posX + '%' + ')';

            posX += 5;
        }, 10);
    }

    const hideEl = el => {
        el.style.display = 'none';
        el.style.transform = 'translateX(-150%)';
    }

    const initApp = () => {
        questions.forEach((el, i) => {
            el.style.transform = 'translateX(-1000%)';
            el.style.display = 'none';     
        });

        startBtn.addEventListener('click', startQuiz);
    }

    const startQuiz = () => {
        initApp();

        hideEl(quizInvitationBlock);
        showEl(questions[currentQuestion]);
    
        nextBtn.addEventListener('click', showNextQuestion);
        startBtn.removeEventListener('click', startQuiz);
        startBtn.setAttribute('disabled', true);
    }

    let showNextQuestion = () => {

        const controls = questions[currentQuestion].querySelectorAll('.form-control');

        if(formValidation(controls)) {

            currentQuestion = currentQuestion === finalQuestion ? finalQuestion : currentQuestion + 1;
            previousQuestion = currentQuestion === 0 ? null : currentQuestion - 1;

            hideEl(questions[previousQuestion]);
            showEl(questions[currentQuestion]);

            nextBtn.removeEventListener('click', showNextQuestion);
            nextBtn = nextBtns[currentQuestion];
        
            currentQuestion !== finalQuestion ? nextBtn.addEventListener('click', showNextQuestion) : submitBtn.addEventListener('click', endQuiz);
        } else {
            formErrorMsg(questions[currentQuestion].querySelector('.error-msg'))
        }
    }

    let refreshQuizData = () => {
        showEl(quizInvitationBlock);
        hideEl(questions[currentQuestion]);
        currentQuestion = 0;
        previousQuestion = null;
        nextBtn = nextBtns[currentQuestion];
        startBtn.addEventListener('click', startQuiz)
    }

    let endQuiz = (evt) => {
        evt.preventDefault();

        const controls = questions[currentQuestion].querySelectorAll('.form-control');

        if(formValidation(controls)) {
            const form = evt.target.closest('form');
            const dataModal = form.getAttribute('data-modal');
            const modal = document.querySelector('.' + dataModal)

            sendForm(form, modal);
            refreshQuizData();
        } else {
            formErrorMsg(questions[currentQuestion].querySelector('.error-msg'))
        }     
    }

    initApp();
}

quiz();