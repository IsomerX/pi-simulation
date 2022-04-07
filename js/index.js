let n = 100;
let arr = [];
const res = 2;
let pointSize = 10;
let innerPoints = 0;
let counter = 0;

function setup() {
    if (n > 50000) {
        pointSize = 2;
    } else if (n > 10000) {
        pointSize = 5;
    }
    else{
        pointSize = 10;
    }
    innerPoints = 0;
    let size;
    if (window.innerWidth > window.innerHeight) {
        size = window.innerHeight;
    } else {
        size = window.innerWidth;
    }
    createCanvas(size / res, size / res);
    arr = [];
    let v = p5.Vector.random2D();
    for (let i = 0; i < n; i++) {
        let v = {
            x: random(width),
            y: random(height),
        };
        if (dist(v.x, v.y, width / 2, height / 2) < width / 2) {
            innerPoints += 1;
        }
        arr.push(v);
    }
    console.log(innerPoints);
    background(0);
    let radius;
    drawingContext.shadowOffsetX = 0;
    drawingContext.shadowOffsetY = 0;
    drawingContext.shadowBlur = 10;
    drawingContext.shadowColor = "white";
    noStroke();
    if (width < height) {
        circle(width / 2, height / 2, width);
    } else {
        circle(width / 2, height / 2, height);
    }

    drawingContext.shadowOffsetX = 0;
    drawingContext.shadowOffsetY = 0;
    drawingContext.shadowBlur = 0;
    drawingContext.shadowColor = "black";

    let answerField = document.getElementById("ans");
    answerField.innerText = ((4 * innerPoints) / n).toPrecision(10);

    let errorField = document.getElementById("error");
    errorField.innerText = `${(
        (100 * Math.abs((4 * innerPoints) / n - Math.PI)) /
        Math.PI
    ).toPrecision(10)}%`;

    let main = document.getElementsByTagName("main");
    main.classList = ["main"];
    counter = 0;
    if (n < 10000) {
        counter = 0;
        draw();
    } else {
        for (let i = 0; i < n; i++) {
            fill(
                Math.floor(random(255)),
                Math.floor(random(255)),
                Math.floor(random(255))
            );
            circle(arr[i].x, arr[i].y, pointSize);
        }
    }
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
    fill(
        Math.floor(random(255)),
        Math.floor(random(255)),
        Math.floor(random(255))
    );
    circle(arr[counter].x, arr[counter].y, pointSize);
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
