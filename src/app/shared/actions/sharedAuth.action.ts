'use server';
import 'server-only';

import { revalidatePath } from 'next/cache';
import { AuthRoleEnum } from '@server/entities';
import { authService } from '@domain/auth';
import { ActionFnType } from 'src/app/shared/uiStates/sharedActions.uiState';
import { AuthUserUiState } from '@domain/auth/auth.uiState';
import {
  createActionRejectedWithError,
  createActionResolveWithData,
} from 'src/app/shared/manipulates/sharedActions.create';
import { POST_LOGIN_CACHE_TAG } from '@server/repositories/auth.repo';
import { actSharedRevalidateTags } from './sharedUtils.action';

export const actSharedCheckAdmin: ActionFnType<
  void,
  AuthUserUiState
> = async () => {
  try {
    const user = await authService.check();

    const isAdmin = user.role === AuthRoleEnum.ADMIN;

    if (!isAdmin) {
      throw new Error('권한이 없습니다.');
    }

    return createActionResolveWithData(user);
  } catch (err) {
    return createActionRejectedWithError(err);
  }
};

export const actSharedCheckUser: ActionFnType<
  void,
  AuthUserUiState
> = async () => {
  try {
    const user = await authService.check();

    return createActionResolveWithData(user);
  } catch (err) {
    return createActionRejectedWithError(err);
  }
};

export const actSharedCheckAuth: ActionFnType<void, boolean> = async () => {
  try {
    const user = await authService.check();
    return createActionResolveWithData(Boolean(user.id));
  } catch (err) {
    return createActionRejectedWithError(err);
  }
};

export async function actSharedLogout() {
  await authService.logout();

  await actSharedRevalidateTags(POST_LOGIN_CACHE_TAG);
  revalidatePath('/');
}
