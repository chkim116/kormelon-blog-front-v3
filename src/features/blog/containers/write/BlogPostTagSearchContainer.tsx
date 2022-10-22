import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { BlogPostCreateParams, TagEntity } from '@core/entities';
import { repo } from '@core/repo';
import { PostTagSearch } from '@features/blog/components/write';

function makeNextTags(prev: TagEntity[], newTag: TagEntity) {
  if (!prev.length) {
    return [newTag];
  }

  if (prev.some((item) => newTag.id === item.id)) {
    return prev.filter((item) => item.id !== newTag.id);
  }

  return [...prev, newTag];
}

interface BlogPostTagSearchContainerProps {
  selectedTags: TagEntity[];
  onChange: (dto: Partial<BlogPostCreateParams>) => void;
}

export const BlogPostTagSearchContainer = ({
  selectedTags: outSelectedTags,
  onChange,
}: BlogPostTagSearchContainerProps) => {
  const [searchedTags, setSearchedTags] = useState<TagEntity[]>([]);
  const [selectedTags, setSelectedTags] =
    useState<TagEntity[]>(outSelectedTags);

  const debounced = useDebouncedCallback(async (text: string) => {
    const {
      data: { payload },
    } = await repo.tag.getTagByValue(text);

    const searchTags = payload.filter(
      (item) => !selectedTags.some((tag) => tag.id === item.id),
    );

    setSearchedTags(searchTags.length ? searchTags : [{ id: -1, value: text }]);
  }, 300);

  const handleSearch = (text: string) => {
    debounced(text);
  };

  const handleTagDelete = (id: number) => {
    setSelectedTags((prev) => {
      const newTags = prev.filter((item) => item.id !== id);

      onChange({ tags: newTags.map((tag) => tag.id) });
      return newTags;
    });
  };

  const handleSelect = async (tag: TagEntity) => {
    if (tag?.id === -1) {
      const {
        data: { payload },
      } = await repo.tag.createTag(tag.value);

      setSelectedTags((prev) => {
        const newTags = makeNextTags(prev, payload);

        onChange({ tags: newTags.map((tag) => tag.id) });
        return newTags;
      });

      return;
    }

    if (tag) {
      setSelectedTags((prev) => {
        const newTags = makeNextTags(prev, tag);

        onChange({ tags: newTags.map((tag) => tag.id) });
        return newTags;
      });
    }
  };

  useEffect(() => {
    setSelectedTags(outSelectedTags);
  }, [outSelectedTags]);

  return (
    <PostTagSearch
      searchedTags={searchedTags}
      selectedTags={selectedTags}
      onSearch={handleSearch}
      onDelete={handleTagDelete}
      onSelect={handleSelect}
    />
  );
};
