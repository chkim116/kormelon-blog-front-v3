'use client';
import { Skeleton } from '@nextui-org/react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BlogSearchLandingContentSkeletonProps {}

export function BlogSearchLandingContentSkeleton(
  _: BlogSearchLandingContentSkeletonProps,
) {
  return (
    <section className="py-16 sm:py-20">
      <Skeleton className="mx-auto mt-3 h-12 w-1/3" />
    </section>
  );
}
