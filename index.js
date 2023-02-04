//https://stackoverflow.com/questions/48593312/javascript-event-when-mouseover-and-mousedown
//pencil color
//background color
//eraser
//clear
//grid size

let gridSize = document.getElementById("gridSize");

function onChange() {

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
let mouse = 'pen';

document.getElementById("eraser").addEventListener("click", function() {
    mouse = 'eraser';
    document.getElementById("eraser").classList.replace("buttons", "buttonActive");
    document.getElementById("pen").classList.replace("buttonActive", "buttons");
    document.getElementById("rainbow").classList.replace("buttonActive", "buttons");
    document.getElementById("shade").classList.replace("buttonActive", "buttons");
});

document.getElementById("pen").addEventListener("click", function() {
    mouse = 'pen';
    document.getElementById("pen").classList.replace("buttons", "buttonActive");
    document.getElementById("eraser").classList.replace("buttonActive", "buttons");
    document.getElementById("rainbow").classList.replace("buttonActive", "buttons");
    document.getElementById("shade").classList.replace("buttonActive", "buttons");
});

document.getElementById("rainbow").addEventListener("click", function() {
    mouse = 'rainbow';
    document.getElementById("rainbow").classList.replace("buttons", "buttonActive");
    document.getElementById("pen").classList.replace("buttonActive", "buttons");
    document.getElementById("eraser").classList.replace("buttonActive", "buttons");
    document.getElementById("shade").classList.replace("buttonActive", "buttons");
});

document.getElementById("shade").addEventListener("click", function() {
    mouse = 'shade';
    document.getElementById("shade").classList.replace("buttons", "buttonActive");
    document.getElementById("pen").classList.replace("buttonActive", "buttons");
    document.getElementById("eraser").classList.replace("buttonActive", "buttons");
    document.getElementById("rainbow").classList.replace("buttonActive", "buttons");
});

document.getElementById("clear").addEventListener("click", function() {
    onChange();
});

/////////

let grid = document.getElementById("grid");
let cel = grid.getElementsByTagName("div");
let isToggling = false;

function enableToggle(e) {
    
    isToggling = true;
    count = 1;

    if (e.target !== grid) {
        paint(e);
    }
}

function disableToggle() {
    isToggling = false;
}

function paint(e) {

    if (isToggling === false) {
        return;
    }

    let color;
    let r;
    let g;
    let b;

    if (mouse === 'pen') { 
        color = document.getElementById("penCol").value;
        e.target.classList.remove('cell');
        e.target.classList.add('active');

    } else if (mouse === 'eraser') {
        color = document.getElementById("backCol").value;
        e.target.classList.remove('active');
        e.target.classList.add('cell');

    } else if (mouse === 'rainbow') {
        r = Math.floor(Math.random() * 256);
        g = Math.floor(Math.random() * 256);
        b = Math.floor(Math.random() * 256);
        color = 'rgb(' + r + ', ' + g + ', ' + b + ')';
        e.target.classList.remove('cell');
        e.target.classList.add('active');

    } else if (mouse === 'shade') {

        color = document.getElementById("penCol").value;
        
        let m = color.match(/^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i);
           
        r = parseInt(m[1], 16);
        g = parseInt(m[2], 16);
        b = parseInt(m[3], 16);

        if (count === 1) {
            color = 'rgb(' + r + ', ' + g + ', ' + b + ')';
        } else {
            r = Math.round(r - (r * (count / 10)));
            g = Math.round(g - (g * (count / 10)));
            b = Math.round(b - (b * (count / 10)));

            if (r <= 0) {r = 0};
            if (g <= 0) {g = 0};
            if (b <= 0) {b = 0};

            color = 'rgb(' + r + ', ' + g + ', ' + b + ')';
        
        }

        count++;

        if (count > 10) {
            count = 1;
        }

        e.target.classList.remove('cell');
        e.target.classList.add('active');    
    }

    e.target.style.backgroundColor = color;
}

let count = 1;

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

