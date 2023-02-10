const BUTTON_TYPES = [
  '%',
  'sqrt',
  'DEL',
  '*',
  7,
  8,
  9,
  '/',
  4,
  5,
  6,
  '-',
  1,
  2,
  3,
  '+',
  '.',
  0,
  'C',
  '=',
];

const KEYBOARD_CODES = {
  Digit0: '0',
  Numpad0: '0',
  Digit1: '1',
  Numpad1: '1',
  Digit2: '2',
  Numpad2: '2',
  Digit3: '3',
  Numpad3: '3',
  Digit4: '4',
  Numpad4: '4',
  Digit5: '5',
  Numpad5: '5',
  Digit6: '6',
  Numpad6: '6',
  Digit7: '7',
  Numpad7: '7',
  Digit8: '8',
  Numpad8: '8',
  Digit9: '9',
  Numpad9: '9',
  Slash: '/',
  NumpadDivide: '/',
  Backspace: 'DEL',
  NumpadMultiply: '*',
  NumpadSubtract: '-',
  NumpadAdd: '+',
  NumpadEnter: '=',
  Enter: '=',
  NumpadDecimal: '.',
};

const BASIC_DIGITS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];

const savedValues = {
  value1: null,
  value2: null,
  operand: null,
  opepated: false,
};

const calculatorControlsElement = document.querySelector(
  '.calculator__controls'
);

const calculatorScreenTextElement = document.querySelector(
  '.calculator__screen'
);

const animateButton = (button) => {
  button.classList.add('button__selected');
  setTimeout(() => {
    button.classList.remove('button__selected');
  }, 200);
};

const multiply = (value1, value2) => {
  return value1 * value2;
};

const divide = (value1, value2) => {
  return value1 / value2;
};

const subtract = (value1, value2) => {
  return value1 - value2;
};

const calculateSum = (value1, value2) => {
  return value1 + value2;
};

const deleteDigit = () => {
  let enteredNumber = Array.from(calculatorScreenTextElement.innerText);
  enteredNumber.pop();
  calculatorScreenTextElement.innerText = enteredNumber.join('');
};

const calculatePercentage = (mainValue, percentage) => {
  return (mainValue * percentage) / 100;
};

const clearSavedValues = () => {
  savedValues.value1 = null;
  savedValues.value2 = null;
  savedValues.operand = null;
  savedValues.opepated = false;
};

const checkForDecimal = (value) => {
  return calculatorScreenTextElement.innerText.includes('.') && value === '.';
};

const adjustFontSizeOfCalculatorScreen = () => {
  if (calculatorScreenTextElement.innerText.length < 10) {
    calculatorScreenTextElement.style.fontSize = '160px';
  } else {
    calculatorScreenTextElement.style.fontSize = `${
      (15 * 100) / calculatorScreenTextElement.innerText.length
    }px`;
  }
};

const okToExecuteCalculation = () => {
  if (
    savedValues.value1 !== null &&
    savedValues.value2 !== null &&
    savedValues.operand !== null
  )
    return true;
};

const executeOperation = () => {
  console.log(savedValues);
  if (savedValues.value1 === null) {
    savedValues.value1 = +calculatorScreenTextElement.innerText;
  } else if (savedValues.value2 === null || savedValues.opepated === false) {
    savedValues.value2 = +calculatorScreenTextElement.innerText;
    if (savedValues.value2 === null || savedValues.opepated === true) {
      savedValues.value1 = +calculatorScreenTextElement.innerText;
      savedValues.opepated = false;
    }
  }
  calculatorScreenTextElement.innerText = '';
  if (okToExecuteCalculation()) {
    let result = savedValues.operand(savedValues.value1, savedValues.value2);
    clearSavedValues();
    savedValues.opepated = true;
    calculatorScreenTextElement.innerText = result;
    if (result === Infinity) {
      calculatorScreenTextElement.innerText = 'Cannot Divide by Zero!';
      adjustFontSizeOfCalculatorScreen();
      return
    }
    savedValues.value1 = +result;
  }
  adjustFontSizeOfCalculatorScreen();
};

const addOperandToObject = (value) => {
  switch (value) {
    case '*':
      savedValues.operand = multiply;
      return;
    case '%':
      savedValues.operand = calculatePercentage;
      return;
    case '/':
      savedValues.operand = divide;
      return;
    case '-':
      savedValues.operand = subtract;
      return;
    case '+':
      savedValues.operand = calculateSum;
      return;
  }
};

const calculatorButtonClickHandler = (value) => {
  if (checkForDecimal(value)) {
    return
  };
  switch (value) {
    case 'C':
      clearSavedValues();
      calculatorScreenTextElement.innerText = '';
      adjustFontSizeOfCalculatorScreen();
      return;
    case '=':
      if (
        savedValues.value1 !== null &&
        savedValues.operand !== null &&
        calculatorScreenTextElement.innerText.length > 0
      ) {
        executeOperation();
      }
      return;
    case 'DEL':
      deleteDigit();
      adjustFontSizeOfCalculatorScreen();
      return;
    case 'sqrt':
      calculatorScreenTextElement.innerText = Math.sqrt(
        +calculatorScreenTextElement.innerText
      );
      adjustFontSizeOfCalculatorScreen();
      return;
    case '%':
      calculatorScreenTextElement.innerText = calculatePercentage(
        savedValues.value1,
        +calculatorScreenTextElement.innerText
      );
      adjustFontSizeOfCalculatorScreen();
      return;
  }
  if (BASIC_DIGITS.includes(value)) {
    if (savedValues.opepated) {
      calculatorScreenTextElement.innerText = value;
      savedValues.opepated = false;
    } else {
      calculatorScreenTextElement.innerText += value;
    }
  } else {
    executeOperation();
    addOperandToObject(value);
  }
  adjustFontSizeOfCalculatorScreen();
};

const renderCalculatorButtons = () => {
  for (let i = 0; i < 20; i++) {
    const calculatorButton = document.createElement('div');
    const calculatorButtonText = document.createElement('div');
    calculatorButton.classList.add('calculator__button');
    calculatorButton.addEventListener('click', () => {
      animateButton(calculatorButton);
    });
    calculatorButton.dataset.type = BUTTON_TYPES[i];
    calculatorButtonText.classList.add('calculator__button--text');
    calculatorButton.appendChild(calculatorButtonText);
    calculatorButtonText.innerText = BUTTON_TYPES[i];
    calculatorControlsElement.appendChild(calculatorButton);
  }
  calculatorControlsElement.addEventListener('click', (evt) => {
    console.log(savedValues);
    if (evt.target.classList.contains('calculator__controls')) {
      return;
    }
    checkForDecimal();
    calculatorButtonClickHandler(evt.target.innerText);
  });
};

const addKeyboardEventListeners = () => {
  document.addEventListener('keydown', (evt) => {
    if (Object.keys(KEYBOARD_CODES).includes(evt.code)) {
      calculatorButtonClickHandler(KEYBOARD_CODES[evt.code]);
    }
  });
};

renderCalculatorButtons();

addKeyboardEventListeners();
