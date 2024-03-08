'use client';

import NextLink from 'next/link';
import { Button } from '@nextui-org/react';
import { LucideIcon } from '@common/components/LucideIcon';
import { BlogSearchPrivateUiState } from '@features/blog/domains/search/blogSearch.uiState';
import { BlogCommonCard } from '../common/BlogCommonCard';
import { BlogCommonPostEmpty } from '../common/BlogCommonPostEmpty';

interface BlogPrivatePostProps {
  privatePosts: BlogSearchPrivateUiState[];
  privateTotal: number;
  onDelete: (id: number) => void;
}

export const BlogPrivatePost = ({
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
            {privatePosts.map((post) => (
              <div key={post.id} className="flex-col relative">
                <div className="opacity-40 shadow-md">
                  <BlogCommonCard {...post} />
                </div>
                <div className="rounded-lg flex gap-2 justify-center items-center absolute w-full h-full z-10 left-0 top-0">
                  <Button
                    color="primary"
                    size="lg"
                    as={NextLink}
                    href={`/blog/write?editId=${post.id}&isPrivate=true`}
                  >
                    <LucideIcon name="pencil" />
                  </Button>
                  <Button
                    color="danger"
                    size="lg"
                    onClick={handleDeleteCurried(post.id)}
                  >
                    <LucideIcon name="trash" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <BlogCommonPostEmpty />
      )}
    </section>
  );
};
