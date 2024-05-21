import * as rtk from '@reduxjs/toolkit';
import { Dispatch, RootState } from '.';

export const listener = rtk.createListenerMiddleware();

export const startListening = listener.startListening.withTypes<
  RootState,
  Dispatch
>();
export const addListener = rtk.addListener.withTypes<RootState, Dispatch>();
