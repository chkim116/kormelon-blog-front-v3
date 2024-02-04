import { faker } from '@faker-js/faker';
import {
  AuthLoginParams,
  AuthRegisterParams,
  AuthRoleEnum,
  AuthUserEntity,
} from '@core/entities';
import prisma from '@core/lib/prisma';
import { prismaResolveHandler } from '@core/network/payloadHandler';
import { createHashPassword } from '@core/lib/createHashPassword';
import { AuthRepository } from './auth.repo.type';

export class AuthRepositoryImpl implements AuthRepository {
  async findUserId(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (user) {
      const result: AuthUserEntity = {
        id: user.id,
        email: user.email,
        username: user.username,
        profileImage: user.profileImage,
        role: user.role as AuthRoleEnum,
      };

      return prismaResolveHandler(result);
    }

    return prismaResolveHandler(null);
  }

  async findUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      const result: AuthUserEntity = {
        id: user.id,
        email: user.email,
        username: user.username,
        profileImage: user.profileImage,
        role: user.role as AuthRoleEnum,
      };

      return prismaResolveHandler(result);
    }

    return prismaResolveHandler(null);
  }

  async signIn(params: AuthLoginParams) {
    const user = await prisma.user.findUnique({
      where: {
        email: params.email,
      },
    });

    if (user === null) {
      throw new Error('가입한 이메일을 찾을 수 없습니다.');
    }

    const { compare } = await createHashPassword(params.password);

    if (!(await compare(user.password))) {
      throw new Error('비밀번호가 일치하지 않습니다.');
    }

    const result: AuthUserEntity = {
      id: user.id,
      email: user.email,
      username: user.username,
      profileImage: user.profileImage,
      role: user.role as AuthRoleEnum,
    };

    return prismaResolveHandler(result);
  }

  async signUp(params: AuthRegisterParams) {
    const { payload } = await this.findUserByEmail(params.email);

    const isAlreadyExist = payload !== null;

    if (isAlreadyExist) {
      throw new Error('이미 가입한 이메일 입니다.');
    }

    const { hash } = await createHashPassword(params.password);
    const hashPassword = await hash();

    const user = await prisma.user.create({
      data: {
        email: params.email,
        password: hashPassword,
        username: params.email.split('@')[0],
        profileImage: params.profileImage || faker.image.avatar(),
      },
    });

    const result: AuthUserEntity = {
      id: user.id,
      email: user.email,
      username: user.username,
      profileImage: user.profileImage,
      role: user.role as AuthRoleEnum,
    };

    return prismaResolveHandler(result);
  }
}

export const authRepository = new AuthRepositoryImpl();
