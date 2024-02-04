import { FileRepository } from '@core/repositories/file.repo.type';
import { NextAuthClientHelperService } from '@shared/services/NextAuthClientHelperService';
import { USER_PROFILE_IMAGE_TAG_NAME } from '@shared/constants/user.const';
import { AuthLoginUiParams, AuthRegisterUiParams } from './auth.uiState';

export interface AuthService {
  /**
   * 유저 로그인
   */
  login(params: AuthLoginUiParams): Promise<boolean>;
  /**
   * 유저 회원가입
   */
  register(params: AuthRegisterUiParams): Promise<boolean>;
  /**
   * 회원가입 시 프로필 이미지 업로드
   *
   * key - `file`로 File이 담겨있어야 한다.
   */
  profileUpload(fd: FormData): Promise<string>;
  /**
   * 유저 로그아웃
   */
  logout(): void;
}

export class AuthServiceImpl implements AuthService {
  constructor(
    private fileRepo: FileRepository,
    private nextAuthClientHelper: NextAuthClientHelperService,
  ) {}

  async login(params: AuthLoginUiParams) {
    return await this.nextAuthClientHelper.signIn(params);
  }

  async register(params: AuthRegisterUiParams) {
    return await this.nextAuthClientHelper.signUp(params);
  }

  async profileUpload(fd: FormData): Promise<string> {
    const { payload } = await this.fileRepo.uploadImage(
      fd,
      USER_PROFILE_IMAGE_TAG_NAME,
    );

    return payload;
  }

  async logout() {
    await this.nextAuthClientHelper.signOut();
  }
}
