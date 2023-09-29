'use client';
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { env } from '@core/env';
import { clientReducers } from './clientReducers';

export const store = configureStore({
  reducer: clientReducers,
  middleware: (gDM) => gDM(),
  devTools: env.isDevelopment,
});

export type RootState = ReturnType<typeof clientReducers>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch<AppDispatch>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
