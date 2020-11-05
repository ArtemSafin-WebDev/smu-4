import { MOBILE_WIDTH } from "./constants";

export default function Services() {
    if (window.matchMedia(`(max-width: ${MOBILE_WIDTH}px)`).matches) return;
    const elements = Array.from(document.querySelectorAll('.js-services'));

    elements.forEach(element => {
        const cards = Array.from(element.querySelectorAll('.js-services-card'));

        function setActiveCard(index) {
            cards.forEach(card => card.classList.remove('active'));
            if (typeof index !== 'undefined' && index !== null && cards[index]) {
                cards[index].classList.add('active');
                element.classList.add('card-hovered');
            } else {
                element.classList.remove('card-hovered');
            }
        }

        cards.forEach((card, cardIndex) => {
            card.addEventListener('mouseenter', () => {
                setActiveCard(cardIndex);
            });

            card.addEventListener('mouseleave', () => {
                setActiveCard(null);
            });
        });
    });
}
