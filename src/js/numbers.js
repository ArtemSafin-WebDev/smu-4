import Splitting from 'splitting';
import gsap from 'gsap';
import { MOBILE_WIDTH } from './constants';
import { Swiper, Pagination, Autoplay } from 'swiper';

Swiper.use([Pagination, Autoplay]);

export default function Numbers() {
    const elements = Array.from(document.querySelectorAll('.js-numbers'));
    if (window.matchMedia(`(max-width: ${MOBILE_WIDTH}px)`).matches) {
        elements.forEach(element => {
            const container = element.querySelector('.swiper-container');

            new Swiper(container, {
                slidesPerView: 'auto',
                watchOverflow: true,
                spaceBetween: 68,
                pagination: {
                    el: element.querySelector('.numbers__numbers-and-facts-slider-pagination'),
                    type: 'bullets',
                    clickable: true
                }
            });
        });
    } else {
        elements.forEach(element => {
            let activeIndex = 0;
            const autoplayTime = 5000;
            let autoplayEnabled = true;
            let animating = false;

            const slides = Array.from(element.querySelectorAll('.numbers__numbers-and-facts-slider-slide'));
            const paginationContainer = element.querySelector('.numbers__numbers-and-facts-slider-pagination');
            const cards = slides.map(item => {
                return {
                    digits: Splitting({ target: item.querySelector('.numbers__numbers-and-facts-slider-card-digits') }),
                    words: item.querySelector('.numbers__numbers-and-facts-slider-card-words'),
                    card: item.querySelector('.numbers__numbers-and-facts-slider-card')
                };
            });

            const createPagination = () => {
                if (!paginationContainer) {
                    console.warn('No pagination element');
                    return [];
                }

                const bullets = cards.map(card => {
                    const bullet = document.createElement('span');
                    bullet.className = 'numbers__numbers-and-facts-slider-pagination-bullet';
                    bullet.innerHTML = `
                <span class="numbers__numbers-and-facts-slider-pagination-bullet-progress">
                <svg width="200" height="200" viewBox="0 0 200 200"
                    xmlns="http://www.w3.org/2000/svg">
                    <circle cy="100" cx="100" r="80" fill="transparent"
                        stroke="white" stroke-opacity="1" stroke-width="15">
                    </circle>
                    <circle cy="100" cx="100" r="80" fill="transparent"
                        stroke="white" stroke-width="15" stroke-dasharray="500">
                    </circle>
                </svg>
                </span>`;
                    return bullet;
                });

                paginationContainer.append(...bullets);

                return bullets;
            };

            const bullets = createPagination();

            const updatePagination = index => {
                if (bullets[index]) {
                    bullets.forEach(bullet => {
                        bullet.classList.remove('active');
                        gsap.set(bullet, {
                            '--number-progress': 0
                        });
                    });

                    bullets[index].classList.add('active');

                    if (autoplayEnabled) {
                        gsap.fromTo(
                            bullets[index],
                            {
                                '--number-progress': 0
                            },
                            {
                                '--number-progress': 1,
                                duration: 5
                            }
                        );
                    }

                    return bullets[index];
                }
            };
            console.log('Cards', cards);

            function setActiveCard(index, initial = false) {
                if (!cards[index]) {
                    console.error(`No card with index ${index}`);
                    return false;
                }
                if (initial) {
                    const { digits, words, card } = cards[index];
                    animating = true;
                    element.classList.add('animating');
                    const tl = gsap.timeline({
                        onComplete: () => {
                            element.classList.remove('animating');
                            animating = false;
                        }
                    });

                    tl.fromTo(
                        digits[0].chars,
                        { yPercent: -100, autoAlpha: 0 },
                        {
                            duration: 1.2,
                            stagger: 0.4,
                            autoAlpha: 1,
                            yPercent: 0
                        }
                    ).fromTo(
                        words,
                        { autoAlpha: 0, yPercent: 100 },
                        {
                            autoAlpha: 1,
                            duration: 1,
                            yPercent: 0
                        },
                        '0'
                    );
                } else {
                    const oldCard = cards[activeIndex];
                    const newCard = cards[index];
                    animating = true;
                    element.classList.add('animating');
                    const tl = gsap.timeline({
                        onComplete: () => {
                            element.classList.remove('animating');
                            animating = false;
                        }
                    });

                    tl.to(oldCard.words, {
                        yPercent: 100,
                        autoAlpha: 0,
                        duration: 1
                    })
                        .fromTo(
                            newCard.words,
                            {
                                autoAlpha: 0,
                                yPercent: 100
                            },
                            {
                                autoAlpha: 1,
                                yPercent: 0,
                                duration: 1
                            }
                        )
                        .fromTo(
                            oldCard.digits[0].chars,
                            {
                                yPercent: 0,
                                autoAlpha: 1
                            },
                            {
                                yPercent: 100,
                                autoAlpha: 0,
                                duration: 1.2,
                                stagger: {
                                    amount: 0.4,
                                    axis: 'x',
                                    from: 'end'
                                }
                            },
                            '0'
                        )
                        .fromTo(
                            newCard.digits[0].chars,
                            {
                                yPercent: -100,
                                autoAlpha: 0
                            },
                            {
                                duration: 1.2,
                                stagger: 0.4,
                                autoAlpha: 1,
                                yPercent: 0
                            },
                            '<0.3'
                        );
                }

                activeIndex = index;

                updatePagination(activeIndex);
            }

            setActiveCard(0, true);

            const getNextIndex = () => {
                if (activeIndex + 1 < cards.length) {
                    return activeIndex + 1;
                } else {
                    return 0;
                }
            };

            let autoplayTimer = setInterval(() => {
                setActiveCard(getNextIndex());
            }, autoplayTime);

            window.addEventListener('blur', () => {
                clearInterval(autoplayTimer);
                autoplayTimer = null;
                autoplayEnabled = false;
                bullets.forEach(bullet => {
                    gsap.set(bullet, {
                        '--number-progress': 0
                    });
                });

                element.classList.add('progress-hidden');
            });

            // window.addEventListener('focus', () => {
            //     clearInterval(autoplayTimer);
            //     autoplayTimer = setInterval(() => {
            //         setActiveCard(getNextIndex());
            //     }, autoplayTime);
            // });

            bullets.forEach((bullet, bulletIndex) => {
                bullet.addEventListener('click', event => {
                    event.preventDefault();
                    if (animating) return;
                    clearInterval(autoplayTimer);
                    autoplayTimer = null;
                    autoplayEnabled = false;
                    bullets.forEach(bullet => {
                        gsap.set(bullet, {
                            '--number-progress': 0
                        });
                    });

                    setActiveCard(bulletIndex);
                });
            });
        });
    }
}
