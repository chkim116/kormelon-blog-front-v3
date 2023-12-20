import {
  AuthLoginParams,
  AuthEntity,
  AuthRegisterParams,
  Response,
  AuthUserEntity,
} from '@shared/entities';
import { authApiServer, baseApiServer } from '@core/server/apiServer';
import {
  getCookies,
  removeCookies,
  setCookies,
} from '@core/server/serverCookieProvider';
import { COOKIE_TOKEN_KEY, COOKIE_USER_KEY } from '@core/server/constatns';
import { AuthRepository } from './auth.repo.type';

export const POST_LOGIN_CACHE_TAG = 'login';

export class AuthRepositoryImpl implements AuthRepository {
  /**
   * 유저가 로그인한다.
   *
   * @param params
   * @returns
   */
  login(params: AuthLoginParams) {
    return baseApiServer<Response<AuthEntity>>('/auth/signin', {
      body: params,
      method: 'POST',
      next: {
        tags: [POST_LOGIN_CACHE_TAG],
      },
    });
  }

  /**
   * 유저가 회원가입한다.
   *
   * @param params
   * @returns
   */
  register(params: AuthRegisterParams) {
    return baseApiServer<Response>('/auth/signup', {
      body: params,
      method: 'POST',
    });
  }

  /**
   * 유저의 프로필 이미지를 업로드한다.
   *
   * @param fd FormData
   * @returns
   */
  uploadProfileImage(fd: FormData) {
    return authApiServer<Response<string>>('/auth/image', {
      method: 'POST',
      body: fd,
    });
  }

  /**
   * 유저 로그아웃
   */
  logout() {
    removeCookies(COOKIE_TOKEN_KEY);
    removeCookies(COOKIE_USER_KEY);
  }

  /**
   * 유저 쿠키에 저장
   */
  setToken(user: AuthUserEntity, token: string) {
    setCookies(COOKIE_TOKEN_KEY, token, {
      httpOnly: true,
      path: '/',
    });
    setCookies(COOKIE_USER_KEY, user, {
      httpOnly: true,
      path: '/',
    });
  }

  /**
   * 쿠키에 저장된 유저 정보를 확인하고 리턴
   */
  check() {
    return getCookies<AuthUserEntity>(COOKIE_USER_KEY);
  }
}

export const authRepository = new AuthRepositoryImpl();
