import clsx from 'clsx';
import { nanoid } from 'nanoid';
import QRCode from 'qrcode-svg';
import { useEffect, useMemo } from 'react';
import {
  Link,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';
import { store, useSelector } from './store';
import { initGame } from './store/game';

type LoaderData = {
  id: string;
};

function loader({ params }: LoaderFunctionArgs): Response | LoaderData {
  let { id } = params;
  if (id === undefined) {
    id = nanoid(6);
    return redirect(`/new-game/${id}`);
  }
  store.dispatch(initGame({ id, kind: 'owner' }));
  return { id };
}

function NewGame() {
  const { id } = useLoaderData() as LoaderData;

  const gameURL = useMemo(() => `${window.location.origin}/game/${id}`, [id]);
  const svg = useMemo(() => {
    const qr = new QRCode({
      content: gameURL,
      ecl: 'H',
      padding: 0,
      background: 'transparent',
      color: 'currentColor',
      container: 'svg-viewbox',
    });
    return { __html: qr.svg() };
  }, [gameURL]);

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
      <div className="size-96" dangerouslySetInnerHTML={svg} />
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

NewGame.loader = loader;

export default NewGame;
