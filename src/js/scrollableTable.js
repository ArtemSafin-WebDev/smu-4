
import Hammer from 'hammerjs';
import detectIt from 'detect-it';

export default function ScrollableTable() {
    if (detectIt.hasTouch) return;
    const scrollableTables = Array.from(document.querySelectorAll('.js-scrollable-table'));

    scrollableTables.forEach(element => {

        console.log("Element", element)
        const hammertime = new Hammer(element);

        let startX = 0;
        hammertime.on('panstart', function(event) {
            startX = element.scrollLeft;
        });
        hammertime.on('panmove', function(event) {
            element.scrollLeft = Math.floor(startX - event.deltaX);
        });
    });
}