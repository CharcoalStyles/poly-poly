import { line } from "../shapes/line.js";
import { arc } from "../shapes/arc.js";
import { ball } from "../shapes/ball.js";
import { getGradientSteps } from "../utils/colour.js";
import { generateSound } from "../utils/sound.js";

//get myCanvas
const canvas = document.getElementById("myCanvas");

//get context
const ctx = canvas.getContext("2d");
ctx.globalCompositeOperation = "destination-over";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const numArcs = 8;
const arcs = [
  ...getGradientSteps([250, 200, 150], [200, 100, 50], numArcs),
  ...getGradientSteps([200, 100, 50], [80, 80, 180], numArcs)
].map((c, i) => {
  const synth = new Tone.Synth().toDestination();
  const sound = generateSound(i);
  return {
    colour: c,
    direction: 1,
    sound: () => {
      synth.triggerAttackRelease(sound.key, "8n");
    }
  }
})
console.log(arcs)

//draw text in the middle of the canvas
ctx.font = "bold 100px sans-serif";
ctx.fillStyle = "#fff";
ctx.textAlign = "center";
ctx.fillText("POLYRHYTHM", canvas.width / 2, canvas.height / 2);
ctx.font = "bold 20px sans-serif";
ctx.fillText("Click to start", canvas.width / 2, canvas.height / 2 + 100);

let startTime = 0;
canvas.addEventListener('click', function () {
  startTime = Date.now();
  draw();
});

//draw
function draw() {
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
  const baseSize = canvas.width / arcs.length * 0.075;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const now = Date.now();
  const delta = (now - startTime) / 1000;
  // console.log(progress);
  ctx.lineCap = "round";
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = baseSize;

  const lineLength = lineDim.end.x - lineDim.start.x;

  //draw arcs
  arcs.forEach((tarc, i) => {
    const segLength = lineLength / arcs.length / 2 * (i + 1);
    ctx.strokeStyle = tarc.colour;
    arc(ctx, { x: canvas.width * 0.5, y: canvas.height * 0.9 }, segLength, Math.PI, Math.PI * 2);
    const ballVel = (2 * Math.PI * (128 - i * 2)) / 900, //segLength * 0.0075,
      distance = Math.PI + delta * ballVel,
      modDistance = distance % (Math.PI * 2);

    if (modDistance < Math.PI && tarc.direction === 1) {
      tarc.direction = -1;
      tarc.sound();
    } else if (modDistance > Math.PI && tarc.direction === -1) {
      tarc.direction = 1;
      tarc.sound();
    }

    const ballPos = {
      x: canvas.width * 0.5 + segLength * Math.cos(modDistance * tarc.direction),
      y: canvas.height * 0.9 + segLength * Math.sin(modDistance * tarc.direction),
    }
    ball(ctx, ballPos, baseSize * 2, tarc.colour);


    const arcStart = {
      x: canvas.width * 0.5 + segLength * Math.cos(Math.PI),
      y: canvas.height * 0.9 + segLength * Math.sin(Math.PI),
    }
    const arcEnd = {
      x: canvas.width * 0.5 - segLength * Math.cos(Math.PI),
      y: canvas.height * 0.9 - segLength * Math.sin(Math.PI),
    }

    ctx.strokeStyle = tarc.colour;
    line(ctx, { x: arcStart.x - baseSize, y: arcStart.y }, { x: arcStart.x + baseSize, y: arcStart.y });
    line(ctx, { x: arcEnd.x - baseSize, y: arcEnd.y }, { x: arcEnd.x + baseSize, y: arcEnd.y });

  });

  requestAnimationFrame(draw);
}