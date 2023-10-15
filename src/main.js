import './style.css'

const dataset = document.documentElement.dataset;
document.querySelector("#darkmode-selector").addEventListener("click", e => {
    dataset.theme = (dataset.theme !== "dark") ? "dark" : "light";
});