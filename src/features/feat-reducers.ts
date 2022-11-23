import { combineReducers } from '@reduxjs/toolkit';
import { sharedReducers } from 'src/shared/sharedReucers';
import { blogSlice } from './blog/stores';

export const featureReducers = combineReducers({
  shared: sharedReducers,
  blog: blogSlice.reducer,
});
