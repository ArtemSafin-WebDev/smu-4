import polyfills from './polyfills';
import detectTouch from './detectTouch';
import Intro from './intro';
import Menu from './menu';
import Services from './services';
import Numbers from './numbers';
import RealisedProjects from './realisedProjects';
import NewsSlider from './newsSlider';
import Validation from './validation';
import PhoneMask from './phoneMask';

document.addEventListener('DOMContentLoaded', function() {
    polyfills();
    detectTouch();
    Intro();
    Menu();
    Services();
    Numbers();
    RealisedProjects();
    NewsSlider();
    Validation();
    PhoneMask();
});

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    setTimeout(() => document.body.classList.add('animatable'), 300)
})
