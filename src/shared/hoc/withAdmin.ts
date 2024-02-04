import { withAuth } from 'next-auth/middleware';
import { AuthRoleEnum } from '@core/entities';

export default withAuth({
  callbacks: {
    // jwt 콜백 함수로부터 반환 받은 token 객체의 userRole이 "admin" 인 경우, 접근 허용
    authorized: ({ token }) => token?.role === AuthRoleEnum.ADMIN,
  },
});
