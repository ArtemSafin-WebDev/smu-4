import InfiniteScroll from 'infinite-scroll';

export default function LoadNews() {
    const elements = Array.from(document.querySelectorAll('.js-news-list'));

    elements.forEach(element => {
        new InfiniteScroll(element, {
            path: '.press-archive__pagination-next-link',
            append: '.press-archive__list-item',
            hideNav: '.press-archive__pagination',
            status: '.scroller-status',
            history: false,
            debug: false,
            scrollThreshold: 80
        })
    });
}
