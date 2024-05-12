import clsx from 'clsx';
import QRCode from 'qrcode-svg';
import { useMemo } from 'react';
import {
  Link,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
} from 'react-router-dom';

type LoaderData = {
  id: string;
};

function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;
  if (id === undefined) {
    return redirect('/new-game/toto');
  }
  return { id };
}

function NewGame() {
  const { id } = useLoaderData() as LoaderData;
  const svg = useMemo(() => {
    const qr = new QRCode({
      content: `${window.location.origin}/play/${id}`,
      ecl: 'H',
      padding: 0,
      background: 'transparent',
      color: 'currentColor',
      container: 'svg-viewbox',
    });
    return { __html: qr.svg() };
  }, [id]);
  return (
    <div
      className={clsx(
        'flex',
        'flex-col',
        'h-dvh',
        'w-dvw',
        'items-center',
        'justify-center',
        'bg-slate-50',
        'py-16',
        'sm:py-24',
        'gap-16',
      )}
    >
      <div className="text-center text-5xl font-bold">
        Waiting for player to join...
      </div>
      <div className="size-96" dangerouslySetInnerHTML={svg} />
      <Link
        className="rounded-lg bg-slate-300 px-8 py-6 text-4xl font-medium hover:bg-slate-400"
        to={`/game/${id}`}
      >
        Start game
      </Link>
    </div>
  );
}

NewGame.loader = loader;

export default NewGame;
