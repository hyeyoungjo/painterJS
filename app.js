const canvas = document.getElementById("jsCanvas"); //canvas
const ctx = canvas.getContext("2d"); //context: pixel controller
const colors = document.getElementsByClassName("jsColor");

//pixel manipulation size
canvas.width = 500;
canvas.height = 500;

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 1.5;

let painting = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  //!EVERY TIME WHEN I MOVE MOUSE!
  //event.clientX : Xcoordinate of screen
  //event.offsetX : Xcoordinate of canvas
  const x = event.offsetX;
  const y = event.offsetY;
  //console.log(x, y);
  //when I'm not painting
  if (!painting) {
    //console.log("create path in", x, y);
    ctx.beginPath(); //create path
    ctx.moveTo(x, y); //move path to XY coordinate
  } else {
    //when I'm painting
    //console.log("create line in", x, y);
    ctx.lineTo(x, y); //make a (mini)line from prev to curr pos (hidden)
    ctx.stroke(); //stroke path with current strokeStyle (show)
    // ctx.closePath();
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color; //override
}

if (jsCanvas) {
  //1. detect when mouse move inside of canvas
  canvas.addEventListener("mousemove", onMouseMove);
  //2. when I click, start painting
  canvas.addEventListener("mousedown", startPainting);
  //3. when I mouse up, stop painting
  canvas.addEventListener("mouseup", stopPainting);
  //4. when I leave canvas, stop painting
  canvas.addEventListener("mouseleave", stopPainting);
}

console.log(Array.from(colors));
//Array.from(obj) : create array from obj
Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);
