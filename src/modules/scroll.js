'use strict'

export { smoothScroll }

const smoothScroll = (scrollSelector) => {
    const scroll = document.querySelector(scrollSelector)
    scroll.style.visibility = 'hidden'
    scroll.style.cursor = 'pointer'

    document.addEventListener('scroll', () => {
        const top = document.documentElement.scrollTop

        if (top > 700) {
            scroll.style.opacity = (top / 10000) * 4 + ''
            scroll.style.visibility = 'visible'
        } else {
            scroll.style.visibility = 'hidden'
        }
    })

    scroll.addEventListener('click', () => {
        document.body.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    })
}