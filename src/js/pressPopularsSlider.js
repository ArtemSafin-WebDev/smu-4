import { Swiper, Pagination, Navigation, Autoplay } from 'swiper';

Swiper.use([Pagination, Autoplay, Navigation]);

export default function PressPopularsSlider() {
    const elements = Array.from(document.querySelectorAll('.js-press-populars-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');

        new Swiper(container, {
            slidesPerView: 'auto',
            spaceBetween: 8,
            watchOverflow: true,
            speed: 750,
            centeredSlides: true,
            loop: Array.from(element.querySelectorAll('.swiper-slide')).length > 2 ? true : false,
            loopedSlides: 3,
            loopAdditionalSlides: 3,
            slideToClickedSlide: true,
            
           
       
            navigation: {
                nextEl: element.querySelector('.slider-arrows__btn--next'),
                prevEl: element.querySelector('.slider-arrows__btn--prev')
            },
            breakpoints: {
                768: {
                    spaceBetween: 16,
                }
            }
        });
    });
}
