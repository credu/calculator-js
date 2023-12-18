import { loadDarkMode, toggleDarkMode } from './helpers/dark-mode';
import './style.css'

const result = document.querySelector("#result");
const btnReset = document.querySelector("#btn-reset");
const buttons = document.querySelectorAll(".btn.btn-input");

loadDarkMode();

document.querySelector("#darkmode-selector").addEventListener("click", e => {
    toggleDarkMode();
});  

buttons.forEach( element => {
    element.addEventListener("click", e => {
        if ( result.textContent === "0" ) result.textContent = e.target.textContent;
        else if ( result.textContent.endsWith("+") || result.textContent.endsWith("-") || result.textContent.endsWith("x") || result.textContent.endsWith("÷") ) {
            result.textContent = result.textContent.slice(0, -1) + e.target.textContent;
            return;
        }
        else result.textContent += e.target.textContent;
    });
});

btnReset.addEventListener("click", () => {
    result.textContent = "0";
})