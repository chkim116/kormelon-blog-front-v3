import { createSlice } from '@reduxjs/toolkit';
import { UserEntity } from '@core/entities/auth.entity';
import { tokenProvider } from '@core/tokenProvider';
import {
  createInitialUser,
  createUserByLocalStorage,
} from '@shared/manipulates/auth.create';
import { effAuthLogin, effAuthRegister } from './auth.effect';

interface AuthSliceState {
  loading: boolean;
  isLogged: boolean;
  user: UserEntity;
}

function createAuthSliceState(): AuthSliceState {
  return {
    loading: false,
    isLogged: false,
    user: createInitialUser(),
  };
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: createAuthSliceState(),
  reducers: {
    logout(state) {
      state.isLogged = false;
      state.user = createInitialUser();
      tokenProvider().clear();
    },
    initialize(state) {
      state.user = createUserByLocalStorage();
      state.isLogged = Boolean(createUserByLocalStorage().id);
    },
  },
  extraReducers(builder) {
    builder.addCase(effAuthLogin.pending, (state) => {
      state.loading = true;
      state.isLogged = false;
    });
    builder.addCase(effAuthLogin.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.isLogged = true;
      state.user = payload;
    });
    builder.addCase(effAuthLogin.rejected, (state) => {
      state.loading = false;
      state.isLogged = false;
    });

    builder.addCase(effAuthRegister.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(effAuthRegister.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(effAuthRegister.rejected, (state) => {
      state.loading = false;
    });
  },
});
