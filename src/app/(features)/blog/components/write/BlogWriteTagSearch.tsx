import { Key, useState } from 'react';
import { Autocomplete, AutocompleteItem, Chip } from '@nextui-org/react';
import { LucideIcon } from '@shared/components/common/Icon';
import { TagSearchUiState } from '@domain/tag/tag.uiState';

interface BlogTagSearchProps {
  searchedTags: TagSearchUiState[];
  selectedTags: TagSearchUiState[];
  onSearch: (text: string) => void;
  onDelete: (id: number) => void;
  onSelect: (tag: TagSearchUiState) => void;
}

const NO_SEARCHED_TAG_ID = -1;

const DIMETER = '_';

function toPrimaryKey(id: number, value: string) {
  return `${id}${DIMETER}${value}`;
}

function fromPrimaryKey(key: Key) {
  const str = String(key);
  const [id, value] = str.split(DIMETER);

  return [Number(id), value] as const;
}

export const BlogWriteTagSearch = ({
  searchedTags = [],
  selectedTags = [],
  onSearch,
  onDelete,
  onSelect,
}: BlogTagSearchProps) => {
  const [value, setValue] = useState('');
  const selectedSets = new Set(selectedTags.map(({ value }) => value));

  const handleChange = (value: string) => {
    setValue(value);
    onSearch(value);
  };

  const handleSelect = (key: Key) => {
    if (!value) {
      return;
    }

    const [id, tagValue] = fromPrimaryKey(key);

    setValue('');
    onSelect({ id, value: tagValue });
  };

  const handleDeleteCurried = (id: number) => () => {
    onDelete(id);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="my-6 flex-col gap-1">
        <div className="relative top-0 left-0 max-w-[208px] w-full">
          <Autocomplete
            size="sm"
            items={searchedTags}
            inputValue={value}
            variant="bordered"
            label="태그 검색"
            labelPlacement="inside"
            endContent={<LucideIcon name="search" />}
            onSelectionChange={handleSelect}
            onInputChange={handleChange}
          >
            {({ id, value }) => (
              <AutocompleteItem
                key={toPrimaryKey(id, value)}
                className={selectedSets.has(value) ? 'bg-primary-100' : ''}
                color={selectedSets.has(value) ? 'primary' : 'default'}
                startContent={
                  id === NO_SEARCHED_TAG_ID &&
                  !selectedSets.has(value) && (
                    <LucideIcon name="plus-circle" className="w-3 h-3" />
                  )
                }
                endContent={
                  selectedSets.has(value) && (
                    <LucideIcon name="check" className="w-3 h-3" />
                  )
                }
              >
                {value}
              </AutocompleteItem>
            )}
          </Autocomplete>
        </div>
      </div>

      <div className="mt-4 flex gap-1 flex-wrap">
        {selectedTags?.map((tag) => (
          <Chip
            key={tag.id}
            variant="bordered"
            onClose={handleDeleteCurried(tag.id)}
          >
            {tag.value}
          </Chip>
        ))}
      </div>
    </div>
  );
};
