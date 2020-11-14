import { lockScroll, unlockScroll } from './scrollBlocker';

export default function Modals() {
    let currentActiveModal = null;

    document.addEventListener('click', event => {
        const modalOpenClick = event.target.matches('.js-modal-open') || event.target.closest('.js-modal-open');

        if (modalOpenClick) {
            const link = event.target.matches('.js-modal-open') ? event.target : event.target.closest('.js-modal-open');
            const hash = link.hash;

            if (!hash) {
                console.error('No hash on the link', link);
                return;
            }

            const modal = document.querySelector(`.js-modal${hash}`);

            if (!modal) {
                console.error('No modal found');
                return;
            }

            console.log('Found modal', modal);

            modal.classList.add('shown');
            lockScroll(modal);
            currentActiveModal = modal;
            return;
        }

        const modalCloseClick = event.target.matches('.js-modal-close') || event.target.closest('.js-modal-close');
        const modalBgClick = event.target.matches('.js-modal');

        if (modalCloseClick || modalBgClick) {
            const modal = event.target.closest('.js-modal');

            if (!modal) {
                consoler.error('No modal found');
                return;
            }

            modal.classList.remove('shown');
            unlockScroll();
            currentActiveModal = null;
        }
    });

    document.addEventListener('keyup', event => {
        if (event.key === 'Escape' && currentActiveModal) {
            currentActiveModal.classList.remove('shown');
            unlockScroll();
            currentActiveModal = null;
        }
    });
}
