import React, { ReactNode, forwardRef } from 'react';

interface BlogDetailCommentLayoutProps {
  children: ReactNode;
}

export const BlogDetailCommentLayout = forwardRef<
  HTMLElement,
  BlogDetailCommentLayoutProps
>(({ children }, ref) => (
  <section ref={ref} className="py-12 sm:py-16 lg:py-20">
    <h3 className="font-semibold p-1">Discussion</h3>
    {children}
  </section>
));

BlogDetailCommentLayout.displayName = 'BlogDetailCommentLayout';
