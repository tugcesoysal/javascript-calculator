
// elements
const displayEl= document.getElementById('all-calc');
const currentEl = document.getElementById('current-calc');
const clearBtn = document.getElementById('clear');
const equalsBtn = document.getElementById('equals');
const numberButtons = document.querySelectorAll('.well.dark-grey');
const operatorButtons = document.querySelectorAll('.well.grey');
const decimalButton = document.getElementById('decimal');
const buttons = document.querySelectorAll("button:not([data-action='clear'],[data-action='calculate'])")
let current = currentEl.textContent;
let display = displayEl.textContent;
let displayArray = []

function updateDisplay() {
    currentEl.textContent = current;
    displayEl.textContent = displayArray.join("");
}

function clear(){
    current=0
    displayArray=[]
    updateDisplay()
}

clearBtn.addEventListener("click", clear);

function getCurrent(button){
    current=button.textContent
}

buttons.forEach(btn => {
    btn.addEventListener("click", (e) => {
        
            const length = displayArray.length
            const lastIndex = length - 1
            const lastItem = displayArray[lastIndex]
        
        if (lastItem === '0' && e.target.textContent === '0') {
              
                return;
            }
    
        
        if(isNaN(parseFloat(lastItem)) && length>1 && e.target.hasAttribute("data-action")){
            getCurrent(e.target);
            displayArray.pop()
            displayArray.push(e.target.textContent)
            updateDisplay();
        } else {
            getCurrent(e.target);
            displayArray.push(e.target.textContent)
            updateDisplay();
        }
    });

});



equalsBtn.addEventListener("click", () => {
    const beforeCalc = displayArray.join("");
    const result = calculate(beforeCalc);
    current = String(result)
    console.log(result);

    if (result !== null) {
        displayEl.textContent = beforeCalc + "=" + current
        currentEl.textContent = current
    } 
});


function calculate(expression) {
    try {
        // Replace 'x' with '*' for multiplication
        expression = expression.replace(/x/g, '*');
        
        // Use a regular expression to allow only digits, operators, and parentheses
        const validInput = /^[\d\+\-\*\/\(\)\.]+$/;
        if (!validInput.test(expression)) {
            throw new Error('Invalid input');
        }

        // Use the Function constructor to create a function from the expression
        const func = new Function('return ' + expression);

        // Evaluate the function
        return func();
    } catch (error) {
        // Handle the case where the expression is invalid
        console.error("Error in calculation:", error);
        return null;
    }
}



