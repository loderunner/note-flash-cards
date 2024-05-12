import clsx from 'clsx';
import { useMemo } from 'react';
import { Formatter, Renderer, Stave, StaveNote, Stem, Voice } from 'vexflow';
import { Clef, Note, limits } from './notes';

const midPoint = {
  treble: (limits.treble.min + limits.treble.max) / 2,
  bass: (limits.bass.min + limits.bass.max) / 2,
};

const formatter = new Formatter();

type Props = {
  notes: Note[];
  clef: Clef;
};

export default function Staff({ notes, clef }: Props) {
  const html = useMemo(() => {
    const el = document.createElement('div');
    const renderer = new Renderer(el, Renderer.Backends.SVG);

    const width = 50 + notes.length * 30;
    const stave = new Stave(0, 0, width);
    stave.addClef(clef);

    const bbox = stave.getBoundingBox();
    renderer.resize(bbox.w + 1, bbox.h);
    const context = renderer.getContext();
    stave.setContext(context).draw();

    const voice = new Voice({ num_beats: notes.length, beat_value: 4 });
    voice.addTickables(
      notes.map(
        (n) =>
          new StaveNote({
            keys: [`${n.pitch}/${n.octave}`],
            clef,
            duration: 'q',
            stem_direction: n.index > midPoint[clef] + 1 ? Stem.DOWN : Stem.UP,
          }),
      ),
    );

    formatter.joinVoices([voice]).format([voice], width - 50);
    voice.draw(context, stave);

    el.querySelector('svg')!.style.height = '100%';
    el.querySelector('svg')!.style.width = '100%';
    return { __html: el.innerHTML };
  }, [clef, notes]);

  return (
    <div
      className={clsx(
        'flex',
        'flex-shrink',
        'flex-grow',
        'flex-col',
        'items-center',
        'justify-center',
        'px-4',
        'sm:px-12',
        'min-h-0',
      )}
      dangerouslySetInnerHTML={html}
    ></div>
  );
}
