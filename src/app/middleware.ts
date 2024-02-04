import { withAuth } from 'next-auth/middleware';
import { AuthRoleEnum } from '@core/entities';

export default withAuth({
  callbacks: {
    authorized: ({ token }) => token?.role === AuthRoleEnum.ADMIN,
  },
});

export const config = {
  matcher: ['/settings/:*', '/blog/write'],
};
