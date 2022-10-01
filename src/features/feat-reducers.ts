import { combineReducers } from '@reduxjs/toolkit';
import { sharedReducers } from 'src/shared/sharedReucers';

export const featureReducers = combineReducers({
  shared: sharedReducers,
});
