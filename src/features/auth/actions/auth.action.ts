'use server';
import 'server-only';

import {
  createActionRejectedWithError,
  createActionResolve,
  createActionResolveWithData,
} from '@shared2/domains/sharedActions.create';
import {
  ActionFormFnType,
  ActionFnType,
} from '@shared2/domains/sharedActions.uiState';
import {
  AuthLoginUiParams,
  AuthRegisterUiParams,
} from '../domains/auth.uiState';
import { authService } from '../domains';

export const actAuthLogin: ActionFormFnType<AuthLoginUiParams, void> = async (
  _,
  params,
) => {
  try {
    await authService.login(params);

    return createActionResolve();
  } catch (err) {
    return createActionRejectedWithError(err);
  }
};

export const actAuthRegister: ActionFormFnType<
  AuthRegisterUiParams,
  void
> = async (_, params) => {
  try {
    await authService.register(params);

    return createActionResolve();
  } catch (err) {
    return createActionRejectedWithError(err);
  }
};

export const actAuthProfileUpload: ActionFnType<FormData, string> = async (
  fd: FormData,
) => {
  try {
    const imageUrl = await authService.profileUpload(fd);

    return createActionResolveWithData(imageUrl);
  } catch (err) {
    return createActionRejectedWithError(err);
  }
};
