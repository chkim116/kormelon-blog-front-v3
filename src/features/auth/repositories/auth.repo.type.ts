import {
  AuthEntity,
  AuthLoginParams,
  AuthRegisterParams,
  AuthUserEntity,
  ResponseWithFetch,
} from '@shared2/entities';

export interface AuthRepository {
  /**
   * 유저가 로그인한다.
   *
   * @param params
   * @returns
   */
  login(params: AuthLoginParams): ResponseWithFetch<AuthEntity>;

  /**
   * 유저가 회원가입한다.
   *
   * @param params
   * @returns
   */
  register(params: AuthRegisterParams): ResponseWithFetch;

  /**
   * 유저의 프로필 이미지를 업로드한다.
   *
   * @param fd FormData
   * @returns
   */
  uploadProfileImage(fd: FormData): ResponseWithFetch<string>;

  /**
   * 유저 로그아웃
   */
  logout(): void;

  /**
   * 유저 쿠키에 저장
   */
  setToken(user: AuthUserEntity, token: string): void;

  /**
   * 쿠키에 저장된 유저 정보를 확인하고 리턴
   */
  check(): Promise<AuthUserEntity | undefined>;
}
