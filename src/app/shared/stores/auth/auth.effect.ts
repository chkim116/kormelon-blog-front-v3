import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
  AuthLoginParamsModel,
  AuthRegisterParamsModel,
} from '@domain/uiStates';
import { repo } from '@server/repo';
import { UserEntity } from '@server/entities';
import {
  STORAGE_TOKEN_KEY,
  STORAGE_USER_KEY,
  tokenProvider,
} from '@core/storage';
import { createInitialUser } from '@domain/manipulates';

export const actAuthCheck = createAction('authCheck', () => {
  const user = tokenProvider.get<UserEntity>(STORAGE_USER_KEY);

  return {
    payload: user || createInitialUser(),
  };
});

export const actAuthLogout = createAction('authLogout', () => {
  repo.auth.logout();

  return {
    payload: undefined,
  };
});

export const effAuthLogin = createAsyncThunk<UserEntity, AuthLoginParamsModel>(
  'authLogin',
  async (params, { rejectWithValue }) => {
    try {
      const {
        data: { payload },
      } = await repo.auth.login(params);

      tokenProvider.set(STORAGE_TOKEN_KEY, payload.token);
      tokenProvider.set(STORAGE_USER_KEY, payload.user);

      return payload.user;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const effAuthRegister = createAsyncThunk<void, AuthRegisterParamsModel>(
  'authRegister',
  async (params, { rejectWithValue }) => {
    try {
      await repo.auth.register(params);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const effAuthProfileUpload = createAsyncThunk<string, File>(
  'authProfileUpload',
  async (file) => {
    const {
      data: { payload },
    } = await repo.auth.uploadProfileImage(file);

    return payload;
  },
);
