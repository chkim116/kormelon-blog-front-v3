'use server';
import 'server-only';

import {
  createSafeAction,
  createSafeFormAction,
} from '@common/lib/createSafeAction';
import { viewService } from '@shared/domains/view';
import { createViewUiState } from '@shared/domains/view/view.create';

export const actSharedViewLoad = createSafeAction(
  async () => await viewService.fetchView(),
  createViewUiState(),
);

export const actSharedViewAdd = createSafeFormAction(async () => {
  await viewService.addView();
});
