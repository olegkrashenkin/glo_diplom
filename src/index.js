'use strict'

import { modalForm, modalDocument } from "./modules/modals";
import { smoothScroll } from "./modules/scroll";
import { timer } from "./modules/timer";
import { calc } from "./modules/calc";
import { fillForm } from "./modules/forms";

//! Осталось 2 заданий + доп
//! ТЗ-1 Сделано
modalForm('.button>a', '.header-modal', '.header-modal__close')//! ТЗ-2
modalForm('.service-button>a', '.services-modal', '.services-modal__close')//! ТЗ-5
modalDocument('.sertificate-document')//! ТЗ-8
smoothScroll('.smooth-scroll')//! ТЗ-9
timer('20 january 2023')//! ТЗ-6
if (document.body.classList.contains('balkony')) calc()//! ТЗ-10
fillForm() //! ТЗ-7

