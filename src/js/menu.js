import { lockScroll, unlockScroll } from './scrollBlocker';

export default function Menu() {
    const menuOpen = document.querySelector('.js-menu-open');
    const menuClose = document.querySelector('.js-menu-close');
    const menu = document.querySelector('.js-menu');

    if (menu && menuOpen && menuClose) {
        menuOpen.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.add('menu-open');
            lockScroll(menu);
        });

        menuClose.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.remove('menu-open');
            unlockScroll();
        })
    }
}
