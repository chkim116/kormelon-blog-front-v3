import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useAppDispatch } from '@shared/stores';
import { effTagCreate, effTagSearchLoad } from '@shared/stores/tag';
import { BlogPostCreateParams, TagEntity } from '@server/entities';
import { BlogWriteTagSearch } from '@app/blog/components/write';

function makeNextTags(prev: TagEntity[], newTag: TagEntity) {
  if (!prev.length) {
    return [newTag];
  }

  if (prev.some((item) => newTag.id === item.id)) {
    return prev.filter((item) => item.id !== newTag.id);
  }

  return [...prev, newTag];
}

interface BlogWriteTagSearchClientContainerProps {
  selectedTags: TagEntity[];
  onChange: (dto: Partial<BlogPostCreateParams>) => void;
}

export const BlogWriteTagSearchClientContainer = ({
  selectedTags: outSelectedTags,
  onChange,
}: BlogWriteTagSearchClientContainerProps) => {
  const dispatch = useAppDispatch();

  const [searchedTags, setSearchedTags] = useState<TagEntity[]>([]);
  const [selectedTags, setSelectedTags] =
    useState<TagEntity[]>(outSelectedTags);

  const debounced = useDebouncedCallback(async (text: string) => {
    if (!text) {
      setSearchedTags([]);
      return;
    }

    const payload = await dispatch(effTagSearchLoad(text)).unwrap();

    const searchTags = payload.filter(
      (item) => !selectedTags.some((tag) => tag.id === item.id),
    );

    const isExist = searchTags.some(({ value }) => value === text);

    if (!isExist) {
      const newItem = {
        id: -1,
        value: text,
      };

      searchTags.unshift(newItem);
    }

    setSearchedTags(searchTags);
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
      const newTag = await dispatch(effTagCreate(tag.value)).unwrap();

      setSelectedTags((prev) => {
        const newTags = makeNextTags(prev, newTag);

        onChange({ tags: newTags.map((tag) => tag.id) });
        return newTags;
      });

      setSearchedTags([]);
      return;
    }

    if (tag) {
      setSelectedTags((prev) => {
        const newTags = makeNextTags(prev, tag);

        onChange({ tags: newTags.map((tag) => tag.id) });
        return newTags;
      });
    }
    setSearchedTags([]);
  };

  useEffect(() => {
    setSelectedTags(outSelectedTags);
  }, [outSelectedTags]);

  return (
    <BlogWriteTagSearch
      searchedTags={searchedTags}
      selectedTags={selectedTags}
      onSearch={handleSearch}
      onDelete={handleTagDelete}
      onSelect={handleSelect}
    />
  );
};
