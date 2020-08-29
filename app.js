const canvas = document.getElementById("jsCanvas"); //canvas
const ctx = canvas.getContext("2d"); //context: pixel controller
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const modeBtn = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "2c2c2c";
const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;

//pixel manipulation size
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

//initial background set to white (not transparent)
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
//initial values
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 1.5;

let painting = false;
let filling = false;

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
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    modeBtn.innerText = "Fill";
  } else {
    filling = true;
    modeBtn.innerText = "Paint";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function handleContextMenu(event) {
  event.preventDefault();
}

function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "painterJS.png";
  // console.log(link);
  link.click();
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
  //5. when I click, fill (only in fill mode)
  canvas.addEventListener("click", handleCanvasClick);
  //6. prevent context menu (right click)
  canvas.addEventListener("contextmenu", handleContextMenu);
}

if (colors) {
  // console.log(Array.from(colors));
  //Array.from(obj) : create array from obj
  Array.from(colors).forEach((color) =>
    color.addEventListener("click", handleColorClick)
  );
}

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (modeBtn) {
  modeBtn.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
