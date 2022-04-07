let n = 5;
let arr = [];
const res = 2;
let pointSize = 10;
let innerPoints = 0;
let counter = 0;
let scaler = 1.2;
let nLines = 5;
let lineLength;

function checkCollision(x, angle, width) {
    let col = Math.floor((x * nLines) / width);
    let x1 = x + Math.cos(angle) * lineLength;
    let x2 = x - Math.cos(angle) * lineLength;
    let posDis = x1 - ((col + 1) * width) / nLines;
    let negDis = (col * width) / nLines - x2;
    if (posDis >= 0 || negDis >= 0) {
        return true;
    }
    return false;
}

function setup() {
    // if (n > 50000) {
    //     pointSize = 2;
    // } else if (n > 10000) {
    //     pointSize = 5;
    // }
    // else{
    //     pointSize = 10;
    // }
    innerPoints = 0;
    let size;
    if (window.innerWidth > window.innerHeight) {
        size = window.innerHeight;
    } else {
        size = window.innerWidth;
    }
    createCanvas((scaler * size) / res, (scaler * size) / res);
    lineLength = (0.5 * width) / nLines;
    arr = [];
    for (let i = 0; i < n; i++) {
        let v = {
            x: random(width),
            y: random(height),
            theta: random(Math.PI / 2),
        };
        
        if(checkCollision(v.x, v.theta, width))
            innerPoints+=1;
        arr.push(v);
    }
    background(255);

    for (let i = 1; i <= nLines; i++) {
        let x1 = (i * width) / nLines;
        let y1 = 0;
        let y2 = height;
        line(x1, y1, x1, y2);
    }

    let radius;
    drawingContext.shadowOffsetX = 0;
    drawingContext.shadowOffsetY = 0;
    drawingContext.shadowBlur = 10;
    drawingContext.shadowColor = "white";
    noStroke();

    drawingContext.shadowOffsetX = 0;
    drawingContext.shadowOffsetY = 0;
    drawingContext.shadowBlur = 0;
    drawingContext.shadowColor = "black";

    let answerField = document.getElementById("ans");
    answerField.innerText = (2 * n / innerPoints).toPrecision(10);

    let errorField = document.getElementById("error");
    errorField.innerText = `${(
        (100 * Math.abs(2*(n / innerPoints)- Math.PI)) /
        Math.PI
    ).toPrecision(10)}%`;

    let main = document.getElementsByTagName("main");
    main.classList = ["main"];
    counter = 0;
    draw();
}

// document on resize
window.addEventListener("resize", function (event) {
    // resizeCanvas(windowHeight, windowHeight);
    setup();
    console.log(windowHeight, windowWidth);
});

function draw() {
    if (counter == n) {
        noLoop();
    }
    for (let i = 0; i < n; i++) {
        let v = arr[i];
        stroke(2);
        let x1 = v.x + Math.cos(v.theta) * lineLength;
        let y1 = v.y + Math.sin(v.theta) * lineLength;
        let x2 = v.x - Math.cos(v.theta) * lineLength;
        let y2 = v.y - Math.sin(v.theta) * lineLength;
        line(x1, y1, x2, y2);
    }
    counter += 1;
}

let slider = document.getElementById("myRange");
let output = document.getElementById("slide");

slider.oninput = function () {
    counter = 0;
    output.innerText = this.value;
    n = this.value;
    setTimeout(() => {
        setup();
    }, 100);
};
