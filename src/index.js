'use strict'

import { modalForm, modalDocument } from "./modules/modals";
import { smoothScroll } from "./modules/scroll";
import { timer } from "./modules/timer";
import { calc } from "./modules/calc";
import { fillForm } from "./modules/forms";
import { slider } from "./modules/slider"

modalForm('.button>a', '.header-modal', '.header-modal__close')
modalForm('.service-button>a', '.services-modal', '.services-modal__close')
modalDocument('.sertificate-document')
smoothScroll('.smooth-scroll')
timer('20 january 2023')
if (document.body.classList.contains('balkony')) calc()
fillForm()
slider({
    sliderSelector: ".benefits-inner",
    perView576px: 3,
    perView1200px: 3,
    arrowPrevSelector: ".benefits__arrow--left",
    arrowNextSelector: ".benefits__arrow--right"
})
slider({
    sliderSelector: ".servises-slider",
    perView576px: 1,
    perView1200px: 2,
    arrowPrevSelector: ".services__arrow--left",
    arrowNextSelector: ".services__arrow--right"
})
