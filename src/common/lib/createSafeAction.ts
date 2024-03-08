/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CreateSafeAction,
  ActionFormStateUiState,
  CreateSafeActionCallback,
  CreateSafeFormAction,
  ActionStateUiState,
} from '@common/lib/createSafeAction.uiState';
import { env } from '@core/env';
import { HttpErrorModel } from '@core/lib/network/HttpError';

export function createActionResolve(message = ''): ActionStateUiState {
  return {
    isSuccess: true,
    isError: false,
    message,
    data: null,
    __type__: 'action',
  };
}

export function createActionResolveWithData<Data = any>(
  data: Data,
  message = '',
): ActionStateUiState<Data> {
  return {
    isSuccess: true,
    isError: false,
    message,
    data,
    __type__: 'action',
  };
}

export function createActionRejectedWithError(
  error: unknown,
  initialState: any = null,
): ActionStateUiState {
  const msg = (error as HttpErrorModel).message;

  if (env.isDevelopment) {
    console.log(`\n========= 🚀\n ${msg} 😅\n=========\n`);
  }

  return {
    isSuccess: false,
    isError: true,
    message: msg,
    data: initialState,
    __type__: 'action',
  };
}

export function createActionRejected(
  message = '',
  initialState: any = null,
): ActionStateUiState {
  if (env.isDevelopment) {
    console.log(`\n========= 🚀\n ${message} 😅\n=========\n`);
  }

  return {
    isSuccess: false,
    isError: true,
    message,
    data: initialState,
    __type__: 'action',
  };
}

export function createFormActionResolve(message = ''): ActionFormStateUiState {
  return {
    isSuccess: true,
    isError: false,
    message,
    data: null,
    __type__: 'formAction',
  };
}

export function createFormActionResolveWithData<Data = any>(
  data: Data,
  message = '',
): ActionFormStateUiState<Data> {
  return {
    isSuccess: true,
    isError: false,
    message,
    data,
    __type__: 'formAction',
  };
}

export function createFormActionRejectedWithError(
  error: unknown,
  initialState: any = null,
): ActionFormStateUiState {
  const msg = (error as HttpErrorModel).message;

  if (env.isDevelopment) {
    console.log(`\n========= 🚀\n ${msg} 😅\n=========\n`);
  }

  return {
    isSuccess: false,
    isError: true,
    message: msg,
    data: initialState,
    __type__: 'formAction',
  };
}

export function createFormActionRejected(
  message = '',
  initialState: any = null,
): ActionFormStateUiState {
  if (env.isDevelopment) {
    console.log(`\n========= 🚀\n ${message} 😅\n=========\n`);
  }

  return {
    isSuccess: false,
    isError: true,
    message,
    data: initialState,
    __type__: 'formAction',
  };
}

export function createActionFormStateUiState(): ActionFormStateUiState {
  return {
    isError: false,
    isSuccess: false,
    data: null,
    message: '',
    __type__: 'formAction',
  };
}

export function createActionStateUiState(): ActionStateUiState {
  return {
    isError: false,
    isSuccess: false,
    data: null,
    message: '',
    __type__: 'action',
  };
}

export function createSafeAction<P = void, D = null>(
  serverAction: CreateSafeActionCallback<P, D>,
  initialState?: D,
): CreateSafeAction<P, D> {
  return async (params: P) => {
    try {
      const data = await serverAction(params);

      if (data) {
        return createActionResolveWithData(data);
      }

      return createActionResolve();
    } catch (err) {
      return createActionRejectedWithError(err, initialState);
    }
  };
}

export function createSafeFormAction<P = void, D = void>(
  serverAction: CreateSafeActionCallback<P, D>,
  initialState?: D,
): CreateSafeFormAction<P, D> {
  return async (_: P, params: P) => {
    try {
      const data = await serverAction(params);

      if (data) {
        return createFormActionResolveWithData(data);
      }

      return createFormActionResolve();
    } catch (err) {
      return createFormActionRejectedWithError(err, initialState);
    }
  };
}
