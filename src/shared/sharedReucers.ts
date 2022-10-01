import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './stores/auth/auth.slice';

export const sharedReducers = combineReducers({
  auth: authSlice.reducer,
});
