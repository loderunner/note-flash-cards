import clsx from 'clsx';
import {
  ComponentProps,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Staff from './Staff.tsx';
import { getNotes } from './notes.ts';

function getState(): ComponentProps<typeof Staff> {
  const clef = Math.random() > 0.5 ? 'treble' : 'bass';
  const notes = getNotes(4, clef, 3);
  return { clef, notes };
}

type Stage = 'guess' | 'answer';

function App() {
  const [stage, setStage] = useState<Stage>('guess');
  const [{ clef, notes }, setState] = useState(getState());
  const answer = useMemo(() => notes.map((n) => n.pitch).join(' '), [notes]);
  const [countdown, setCountdown] = useState(6);
  useEffect(() => {
    setTimeout(() => {
      if (countdown === 1) {
        setStage('answer');
        return;
      }
      setCountdown(countdown - 1);
    }, 1000);
  }, [countdown]);
  const next = useCallback(() => {
    setState(getState());
    setCountdown(6);
    setStage('guess');
  }, []);
  return (
    <div
      className={clsx(
        'flex',
        'flex-col',
        'h-[100vh]',
        'w-[100vw]',
        'items-center',
        'justify-center',
        'bg-slate-50',
      )}
      onClick={next}
    >
      <Staff notes={notes} clef={clef} />
      <div className={clsx('text-6xl', 'select-none')}>
        {stage === 'guess' ? countdown : answer}
      </div>
    </div>
  );
}

export default App;
