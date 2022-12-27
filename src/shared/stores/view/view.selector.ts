import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@common/store';

const selView = (state: RootState) => state.shared.view;

export const selViewValue = createSelector(selView, (state) => state);
