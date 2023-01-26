//https://stackoverflow.com/questions/48593312/javascript-event-when-mouseover-and-mousedown


for (let i = 0; i < 256; i++) {
    let div = document.createElement("div");

    //div.innerText = 'a';

    document.getElementById("grid").appendChild(div);
}

document.getElementById("grid").style.gridTemplateColumns = "repeat(16, 1fr)";
document.getElementById("grid").style.backgroundColor = "grey";

let grid = document.getElementById("grid");
let cel = grid.getElementsByTagName("div");
let isToggling = false;

function enableToggle(e) {
    
    console.log('enableToggle');
    isToggling = true;

    if (e.target !== grid) {
        paint(e);
    }
}

function disableToggle() {

    console.log("disableToggle");
    isToggling = false;
}

function paint(e) {

    if (isToggling === false) {
        return;
    }

    console.log('active');

    e.target.classList.add('active');
}

function start() {
    grid.onmousedown = enableToggle;

    for (let i = 0, il = cel.length; i < il; i++) {
        cel[i].onmouseenter = paint;
    }

    grid.onmouseup = disableToggle;
}

start();