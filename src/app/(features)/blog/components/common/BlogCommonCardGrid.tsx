'use client';
import { BlogPostModel } from '@domain/uiStates';
import { BlogCommonCard } from './BlogCommonCard';
import { BlogCommonCardSkeleton } from './BlogCommonCardSkeleton';
import { BlogCommonPostEmpty } from './BlogCommonPostEmpty';

interface BlogCommonCardGridProps {
  loading: boolean;
  title: string;
  posts: BlogPostModel[];
}

export function BlogCommonCardGrid({
  posts,
  title = 'All Post',
  loading,
}: BlogCommonCardGridProps) {
  const shouldPostCardRender = posts.length > 0;

  return (
    <section className="w-full mx-auto px-2">
      <h2 className="text-xl font-bold text-secondary-900 sm:text-2xl mb-8">
        {title}
      </h2>
      {shouldPostCardRender ? (
        <div className="lg:col-span-12 mx-auto">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:gap-y-12 xl:grid-cols-3">
            {posts.map((post) =>
              loading ? (
                <BlogCommonCardSkeleton key={post.id} />
              ) : (
                <BlogCommonCard key={post.id} {...post} />
              ),
            )}
          </div>
        </div>
      ) : (
        <BlogCommonPostEmpty />
      )}
    </section>
  );
}
