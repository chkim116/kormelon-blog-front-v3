export enum AuthRoleEnum {
  /**
   * 일반 가입자
   */
  MEMBER = 'member',
  /**
   * 관리자
   */
  ADMIN = 'admin',
}

export interface AuthUserEntity {
  /**
   * 유저 식별자
   */
  id: string;
  /**
   * 유저 이메일
   */
  email: string;
  /**
   * 유저 프로필
   */
  profileImage: string;
  /**
   * 유저 닉네임
   */
  username: string;
  /**
   * 유저의 역할
   *
   * 멤버 or 관리자
   */
  role: AuthRoleEnum;
}

export interface AuthEntity {
  /**
   * 유저의 토큰
   */
  token: string;
  /**
   * 유저 정보
   */
  user: AuthUserEntity;
}

export interface AuthLoginParams {
  /**
   * 유저 이메일
   */
  email: string;
  /**
   * 유저 비밀번호
   */
  password: string;
}

export interface AuthRegisterParams extends AuthLoginParams {
  /**
   * 유저 프로필
   */
  profileImage: string;
  /**
   * 유저 닉네임
   */
  username: string;
}
