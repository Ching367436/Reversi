"use strict";
let aiConfig = {
    black: "none",
    white: "cmax_ev3",
    delay: 500
};
const aiMap = new Map([
    ["none", "No AI"],
    ["random", "Random"],
    ["cmax_ev1", "Ching's Max ev1"],
    ["cmax_ev2", "Ching's Max ev2"],
    ["cmax_ev3", "Ching's Max ev3"],
    ["cmin_ev3", "Ching's Min ev3"]
])

loadSettings();

window.addEventListener("keydown", function (e) {
    switch (e.keyCode) {
        case 13:    // enter
            applySettings();
            break;
        case 83:    // s
            // pause ai
            clearTimeout(timmer);
            document.querySelector("#configBoard").style.display = "block";
            document.querySelector("#settings").style.display = "none";
            document.querySelector("#newGame").style.display = "none";
            break;
    }
});

function loadSettings() {
    for (const [name, displayName] of aiMap) {
        const option = document.createElement("option");
        option.value = name;
        option.innerHTML = displayName;
        document.querySelector("#blackAi").appendChild(option);
        document.querySelector("#whiteAi").appendChild(option.cloneNode(true));
    }

    if (localStorage.getItem("aiConfig") !== null) {
        aiConfig = JSON.parse(localStorage.getItem("aiConfig"));
    }
    document.querySelector("#blackAi").value = aiConfig.black;
    document.querySelector("#whiteAi").value = aiConfig.white;
    document.querySelector("#delay").value = aiConfig.delay / 1000;
}

document.querySelector('#ok')
    .addEventListener("click", applySettings);

function applySettings() {
    aiConfig.black = document.querySelector("#blackAi").value;
    aiConfig.white = document.querySelector("#whiteAi").value;
    aiConfig.delay = parseFloat(document.querySelector("#delay").value) * 1000;
    document.querySelector("#configBoard").style.display = "none";
    document.querySelector("#settings").style.display = "block";
    document.querySelector("#newGame").style.display = "block";
    ai();
    localStorage.setItem("aiConfig", JSON.stringify(aiConfig));
}

document.querySelector('#settings')
    .addEventListener("click", () => {
        // pause ai
        clearTimeout(timmer);
        document.querySelector("#configBoard").style.display = "block";
        document.querySelector("#settings").style.display = "none";
        document.querySelector("#newGame").style.display = "none";
    });
document.querySelector('#newGame')
    .addEventListener("click", () => {
        location.reload();
    })