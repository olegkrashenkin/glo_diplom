'use strict'

import Swiper, { Navigation, Autoplay } from 'swiper';
export { slider }

const slider = ({
    sliderSelector: sliderSelector,
    perView576px: perView576px,
    perView1200px: perView1200px,
    arrowPrevSelector: arrowPrevSelector,
    arrowNextSelector: arrowNextSelector }) => {
    const swiper = new Swiper(sliderSelector, {
        modules: [Navigation, Autoplay],
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        allowTouchMove: false,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: arrowNextSelector,
            prevEl: arrowPrevSelector,
        },
        breakpoints: {
            576: {
                slidesPerView: perView576px,
                spaceBetween: 40,
            },
            1200: {
                slidesPerView: perView1200px,
                spaceBetween: 40,
            },
        },
    });
}