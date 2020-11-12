import accordions from "./accordions";

export default function LotsAccordions() {
    const elements = Array.from(document.querySelectorAll('.js-lots-nav-accordion'));

    const elementInitiallyOpen = elements.findIndex(item => item.hasAttribute('data-initially-open'));

  

    accordions(elements, elementInitiallyOpen).init();
}