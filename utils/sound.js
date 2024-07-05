const scales = {
  major: ["C", "D", "E", "F", "G", "A", "B"],
  minor: ["C", "D", "Eb", "F", "G", "Ab", "B"]
}

const startOctave = 2;

export const generateSound = (i, scale = 'major') => {
  const octave = Math.floor(i / scales.major.length) + startOctave;
  return { key: `${scales[scale][i % scales[scale].length]}${octave}`, length: "8n" };
};