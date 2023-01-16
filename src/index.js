'use strict'

import { modalForm, modalDocument } from "./modules/modals";
import { smoothScroll } from "./modules/scroll";
import { timer } from "./modules/timer";

//! Осталось 7 заданий + доп
modalForm('.button>a', '.header-modal', '.header-modal__close')//! ТЗ-2
modalForm('.service-button>a', '.services-modal', '.services-modal__close')//! ТЗ-5
modalDocument('.sertificate-document')//! ТЗ-8
smoothScroll('.smooth-scroll')//! ТЗ-9
timer('20 january 2023')
