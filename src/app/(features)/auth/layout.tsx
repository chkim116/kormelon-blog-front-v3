import { ReactNode } from 'react';
import AuthLayout from '@features/auth/components/AuthLayout';

interface AuthPageLayoutProps {
  children: ReactNode;
}

const AuthPageLayout = ({ children }: AuthPageLayoutProps) => (
  <AuthLayout>{children}</AuthLayout>
);

export default AuthPageLayout;
