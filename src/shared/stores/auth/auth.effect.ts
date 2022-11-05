import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserEntity } from '@core/entities/auth.entity';
import { repo } from '@core/repo';
import { tokenProvider } from '@core/tokenProvider';
import { STORAGE_TOKEN_KEY, STORAGE_USER_KEY } from '@common/constants';
import {
  AuthLoginParamsModel,
  AuthRegisterParamsModel,
} from '@features/auth/models/user.model';

export const effAuthLogin = createAsyncThunk<UserEntity, AuthLoginParamsModel>(
  'authLogin',
  async (params, { rejectWithValue }) => {
    try {
      const {
        data: { payload },
      } = await repo.auth.login(params);

      tokenProvider().set(STORAGE_TOKEN_KEY, payload.token);
      tokenProvider().set(STORAGE_USER_KEY, payload.user);

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
