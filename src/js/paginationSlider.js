import { Swiper, Navigation } from 'swiper';

Swiper.use([Navigation]);

export default function PaginationSlider() {
    const elements = Array.from(document.querySelectorAll('.js-pagination-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');

        new Swiper(container, {
            slidesPerView: 4,
            watchOverflow: true,
            navigation: {
                nextEl: element.querySelector('.slider-arrows__btn--next'),
                prevEl: element.querySelector('.slider-arrows__btn--prev')
            }
        });
    });
}
