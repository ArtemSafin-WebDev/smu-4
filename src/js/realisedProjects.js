import { Swiper, Pagination, Autoplay } from 'swiper';
import gsap from 'gsap';

Swiper.use([Pagination, Autoplay]);

export default function RealisedProjects() {
    const elements = Array.from(document.querySelectorAll('.js-realised-projects'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');
        const nextBtn = element.querySelector('.slider-arrows__btn--next');
        const prevBtn = element.querySelector('.slider-arrows__btn--prev');

        const slider = new Swiper(container, {
            spaceBetween: 3,
            slidesPerView: 'auto',
            watchOverflow: true,
            watchSlidesVisibility: true,
            speed: 800,
            watchSlidesProgress: true,
            // loop: true,
            // loopedSlides: 4,
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
            autoplay: {
                delay: 5000,
                disableOnInteraction: true
            }
        });

        const handleActivity = progress => {
            if (progress === 0) {
                prevBtn.disabled = true;
            } else {
                prevBtn.disabled = false;
            }

            if (progress === 1) {
                nextBtn.disabled = true;
            } else {
                nextBtn.disabled = false;
            }
        };

        slider.on('progress', () => {
            handleActivity(slider.progress);
        });

        const onAutoPlay = () => {
            nextBtn.classList.add('autoplay');
            gsap.fromTo(
                nextBtn,
                {
                    '--slider-progress': 0
                },
                {
                    '--slider-progress': 1,
                    duration: 5
                }
            );
        };

        const disableAutoplay = () => {
            nextBtn.classList.remove('autoplay');
            gsap.set(nextBtn, {
                '--slider-progress': 0
            });
        };

        slider.on('autoplayStop', () => {
           
            disableAutoplay();
        });
        slider.on('autoplay', () => {
            
            onAutoPlay();
        });

        onAutoPlay();

        nextBtn.addEventListener('click', event => {
            event.preventDefault();

            slider.autoplay.stop();
            slider.slideNext();
        });

        prevBtn.addEventListener('click', event => {
            event.preventDefault();

            slider.autoplay.stop();
            slider.slidePrev();
        });
    });
}
