//https://stackoverflow.com/questions/48593312/javascript-event-when-mouseover-and-mousedown
//pencil color
//background color
//eraser
//clear
//grid size

let gridStart = 50;

for (let i = 0; i < (gridStart * gridStart); i++) {
    let div = document.createElement("div");

    document.getElementById("grid").appendChild(div);
}

document.getElementById("grid").style.gridTemplateColumns = "repeat("+ gridStart + ", 1fr)";
document.getElementById("grid").style.gridTemplateRows = "repeat("+ gridStart + ", 1fr)"

let gridSize = document.getElementById("gridSize");

function onChange() {

    console.log('Entrou');

    document.getElementById("grid").replaceChildren();

    let val = gridSize.value;
    let backColor = document.getElementById("backCol").value;
    
    for (let i = 0; i < (val * val); i++) {
        let div = document.createElement("div");
        
        div.style.backgroundColor = backColor;
        document.getElementById("grid").appendChild(div);
    }

    document.getElementById("grid").style.gridTemplateColumns = "repeat("+ val + ", 1fr)";
    document.getElementById("grid").style.gridTemplateRows = "repeat("+ val + ", 1fr)"

    start();
}


gridSize.onchange = onChange;

/////////

var slider = document.getElementById("gridSize");
var output = document.getElementById("gridVal");

slider.oninput = function() {
    output.innerHTML = 'Grid ' + this.value + 'x' + this.value;
}


/////////

let grid = document.getElementById("grid");
let cel = grid.getElementsByTagName("div");
let isToggling = false;

function enableToggle(e) {
    
    //console.log('enableToggle');
    isToggling = true;

    if (e.target !== grid) {
        paint(e);
    }
}

function disableToggle() {

    //console.log("disableToggle");
    isToggling = false;
}

function paint(e) {

    let color = document.getElementById("penCol").value;

    if (isToggling === false) {
        return;
    }

    //console.log('active');

    //e.target.classList.add('active');
    e.target.style.backgroundColor = color;
}

function start() {
    grid.onmousedown = enableToggle;

    for (let i = 0, il = cel.length; i < il; i++) {
        cel[i].onmouseenter = paint;
    }

    grid.onmouseup = disableToggle;
}

start();