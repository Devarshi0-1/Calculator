const body = document.body
const colorModeBtn = document.querySelector('.colorMode');
const colorModeSlider = document.querySelector('.colorModeSlider');
const calculator = document.querySelector('.calculator');
const screen = document.querySelector("#screen");
const keys = document.querySelectorAll(".keys");
const keysArr = [...keys];

screen.value = localStorage.getItem('screenData') || '';

if (localStorage.getItem('currentMode') !== null && localStorage.getItem('currentMode').includes('colorModeToggle')) {
    modeSwitch()
}

window.addEventListener('keydown', (e) => {
    if (!(isNaN(e.key)) || e.key === '/' || e.key === '*' || e.key === '-' || e.key === '+' || e.key === '.') {
        screen.value += e.key
    }
    else if (e.key === 'Enter' && screen.value !== '') {
        screen.value = eval(screen.value)
    }
    else if (e.key === '>') {
        screen.value = screen.value.slice(0, -1)
    }
    else if (e.ctrlKey && e.key === 'Backspace') {
        screen.value = ''
    }
    localStorage.setItem("screenData", screen.value)
})


keysArr.forEach(key => {
    key.addEventListener('click', () => {
        keyValue = key.innerText
        if (keyValue === 'Clear')
            screen.value = ''
        else if (keyValue === '=' && screen.value !== '')
            screen.value = eval(screen.value)
        else if (keyValue === '>')
            screen.value = screen.value.slice(0, -1)
        else
            screen.value += keyValue
        localStorage.setItem("screenData", screen.value)
    })
})

colorModeBtn.addEventListener('click', modeSwitch)

function modeSwitch() {
    keysArr.forEach(key => {
        key.classList.toggle('dark')
    })
    calculator.classList.toggle('dark')
    screen.classList.toggle('dark')
    body.classList.toggle('dark')
    colorModeBtn.classList.toggle('colorModeToggle')
    colorModeSlider.classList.toggle('colorModeToggle')
    localStorage.setItem("currentMode", colorModeBtn.classList)
}