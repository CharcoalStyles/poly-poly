export const arc = (context, center, radius, startAngle, endAngle) => {
  context.beginPath();
  context.arc(center.x, center.y, radius, startAngle, endAngle);
  context.stroke();
};