export const ball = (context, center, radius, colour = "#FFF") => {
  context.fillStyle = colour;
  context.beginPath();
  context.arc(center.x, center.y, radius, 0, Math.PI * 2);
  context.fill();
};