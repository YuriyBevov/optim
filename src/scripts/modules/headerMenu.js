export const headerMenu = () => {
    const burger = document.querySelector('.nav__toggle');
    const menu = document.querySelector('.nav__list');

    const onClickShowMenu = () => {
        menu.classList.toggle('nav__list--opened');
    }

    burger.addEventListener('click', onClickShowMenu);
}

headerMenu();