import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './stores/auth/auth.slice';
import { categorySlice } from './stores/category';
import { notificationSlice } from './stores/notification';

export const sharedReducers = combineReducers({
  auth: authSlice.reducer,
  category: categorySlice.reducer,
  notification: notificationSlice.reducer,
});
