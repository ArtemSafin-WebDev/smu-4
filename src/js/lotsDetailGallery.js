import { Swiper, Pagination, Navigation, EffectFade } from 'swiper';

Swiper.use([Pagination, Navigation, EffectFade]);

export default function LotsDetailGallery() {
    const elements = Array.from(document.querySelectorAll('.js-lots-detail-gallery-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');

        new Swiper(container, {
            effect: 'fade',
            watchOverflow: true,
            fadeEffect: {
                crossFade: false
            },
            navigation: {
                nextEl: element.querySelector('.slider-arrows__btn--next'),
                prevEl: element.querySelector('.slider-arrows__btn--prev')
            },
            pagination: {
                el: element.querySelector('.slider-fraction-pagination'),
                type: 'fraction',
                renderFraction: function(currentClass, totalClass) {
                    return `
                    <span class="${currentClass} slider-fraction-pagination__current">
                    
                    </span>
                    <span class="slider-fraction-pagination__divider">
    
                    </span>
                    <span class=" ${totalClass} slider-fraction-pagination__total">
                        
                    </span>
                    `;
                },
                formatFractionCurrent: number => {
                    if (number < 10) {
                        return '0' + number;
                    } else {
                        return number;
                    }
                },
                formatFractionTotal: number => {
                    if (number < 10) {
                        return '0' + number;
                    } else {
                        return number;
                    }
                }
            }
        });
    });
}
