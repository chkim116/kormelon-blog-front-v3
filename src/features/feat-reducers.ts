import { combineReducers } from '@reduxjs/toolkit';
import { sharedReducers } from 'src/shared/sharedReucers';
import { postSlice } from './posts/stores';
import { categorySlice } from './settings/stores/category.slice';

export const featureReducers = combineReducers({
  shared: sharedReducers,
  category: categorySlice.reducer,
  post: postSlice.reducer,
});
