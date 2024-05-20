import { Link } from 'react-router-dom';

export default function Welcome() {
  return (
    <div className="app flex flex-col items-center justify-center gap-16">
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
