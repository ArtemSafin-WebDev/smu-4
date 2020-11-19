// import { ScrollTrigger } from 'gsap/ScrollTrigger';

import gsap from 'gsap';





export default function(accordionElements, indexToOpenFirst, speed = 0.7) {
    const accordionInstances = [];
    let initialized = false;
    

    function openAccordeon(element) {
        gsap.to(element, {
            height: 'auto',
            duration: speed
        })
    }
    
    function closeAccordeon(element) {
    
        gsap.to(element, {
            height: 0,
            duration: speed
        })
    }

    function init() {
        accordionElements.forEach(element => {
            const btns = Array.from(element.querySelectorAll('.js-accordion-btn'));
            const content = element.querySelector('.js-accordion-content');

            const handler = function(event) {
                event.preventDefault();
               
                if (event.relatedTarget) {
                    event.relatedTarget.focus();
                } else {
                    event.currentTarget.blur();
                }

                if (!element.classList.contains('active')) {
                    accordionInstances.forEach(acc => {
                        closeAccordeon(acc.content);
                    });
                    accordionElements.forEach(element => element.classList.remove('active'));
                    openAccordeon(content);
                    element.classList.add('active');
                } else {
                    closeAccordeon(content);
                    element.classList.remove('active');
                }
            };
            btns.forEach(btn =>  btn.addEventListener('click', handler))
           

            accordionInstances.push({
                btns,
                content,
                handler,
                element
            });
        });

        if (typeof indexToOpenFirst !== 'undefined' && indexToOpenFirst !== -1 && accordionInstances[indexToOpenFirst]) {
           
            accordionInstances[indexToOpenFirst].btns[0].click();
        } else {
            if (typeof indexToOpenFirst !== 'undefined') console.warn('No element to open first has been found');
        }

        initialized = true;
    }

    function destroy() {
        accordionInstances.forEach(instance => {
            instance.btns.forEach(btn => btn.removeEventListener('click', instance.handler));
        });
        accordionInstances = [];
        initialized = false;
    }

    function getInstances() {
        return accordionInstances;
    }

    function isInitailized() {
        return initialized;
    }

    return {
        init,
        destroy,
        isInitailized,
        getInstances
    };
}
