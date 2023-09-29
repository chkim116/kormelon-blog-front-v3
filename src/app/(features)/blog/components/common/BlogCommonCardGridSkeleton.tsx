'use client';
import { useMemo } from 'react';
import { BlogCommonCardSkeleton } from './BlogCommonCardSkeleton';

interface BlogCommonCardGridSkeletonProps {
  title: string;
  length: number;
}

export function BlogCommonCardGridSkeleton({
  title,
  length,
}: BlogCommonCardGridSkeletonProps) {
  const renderSkeletons = useMemo(
    () => Array.from({ length }, (_, i) => <BlogCommonCardSkeleton key={i} />),
    [length],
  );

  return (
    <section className="w-full mx-auto px-2">
      <h2 className="text-xl font-bold text-secondary-900 sm:text-2xl mb-8">
        {title}
      </h2>
      <div className="lg:col-span-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:gap-y-12 xl:grid-cols-3">
          {renderSkeletons};
        </div>
      </div>
    </section>
  );
}
