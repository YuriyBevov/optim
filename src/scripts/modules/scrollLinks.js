import { scrollToAnchor } from '../functions/scrollToAnchor.js'

export const scrollLinks = () => {

    document.querySelectorAll('.scroll-link').forEach(el => {
        el.addEventListener('click', (evt) => {
            evt.preventDefault();
            const anchor = el.getAttribute('href');
            document.querySelector('.nav__list').classList.remove('nav__list--opened');
            scrollToAnchor(document.querySelector(anchor));
        })
    });
}

scrollLinks();
