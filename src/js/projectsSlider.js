import { Swiper, Pagination, EffectFade } from 'swiper';

Swiper.use([Pagination, EffectFade]);

export default function ProjectsSlider() {
    const elements = Array.from(document.querySelectorAll('.js-projects-card-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');
        let trackingCursor = false;
        let currentSlideIndex;
        const instance = new Swiper(container, {
            effect: 'fade',
            watchOverflow: true,
            fadeEffect: {
                crossFade: false
            },
            pagination: {
                el: element.querySelector('.projects__card-slider-pagination'),
                type: 'bullets',
                clickable: true
            },
            on: {
                slideChange: function() {
                    currentSlideIndex = this.realIndex;
                }
            }
        });
        const slidesCount = instance.slides.length;

        container.addEventListener('mouseenter', () => {
            trackingCursor = true;
        });
        container.addEventListener('mouseleave', () => {
            trackingCursor = false;
        });

        container.addEventListener('mousemove', event => {
            if (!trackingCursor) return;
            const { offsetX, target } = event;
            const width = target.offsetWidth;
            const progress = Math.ceil((offsetX / width) * slidesCount);
            let activeSlideIndex = progress - 1;

            if (activeSlideIndex !== currentSlideIndex) {
                instance.slideTo(activeSlideIndex);
            }
        });
    });
}
