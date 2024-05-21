import { ClientLoaderFunctionArgs } from '@remix-run/react';
import clsx from 'clsx';
import { Suspense, lazy, useCallback, useMemo } from 'react';
import { store, useDispatch, useSelector } from '~/store';
import { answered, initGame, nextCard } from '~/store/game';

const Staff = lazy(() => import('~/components/Staff'));

export function clientLoader({ params }: ClientLoaderFunctionArgs) {
  const { id } = params;
  if (id === undefined) {
    throw new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });
  }
  if (store.getState().game.id) {
    store.dispatch(nextCard());
  } else {
    store.dispatch(initGame({ id, kind: 'player' }));
  }
  return { id };
}

export default function Game() {
  const card = useSelector((state) => state.game.card);
  const stage = useSelector((state) => state.game.stage);
  const kind = useSelector((state) => state.game.kind);

  const showAnswer = useMemo(
    () => kind === 'owner' || stage === 'answer',
    [kind, stage],
  );

  const answer = useMemo(
    () => card?.notes.map((n) => n.pitch).join(' '),
    [card?.notes],
  );

  const dispatch = useDispatch();
  const onClick = useCallback(() => {
    if (kind === 'player') {
      return;
    }
    if (stage === 'answer') {
      dispatch(nextCard());
    } else {
      dispatch(answered());
    }
  }, [dispatch, stage, kind]);

  return (
    <div
      className="app flex flex-col items-stretch justify-center gap-16"
      onClick={onClick}
    >
      {card ? (
        <Suspense>
          <Staff clef={card.clef} notes={card.notes} />
          <div className={clsx('answer', showAnswer || 'invisible')}>
            {answer}
          </div>
        </Suspense>
      ) : null}
    </div>
  );
}
