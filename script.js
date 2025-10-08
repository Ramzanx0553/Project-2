let display = document.getElementById('display');
let previousDisplay = document.getElementById('previousDisplay');
let currentInput = '';
let operator = '';
let previousInput = '';

function updateDisplay() {
    if (currentInput === '' && previousInput === '' && operator === '') {
        display.textContent = '0';
        previousDisplay.textContent = '';
    } else if (operator && currentInput === '') {
        display.textContent = previousInput;
        previousDisplay.textContent = previousInput + ' ' + operator;
    } else if (operator) {
        display.textContent = currentInput;
        previousDisplay.textContent = previousInput + ' ' + operator;
    } else {
        display.textContent = currentInput || previousInput;
        previousDisplay.textContent = '';
    }
}

function appendNumber(num) {
    if (num === '.' && currentInput.includes('.')) {
        return;
    }
    
    if (currentInput === '0' && num !== '.') {
        currentInput = num;
    } else {
        currentInput += num;
    }
    
    updateDisplay();
}

function appendOperator(op) {
    if (currentInput === '' && previousInput === '') {
        return;
    }
    
    if (currentInput !== '' && previousInput !== '' && operator !== '') {
        calculate();
    }
    
    if (currentInput !== '') {
        previousInput = currentInput;
        currentInput = '';
    }
    
    operator = op;
    updateDisplay();
}

function calculate() {
    if (previousInput === '' || currentInput === '' || operator === '') {
        return;
    }
    
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert('Cannot divide by zero!');
                clearDisplay();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }
    
    // Round to avoid floating point errors
    result = Math.round(result * 100000000) / 100000000;
    
    currentInput = result.toString();
    operator = '';
    previousInput = '';
    updateDisplay();
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operator = '';
    updateDisplay();
}

function deleteLast() {
    if (currentInput !== '') {
        currentInput = currentInput.slice(0, -1);
    } else if (operator !== '') {
        operator = '';
    } else if (previousInput !== '') {
        previousInput = previousInput.slice(0, -1);
    }
    updateDisplay();
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    if (event.key >= '0' && event.key <= '9' || event.key === '.') {
        appendNumber(event.key);
    } else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
        appendOperator(event.key);
    } else if (event.key === 'Enter' || event.key === '=') {
        calculate();
    } else if (event.key === 'Escape') {
        clearDisplay();
    } else if (event.key === 'Backspace') {
        deleteLast();
    }
});