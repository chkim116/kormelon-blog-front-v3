'use client';
import { Skeleton } from '@nextui-org/react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BlogDetailContentSkeletonProps {}

export function BlogDetailContentSkeleton(_: BlogDetailContentSkeletonProps) {
  return (
    <section className="pb-12 sm:pb-16 lg:pb-20">
      {/* 카테고리 - 서브카테고리 */}
      <div className="max-w-2xl mx-auto text-center mb-3 flex items-center justify-center gap-1">
        <Skeleton className="w-20 h-[24px]" />
        <Skeleton className="w-20 h-[24px]" />
      </div>

      {/* 타이틀 - 프리뷰 */}
      <div className="text-center max-w-2xl mx-auto break-all whitespace-pre-line">
        <Skeleton className="w-2/3 h-24 mx-auto" />
        <Skeleton className="mt-3 w-2/4 h-14 mx-auto" />
      </div>

      {/* 태그 */}
      <div className="flex flex-wrap my-6 gap-1 justify-center">
        <Skeleton className="mx-1 p-2 w-12 h-6" />
        <Skeleton className="mx-1 p-2 w-12 h-6" />
        <Skeleton className="mx-1 p-2 w-12 h-6" />
      </div>

      {/* 유저 정보 */}
      <div className="gap-2 sm:gap-3 flex-col text-center items-center justify-center">
        <Skeleton className="w-[180px] h-8 mx-auto" />

        <div className="flex gap-2 justify-center mt-4">
          <Skeleton className="w-40 h-5" />
          <Skeleton className="w-40 h-5" />
        </div>
      </div>

      <Skeleton className="max-w-[1080px] max-h-[720px] object-cover shadow-xl rounded-lg aspect-[16/9] relative overflow-hidden mt-12 sm:mt-16 lg:mt-20 mx-auto" />

      {/* 본문 */}
      <Skeleton className="my-12 sm:my-16 lg:my-20 w-full h-screen" />
    </section>
  );
}
