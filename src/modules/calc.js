'use strict'

import { animate } from "./helpers"
import { validateCalc } from "./validate"
export { calc }

const calc = () => {
    const calcBlock = document.getElementById('calc')
    const calcType = document.getElementById('calc-type')
    const calcMaterial = document.getElementById('calc-type-material')
    const calcSquare = document.getElementById('calc-input')
    const calcTotal = document.getElementById('calc-total')

    const countCalc = () => {
        const calcTypeVal = +calcType.options[calcType.selectedIndex].value
        const calcMaterialVal = +calcMaterial.options[calcMaterial.selectedIndex].value
        const calcSquareVal = +calcSquare.value

        if (calcTypeVal && calcMaterialVal && calcSquareVal) {
            const calcTotalVal = calcTypeVal * calcMaterialVal * calcSquareVal
            animate({
                duration: 200,
                timing(timeFraction) {
                    return timeFraction;
                },
                draw(progress) {
                    calcTotal.value = Math.round(progress * calcTotalVal);
                }
            });
        }
    }

    calcBlock.addEventListener('input', (e) => {
        if (e.target.id === 'calc-input') validateCalc(e)

        countCalc()
    })
}