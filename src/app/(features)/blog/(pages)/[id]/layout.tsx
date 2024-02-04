import { ReactNode } from 'react';

interface BlogDetailLayoutProps {
  children: ReactNode;
  comment: ReactNode;
  others: ReactNode;
}

const BlogDetailLayout = ({
  children,
  comment,
  others,
}: BlogDetailLayoutProps) => (
  <div className="max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
    {children}
    {comment}
    {others}
  </div>
);

export default BlogDetailLayout;
