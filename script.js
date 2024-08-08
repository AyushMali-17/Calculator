let currentOperand = '';
let previousOperand = '';
let operation = null;
let historyVisible = false;
const historyLog = [];

function appendNumber(number) {
    if (currentOperand.length < 15) { // Limit input length
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
    if (currentOperand === '' && (op === '*' || op === '/')) return;
    if (previousOperand !== '') {
        compute();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
    updateDisplay();
}

function appendFunction(func) {
    if (currentOperand === '') return;
    operation = func;
    previousOperand = currentOperand;
    currentOperand = '';
}

function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    try {
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
                if (current === 0) throw new Error('Division by zero');
                computation = prev / current;
                break;
            case 'sqrt':
                computation = Math.sqrt(current);
                break;
            case 'pow':
                computation = Math.pow(current, 2);
                break;
            case 'log':
                if (current <= 0) throw new Error('Logarithm of non-positive number');
                computation = Math.log10(current);
                break;
            case 'sin':
                computation = Math.sin(current * Math.PI / 180);
                break;
            case 'cos':
                computation = Math.cos(current * Math.PI / 180);
                break;
            case 'tan':
                computation = Math.tan(current * Math.PI / 180);
                break;
            case 'fact':
                if (current < 0 || current % 1 !== 0) throw new Error('Factorial of non-integer or negative number');
                computation = factorial(current);
                break;
            default:
                return;
        }
        currentOperand = computation.toString();
        historyLog.push(`${previousOperand} ${operation} ${current} = ${computation}`);
        operation = null;
        previousOperand = '';
        updateDisplay();
        updateHistory();
    } catch (error) {
        alert(error.message);
        clearDisplay();
    }
}

function factorial(num) {
    if (num === 0 || num === 1) return 1;
    return num * factorial(num - 1);
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

function updateHistory() {
    const historyElement = document.getElementById('history');
    historyElement.value = historyLog.join('\n');
}

function toggleHistory() {
    historyVisible = !historyVisible;
    document.getElementById('history').style.display = historyVisible ? 'block' : 'none';
}

function clearHistory() {
    historyLog.length = 0;
    updateHistory();
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
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
    } else if (key === 's') {
        appendFunction('sin');
    } else if (key === 'c') {
        appendFunction('cos');
    } else if (key === 't') {
        appendFunction('tan');
    } else if (key === '!') {
        appendFunction('fact');
    }
});
