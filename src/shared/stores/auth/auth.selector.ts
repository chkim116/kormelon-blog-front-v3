import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@common/store';

const selAuth = (state: RootState) => state.shared.auth;

export const selAuthLoading = createSelector(selAuth, (state) => state.loading);

export const selUserData = createSelector(selAuth, (state) => state.user);

export const selIsLogged = createSelector(selAuth, (state) => state.isLogged);
