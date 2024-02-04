import { BlogSearchUiState } from '@features/blog/domains/search/blogSearch.uiState';
import { BlogCommonCard } from './BlogCommonCard';
import { BlogCommonPostEmpty } from './BlogCommonPostEmpty';

interface BlogCommonCardGridProps {
  title: string;
  blogs: BlogSearchUiState[];
}

export function BlogCommonCardGrid({
  blogs,
  title = 'All Post',
}: BlogCommonCardGridProps) {
  const shouldPostCardRender = blogs.length > 0;

  return (
    <section className="w-full mx-auto px-2">
      <h2 className="text-xl font-bold text-secondary-900 sm:text-2xl mb-8">
        {title}
      </h2>
      {shouldPostCardRender ? (
        <div className="lg:col-span-12 mx-auto">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-y-12 lg:grid-cols-3">
            {blogs.map((post) => (
              <BlogCommonCard key={post.id} {...post} />
            ))}
          </div>
        </div>
      ) : (
        <BlogCommonPostEmpty />
      )}
    </section>
  );
}
