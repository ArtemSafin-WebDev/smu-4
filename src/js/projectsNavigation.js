export default function ProjectsNavigation() {
    const projectsNavigation = document.querySelector('.js-projects-navigation');

    if (projectsNavigation) {
        const links = Array.from(projectsNavigation.querySelectorAll('.page-navigation__link'));

        const initialActiveLink = links.find(link => link.classList.contains('active'));

        const items = Array.from(document.querySelectorAll('.projects__list-item'));

        const filterItems = link => {
            links.forEach(link => link.classList.remove('active'));
            link.classList.add('active');

            const linkCategories = link.getAttribute('data-category').split(',').map(element => element.trim().toLowerCase());

            items.forEach(item => {
                const itemCategories = item.getAttribute('data-category').split(',').map(element => element.trim().toLowerCase());
                const firstIntersection = itemCategories.filter(element => linkCategories.includes(element));
                const secondIntersection = linkCategories.filter(element => itemCategories.includes(element));


                console.log('Comparing', itemCategories, linkCategories, {
                    intersections: {
                        item,
                        firstIntersection,
                        secondIntersection
                    }
                })

                if (firstIntersection.length || secondIntersection.length) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        };

        links.forEach(link => {
            link.addEventListener('click', event => {
                event.preventDefault();
                filterItems(link);
            });
        });

        if (initialActiveLink) {
            filterItems(initialActiveLink);
        }
    }
}
