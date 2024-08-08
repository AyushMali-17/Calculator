let currentOperand = '';
let previousOperand = '';
let operation = null;

function appendNumber(number) {
    if (currentOperand.length < 10) { // Limit input length
        currentOperand += number;
        updateDisplay();
    }
}

function appendDecimal() {
    if (!currentOperand.includes('.')) {
        currentOperand += '.';
        updateDisplay();
    }
}

function chooseOperation(op) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        compute();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
    updateDisplay();
}

function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            computation = prev / current;
            break;
        case 'sqrt':
            computation = Math.sqrt(current);
            break;
        case 'pow':
            computation = Math.pow(current, 2);
            break;
        case 'log':
            computation = Math.log10(current);
            break;
        default:
            return;
    }
    currentOperand = computation.toString();
    operation = null;
    previousOperand = '';
    updateDisplay();
    logHistory();
}

function clearDisplay() {
    currentOperand = '';
    previousOperand = '';
    operation = null;
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('display').value = currentOperand;
}

function logHistory() {
    const history = document.getElementById('history');
    history.value += `${previousOperand} ${operation} ${currentOperand} = ${currentOperand}\n`;
}

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (key >= '0' && key <= '9') {
        appendNumber(key);
    } else if (key === '+') {
        chooseOperation('+');
    } else if (key === '-') {
        chooseOperation('-');
    } else if (key === '*') {
        chooseOperation('*');
    } else if (key === '/') {
        chooseOperation('/');
    } else if (key === 'Enter') {
        compute();
    } else if (key === 'Backspace') {
        clearDisplay();
    } else if (key === '.') {
        appendDecimal();
    }
});
