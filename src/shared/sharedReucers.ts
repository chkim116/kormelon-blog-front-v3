import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './stores/auth/auth.slice';
import { notificationSlice } from './stores/notification';

export const sharedReducers = combineReducers({
  auth: authSlice.reducer,
  notification: notificationSlice.reducer,
});
