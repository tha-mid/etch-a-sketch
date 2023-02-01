//https://stackoverflow.com/questions/48593312/javascript-event-when-mouseover-and-mousedown
//pencil color
//background color
//eraser
//clear
//grid size

let gridSize = document.getElementById("gridSize");

function onChange() {

    console.log('Entrou');

    document.getElementById("grid").replaceChildren();

    let val = gridSize.value;
    let backColor = document.getElementById("backCol").value;
    
    for (let i = 0; i < (val * val); i++) {
        let div = document.createElement("div");
        div.classList.add("cell");
        
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
let eraser = true;

document.getElementById("eraser").addEventListener("click", function() {

    eraser = false;

})

document.getElementById("pen").addEventListener("click", function() {
    eraser = true;
    //console.log('teste');
})


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

    if (isToggling === false) {
        return;
    }
    //console.log('eraser = ' + eraser)
    let color;

    if (eraser) { 
        //console.log('a');
        color = document.getElementById("penCol").value;
        e.target.classList.remove('cell');
        e.target.classList.add('active');
    } else {
        color = document.getElementById("backCol").value;
        e.target.classList.remove('active');
        e.target.classList.add('cell');

    }

    

    //console.log('active');

    e.target.style.backgroundColor = color;
}

function start() {
    grid.onmousedown = enableToggle;

    for (let i = 0, il = cel.length; i < il; i++) {
        cel[i].onmouseenter = paint;
    }

    grid.onmouseup = disableToggle;
}

onChange();
start();

////////

document.getElementById("applyBackColor").addEventListener("click", function() {

    let cel = document.getElementsByClassName("cell");

    for(let i = 0; i < cel.length; i++) {
        cel[i].style.backgroundColor = document.getElementById("backCol").value;
    }
    
})

////////

