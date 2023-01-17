'use strict'

export { validateCalc, validatePhoneInput, validateNameInput }

const validateCalc = (event) => {
    event.target.value = event.target.value.replace(/\D+/g, '')
}

const validatePhoneInput = (event, plus) => {
    let valueLen
    plus ? valueLen = 17 : valueLen = 16

    if (event.target.value.length <= valueLen) {
        if (event.target.value.length > 1) {
            event.target.value = event.target.value[0] + event.target.value.substring(1).replace(/[^\d]/, '')
        } else {
            event.target.value = event.target.value.replace(/[^\d\+]/, '')
        }
    } else {
        event.target.value = event.target.value.substring(0, valueLen)
    }

    return event.target.value
}

const validateNameInput = (event) => {
    event.target.value = event.target.value.replace(/[^a-zа-яё]+/gi, '')

    return event.target.value
}