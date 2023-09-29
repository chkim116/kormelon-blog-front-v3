import { ReactNode } from 'react';

interface AuthPageLayoutProps {
  children: ReactNode;
}

const AuthPageLayout = ({ children }: AuthPageLayoutProps) => (
  <section className="flex flex-col justify-center items-center h-[80vh]">
    <div className="max-w-sm p-2 w-full flex flex-col items-center justify-center h-full">
      {children}
    </div>
  </section>
);

export default AuthPageLayout;
