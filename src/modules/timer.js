'use strict'

export { timer }

const timer = (countDay) => {
    const timerDays = document.querySelectorAll('.count_1>span')
    const timerHours = document.querySelectorAll('.count_2>span')
    const timerMinutes = document.querySelectorAll('.count_3>span')
    const timerSeconds = document.querySelectorAll('.count_4>span')

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

        const whileTimeIntervals = (timerInterval, interval, isZero = false) => {
            if (isZero) {
                timerInterval.forEach((item) => {
                    item.textContent = '00'
                })
            } else {
                timerInterval.forEach((item) => {
                    item.textContent = `0${interval}`.slice(-2)
                })
            }
        }

        if (getTime.timeRemaning > 0) {
            whileTimeIntervals(timerDays, getTime.days)
            whileTimeIntervals(timerHours, getTime.hours)
            whileTimeIntervals(timerMinutes, getTime.minutes)
            whileTimeIntervals(timerSeconds, getTime.seconds)
        } else {
            whileTimeIntervals(timerDays, getTime.days, true)
            whileTimeIntervals(timerHours, getTime.hours, true)
            whileTimeIntervals(timerMinutes, getTime.minutes, true)
            whileTimeIntervals(timerSeconds, getTime.seconds, true)
            clearInterval(updateClock)
        }
    }

    updateClock()
    setInterval(updateClock, 1000)
}