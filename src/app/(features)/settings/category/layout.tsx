import { ReactNode } from 'react';

interface SettingsCategoryLayoutProps {
  children: ReactNode;
}

export default function SettingsCategoryLayout({
  children,
}: SettingsCategoryLayoutProps) {
  return (
    <section className="max-3-xl w-full mx-auto p-6 sm:p-12">
      {children}
    </section>
  );
}
