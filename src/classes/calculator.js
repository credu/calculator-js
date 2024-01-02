import { calculateOperation } from "../helpers/utilities";

class Calculator {
    history = [];
    _operation = "0";
    _result = "0";
    
    /**
     * Set HTML Elements
     * @param {HTMLElement} historyContainer 
     * @param {HTMLSpanElement} operationSpan 
     * @param {HTMLSpanElement} resultSpan 
    */
   constructor( historyContainer, operationSpan, resultSpan ) {
       this.DOMHistory = historyContainer;
       this.DOMoperation = operationSpan;
       this.DOMResult = resultSpan;
    }
    
    // Methods
    updateHistoryContainer() {
        this.DOMHistory.innerHTML = this.history.map(e => {
            const newElement = document.createElement("span");
            newElement.innerText = e;
            return newElement.outerHTML;
        }).join("\n");
    }
    
    reset() {
        this.operation = "0";
        this.result = "0";
    }
    calculate() {
        this.operation = this.result;
    }

    // Getters & Setters
    get operation() {
        return this._operation;
    }

    get result() {
        return this._result;
    }

    set operation( value ) {
        this._operation = value;
        this.DOMoperation.textContent = value;
        this.result = calculateOperation(value);
    }

    set result( value ) {
        this._result = value;
        this.DOMResult.textContent = value;
    }
}

export default Calculator;