'use client';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { BlogWriteCreateUiParams } from '@domain/blog/write/blogWrite.uiState';
import { TagSearchUiState } from '@domain/tag/tag.uiState';
import {
  actTagsCreate,
  actTagsSearchLoad,
} from 'src/app/shared/actions/sharedTag.action';
import { useActionState } from 'src/app/shared/hooks/useActionState';
import { toast } from 'src/app/shared/services/ToastService';
import { BlogWriteTagSearch } from '@app/blog/components/write/BlogWriteTagSearch';

function makeNextTags(prev: TagSearchUiState[], newTag: TagSearchUiState) {
  if (!prev.length) {
    return [newTag];
  }

  if (prev.some((item) => newTag.id === item.id)) {
    return prev.filter((item) => item.id !== newTag.id);
  }

  return [...prev, newTag];
}

function isNoSearchTags(id: number) {
  return id === -1;
}

function createTagSearchUiState() {
  return {
    id: -1,
    value: '',
  };
}

interface BlogWriteTagSearchContainerClientProps {
  selectedTags: TagSearchUiState[];
  onChange: (dto: Partial<BlogWriteCreateUiParams>) => void;
}

export const BlogWriteTagSearchContainerClient = ({
  selectedTags: outSelectedTags,
  onChange,
}: BlogWriteTagSearchContainerClientProps) => {
  const { action: createTag } = useActionState(
    createTagSearchUiState(),
    actTagsCreate,
    {
      onError({ message }) {
        toast.open('error', message);
      },
    },
  );
  const { action: fetchTags } = useActionState([], actTagsSearchLoad, {
    onError({ message }) {
      toast.open('error', message);
    },
  });

  const [searchedTags, setSearchedTags] = useState<TagSearchUiState[]>([]);
  const [selectedTags, setSelectedTags] =
    useState<TagSearchUiState[]>(outSelectedTags);

  const debounced = useDebouncedCallback(async (text: string) => {
    if (!text) {
      setSearchedTags([]);
      return;
    }

    const searchPayload = await fetchTags(text);

    if (!searchPayload) {
      setSearchedTags([]);
      return;
    }

    const searchTags = searchPayload.filter(
      (item) => !selectedTags.some((tag) => tag.id === item.id),
    );
    const isExist = searchTags.some(({ value }) => value === text);

    if (!isExist) {
      const newItem = {
        ...createTagSearchUiState(),
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

      onChange({ tags: newTags });
      return newTags;
    });
  };

  const handleSelect = async (tag: TagSearchUiState) => {
    let newTag = tag;

    if (isNoSearchTags(tag.id)) {
      const createdTag = await createTag(tag.value);

      if (createdTag) {
        newTag = createdTag;
      }
    }

    const nextTag = makeNextTags(selectedTags, newTag);

    setSelectedTags(nextTag);
    setSearchedTags([]);

    onChange({ tags: nextTag });
  };

  useDeepCompareEffect(() => {
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
