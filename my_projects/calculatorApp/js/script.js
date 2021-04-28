let currentTheme = 0 // night

function toggleTheme(mode) {
  if (mode == currentTheme) {
    return
  }

  currentTheme = 1 - currentTheme

  const day = document.querySelector('#day')
  const night = document.querySelector('#night')
  const body = document.querySelector('body')
  const calculatorBody = document.querySelector('.calculator-body')
  const themeContainer = document.querySelector('.theme-container')
  const dayMode = document.querySelector('.day-mode')
  const calculatorKeypadContainer = document.querySelector(
    '.calculator-keypad-container'
  )
  const keyCells = document.querySelectorAll('.key-cell')

  if (currentTheme === 1) {
    day.classList.remove('active')
    night.classList.add('active')
    night.classList.add('light')

    body.classList.add('light')
    calculatorBody.classList.add('light')
    themeContainer.classList.add('light')
    dayMode.classList.add('light')
    calculatorKeypadContainer.classList.add('light')
    keyCells.forEach((keyCell) => {
      keyCell.classList.add('light')
    })
  } else {
    night.classList.remove('active')
    night.classList.remove('light')
    day.classList.add('active')

    body.classList.remove('light')
    calculatorBody.classList.remove('light')
    themeContainer.classList.remove('light')
    dayMode.classList.remove('light')
    calculatorKeypadContainer.classList.remove('light')
    keyCells.forEach((keyCell) => {
      keyCell.classList.remove('light')
    })
  }
}

class Calculator {
  constructor() {
    this.numberOne = ''
    this.numberTwo = ''
    this.operator = ''
    this.result = ''
    this.prevResult = ''
  }
  add() {
    this.result = parseFloat(this.numberOne) + parseFloat(this.numberTwo)
  }
  subtract() {
    this.result = parseFloat(this.numberOne) - parseFloat(this.numberTwo)
  }
  multiply() {
    this.result = parseFloat(this.numberOne) * parseFloat(this.numberTwo)
  }
  divide() {
    this.result = parseFloat(this.numberOne) / parseFloat(this.numberTwo)
  }
  remainder() {
    this.result = parseFloat(this.numberOne) % parseFloat(this.numberTwo)
  }
  setNumOne(num) {
    this.numberOne += num
  }
  setNumTwo(num) {
    this.numberTwo += num
  }
  setOperator(operator) {
    this.operator = operator
  }
  reset() {
    this.numberOne = ''
    this.numberTwo = ''
    this.operator = ''
    this.result = ''
    this.prevResult = ''
  }
}

const SignObject = {
  ADD: '+',
  SUBTRACT: '-',
  MULTIPLY: 'x',
  DIVIDE: '÷',
  REMAINDER: '%',
}

const inputContainer = document.querySelector('.input-container')
const outputContainer = document.querySelector('.output-container')

const operationStack = []

let cnt = 0

const numClickHandler = (num) => {
  //if last index me operater hua to
  if (SignObject[operationStack[operationStack.length - 1]]) {
    //if stack me sirf SUBTRACT hua to
    if (operationStack.length == 1 && operationStack[0] == 'SUBTRACT') {
      operationStack[0] = '-'
    } else {
      cnt++
    }
  }
  operationStack[cnt]
    ? (operationStack[cnt] = `${operationStack[cnt]}` + num)
    : (operationStack[cnt] = `${num}`)
  display()
}
const decimalClickHandler = () => {
  if (SignObject[operationStack[operationStack.length - 1]]) {
    cnt++
  }
  if (operationStack[cnt]) {
    operationStack[cnt] += '.'
  } else {
    operationStack[cnt] = '.'
  }
  display()
}

const display = () => {
  outputContainer.innerText = ''
  operationStack.forEach((val) => {
    if (SignObject[val]) {
      outputContainer.innerText += SignObject[val]
    } else {
      outputContainer.innerText += val
    }
  })
}

const operationClickHandler = (operator) => {
  if (operationStack.length > 0) {
    cnt++
  }
  operationStack[cnt]
    ? (operationStack[cnt] += operator)
    : (operationStack[cnt] = operator)
  display()
}

const resultClickHandler = () => {
  operationStack.forEach((val) => {
    if (SignObject[val]) {
      inputContainer.innerHTML += `<div class="operator">${SignObject[val]}</div>`
    } else {
      inputContainer.innerHTML += `<div class="operand">${val}</div>`
    }
  })
  const c1 = new Calculator()
  while (operationStack.length > 1) {
    c1.numberTwo = operationStack.pop()
    c1.operator = operationStack.pop()
    c1.numberOne = operationStack.pop()
    switch (c1.operator) {
      case 'ADD':
        c1.add()
        break
      case 'SUBTRACT':
        c1.subtract()
        break
      case 'MULTIPLY':
        c1.multiply()
        break
      case 'DIVIDE':
        c1.divide()
        break
      case 'REMAINDER':
        c1.remainder()
        break
      default:
        break
    }
    operationStack.push(c1.result)
  }
  outputContainer.innerText = c1.result
  operationStack.splice(0)
  cnt = 0
}

const allClearClickHandler = () => {
  inputContainer.innerText = ''
  outputContainer.innerText = ''
  operationStack.splice(0)
  cnt = 0
}

const toggleSignHandler = () => {
  if (operationStack.length <= 0) {
    operationStack.push('-')
  } else if (operationStack.length == 1) {
    if (operationStack[0] == '-') {
      operationStack.pop()
    } else {
      operationStack[0] = -1 * operationStack[0]
    }
  }
  display()
}
