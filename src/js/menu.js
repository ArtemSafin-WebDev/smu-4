import { MOBILE_WIDTH } from './constants';
import { lockScroll, unlockScroll } from './scrollBlocker';
import accordions from './accordions';

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
        });


        if (window.matchMedia(`(max-width: ${MOBILE_WIDTH}px)`).matches) {
            const accordionsFactory = accordions(Array.from(document.querySelectorAll('.js-menu-accordion')));

            accordionsFactory.init();
        }
    }
}
