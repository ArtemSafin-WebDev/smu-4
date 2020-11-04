import { Swiper, Pagination } from 'swiper';

Swiper.use([Pagination]);

export default function RealisedProjects() {
    const elements = Array.from(document.querySelectorAll('.js-realised-projects'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');

        new Swiper(container, {
            spaceBetween: 3,
            slidesPerView: 'auto',
            watchOverflow: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            // loop: true,
            loopedSlides: 4,
            pagination: {
                el: element.querySelector('.realised-projects__slider-pagination'),
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
                }
            }
        });
    });
}
