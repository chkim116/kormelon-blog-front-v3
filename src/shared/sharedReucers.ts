import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './stores/auth/auth.slice';
import { categorySlice } from './stores/category';
import { notificationSlice } from './stores/notification';
import { tagSlice } from './stores/tag';

export const sharedReducers = combineReducers({
  auth: authSlice.reducer,
  tag: tagSlice.reducer,
  category: categorySlice.reducer,
  notification: notificationSlice.reducer,
});
