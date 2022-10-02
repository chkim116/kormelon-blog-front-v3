import { combineReducers } from '@reduxjs/toolkit';
import { sharedReducers } from 'src/shared/sharedReucers';
import { categorySlice } from './settings/stores/category.slice';

export const featureReducers = combineReducers({
  shared: sharedReducers,
  category: categorySlice.reducer,
});
