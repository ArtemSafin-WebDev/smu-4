export default function ContactsMaps() {
 

    const element = document.querySelector('.js-contacts-map');

    if (!element) return;

    ymaps.ready(initialzeMap);

    function initialzeMap() {
        const lat = Number(element.getAttribute('data-lat'));
        const lng = Number(element.getAttribute('data-lng'));
        const pinURL = element.getAttribute('data-pin');
        const balloonContent = element.getAttribute('data-balloon');

        const pinOptions = {
            iconLayout: 'default#image',
            iconImageHref: pinURL,
            iconImageSize: [60, 60],
            iconImageOffset: [-30, -30]
        };

        const center = [lat, lng];

        console.log('Center', center);

        const mapInstance = new ymaps.Map(element, {
            center: center,
            zoom: 14,
            controls: []
        });

        const objectManager = new ymaps.ObjectManager({
            clusterize: false,
            clusterHasBalloon: false,
            geoObjectOpenBalloonOnClick: true,
            clusterIconColor: '#e62f48'
        });
        mapInstance.geoObjects.add(objectManager);

        objectManager.add({
            id: 1,
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: center
            },
            options: {
                hideIconOnBalloonOpen: false,
                balloonCloseButton: false,
                ...pinOptions
            },
            properties: {
              
                balloonContent: balloonContent
            }
        });


        objectManager.objects.balloon.open(1);
    }
}
