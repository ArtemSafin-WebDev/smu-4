import gsap from 'gsap';
import { MOBILE_WIDTH } from './constants';
import { Swiper, Pagination, Navigation, EffectFade } from 'swiper';
import { remove } from 'inputmask';

Swiper.use([Pagination, Navigation, EffectFade]);

export default function ReviewsSlider() {
    const elements = Array.from(document.querySelectorAll('.js-reviews-slider'));

    if (window.matchMedia(`(max-width: ${MOBILE_WIDTH}px)`).matches) {
        elements.forEach(element => {
            const container = element.querySelector('.swiper-container');

            new Swiper(container, {
                effect: 'fade',
                watchOverflow: true,
                fadeEffect: {
                    crossFade: true
                },
                autoHeight: true,
                speed: 700,
                navigation: {
                    nextEl: element.querySelector('.slider-arrows__btn--next'),
                    prevEl: element.querySelector('.slider-arrows__btn--prev')
                }
            });
        })
    } else {
        elements.forEach(element => {
            const container = element.querySelector('.swiper-container');
            const thumbs = Array.from(element.querySelectorAll('.reviews__slider-thumbs-card'));

            const slider = new Swiper(container, {
                effect: 'fade',
                watchOverflow: true,
                fadeEffect: {
                    crossFade: true
                },
                autoHeight: true,
                speed: 700,
                navigation: {
                    nextEl: element.querySelector('.slider-arrows__btn--next'),
                    prevEl: element.querySelector('.slider-arrows__btn--prev')
                }
            });

            const removeAutoplay = () => {
                element.classList.remove('autoplay-enabled')
                thumbs.forEach(thumb => {
                    thumb.classList.remove('autoplay');
                    gsap.set(thumb, {
                        '--slider-progress': 0
                    })
                    gsap.killTweensOf(thumb)
                })
                
            }

            const setAutoplay = thumbIndex => {
                let nextIndex = thumbIndex + 1;
                if (thumbIndex + 1 >= thumbs.length) {
                    nextIndex = 0;
                }
                element.classList.add('autoplay-enabled')

                thumbs.forEach(thumb => {
                    thumb.classList.remove('autoplay');
                    gsap.set(thumb, {
                        '--slider-progress': 0
                    })
                })

                thumbs[thumbIndex].classList.add('autoplay')
                gsap.to(thumbs[thumbIndex], {
                    '--slider-progress': 1,
                    duration: 10,
                    ease: 'linear',
                    onComplete: () => {
                        console.log('Setting autoplay for', nextIndex);
                        slider.slideTo(nextIndex);
                        setAutoplay(nextIndex);
                    }
                });
            };

            setAutoplay(0);

            [slider.navigation.nextEl, slider.navigation.prevEl].forEach(nav => {
                nav.addEventListener('click', () => {
                    removeAutoplay();
                })
            });

            thumbs.forEach((thumb, thumbIndex) => {
                thumb.addEventListener('click', (event) => {
                    event.preventDefault();
                    removeAutoplay();
                   
    
                    slider.slideTo(thumbIndex);
                })
              
            })

            thumbs.forEach((thumb, thumbIndex) => {
                if (thumbIndex !== slider.activeIndex) {
                    thumb.classList.remove('selected');
                } else {
                    thumb.classList.add('selected');
                }
            })

            slider.on('slideChange', swiper => {
                thumbs.forEach((thumb, thumbIndex) => {
                    if (thumbIndex !== swiper.activeIndex) {
                        thumb.classList.remove('selected');
                    } else {
                        thumb.classList.add('selected');
                    }
                })
            })
            slider.on('sliderMove', swiper => {
                removeAutoplay();
            })


            
        });
    }
}
