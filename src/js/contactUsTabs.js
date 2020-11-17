import tabs from "./tabs";

export default function ContactUsTabs() {
    const elements = Array.from(document.querySelectorAll('.js-contact-us-tabs'));

    tabs(elements).init();
}