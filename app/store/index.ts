import { configureStore } from '@reduxjs/toolkit';
import * as ReactRedux from 'react-redux';
import game from './game';
import { listener } from './middleware';

export const store = configureStore({
  reducer: {
    game,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listener.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

export const useSelector = ReactRedux.useSelector.withTypes<RootState>();
export const useDispatch = ReactRedux.useDispatch.withTypes<Dispatch>();
