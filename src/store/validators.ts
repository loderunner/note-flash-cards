/* eslint-disable @typescript-eslint/no-explicit-any */
import { Clef, Note } from '~/notes';
import { Card, SetCardPayload, Stage } from './game';

export function isNote(note: unknown): note is Note {
  return (
    typeof note === 'object' &&
    note !== null &&
    'index' in note &&
    typeof note.index === 'number' &&
    'pitch' in note &&
    (note.pitch === 'A' ||
      note.pitch === 'B' ||
      note.pitch === 'C' ||
      note.pitch === 'D' ||
      note.pitch === 'E' ||
      note.pitch === 'F' ||
      note.pitch === 'G') &&
    'octave' in note &&
    typeof note.octave === 'number'
  );
}

export function isClef(clef: unknown): clef is Clef {
  return clef === 'treble' || clef === 'bass';
}

export function isCard(card: unknown): card is Card {
  return (
    typeof card === 'object' &&
    card !== null &&
    'clef' in card &&
    isClef(card.clef) &&
    'notes' in card &&
    Array.isArray(card.notes) &&
    card.notes.every((n) => isNote(n))
  );
}

export function isStage(stage: unknown): stage is Stage {
  return stage === 'guess' || stage === 'answer';
}

export function isSetCardPayload(payload: unknown): payload is SetCardPayload {
  return (
    typeof payload === 'object' &&
    payload !== null &&
    'card' in payload &&
    isCard(payload.card) &&
    'stage' in payload &&
    isStage(payload.stage)
  );
}
