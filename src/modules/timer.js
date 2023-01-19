'use strict'

export { timer }

const timer = (countDay) => {
    const timerDays = document.querySelectorAll('.count_1')
    const timerHours = document.querySelectorAll('.count_2')
    const timerMinutes = document.querySelectorAll('.count_3')
    const timerSeconds = document.querySelectorAll('.count_4')

    const getTimeRemaning = () => {
        const timeRemaning = (new Date(countDay).getTime() - new Date().getTime()) / 1000
        const days = Math.floor(timeRemaning / 60 / 60 / 24)
        const hours = Math.floor((timeRemaning / 60 / 60) % 24)
        const minutes = Math.floor((timeRemaning / 60) % 60)
        const seconds = Math.floor(timeRemaning % 60)

        return { timeRemaning, days, hours, minutes, seconds }
    }

    const updateClock = () => {
        const getTime = getTimeRemaning()

        const timeDecl = ({
            currentTimeVal: currentTimeVal,
            timerDecl: timerDecl,
            decl_1: decl_1,
            decl_2: decl_2,
            decl_3: decl_3,
        }) => {
            if (getTime.timeRemaning < 0) currentTimeVal = '00'

            currentTimeVal = `0${currentTimeVal}`.slice(-2)
            const tmp = String(currentTimeVal).slice(-1)
            const decl = () => {
                switch (true) {
                    case currentTimeVal >= 5 && currentTimeVal <= 20 || tmp == 0 || tmp >= 5 && tmp <= 9: return decl_1
                    case tmp == 1: return decl_2
                    default: return decl_3
                }
            }

            timerDecl.forEach(item => {
                item.innerHTML = `${decl()}:<br><span>${currentTimeVal}</span>`
            })
        }

        timeDecl({
            currentTimeVal: getTime.days,
            timerDecl: timerDays,
            decl_1: 'Дней',
            decl_2: 'День',
            decl_3: 'Дня',
        })

        timeDecl({
            currentTimeVal: getTime.hours,
            timerDecl: timerHours,
            decl_1: 'Часов',
            decl_2: 'Час',
            decl_3: 'Часа',
        })

        timeDecl({
            currentTimeVal: getTime.minutes,
            timerDecl: timerMinutes,
            decl_1: 'Минут',
            decl_2: 'Минута',
            decl_3: 'Минуты',
        })

        timeDecl({
            currentTimeVal: getTime.seconds,
            timerDecl: timerSeconds,
            decl_1: 'Секунд',
            decl_2: 'Секунда',
            decl_3: 'Секунды',
        })

        clearInterval(updateClock)
    }

    updateClock()
    setInterval(updateClock, 1000)
}