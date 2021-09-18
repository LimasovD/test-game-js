const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const doard = document.querySelector('#board')
const colors = ['#f4a460', '#ffd700', '#32cd32', '#00ff7f', '#008b8b', '#00ff7f', '#00ffff', '#4169e1', '#6a5acd',
'#ff69b4','#4b0082', '#ff00ff']
let time = 0
let score = 0

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomeCircle()
    }
})


function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomeCircle()
    setTime(time)
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
        if (current<10) {
            current = `0${current}`
        }
        setTime(current)
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Счет: <span class="primary">${score}</h1></span>`
}

function createRandomeCircle() {
    const circle = document.createElement('div')

    const size = getRandomeNumber(10, 60)

    const {width, height} = board.getBoundingClientRect()
    const x = getRandomeNumber(0, width - size)
    const y = getRandomeNumber(0, height - size)

    document.addEventListener('click', () => {
        setColor(circle)
    })
    
    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    board.append(circle)
}

function getRandomeNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}


function setColor (element) {
    const color = getRandomColor()
    element.style.backgroundColor = color
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
}

function removeColor (element) {
    element.style.backgroundColor = '#1d1d1d'
    element.style.boxShadow = `0 0 2px #000`
}

function getRandomColor () {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}