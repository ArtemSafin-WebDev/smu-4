import gsap from 'gsap';

export default function Intro() {
    const elements = Array.from(document.querySelectorAll('.js-intro'));

    elements.forEach(element => {
        const hoverableLinks = Array.from(element.querySelectorAll('.js-hoverable-link'));
        const bgLayers = Array.from(document.querySelectorAll('.js-intro-bg-layer'));

        function setActiveLayer(index) {
           

            bgLayers.forEach(layer => layer.classList.remove('active'));

            if (typeof index !== 'undefined' && index !== null && bgLayers[index]) {
                bgLayers[index].classList.add('active');
            }
        }

        hoverableLinks.forEach((link, linkIndex) => {
            link.addEventListener('mouseenter', () => {
                hoverableLinks.forEach(link => link.classList.remove('hovered'));
                link.classList.add('hovered');
                gsap.to(link, {
                    duration: 0.5,
                    ease: 'easeOut',
                    webkitTextFillColor: 'rgba(255, 255, 255, 1)'
                });
                setActiveLayer(linkIndex);
            });
            link.addEventListener('mouseleave', () => {
                link.classList.remove('hovered');
                gsap.to(link, {
                    duration: 0.5,
                    ease: 'easeOut',
                    webkitTextFillColor: 'rgba(255, 255, 255, 0)'
                });
              
                setActiveLayer(null);
            });
            link.addEventListener('click', event => {
                event.preventDefault();
                gsap.to(link, {
                    duration: 0.5,
                    ease: 'easeOut',
                    webkitTextFillColor: 'rgba(255, 255, 255, 1)'
                });
                setActiveLayer(linkIndex);
            });
        });


        document.addEventListener('click', event => {
            const clickInsideHoverableLink = event.target.matches('.js-hoverable-link') || event.target.closest('.js-hoverable-link')
            if (!clickInsideHoverableLink) {
                setActiveLayer(null);
            }
        })

        
    });
}
