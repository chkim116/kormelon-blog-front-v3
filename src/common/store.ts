import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import logger from 'redux-logger';
import { featureReducers } from '@features/feat-reducers';
import { env } from './env';

export const store = configureStore({
  reducer: featureReducers,
  middleware: (gDM) => gDM().concat(logger),
  devTools: env.isDevelopment,
});

export type RootState = ReturnType<typeof featureReducers>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
