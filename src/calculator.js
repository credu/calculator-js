const regex = /[+\-\x\÷]/g;

class Calculator {
    calculation = "0";
    result = "0";
    history = [];

    /**
     * Resolves a operation and returns a result
     * @param {String} operation 
     * @returns {String}
     */
    eval(operation) {
        const symbols = operation.match( regex );
        const numbers = operation.split( regex ).map(element => {
            if ( element === '' ) {
                throw new Error("Double sign");
            }
            return Number(element);
        });

        let index = 0;
        let result = 0;
        while ( symbols.length != 0 ) {
            if ( symbols.includes("÷") ) {
                index = symbols.findIndex( e => e === "÷" );
                result = numbers[index] / numbers[index + 1];
            }
            else if ( symbols.includes("x") ) {
                index = symbols.findIndex( e => e === "x" );
                result = numbers[index] * numbers[index + 1];
            }
            else if ( symbols.includes("+") ) {
                index = symbols.findIndex( e => e === "+" );
                result = numbers[index] + numbers[index + 1];
            }
            else if ( symbols.includes("-") ) {
                index = symbols.findIndex( e => e === "-" );
                result = numbers[index] - numbers[index + 1];
            }

            symbols.splice(index, 1);
            numbers.splice(index, 1);
            numbers[index] = result;
        }
        console.log(result);
        return result;
    }
}

new Calculator().eval("2+2-2+3");