import { faker } from '@faker-js/faker';
import { HttpError } from '@core/network/HttpError';
import {
  createMockFunctionWithRejectedValue,
  createMockFunctionWithResolvedValue,
} from '@fixtures/tests/mock.utils';
import { NextAuthClientHelperService } from '@shared/services/NextAuthClientHelperService';
import { FileRepository } from '@core/repositories/file.repo.type';
import { USER_PROFILE_IMAGE_TAG_NAME } from '@shared/constants/user.const';
import { AuthServiceImpl } from '../auth.service';
import { AuthLoginUiParams, AuthRegisterUiParams } from '../auth.uiState';
import {
  createAuthLoginUiParams,
  createAuthRegisterUiParams,
} from '../auth.create';

const fileRepository: FileRepository = {
  uploadImage: jest.fn(),
};

const nextAuthClientHelper: NextAuthClientHelperService = {
  signIn: jest.fn(),
  signUp: jest.fn(),
  signOut: jest.fn(),
};

const authService = new AuthServiceImpl(fileRepository, nextAuthClientHelper);

describe('AuthService 성공 케이스', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('유저 로그인', async () => {
    const params: AuthLoginUiParams = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    await authService.login(params);

    expect(nextAuthClientHelper.signIn).toHaveBeenCalledWith(params);
  });

  it('유저 회원가입', async () => {
    const params: AuthRegisterUiParams = {
      username: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.string.alphanumeric(),
      profileImage: faker.image.dataUri(),
    };

    await authService.register(params);
    expect(nextAuthClientHelper.signUp).toHaveBeenCalledWith(params);
  });

  it('유저 이미지 업로드', async () => {
    const result = 'uploadedImage';
    fileRepository.uploadImage = createMockFunctionWithResolvedValue(result);

    const file = new File([result], 'profile.jpg', {
      type: 'image/jpeg',
    });
    const fd = new FormData();
    fd.append('image', file);

    const imageUrl = await authService.profileUpload(fd);

    expect(fileRepository.uploadImage).toHaveBeenCalledWith(
      fd,
      USER_PROFILE_IMAGE_TAG_NAME,
    );
    expect(imageUrl).toEqual(result);
  });

  it('유저 로그아웃', () => {
    authService.logout();

    expect(nextAuthClientHelper.signOut).toHaveBeenCalled();
  });
});

describe('AuthService 실패 케이스', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('유저 로그인 요청 실패', async () => {
    nextAuthClientHelper.signIn = createMockFunctionWithRejectedValue(
      new HttpError('에러 발생', 401),
    );

    const params = createAuthLoginUiParams();
    await expect(() => authService.login(params)).rejects.toMatchObject({
      message: '에러 발생',
      errorType: 'auth',
    });
  });

  it('유저 회원가입 요청 실패', async () => {
    nextAuthClientHelper.signUp = createMockFunctionWithRejectedValue(
      new HttpError('에러 발생'),
    );
    const params = createAuthRegisterUiParams();

    await expect(() => authService.register(params)).rejects.toMatchObject({
      message: '에러 발생',
    });
  });

  it('유저 이미지 업로드 요청 실패', async () => {
    fileRepository.uploadImage = createMockFunctionWithRejectedValue(
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
