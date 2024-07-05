
export const rgbToHex = (rgb) => {
  return "#" + ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1);
}

// take a rgb start and end, then return an array of Hex values
export const getGradientSteps = (start, end, steps) => {
  const rgb = [];
  for (let i = 0; i < steps; i++) {
    const step = i / (steps - 1);
    rgb.push(getRGB(start, end, step));
  }
  return rgb;
}

// take a start and end rgb, and a step, and return a hex value
export const getRGB = (start, end, step) => {
  const rgb = [];
  for (let i = 0; i < 3; i++) {
    const c = start[i] + (end[i] - start[i]) * step;
    rgb.push(Math.floor(c));
  }
  return rgb;
}

