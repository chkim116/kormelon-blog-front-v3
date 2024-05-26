import React, { ReactNode } from 'react';

interface BlogDetailContentLayoutProps {
  navComponent: ReactNode;
  contentComponent: ReactNode;
}

export const BlogDetailContentLayout = ({
  contentComponent,
  navComponent,
}: BlogDetailContentLayoutProps) => {
  const contentStyle = navComponent
    ? 'lg:flex-[0.9]'
    : 'flex justify-center lg:flex-1';

  return (
    <section id="blogContent" className="py-12 sm:py-16 lg:py-20">
      <div className="flex justify-center flex-col lg:flex-row items-start gap-y-12 gap-x-16">
        {navComponent && (
          <nav
            className="lg:sticky lg:flex-[0.3] lg:top-28"
            aria-label="게시글 컨텐츠 네비게이션"
          >
            {navComponent}
          </nav>
        )}

        <div className={contentStyle}>{contentComponent}</div>
      </div>
    </section>
  );
};
