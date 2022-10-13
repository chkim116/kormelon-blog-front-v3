import { STORAGE_TOKEN_KEY, STORAGE_USER_KEY } from '@common/constants';
import {
  AuthEntity,
  AuthLoginParams,
  AuthRegisterParams,
} from '@core/entities/auth.entity';
import { Response } from '@core/entities/common.entity';
import { apiClient } from '@core/network';
import { tokenProvider } from '@core/tokenProvider';

export const authRepository = {
  /**
   * 유저가 로그인한다.
   *
   * @param params
   * @returns
   */
  login(params: AuthLoginParams) {
    return apiClient.post<Response<AuthEntity>>('/auth/signin', params);
  },

  /**
   * 유저가 회원가입한다.
   *
   * @param params
   * @returns
   */
  register(params: AuthRegisterParams) {
    return apiClient.post<Response>('/auth/signup', params);
  },

  /**
   * 유저의 프로필 이미지를 업로드한다.
   *
   * @param file
   * @returns
   */
  uploadProfileImage(file: File) {
    const formData = new FormData();

    formData.append('image', file);

    return apiClient.post<Response<string>>('/auth/image', formData);
  },

  /**
   * 유저 로그아웃
   */
  logout() {
    tokenProvider().remove(STORAGE_TOKEN_KEY);
    tokenProvider().remove(STORAGE_USER_KEY);
  },
};
