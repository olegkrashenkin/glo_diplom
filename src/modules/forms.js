'use strict'

import { validatePhoneInput, validateNameInput } from "./validate"
import { closeModal } from "./modals"
export { fillForm }

const loadText = 'Загрузка...'
const errorText = 'Ошибка!'
const successText = 'Заявка принята!'

let modal, cleanForm, btn, btnDefaultText

const sendForm = async (data) => {

    const endSending = () => {
        setTimeout(() => {
            cleanForm.forEach((input) => input.value = '')
            btn.textContent = btnDefaultText
            if (modal) closeModal(modal)
        }, 2500)
    }

    return fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    }).then(res => {
        if (res.ok) {
            btn.textContent = successText
            endSending()
            return res.json()
        }

    }).catch(err => {
        btn.textContent = errorText
        endSending()
    })
}

const fillForm = () => {
    const forms = document.querySelectorAll('.rf')
    let nameVal, phoneVal

    forms.forEach((form) => {
        form.addEventListener('input', (e) => {
            switch (e.target.name) {
                case 'fio':
                    nameVal = validateNameInput(e)
                    return;
                case 'phone':
                    phoneVal = validatePhoneInput(e, e.target.value[0] === '+')
                    return
            }
        })

        form.addEventListener('click', (e) => {
            e.preventDefault()

            const data = { name: nameVal, phone: phoneVal }

            if (e.target.type === 'submit' && nameVal != '' && phoneVal != '') {
                const total = document.getElementById('calc-total')
                modal = form.closest('.header-modal, .services-modal')
                cleanForm = form.querySelectorAll('input')
                btn = e.target
                btnText = e.target.textContent

                if (document.body.classList.contains('balkony') && total) {
                    if (total.value != '') data.total = total.value
                }

                btn.textContent = loadText

                sendForm(data)
            }
        })
    })
}