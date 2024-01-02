export const MATH_SYMBOLS = {
    ADDITION: "+",
    SUBSTRACTION: "-",
    MULTIPLICATION: "x",
    DIVISION: "÷",
}
export const MATH_SYMBOLS_ARRAY = [ MATH_SYMBOLS.ADDITION, MATH_SYMBOLS.SUBSTRACTION, MATH_SYMBOLS.MULTIPLICATION, MATH_SYMBOLS.DIVISION ];

const patternSymbols = MATH_SYMBOLS_ARRAY.join("\\");
// Regex take values of MATH_SYMBOLS_ARRAY and builds a regex, for example: /[+\-\x\÷]/g
const regexSymbols = new RegExp(`[${ patternSymbols }]`, "g");
const regexSymbolsRepeated = new RegExp(`([${ patternSymbols }])([${ patternSymbols }])`, "g");
const regexSymbolsAllowed = new RegExp(`[^\\d\\${ patternSymbols }]`, "g");

/**
 * Clean operat
 * @param {String} operation 
 * @returns {String}
 */
const cleanOperation = (operation) => {
    // Delete dots and spaces
    operation = operation.replace( /[.\s]/g, "" );

    if ( operation.startsWith( MATH_SYMBOLS.SUBSTRACTION ) ) {
        operation = "0" + operation;
    }
    else if ( MATH_SYMBOLS_ARRAY.includes( operation[ 0 ] ) ) {
        throw new Error( "The operation can't init with multiplication or division symbols." );
    }
    if ( regexSymbolsRepeated.test( operation ) ) {
        throw new Error( "Symbols repeated." );
    }
    if ( MATH_SYMBOLS_ARRAY.includes( operation.at( -1 ) ) ) {
        // Remove symbol in last position
        operation = operation.slice( 0, -1 );
    }
    if ( regexSymbolsAllowed.test( operation ) ) {
        throw new Error( `Symbol not allowed.` );
    }
    return operation;
}

/**
 * Resolves a operation string and returns a result
 * @param {String} operation 
 * @returns {String} Result of operation
 */
export const calculateOperation = (operation) => {
    operation = cleanOperation( operation );

    const symbols = operation.split("").filter( isNaN );
    const numbers = operation.split( regexSymbols ).map( Number );
    let index = 0;
    let result = ( symbols.length === 0 && numbers[0] ) ? numbers[0] : '0';
    while ( symbols.length != 0 ) {
        if ( symbols.includes( MATH_SYMBOLS.DIVISION ) ) {
            index = symbols.findIndex( e => e === MATH_SYMBOLS.DIVISION );
            result = numbers[index] / numbers[index + 1];
        }
        else if ( symbols.includes( MATH_SYMBOLS.MULTIPLICATION ) ) {
            index = symbols.findIndex( e => e === MATH_SYMBOLS.MULTIPLICATION );
            result = numbers[index] * numbers[index + 1];
        }
        else if ( symbols.includes( MATH_SYMBOLS.ADDITION ) ) {
            index = symbols.findIndex( e => e === MATH_SYMBOLS.ADDITION );
            result = numbers[index] + numbers[index + 1];
        }
        else if ( symbols.includes( MATH_SYMBOLS.SUBSTRACTION ) ) {
            index = symbols.findIndex( e => e === MATH_SYMBOLS.SUBSTRACTION );
            result = numbers[index] - numbers[index + 1];
        }

        symbols.splice(index, 1);
        numbers.splice(index, 1);
        numbers[index] = result;
    }
    return String(result);
}
