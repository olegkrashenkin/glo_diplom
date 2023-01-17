'use strict'

import { validatePhoneInput, validateNameInput } from "./validate"
import { closeModal } from "./modals"
import { animate } from "./helpers"
export { fillForm }

const loadText = 'Загрузка...'
const errorText = 'Ошибка!'
const successText = 'Заявка принята!'

let modal, cleanForm, btn, btnDefaultText, nameVal, phoneVal

const sendForm = async (data) => {
    btn.textContent = loadText

    const endSending = () => {
        setTimeout(() => {
            nameVal = ''
            phoneVal = ''
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

    const drawBorder = (event, name) => {
        event.target.closest('form[name="action-form"]').querySelectorAll('input').forEach((input) => {
            if (input.name === name) {
                input.style.border = '1px solid red'
                setTimeout(() => { input.style.border = 'none' }, 1000)
            }
        })
    }

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

            if (e.target.type === 'submit' && nameVal && phoneVal) {
                const total = document.getElementById('calc-total')
                modal = form.closest('.header-modal, .services-modal')
                cleanForm = form.querySelectorAll('input')
                btn = e.target
                btnDefaultText = e.target.textContent

                if (document.body.classList.contains('balkony') && total) {
                    if (total.value != '') data.total = total.value
                }

                sendForm(data)
            } else if (e.target.type === 'submit' && !nameVal) {
                drawBorder(e, 'fio')
            }

            if (e.target.type === 'submit' && !phoneVal) {
                drawBorder(e, 'phone')
            }
        })
    })
}