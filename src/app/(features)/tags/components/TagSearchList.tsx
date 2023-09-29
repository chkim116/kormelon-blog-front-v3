import NextLink from 'next/link';
import { LocalOfferOutlined } from '@mui/icons-material';
import { Chip } from '@nextui-org/react';
import { TagWithPostModel } from '@domain/uiStates';

interface TagSearchListProps {
  tags: TagWithPostModel[];
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
          href={`/search?tagId=${tag.id}&tagValue=${tag.value}`}
          startContent={<LocalOfferOutlined fontSize="small" />}
          variant="bordered"
        >
          {tag.value}
          {tag.posts.length > 0 && ` (${tag.posts.length})`}
        </Chip>
      ))}
    </div>
  </section>
);
