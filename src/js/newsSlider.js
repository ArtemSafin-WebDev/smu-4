import { Swiper, Pagination, Autoplay, Navigation } from 'swiper';

Swiper.use([Pagination, Autoplay, Navigation]);

export default function NewsSlider() {
    const elements = Array.from(document.querySelectorAll('.js-news-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');

        new Swiper(container, {
            slidesPerView: 3,
            watchOverflow: true,
            navigation: {
                nextEl: element.querySelector('.slider-arrows__btn--next'),
                prevEl: element.querySelector('.slider-arrows__btn--prev')
            }
        });
    });
}
