'use strict'

import { animate } from "./helpers"
export { modalForm, modalDocument, closeModal }

const body = document.body
const overlay = document.querySelector('.overlay')
const durationTime = 200

const scroll = (isEnabled = true) => {
    if (isEnabled) {
        const pagePos = window.scrollY
        body.classList.add('disable-scroll')
        body.dataset.position = pagePos
        body.style.top = -pagePos + 'px'
    } else {
        const pagePos = +body.dataset.position
        body.style.top = 'auto'
        body.classList.remove('disable-scroll')
        window.scroll({ top: pagePos, left: 0 })
        body.removeAttribute('data-position')
    }
}

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

const closeModal = (modal) => {
    anim({
        modal: modal,
        overlay: overlay,
        isShow: false,
    })

    setTimeout(() => {
        overlay.style.display = 'none'
        modal.style.display = 'none'
    }, durationTime)

    scroll(false)
}

const modalForm = (parentSelector, modalSelector, closeModalSelector) => {
    const parent = document.querySelector(parentSelector)
    const modal = document.querySelector(modalSelector)

    overlay.style.opacity = '0'
    modal.style.opacity = '0'

    parent.addEventListener('click', (e) => {
        if (e.target.closest('.btn')) {
            e.preventDefault()
            overlay.style.display = 'block'
            modal.style.display = 'block'

            anim({
                modal: modal,
                overlay: overlay,
            })

            scroll()
        }
    })

    modal.addEventListener('click', (e) => {
        if (e.target.closest(closeModalSelector)) {
            closeModal(modal)
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

                scroll(false)

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

            scroll()

            overlay.addEventListener('click', overlayClickEvent)
        })

    })
}