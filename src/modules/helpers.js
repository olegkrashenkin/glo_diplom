'use strict'

export { animate }

const animate = ({ timing, draw, duration }) => {
    let start = performance.now();

    requestAnimationFrame(function animate(time) {
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;

        let progress = timing(timeFraction);

        draw(progress);

        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }
    });
}

// animate({
//     duration: 1000, // - время выполнения анимации
//     timing(timeFraction) { // - вид анимации
//       return timeFraction;
//     },
//     draw(progress) { // - отрисовка
//       elem.style.width = progress * 100 + '%';
//     }
//   });