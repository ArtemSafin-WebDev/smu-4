import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { debounce } from 'lodash';
import { MOBILE_WIDTH } from './constants';

gsap.registerPlugin(ScrollToPlugin);

export default function History() {
    const elements = Array.from(document.querySelectorAll('.js-history'));

    elements.forEach(element => {
        const scrollContainer = element.querySelector('.history__years-inner');
        const bgLayers = Array.from(element.querySelectorAll('.history__bg-layer'));
        const yearsLinks = Array.from(element.querySelectorAll('.history__years-link'));
        const historyItems = Array.from(element.querySelectorAll('.history__item'));
        let activeIndex = 0;
        if (!yearsLinks.length) {
            console.warn('No years links');
            return false;
        }

        const marker = document.createElement('span');
        marker.className = 'history__years-marker';

        scrollContainer.prepend(marker);

        

        const setActiveLink = index => {
            yearsLinks.forEach(link => link.classList.remove('active'));
            const newActiveLink = yearsLinks[index];
            newActiveLink.classList.add('active');
         

            if (window.matchMedia(`(max-width: ${MOBILE_WIDTH}px)`).matches) {
                const distanceToLink = yearsLinks[index].offsetLeft + yearsLinks[index].offsetWidth / 2;

                gsap.to(marker, {
                    duration: 0.4,
                    left: distanceToLink
                });
            } else {
                const distanceToLink = yearsLinks[index].offsetTop + yearsLinks[index].offsetHeight / 2;

                gsap.to(marker, {
                    duration: 0.4,
                    top: distanceToLink
                });
            }

            activeIndex = index;

            if (
                newActiveLink.hasAttribute('data-bg-layer') &&
                bgLayers.find(layer => layer.getAttribute('data-bg-layer') === newActiveLink.getAttribute('data-bg-layer'))
            ) {
                element.classList.add('blue-bg');
                bgLayers.forEach(layer => layer.classList.remove('active'));
                const layer = bgLayers.find(layer => layer.getAttribute('data-bg-layer') === newActiveLink.getAttribute('data-bg-layer'));
                layer.classList.add('active');
            } else {
                bgLayers.forEach(layer => layer.classList.remove('active'));
                const baseLayer = bgLayers.find(layer => layer.hasAttribute('data-base-layer'));
                baseLayer.classList.add('active');
                element.classList.remove('blue-bg');
            }


            historyItems.forEach(item => item.classList.remove('active'));

            historyItems[index].classList.add('active')
          
        };

        setActiveLink(activeIndex);

        yearsLinks.forEach((link, linkIndex) => {
            link.addEventListener('click', event => {
                event.preventDefault();
                setActiveLink(linkIndex);
            });
        });

        window.addEventListener(
            'resize',
            debounce(() => {
                setActiveLink(activeIndex);
            }, 300)
        );
    });
}
