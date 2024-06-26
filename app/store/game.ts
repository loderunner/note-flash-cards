import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  isAnyOf,
} from '@reduxjs/toolkit';

import { RealtimeChannel } from '@supabase/supabase-js';
import { Clef, Note, getNotes } from '~/components/notes';
import supabase from '~/supabase';
import { store } from '.';
import { startListening } from './middleware';
import { isSetCardPayload } from './validators';

export type PlayerKind = 'owner' | 'player';
export type Stage = 'guess' | 'answer';
export type Card = {
  clef: Clef;
  notes: Note[];
};

type GameState = {
  id: string;
  kind: PlayerKind;
  connected: boolean;
  card: Card;
  stage: Stage;
};

type InitGamePayload = {
  id: string;
  kind: PlayerKind;
};

function sendState({
  channel,
  getState,
}: {
  channel: RealtimeChannel;
  getState: typeof store.getState;
}) {
  const state = getState();
  if (!state) {
    return;
  }
  return channel.send({
    type: 'broadcast',
    event: 'state',
    card: state.game.card,
    stage: state.game.stage,
  });
}

export const initGame = createAsyncThunk(
  'game/init',
  ({ id, kind }: InitGamePayload, { dispatch }) => {
    const channel = supabase.channel(`game-${id}`, {
      config: { presence: { key: kind } },
    });
    channel
      .on('presence', { event: 'join' }, async ({ key }) => {
        console.log(`join: key=${key}`);
        if (key !== kind) {
          dispatch(gameSlice.actions.setConnected(true));
        }
      })
      .on('presence', { event: 'leave' }, ({ key }) => {
        console.log(`leave: key=${key}`);
        if (key !== kind) {
          dispatch(gameSlice.actions.setConnected(false));
        }
      })
      .subscribe(async (status) => {
        console.log(`subscribe: status=${status}`);
        if (status === 'SUBSCRIBED') {
          await channel.track({});
          startListening({
            matcher: isAnyOf(
              nextCard,
              answered,
              gameSlice.actions.setConnected,
            ),
            effect: async (_, { getState }) => {
              if (kind === 'owner' && getState().game.connected) {
                await sendState({ channel, getState });
              }
            },
          });
        }
      })
      .on('broadcast', { event: 'state' }, (payload) => {
        console.log(`broadcast: event=${payload.event}`);
        if (kind === 'player' && isSetCardPayload(payload)) {
          dispatch(gameSlice.actions.setCard(payload));
        }
      });
    return { id, kind };
  },
);

export type SetCardPayload = {
  card: Card;
  stage: Stage;
};

export const gameSlice = createSlice({
  name: 'game',
  initialState: {} as Partial<GameState>,
  reducers: {
    setConnected(state, { payload: connected }: PayloadAction<boolean>) {
      state.connected = connected;
    },
    setCard(
      state,
      { payload: { card, stage } }: PayloadAction<SetCardPayload>,
    ) {
      state.card = { ...card };
      state.stage = stage;
    },
    nextCard(state) {
      const clef: Clef = Math.random() > 0.5 ? 'treble' : 'bass';
      const notes = getNotes(12, clef, 4);
      state.card = { clef, notes };
      state.stage = 'guess';
    },
    answered(state) {
      state.stage = 'answer';
    },
  },
  extraReducers: ({ addCase }) => {
    addCase(initGame.fulfilled, (_, { payload: { id, kind } }) => {
      return { id, kind, connected: false, stage: 'guess' };
    });
  },
});

export const nextCard = gameSlice.actions.nextCard;
export const answered = gameSlice.actions.answered;

export default gameSlice.reducer;
