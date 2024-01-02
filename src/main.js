import './style.css'
import Calculator from './classes/calculator';
import { loadDarkMode, toggleDarkMode } from './helpers/dark-mode';

const historyContainer = document.querySelector(".history-container");
const operation = document.querySelector("#operation");
const result = document.querySelector("#result");

const buttons = document.querySelectorAll(".btn.btn-input");
const btnReset = document.querySelector("#btn-reset");
const btnResult = document.querySelector("#btn-result");

const calculator = new Calculator( historyContainer, operation, result );

loadDarkMode();
document.querySelector("#darkmode-selector").addEventListener("click", () => {
    toggleDarkMode();
});

buttons.forEach( element => {
    element.addEventListener("click", e => {
        const buttonContent = e.target.textContent;

        if (operation.textContent === "0" && !isNaN(buttonContent)) {
            operation.textContent = buttonContent;
        }
        else if ( ["÷", "x", "-", "+"].includes(operation.textContent.at(-1)) && isNaN(buttonContent) ) {
            operation.textContent = operation.textContent.slice(0, operation.textContent.length - 1) + buttonContent;
        }
        else operation.textContent += buttonContent;

        calculator.operation = operation.textContent;
    });
});

btnReset.addEventListener("click", () => calculator.reset() );

btnResult.addEventListener("click", () => calculator.calculate() );