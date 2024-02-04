import {
  AuthLoginParams,
  AuthRegisterParams,
  AuthUserEntity,
  PromisePrismaResolveResponse,
} from '@core/entities';

export interface AuthRepository {
  /**
   * 유저 정보를 이메일로 찾는다.
   *
   * @param email 이메일
   */
  findUserByEmail(
    email: string,
  ): PromisePrismaResolveResponse<AuthUserEntity | null>;

  /**
   * 유저 정보를 식별자로 찾는다.
   *
   * @param id
   */
  findUserId(
    email: string,
  ): PromisePrismaResolveResponse<AuthUserEntity | null>;

  /**
   * 유저 로그인
   *
   * @param params
   */
  signIn(params: AuthLoginParams): PromisePrismaResolveResponse<AuthUserEntity>;

  /**
   * 유저 회원가입
   *
   * @param params
   */
  signUp(
    params: AuthRegisterParams,
  ): PromisePrismaResolveResponse<AuthUserEntity>;
}
