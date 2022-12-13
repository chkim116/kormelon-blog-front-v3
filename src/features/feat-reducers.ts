import { combineReducers } from '@reduxjs/toolkit';
import { sharedReducers } from 'src/shared/sharedReucers';
import { blogSlice, blogDetailSlice } from './blog/stores';
import { blogWriteSlice } from './blog/stores/write';

export const featureReducers = combineReducers({
  shared: sharedReducers,
  blog: blogSlice.reducer,
  blogDetail: blogDetailSlice.reducer,
  blogWrite: blogWriteSlice.reducer,
});
