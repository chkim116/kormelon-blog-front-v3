import { Skeleton } from '@nextui-org/skeleton';
import { BlogCommonCardSkeleton } from './BlogCommonCardSkeleton';

interface BlogCommonCardGridSkeletonProps {
  length: number;
}

export function BlogCommonCardGridSkeleton({
  length,
}: BlogCommonCardGridSkeletonProps) {
  const renderSkeletons = Array.from({ length }, (_, i) => (
    <BlogCommonCardSkeleton key={i} />
  ));

  return (
    <section className="w-full mx-auto px-2">
      <Skeleton className="w-2/12 h-8 rounded-lg mb-8" />
      <div className="lg:col-span-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:gap-y-12 xl:grid-cols-3">
          {renderSkeletons}
        </div>
      </div>
    </section>
  );
}
