'use strict'

import { animate } from "./helpers"
export { modalForm, modalDocument }

const overlay = document.querySelector('.overlay')
const durationTime = 200

const anim = ({
    modal: modal,
    overlay: overlay,
    isShow: isShow = true,
    isDocument: isDocument = false,
}) => {
    if (isShow) {
        animate({
            duration: durationTime,
            timing(timeFraction) {
                return timeFraction;
            },
            draw(progress) {
                isDocument ? modal.style.top = (1 - progress) * -50 + '%' : modal.style.top = progress * 50 + '%'
                overlay.style.opacity = progress
                modal.style.opacity = progress
            }
        });
    } else {
        animate({
            duration: durationTime,
            timing(timeFraction) {
                return timeFraction;
            },
            draw(progress) {
                isDocument ? modal.style.top = progress * -50 + '%' : modal.style.top = (1 - progress) * 50 + '%'
                overlay.style.opacity = 1 - progress
                modal.style.opacity = 1 - progress
            }
        });
    }

}

const modalForm = (buttonsSelector, modalSelector, closeModalSelector) => {
    const buttons = document.querySelectorAll(buttonsSelector)
    const modal = document.querySelector(modalSelector)

    overlay.style.opacity = '0'
    modal.style.opacity = '0'

    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            e.preventDefault()
            overlay.style.display = 'block'
            modal.style.display = 'block'

            anim({
                modal: modal,
                overlay: overlay,
            })
        })
    })

    modal.addEventListener('click', (e) => {
        if (e.target.closest(closeModalSelector)) {
            anim({
                modal: modal,
                overlay: overlay,
                isShow: false,
            })

            setTimeout(() => {
                overlay.style.display = 'none'
                modal.style.display = 'none'
            }, durationTime)
        }
    })
}

const modalDocument = (documentsSelector) => {
    const docs = document.querySelectorAll(documentsSelector)
    let modal

    docs.forEach((doc) => {
        doc.classList.add('document-inner')

        doc.addEventListener('click', (e) => {
            e.preventDefault()

            const overlayClickEvent = () => {
                anim({
                    modal: modal,
                    overlay: overlay,
                    isShow: false,
                    isDocument: true,
                })

                setTimeout(() => {
                    overlay.style.display = 'none'
                    modal.remove()
                }, durationTime)

                overlay.removeEventListener('click', overlayClickEvent)
            }

            modal = document.createElement('div')
            modal.style.cssText = `
                background-image: url('${e.target.parentNode.pathname}');
                background-position: center;
                background-repeat: no-repeat;
                background-size: contain;
                position: relative;
                margin: auto;
                max-width: 68vh;
                height: 100%;
                opacity: 0
            `
            overlay.append(modal)

            modal = overlay.querySelector('div')
            overlay.style.display = 'block'

            anim({
                modal: modal,
                overlay: overlay,
                isDocument: true,
            })

            overlay.addEventListener('click', overlayClickEvent)
        })

    })
}