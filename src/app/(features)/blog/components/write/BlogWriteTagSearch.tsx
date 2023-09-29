import {
  ChangeEventHandler,
  Key,
  KeyboardEventHandler,
  useRef,
  useState,
} from 'react';
import {
  SearchRounded,
  AddCircleRounded,
  CheckRounded,
} from '@mui/icons-material';
import { Chip, Input, Listbox, ListboxItem } from '@nextui-org/react';
import { TagEntity } from '@server/entities';
import { useClickAway } from '@shared/hooks';

interface BlogTagSearchProps {
  searchedTags: TagEntity[];
  selectedTags: TagEntity[];
  onSearch: (text: string) => void;
  onDelete: (id: number) => void;
  onSelect: (tag: TagEntity) => void;
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
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('');
  const selectedSets = new Set(selectedTags.map(({ value }) => value));

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setIsOpen(true);
    onSearch(e.target.value);
    setValue(e.target.value);
  };

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleSelect = (key: Key) => {
    const [id, value] = fromPrimaryKey(key);

    setIsOpen(false);
    setValue('');
    onSelect({ id, value });
  };

  // TODO: 키로 이동할 수 있도록
  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      if (e.key === 'ArrowDown') {
        //
      }

      if (e.key === 'ArrowUp') {
        //
      }
    }
  };

  const handleDeleteCurried = (id: number) => () => {
    onDelete(id);
  };

  const ref = useRef<HTMLUListElement | null>(null);

  useClickAway(ref, () => {
    setIsOpen(false);
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="my-6 flex-col gap-1">
        <div className="relative top-0 left-0 max-w-[208px] w-full">
          <Input
            label="태그검색"
            size="sm"
            variant="bordered"
            className="w-full"
            autoComplete="off"
            value={value}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            endContent={<SearchRounded />}
          />

          {isOpen && searchedTags.length > 0 && (
            <Listbox
              ref={ref}
              className="absolute top-13 w-full border rounded-md bg-white z-50"
              selectionMode="multiple"
              aria-label="태그검색리스트"
              tabIndex={0}
              onAction={handleSelect}
            >
              {searchedTags.map(({ id, value }) => (
                <ListboxItem
                  key={toPrimaryKey(id, value)}
                  className={selectedSets.has(value) ? 'bg-primary-100' : ''}
                  color={selectedSets.has(value) ? 'primary' : 'default'}
                  startContent={
                    id === NO_SEARCHED_TAG_ID &&
                    !selectedSets.has(value) && (
                      <AddCircleRounded className="w-3 h-3" />
                    )
                  }
                  endContent={
                    selectedSets.has(value) && (
                      <CheckRounded className="w-3 h-3" />
                    )
                  }
                >
                  {value}
                </ListboxItem>
              ))}
            </Listbox>
          )}
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
