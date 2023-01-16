'use strict'

export { validateCalc }

const validateCalc = (event) => {
    event.target.value = event.target.value.replace(/\D+/g, '')
}