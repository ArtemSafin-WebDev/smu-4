import InfiniteScroll from 'infinite-scroll';

export default function LoadClientsReviews() {
    const elements = Array.from(document.querySelectorAll('.js-clients-reviews-list'));

    elements.forEach(element => {
        new InfiniteScroll(element, {
            path: '.press-archive__pagination-next-link',
            append: '.clients-reviews__list-item',
            hideNav: '.press-archive__pagination',
            status: '.scroller-status',
            history: false,
            debug: false,
            scrollThreshold: 80
        })
    });
}