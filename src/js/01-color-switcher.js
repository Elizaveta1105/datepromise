const refs = {
    body: document.querySelector("body"),
    onStartBtn: document.querySelector("button[data-start]"),
    onEndBtn: document.querySelector("button[data-stop]")
}

refs.onStartBtn.addEventListener("click", onChangeBackground)
refs.onEndBtn.addEventListener("click", onStopBackground)

let intervalID = 0;

function onChangeBackground() {
    intervalID = setInterval(() => {
        refs.body.style.backgroundColor = getRandomHexColor()
    }, 1000);

    refs.onStartBtn.disabled = true;
}

function onStopBackground() {
    clearInterval(intervalID);

    refs.onStartBtn.disabled = false;
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}