export const ball = (context, center, radius, colour = "#FFF") => {
  context.fillStyle = colour;
  context.strokeStyle = "#000";
  context.beginPath();
  context.arc(center.x, center.y, radius, 0, Math.PI * 2);
  context.fill();
  context.stroke();
};