export const modalState = (modal) => {

    // тест ! нужно реализовать все возможные способы закрытия модалки и фокус внутри модалки

    modal.classList.remove('closed');

    const btn = modal.querySelector('.modal__btn');

    const onClickCloseModal = () => {
        modal.classList.add('closed');
    }

    btn.addEventListener('click', onClickCloseModal);
}