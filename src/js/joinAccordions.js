import accordions from "./accordions";


export default function JoinAccordions() {
    const elements = Array.from(document.querySelectorAll('.js-join-accordion'));

    accordions(elements).init();
}
