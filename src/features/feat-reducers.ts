import { combineReducers } from '@reduxjs/toolkit';
import { sharedReducers } from 'src/shared/sharedReucers';
import { blogSlice, blogDetailSlice } from './blog/stores';
import { blogWriteSlice } from './blog/stores/write';
import { searchSlice } from './search/stores';

export const featureReducers = combineReducers({
  shared: sharedReducers,
  search: searchSlice.reducer,
  blog: blogSlice.reducer,
  blogDetail: blogDetailSlice.reducer,
  blogWrite: blogWriteSlice.reducer,
});
