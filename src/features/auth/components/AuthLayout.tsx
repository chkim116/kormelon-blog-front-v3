import { ReactNode } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <section className="flex flex-col justify-center items-center h-[80vh]">
      <div className="max-w-sm p-2 w-full flex flex-col items-center justify-center h-full">
        {children}
      </div>
    </section>
  );
}
