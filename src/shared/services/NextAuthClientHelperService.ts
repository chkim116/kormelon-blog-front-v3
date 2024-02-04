import { signIn, signOut } from 'next-auth/react';
import {
  AuthLoginUiParams,
  AuthRegisterUiParams,
} from '@shared/domains/auth/auth.uiState';

/**
 * next-auth가 지원하는 기능을 client에서 래핑하여 사용하기 위한 helper
 */
export interface NextAuthClientHelperService {
  signIn(params: AuthLoginUiParams): Promise<boolean>;
  signUp(params: AuthRegisterUiParams): Promise<boolean>;
  signOut(): Promise<void>;
}

export class NextAuthClientHelperServiceImpl
implements NextAuthClientHelperService
{
  async signUp(params: AuthRegisterUiParams) {
    const res = await signIn('credentials', {
      redirect: false,
      email: params.email,
      password: params.password,
      profileImage: params.profileImage,
      username: params.username,
    });

    if (res?.error) {
      throw new Error(res.error);
    }

    // 회원가입 성공
    return true;
  }

  async signIn(params: AuthLoginUiParams) {
    const { email, password } = params;

    const res = await signIn('credentials', {
      redirect: false,
      email: email,
      password: password,
    });

    if (res?.error) {
      throw new Error(res.error);
    }

    // 로그인 성공
    return true;
  }

  async signOut() {
    await signOut({ redirect: false });
  }
}
