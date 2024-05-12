export type Clef = 'treble' | 'bass';

export const limits = {
  treble: { min: 26, max: 43 },
  bass: { min: 14, max: 29 },
} as const;

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

export type Note = {
  index: number;
  pitch: string;
  octave: number;
};

const pitches = 'CDEFGAB';
export function getNotes(
  numNotes: number,
  clef: Clef,
  maxSpread: number,
): Note[] {
  const notes: number[] = [];
  for (let i = 0; i < numNotes; i++) {
    let noteIndex: number;
    if (i === 0) {
      noteIndex = randInt(limits[clef].min, limits[clef].max);
    } else {
      noteIndex = randInt(
        Math.max(notes[i - 1] - maxSpread, limits[clef].min),
        Math.min(notes[i - 1] + maxSpread, limits[clef].max),
      );
      if (noteIndex === notes[i - 1]) {
        noteIndex++;
      }
    }
    notes.push(noteIndex);
  }

  return notes.map((index) => ({
    index,
    pitch: pitches[index % pitches.length],
    octave: Math.floor(index / pitches.length),
  }));
}
