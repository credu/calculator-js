const prefers = window.matchMedia("(prefers-color-scheme: dark)");
const dataset = document.documentElement.dataset;
const MODES = ["light", "dark"]

/**
 * Set dark mode true or false
 * @param {Boolean} value 
 */
export const setDarkMode = ( value, saveInStorage = true ) => {
    const theme = value ? MODES[1] : MODES[0];
    dataset.theme = theme;
    if (saveInStorage) localStorage.setItem("theme", theme);
}

export const toggleDarkMode = () => {
    setDarkMode( dataset.theme !== MODES[1] );
}

export const loadDarkMode = () => {
    if ( localStorage.getItem("theme") === MODES[1] ) {
        setDarkMode(true, false);
    }
    else if ( !localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches ) {
        setDarkMode(true);
    };
}