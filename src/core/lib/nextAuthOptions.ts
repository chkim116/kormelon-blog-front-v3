import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { AuthUserEntity } from '@core/entities';
import { env } from '@core/env';
import { authRepository } from '@core/repositories/auth.repo';
import prisma from './prisma';

declare module 'next-auth/jwt' {
  interface JWT extends AuthUserEntity {}
}

declare module 'next-auth' {
  export interface Session {
    user: AuthUserEntity;
  }
}

export const nextAuthOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        // 타입을 위해 설정
        email: {},
        password: {},
        profileImage: {},
        username: {},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('이메일과 비밀번호를 입력해주세요.');
        }

        const isSignUpMode = credentials?.username && credentials?.profileImage;

        // sign up
        if (isSignUpMode) {
          try {
            const { payload: newUser } = await authRepository.signUp(
              credentials,
            );

            return newUser;
          } catch (err) {
            throw new Error((err as Error).message);
          }
        }

        // sign in
        try {
          const { payload: user } = await authRepository.signIn(credentials);

          return user;
        } catch (err) {
          throw new Error((err as Error).message);
        }
      },
    }),
  ],
  secret: env.nextAuthSecret,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          username: u.username,
          profileImage: u.profileImage,
          role: u.role,
        };
      }

      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id,
        username: token.username,
        profileImage: token.profileImage,
        role: token.role,
      };

      return session;
    },
  },
};
