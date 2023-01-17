'use strict'

import { validatePhoneInput, validateNameInput } from "./validate"
import { closeModal } from "./modals"
export { checkForm }

const checkForm = () => {
    const forms = document.querySelectorAll('.rf')
    let isName = { isName: false, data: '' },
        isPhone = { isPhone: false, data: '' },
        modal


    const sendForm = async () => {
        let data = {
            name: isName.data,
            phone: isPhone.data
        }

        try {
            const total = document.getElementById('calc-total').value
            if (total != '') {
                data['total'] = total
            }
        } catch (error) {

        }

        return fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
        }).then(res => {
            if (res.ok) {
                closeModal(modal)
                forms.forEach((form) => {
                    form.querySelectorAll('input').forEach((item) => item.value = '')
                })

            }

            return res.json()
        }).catch(err => console.log(err))
    }

    forms.forEach((form) => {
        form.addEventListener('input', (e) => {
            switch (e.target.name) {
                case 'fio':
                    isName = validateNameInput(e)
                    return;
                case 'phone':
                    isPhone = validatePhoneInput(e, e.target.value[0] === '+')
                    return
            }
        })

        form.addEventListener('click', (e) => {
            e.preventDefault()
            modal = form.parentNode
            if (e.target.type === 'submit') {
                if (isName.isName && isPhone.isPhone) {
                    sendForm()
                }
            }
        })
    })
}