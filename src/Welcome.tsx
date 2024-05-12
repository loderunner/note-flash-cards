import clsx from 'clsx';
import { Link } from 'react-router-dom';

export default function Welcome() {
  return (
    <div
      className={clsx(
        'flex',
        'flex-col',
        'gap-16',
        'h-dvh',
        'w-dvw',
        'items-center',
        'justify-center',
        'bg-slate-50',
        'py-16',
        'sm:py-24',
      )}
    >
      <div className="text-center text-8xl font-bold sm:text-8xl md:text-9xl">
        Note Flash Cards
      </div>
      <Link
        className="rounded-lg bg-slate-300 px-8 py-6 text-4xl font-medium hover:bg-slate-400"
        to="/new-game"
      >
        New game
      </Link>
    </div>
  );
}
