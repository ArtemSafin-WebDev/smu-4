import { Swiper, Pagination, EffectFade } from 'swiper';

Swiper.use([Pagination, EffectFade]);

export default function LotsCardImageSlider() {
    const elements = Array.from(document.querySelectorAll('.js-lots-image-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');
        
        new Swiper(container, {
            effect: 'fade',
            watchOverflow: true,
            fadeEffect: {
                crossFade: false
            },
            pagination: {
                el: element.querySelector('.lots__card-image-slider-pagination'),
                type: 'bullets',
                clickable: true
            }
        });
    });
}
