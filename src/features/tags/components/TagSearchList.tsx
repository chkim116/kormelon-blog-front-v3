'use client';
import NextLink from 'next/link';
import { Chip } from '@nextui-org/react';
import { LucideIcon } from '@common/components/LucideIcon';
import { TagSearchWithPostCountUiState } from '@shared/domains/tag/tag.uiState';

interface TagSearchListProps {
  tags: TagSearchWithPostCountUiState[];
}

export const TagSearchList = ({ tags }: TagSearchListProps) => (
  <section className="py-20 px-4">
    <h1 className="text-center text-2xl">태그 목록</h1>
    <div className="flex flex-wrap my-6 gap-1 justify-center">
      {tags.map((tag) => (
        <Chip
          className="mx-1 p-2"
          as={NextLink}
          key={tag.id}
          href={`/search/tags?tagId=${tag.id}&tagValue=${tag.value}`}
          startContent={<LucideIcon name="tag" size={16} />}
          variant="bordered"
        >
          {tag.value}
          {` (${tag.posts.length})`}
        </Chip>
      ))}
    </div>
  </section>
);
