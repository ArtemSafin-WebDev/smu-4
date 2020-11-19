import { Swiper, Pagination, Navigation, EffectFade } from 'swiper';
import { MOBILE_WIDTH } from './constants';

Swiper.use([Pagination, Navigation, EffectFade]);

export default function DirectionGallery() {
    const elements = Array.from(document.querySelectorAll('.js-direction-gallery'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');

        new Swiper(container, {
           
            watchOverflow: true,
           
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
            },
            breakpoints: {
                [MOBILE_WIDTH + 1]: {
                    effect: 'fade',
                    fadeEffect: {
                        crossFade: false
                    },
                }
            }
        });
    });
}
