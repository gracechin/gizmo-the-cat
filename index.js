const GIZMO_IMG_SRC = "gizmo.png";
const CANVAS_BG_COLOR = "#3B342F";
const IMG_RATIO = 0.5;
const MEOW_AUDIO = new Audio(
  "https://cdn.freesound.org/previews/436/436541_1196472-lq.mp3"
);
var count = 0;
var times = [];
var startTime, gizmoPos;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const counterEl = document.getElementById("counterText");
const timerEl = document.getElementById("timerText");

const sum = (arr) => arr.reduce((partialSum, a) => partialSum + a, 0);

const genCounterText = () => {
  return `You found Gizmo the Cat ${count} ${count == 1 ? "time" : "times"}.`;
};
const genTimerText = () => {
  const noTimes = times.length == 0;
  const lastTime = noTimes ? 0 : times[times.length - 1].toFixed(1);
  const fastestTime = noTimes ? 0 : Math.min.apply(null, times).toFixed(1);
  return `The last time took you ${lastTime} seconds.
  Your fastest time is ${fastestTime} seconds.`;
};

// Initiate texts in elements
counterEl.innerText = genCounterText();
timerEl.innerText = genTimerText();

const setCanvasDimToFull = (canvas) => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

const resetCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = CANVAS_BG_COLOR;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

const placeGizmo = () => {
  const img = new Image();
  img.src = GIZMO_IMG_SRC;
  img.onload = function () {
    const { width, height } = img;
    const posX = (canvas.width - width * 0.5) * Math.random();
    const posY = (canvas.height - height * 0.5) * Math.random();
    ctx.drawImage(img, posX, posY, width * IMG_RATIO, img.height * IMG_RATIO);
    gizmoPos = { x: posX, y: posY, w: img.width, h: img.height };
  };
};

const resetGame = () => {
  resetCanvas();
  placeGizmo();
  startTime = new Date().getTime();
};

const isGizmoFound = (gizmoPos, pointerPos) => {
  const withinX =
    gizmoPos.x <= pointerPos.x && pointerPos.x <= gizmoPos.x + gizmoPos.w;
  const withinY =
    gizmoPos.y <= pointerPos.y && pointerPos.y <= gizmoPos.y + gizmoPos.h;
  return withinX && withinY;
};

window.onload = (_event) => {
  setCanvasDimToFull(canvas);
  resetGame();
};

const turnOnTorch = () =>
  mask.style.setProperty("--torch-color", "transparent");

const setTorchPos = ({ clientX, clientY }) => {
  let xPercent = parseInt((clientX / window.innerWidth) * 100);
  let yPercent = parseInt((clientY / window.innerHeight) * 100);
  mask.style.setProperty("--pointer-x-percent", xPercent + "%");
  mask.style.setProperty("--pointer-y-percent", yPercent + "%");
};

// timer
const recordTimeTaken = () => {
  const timeLapsedInMs = new Date().getTime() - startTime;
  times.push(timeLapsedInMs * 0.001);
};

// When user moves mouse
document.addEventListener("pointermove", (pos) => {
  turnOnTorch();
  setTorchPos(pos);
});

// When user clicks on Gizmo
document.addEventListener("pointerdown", (pos) => {
  if (isGizmoFound(gizmoPos, { x: pos.clientX, y: pos.clientY })) {
    recordTimeTaken();
    count++;
    counterEl.innerText = genCounterText();
    timerEl.innerText = genTimerText();
    MEOW_AUDIO.play();
    resetGame();
  }
});
