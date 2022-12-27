import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './stores/auth/auth.slice';
import { categorySlice } from './stores/category';
import { notificationSlice } from './stores/notification';
import { tagSlice } from './stores/tag';
import { viewSlice } from './stores/view';

export const sharedReducers = combineReducers({
  auth: authSlice.reducer,
  tag: tagSlice.reducer,
  category: categorySlice.reducer,
  notification: notificationSlice.reducer,
  view: viewSlice.reducer,
});
