import { createSlice } from '@reduxjs/toolkit';
import {
  createInitialUser,
  createUserByLocalStorage,
} from '@domain/manipulates';
import { repo } from '@server/repo';
import { UserEntity } from '@server/entities';
import {
  actAuthCheck,
  actAuthLogout,
  effAuthLogin,
  effAuthRegister,
} from './auth.effect';

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
    /**
     * @deprecated actAuthLogout 사용
     */
    logout(state) {
      repo.auth.logout();
      state.isLogged = false;
      state.user = createInitialUser();
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

    builder.addCase(actAuthCheck, (state, { payload }) => {
      state.user = payload;
    });
    builder.addCase(actAuthLogout, (state) => {
      state.user = createInitialUser();
      state.isLogged = false;
    });
  },
});
