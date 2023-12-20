import { faker } from '@faker-js/faker';
import { AuthEntity, AuthUserEntity, AuthRoleEnum } from '@server/entities';
import { HttpError } from '@core/network/HttpError';
import {
  createMockFunctionWithRejectedValue,
  createMockFunctionWithResolvedValue,
} from '@fixtures/tests/mock.utils';
import { AuthRepository } from '@server/repositories/types/auth.repo.type';
import { AuthServiceImpl } from '../auth.service';
import { AuthLoginUiParams, AuthRegisterUiParams } from '../auth.uiState';
import {
  createAuthLoginUiParams,
  createAuthRegisterUiParams,
  createAuthUserUiState,
} from '../auth.create';

const authRepository: AuthRepository = {
  login: jest.fn(),
  register: jest.fn(),
  uploadProfileImage: jest.fn(),
  logout: jest.fn(),
  setToken: jest.fn(),
  check: jest.fn(),
};

const authService = new AuthServiceImpl(authRepository);

describe('AuthService 성공 케이스', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('유저 로그인', async () => {
    const response: AuthEntity = {
      token: 'testToken',
      user: {
        id: 'userId',
        profileImage: 'userProfile',
        username: 'username',
        role: AuthRoleEnum.MEMBER,
      },
    };
    authRepository.login = createMockFunctionWithResolvedValue(response);
    const params: AuthLoginUiParams = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const result = await authService.login(params);

    expect(authRepository.login).toHaveBeenCalledWith(params);
    expect(result).toEqual(response.user);
  });

  it('유저 회원가입', async () => {
    authRepository.register = createMockFunctionWithResolvedValue();
    const params: AuthRegisterUiParams = {
      username: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.string.alphanumeric(),
      profileImage: faker.image.dataUri(),
    };

    await authService.register(params);
    expect(authRepository.register).toHaveBeenCalledWith(params);
  });

  it('유저 이미지 업로드', async () => {
    const result = 'uploadedImage';
    authRepository.uploadProfileImage =
      createMockFunctionWithResolvedValue(result);

    const file = new File([result], 'profile.jpg', {
      type: 'image/jpeg',
    });
    const fd = new FormData();
    fd.append('image', file);

    const imageUrl = await authService.profileUpload(fd);

    expect(authRepository.uploadProfileImage).toHaveBeenCalledWith(fd);
    expect(imageUrl).toEqual(result);
  });

  it('유저 로그아웃', () => {
    authService.logout();

    expect(authRepository.logout).toHaveBeenCalled();
  });

  it('유저 권한 체크', async () => {
    const result: AuthUserEntity = {
      id: 'userId',
      username: 'username',
      profileImage: 'profileImage',
      role: AuthRoleEnum.MEMBER,
    };
    authRepository.check = jest.fn().mockReturnValue(result);

    const user = await authService.check();

    expect(user).toEqual(result);
  });

  it('유저 확인 시 반환 값이 없으면 초기 상태 값 반환', async () => {
    authRepository.check = jest.fn().mockReturnValue(null);

    const user = await authService.check();

    expect(user).toEqual(createAuthUserUiState());
  });
});

describe('AuthService 실패 케이스', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('유저 로그인 요청 실패', async () => {
    authRepository.login = createMockFunctionWithRejectedValue(
      new HttpError('에러 발생', 401),
    );

    const params = createAuthLoginUiParams();
    await expect(() => authService.login(params)).rejects.toMatchObject({
      message: '에러 발생',
      errorType: 'auth',
    });
  });

  it('유저 회원가입 요청 실패', async () => {
    authRepository.register = createMockFunctionWithRejectedValue(
      new HttpError('에러 발생'),
    );
    const params = createAuthRegisterUiParams();

    await expect(() => authService.register(params)).rejects.toMatchObject({
      message: '에러 발생',
    });
  });

  it('유저 이미지 업로드 요청 실패', async () => {
    authRepository.uploadProfileImage = createMockFunctionWithRejectedValue(
      new HttpError('에러 발생'),
    );
    const file = new File(['uploadedImage'], 'profile.jpg', {
      type: 'image/jpeg',
    });

    const fd = new FormData();
    fd.append('image', file);

    expect(() => authService.profileUpload(fd)).rejects.toMatchObject({
      message: '에러 발생',
    });
    // 파일이 없을 경우도 요청 실패
    expect(() =>
      authService.profileUpload(null as never),
    ).rejects.toMatchObject({
      message: '에러 발생',
    });
  });
});
