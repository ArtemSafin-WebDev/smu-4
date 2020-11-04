import polyfills from './polyfills';
import detectTouch from './detectTouch';
import Intro from './intro';
import Menu from './menu';
import Services from './services';
import Numbers from './numbers';
import RealisedProjects from './realisedProjects';

document.addEventListener('DOMContentLoaded', function() {
    polyfills();
    detectTouch();
    Intro();
    Menu();
    Services();
    Numbers();
    RealisedProjects();
});

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    setTimeout(() => document.body.classList.add('animatable'), 300)
})
