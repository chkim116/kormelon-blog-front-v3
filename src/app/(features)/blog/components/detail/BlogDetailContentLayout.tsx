import React, { ReactNode } from 'react';

interface BlogDetailContentLayoutProps {
  navComponent: ReactNode;
  contentComponent: ReactNode;
}

export const BlogDetailContentLayout = ({
  contentComponent,
  navComponent,
}: BlogDetailContentLayoutProps) => (
  <section id="blogContent" className="py-12 sm:py-16 lg:py-20">
    <div className="grid grid-cols-1 items-start gap-y-12 gap-x-16 lg:grid-cols-12">
      <nav
        className="lg:sticky lg:col-span-3 lg:top-28"
        aria-label="게시글 컨텐츠 네비게이션"
      >
        {navComponent}
      </nav>
      <div className="lg:col-span-9">{contentComponent}</div>
    </div>
  </section>
);
