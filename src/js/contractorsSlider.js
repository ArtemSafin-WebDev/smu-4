import { Swiper, Navigation, Pagination, Autoplay } from 'swiper';
import gsap from 'gsap';
import { MOBILE_WIDTH } from './constants';


Swiper.use([Pagination, Navigation, Autoplay]);

export default function ContractorsSlider() {
    if (window.matchMedia(`(max-width: ${MOBILE_WIDTH}px)`).matches) return;
    const elements = Array.from(document.querySelectorAll('.js-contractors-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');

        let prevIndex;

        new Swiper(container, {
            slidesPerView: 1,
            watchOverflow: true,
            watchSlidesProgress: true,
            watchSlidesVisibility: true,

            speed: 2000,
            virtualTranslate: true,
            allowTouchMove: false,
            effect: 'disappear',
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
            navigation: {
                nextEl: element.querySelector('.slider-arrows__btn--next'),
                prevEl: element.querySelector('.slider-arrows__btn--prev')
            },
            on: {
              
                slideChange(swiper) {
                    if (swiper.params.effect !== "disappear") return;
                    prevIndex = swiper.realIndex;

                    // console.log('Setting prev index to active index', swiper.realIndex);
                },
                setTranslate(swiper, translate) {
                    if (swiper.params.effect !== "disappear") return;
                  

                    const slides = Array.from(swiper.slides);
                    const wrapper = swiper.wrapperEl;

                    const activeIndex = swiper.realIndex;
                    const isAnimating = swiper.animating;

                    let previousSlideIndex = prevIndex;

                    if (typeof prevIndex === 'undefined') {
                        previousSlideIndex = 0;
                    }


                    slides.forEach(slide => {
                        gsap.set(slide, {
                            autoAlpha: 1,
                            scale: 1
                        })
                    })

                    const tl = gsap.timeline();
                    tl.to(slides[previousSlideIndex], {
                        duration: 0.4,
                        autoAlpha: 0,
                        scale: 0.7,
                       
                    }).to(wrapper, {
                        x: translate,
                        ease: "power3.out",
                        duration: 1.6
                    }).to(slides[previousSlideIndex], {
                        duration: 0.4,
                        autoAlpha: 1,
                        scale: 1,
                    })

                    // console.log('Slider info for animation', {
                    //     slides,
                    //     wrapper,
                    //     previousSlideIndex,
                    //     activeIndex,
                    //     isAnimating
                    // });
                },
              
            }
        });

        
    });
}
