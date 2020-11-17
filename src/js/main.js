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
import ContractorsSlider from './contractorsSlider';
import JoinAccordions from './joinAccordions';
import LotsCardImageSlider from './lotsCardImageSlider';
import LotsAccordions from './lotsAccordions';
import PaginationSlider from './paginationSlider';
import LotsDetailGallery from './lotsDetailGallery';
import Modals from './modals';
import ProjectsSlider from './projectsSlider';
import ContactsMaps from './contactMaps';
import ContactUsTabs from './contactUsTabs';
import FileUpload from './fileUpload';
import AnchorLinks from './anchorLinks';

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
    ContractorsSlider();
    JoinAccordions();
    LotsCardImageSlider();
    LotsAccordions();
    PaginationSlider();
    LotsDetailGallery();
    Modals();
    ProjectsSlider();
    ContactsMaps();
    ContactUsTabs();
    FileUpload();
    AnchorLinks();
});

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    setTimeout(() => document.body.classList.add('animatable'), 300)
})
