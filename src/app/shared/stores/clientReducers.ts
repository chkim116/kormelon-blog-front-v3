'use client';
import { combineReducers } from '@reduxjs/toolkit';
import { blogDetailSlice, blogSlice, blogWriteSlice } from '@app/blog/stores';
import { searchSlice } from '@app/search/stores';
import { authSlice } from './auth';
import { tagSlice } from './tag';
import { categorySlice } from './category';
import { notificationSlice } from './notification';
import { viewSlice } from './view';

const sharedReducers = combineReducers({
  auth: authSlice.reducer,
  tag: tagSlice.reducer,
  category: categorySlice.reducer,
  notification: notificationSlice.reducer,
  view: viewSlice.reducer,
});

export const clientReducers = combineReducers({
  shared: sharedReducers,
  search: searchSlice.reducer,
  blog: blogSlice.reducer,
  blogDetail: blogDetailSlice.reducer,
  blogWrite: blogWriteSlice.reducer,
});
