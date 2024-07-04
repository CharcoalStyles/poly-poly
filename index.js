import { line } from "./shapes/line.js";
import { arc } from "./shapes/arc.js";
import { ball } from "./shapes/ball.js";
import { getGradientSteps } from "./utils/colour.js";

//get myCanvas
const canvas = document.getElementById("myCanvas");

//get context
const ctx = canvas.getContext("2d");
ctx.globalCompositeOperation = "destination-over";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const lineDim = {
  start: {
    x: canvas.width * 0.1,
    y: canvas.height * 0.905
  },
  end: {
    x: canvas.width * 0.9,
    y: canvas.height * 0.905
  }
}

const numArcs = 16;
const arcColours = getGradientSteps([250,200,150], [200,100,0], numArcs)
console.log(arcColours)

const startTime = Date.now();

//draw
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const now = Date.now();
  const delta = (now - startTime) / 1000;
  // console.log(progress);
  ctx.lineCap = "round";
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 5;
  line(ctx, lineDim.start, lineDim.end);

  const lineLength = lineDim.end.x - lineDim.start.x;

  //draw arcs
  for (let i = 0; i < arcColours.length; i += 1) {
    const segLength = lineLength / numArcs / 2 * (i + 1);
    ctx.strokeStyle = arcColours[i];
    arc(ctx, { x: canvas.width * 0.5, y: canvas.height * 0.9 }, segLength, Math.PI, Math.PI * 2);

    const ballVel = (2 * Math.PI * (128 - i * 2)) / 900, //segLength * 0.0075,
      distance = Math.PI + delta * ballVel,
      modDistance = distance % (Math.PI * 2),
      adjDistance = modDistance >= Math.PI ? modDistance : 2 * Math.PI - modDistance;
    const ballPos = {
      x: canvas.width * 0.5 + segLength * Math.cos(adjDistance),
      y: canvas.height * 0.9 + segLength * Math.sin(adjDistance)
    }
    ball(ctx, ballPos, lineLength * 0.0075, arcColours[i]);
  }

  requestAnimationFrame(draw);
}

//draw
draw();