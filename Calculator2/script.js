const numbers = document.querySelectorAll('[data-num]');
// This creates an array/object of size 11. Look at console.
const operators = document.querySelectorAll('[data-opr]');
// This creates an array/object of size 4. Look at console.
const allClear = document.querySelector('[data-clr]');
const numDelete = document.querySelector('[data-del]');
const equal = document.querySelector('[data-eql]');
const dispPrev = document.querySelector('[data-prev]');
const dispCurr = document.querySelector('[data-curr]');
var i = 0;
var j = undefined;
var k = undefined;
var l = undefined;
class Calculator {
    constructor(dispPrev, dispCurr) {
        this.dispPrev = dispPrev;
        this.dispCurr = dispCurr;
        // Everytime we create a new Calculator screen will be cleared.
        this.allClear();
    }

    // Now we will be creating methods/functions for calculator acc to operations
    // that it will perform.

    allClear() {
        // Here we need to clear three things, one is previous screen,current screen
        // and the operator symbol which appears on the previous screen

        // Here we are declaring variables this.Prev, this.Curr and this.operation. These are called instance
        // variables. They don't need var, const or let to be declared. We can declare as many
        // as we want. 

        this.prev = '';
        this.curr = '';
        this.operation = '';
    }
    delete() {
        // This function will delete the numbers typed in display
        this.curr = this.curr.toString().slice(0, -1);
        // The slice method will remove 0 characters from the left side and
        //  1 character from the right side
    }
    assignNumber(numb) {
        // This method is used to add numbers in the current screen

        if (this.dispPrev.innerText !== "" && this.curr == "-" && numb !== "") {
            this.curr = this.curr.toString().slice(1, -1);
            // return;
        }

        if (numb == "." && this.curr.includes(".")) {
            return;
        }
        if (this.dispCurr.innerText[0] == "0" && numb != ".") {
            this.curr = this.curr.toString().slice(1, 0);
        }
        else if (this.dispCurr.innerText[0] == "0" && numb == ".") {
            this.curr = this.curr.toString().slice(1, 0);
        }
        else if (this.dispCurr.innerText == "=Error" && numb !== "") {
            this.curr = this.curr.toString().slice(1, 0);
        }
        else if (this.dispCurr.innerText == "=NaN" && numb !== "") {
            this.curr = this.curr.toString().slice(3, 0);
        }
        else if (this.dispCurr.innerText[0] == "0" && numb !== "") {
            this.curr = this.curr.toString().slice(1, 0);
        }
        else if (this.dispCurr.innerText[0] == "-" && this.dispCurr.innerText[1] == "0" && numb !== ".") {
            this.curr = this.curr.replace("0", "");
        }
        this.curr = this.curr.toString() + numb.toString();

    }
    chooseOperation(operation) {
        // This method is used to perform operations based on operators

        if (this.dispCurr.innerText == "" && operation == "-") {
            this.curr = "-"
            return;
        }
        if (this.dispPrev.innerText !== "" && this.curr == "-" && operation !== "") {
            this.curr = this.curr.toString().slice(1, -1);
            return;
        }
        if (this.dispCurr.innerText == "=Error" && operation !== "") {
            this.curr = this.curr.toString().slice(1, 0);
            return;
        }

        if (this.curr == '') {
            return;
        }

        if (this.prev !== '' && operation !== "%") {
            this.compute();
        }
        else if (this.prev !== '' && this.dispPrev.innerText.includes("+") && operation === "%") {
            this.operation = "/100";
            k = this.dispPrev.innerText;
            l = k.slice(0, -1);
            this.curr = eval(l + "" + this.operation + "" + "*" + this.curr);
            this.operation = '+';
        }
        else if (this.prev !== '' && this.dispPrev.innerText.includes("-") && operation === "%") {
            this.operation = "/100";
            k = this.dispPrev.innerText;
            l = k.slice(0, -1);
            this.curr = eval(l + "" + this.operation + "" + "*" + this.curr);
            this.operation = '-';
        }
        else if (this.prev !== '' && this.dispPrev.innerText.includes("*") && operation === "%") {
            this.operation = "/100";
            this.curr = eval(this.curr + "" + this.operation);
            this.operation = '*';
        }
        else if (this.prev !== '' && this.dispPrev.innerText.includes("/") && operation === "%") {
            this.operation = "/100";
            this.curr = eval(this.curr + "" + this.operation);
            this.operation = '/';
        }

        if (operation !== "%") {
            this.operation = operation;
            this.prev = this.curr;
            this.curr = '';
        }
        else if (operation === "%" && this.prev == '') {
            this.operation = "/100";

            j = this.curr;
            this.curr = eval(j + "" + this.operation);
            this.prev = '';
            this.operation = '';
        }



    }
    compute() {
        // Take the entered values and compute a single value that 
        // we need to print in our Calculator. 

        this.curr = eval(this.prev + "" + this.operation + "" + this.curr);
        if (this.curr == "Infinity") {
            this.curr = "Error";
        }
        else if (this.curr == "-Infinity") {
            this.curr = "Error";
        }
        else if (this.curr == "NaN") {
            this.curr = "Error";
        }
        this.prev = '';
        this.operation = '';
    }
    updateDisplay() {
        // This is going to update all values on the screen
        if (i > 0) {
            i = i - 1;
            this.dispCurr.innerText = "=" + this.curr;
        } else {
            this.dispCurr.innerText = this.curr;
        }
        if (this.operation != null) {
            this.opr = this.operation;
            this.dispPrev.innerText = this.prev + this.opr;
        }
    }
}
const calculator = new Calculator(dispPrev, dispCurr);
numbers.forEach(button => {
    button.addEventListener('click', () => {
        calculator.assignNumber(button.innerText);
        calculator.updateDisplay();
    })
})
operators.forEach(button => {
    button.addEventListener('click', () => {

        if (button.innerText == "÷") {
            calculator.chooseOperation("/");
        }
        else {
            calculator.chooseOperation(button.innerText);
        }

        calculator.updateDisplay();
    })
})
allClear.addEventListener('click', () => {
    calculator.allClear();
    calculator.updateDisplay();
})
equal.addEventListener('click', () => {
    i = i + 1;
    calculator.compute();
    calculator.updateDisplay();
})
numDelete.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})
document.addEventListener('keydown', event => {
    console.log('Key Down', event.keyCode);
    if (event.keyCode == 49) {
        calculator.assignNumber("1");
    }
    else if (event.keyCode == 50) {
        calculator.assignNumber("2");
    }
    else if (event.keyCode == 51) {
        calculator.assignNumber("3");
    }
    else if (event.keyCode == 52) {
        calculator.assignNumber("4");
    }
    else if (event.keyCode == 53) {
        calculator.assignNumber("5");
    }
    else if (event.keyCode == 54) {
        calculator.assignNumber("6");
    }
    else if (event.keyCode == 55) {
        calculator.assignNumber("7");
    }
    else if (event.keyCode == 56) {
        calculator.assignNumber("8");
    }
    else if (event.keyCode == 57) {
        calculator.assignNumber("9");
    }
    else if (event.keyCode == 48) {
        calculator.assignNumber("0");
    }
    else if (event.keyCode == 190) {
        calculator.assignNumber(".");
    }
    else if (event.keyCode == 8) {
        calculator.delete();
    }
    else if (event.keyCode == 191) {
        calculator.chooseOperation("/");
    }
    else if (event.keyCode == 88) {
        calculator.chooseOperation("*");
    }
    else if (event.keyCode == 187) {
        calculator.chooseOperation("+");
    }
    else if (event.keyCode == 189) {
        calculator.chooseOperation("-");;
    }
    else if (event.keyCode == 13) {
        calculator.compute();
        i = i + 1;
    }
    else if (event.keyCode == 27) {
        calculator.allClear();
    }
    calculator.updateDisplay();
});