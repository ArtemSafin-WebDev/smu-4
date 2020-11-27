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

    function YouTubeGetID(url){
        url = url.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        return undefined !== url[2]?url[2].split(/[^0-9a-z_\-]/i)[0]:url[0];
    }

    document.addEventListener('click', event => {
        if (event.target.matches('.js-youtube-modal') || event.target.closest('.js-youtube-modal')) {
            const link = event.target.matches('.js-youtube-modal') ? event.target : event.target.closest('.js-youtube-modal');
            const id = YouTubeGetID(link.getAttribute('data-youtube-url'));
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube.com/embed/${id}`;
            iframe.setAttribute('frameborder', 0);
            iframe.setAttribute('width', 560);
            iframe.setAttribute('height', 315);

            const iframeWrapper = document.createElement('div');
            iframeWrapper.className = 'youtube-video-wrapper';

            iframeWrapper.appendChild(iframe);
            const youtubeModalContent = document.querySelector('.js-youtube-modal-content');

            youtubeModalContent.innerHTML = '';

            youtubeModalContent.appendChild(iframeWrapper);
        }
    })

    document.addEventListener('keyup', event => {
        if (event.key === 'Escape' && currentActiveModal) {
            currentActiveModal.classList.remove('shown');
            unlockScroll();
            currentActiveModal = null;
        }
    });
}
