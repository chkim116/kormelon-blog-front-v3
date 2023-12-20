import { AuthRepository } from '../repositories/auth.repo.type';
import {
  AuthLoginUiParams,
  AuthRegisterUiParams,
  AuthUserUiState,
} from './auth.uiState';
import { createAuthUserUiState } from './auth.create';

export interface AuthService {
  /**
   * 유저 로그인
   */
  login(params: AuthLoginUiParams): Promise<AuthUserUiState>;
  /**
   * 유저 회원가입
   */
  register(params: AuthRegisterUiParams): Promise<void>;
  /**
   * 회원가입 시 프로필 이미지 업로드
   *
   * key - `image`로 File이 담겨있어야 한다.
   */
  profileUpload(fd: FormData): Promise<string>;
  /**
   * 유저 로그아웃
   */
  logout(): void;
  /**
   * 유저 정보 확인
   */
  check(): Promise<AuthUserUiState>;
}

export class AuthServiceImpl implements AuthService {
  constructor(private authRepo: AuthRepository) {}

  async login(params: AuthLoginUiParams): Promise<AuthUserUiState> {
    const {
      payload: { user, token },
    } = await this.authRepo.login(params);

    this.authRepo.setToken(user, token);

    return user;
  }

  async register(params: AuthRegisterUiParams): Promise<void> {
    await this.authRepo.register(params);

    return;
  }

  async profileUpload(fd: FormData): Promise<string> {
    const { payload } = await this.authRepo.uploadProfileImage(fd);

    return payload;
  }

  logout(): void {
    this.authRepo.logout();
  }

  async check(): Promise<AuthUserUiState> {
    const user = await this.authRepo.check();

    return user || createAuthUserUiState();
  }
}
