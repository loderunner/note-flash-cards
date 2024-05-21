import {
  ClientLoaderFunctionArgs,
  Link,
  redirect,
  useLoaderData,
  useNavigate,
} from '@remix-run/react';
import clsx from 'clsx';
import { nanoid } from 'nanoid';
import { useEffect, useMemo } from 'react';
import QRCode from '~/components/QRCode';
import { store, useSelector } from '~/store';
import { initGame } from '~/store/game';

export function clientLoader({ params }: ClientLoaderFunctionArgs) {
  let { id } = params;
  if (id === undefined) {
    id = nanoid(6);
    return redirect(`/new-game/${id}`);
  }
  store.dispatch(initGame({ id, kind: 'owner' }));
  return { id };
}

export default function NewGame() {
  const { id } = useLoaderData<typeof clientLoader>();

  const gameURL = useMemo(() => `${window.location.origin}/game/${id}`, [id]);

  const navigate = useNavigate();
  const connected = useSelector((state) => state.game.connected);
  useEffect(() => {
    if (connected) {
      navigate(`/game/${id}`);
    }
  }, [connected, id, navigate]);

  return (
    <div className="app flex flex-col items-center justify-center gap-16">
      <div className="text-center text-5xl font-bold">
        Waiting for player to join...
      </div>
      <QRCode className="size-96" url={gameURL} />
      <Link to={gameURL}>{gameURL}</Link>
      <Link
        className={clsx(
          'rounded-lg',
          'bg-slate-300',
          'px-8',
          'py-6',
          'text-4xl',
          'font-medium',
          'hover:bg-slate-400',
        )}
        to={`/game/${id}`}
      >
        Start game
      </Link>
    </div>
  );
}
