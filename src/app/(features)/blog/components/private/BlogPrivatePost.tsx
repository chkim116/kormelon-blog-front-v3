import { Delete, Edit } from '@mui/icons-material';
import NextLink from 'next/link';
import { Button } from '@nextui-org/react';
import { BlogPostModel } from '@domain/uiStates';
import { BlogCommonCard } from '../common/BlogCommonCard';
import { BlogCommonCardSkeleton } from '../common/BlogCommonCardSkeleton';
import { BlogCommonPostEmpty } from '../common/BlogCommonPostEmpty';

interface BlogPrivatePostProps {
  loading: boolean;
  privatePosts: BlogPostModel[];
  privateTotal: number;
  onDelete: (id: number) => void;
}

export const BlogPrivatePost = ({
  loading,
  privatePosts,
  privateTotal,
  onDelete,
}: BlogPrivatePostProps) => {
  const shouldPostCardRender = privatePosts.length > 0;

  const handleDeleteCurried = (id: number) => () => {
    onDelete(id);
  };

  return (
    <section className="max-w-6xl w-full mx-auto p-10">
      <h2 className="text-xl font-bold text-secondary-900 sm:text-2xl mb-8">
        총 {privateTotal}개의 비밀글
      </h2>
      {shouldPostCardRender ? (
        <div className="lg:col-span-12 mx-auto">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:gap-y-12 xl:grid-cols-3">
            {privatePosts.map((post) =>
              loading ? (
                <BlogCommonCardSkeleton key={post.id} />
              ) : (
                <div key={post.id} className="flex-col relative">
                  <BlogCommonCard {...post} />
                  <div className="rounded-lg flex gap-2 justify-center items-center absolute w-full h-full z-10 left-0 top-0">
                    <Button
                      color="primary"
                      size="lg"
                      as={NextLink}
                      href={`/blog/write?edit=${post.id}&isPrivate=true`}
                    >
                      <Edit />
                    </Button>
                    <Button
                      color="danger"
                      size="lg"
                      onClick={handleDeleteCurried(post.id)}
                    >
                      <Delete />
                    </Button>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      ) : (
        <BlogCommonPostEmpty />
      )}
    </section>
  );
};
