import { SyntheticEvent,KeyboardEventHandler, useState } from 'react';
import { LocalOfferOutlined, Search } from '@mui/icons-material';
import { Autocomplete, AutocompleteInputChangeReason, Box, Chip, InputLabel, Stack, TextField } from '@mui/material';
import { TagEntity } from '@core/entities';

interface PostTagSearchProps {
  searchedTags: TagEntity[];
  selectedTags: TagEntity[];
  onSearch: (text: string) => void;
  onDelete: (id: number) => void;
  onSelect: (tag: TagEntity) => void;
}

export const PostTagSearch = ({
  searchedTags = [],
  selectedTags = [],
  onSearch,
  onDelete,
  onSelect,
}: PostTagSearchProps) => {
  const [value, setValue] = useState<TagEntity>({id: 0, value: ''});

  const handleChange = (_: SyntheticEvent, value: string, reason :AutocompleteInputChangeReason) => {
    if (reason === 'reset') {
      return;
    }

    setValue({id: 0, value});
    onSearch(value);
  };

  const handleSelect = <T = TagEntity>(_: SyntheticEvent, value: T) => {
    setValue({id: 0, value: ''});
    onSelect(value as TagEntity);
  };

  const handleDeleteCurried = (id: number) => () => {
    onDelete(id);
  };

  const handleEnter: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    } 
  };

  return (
    <Box >
      <Box display="flex" gap={4} mt={4} >
        <InputLabel htmlFor='tag' sx={{width: '73px'}}>태그</InputLabel>
        <Autocomplete
          id="tag"
          value={value}
          sx={{ width: 300 }}
          disablePortal
          isOptionEqualToValue={(option, value) => option.value === value.value}
          getOptionLabel={(option) => option.value}
          options={searchedTags}
          noOptionsText="검색된 태그가 없습니다."
          onKeyDown={handleEnter}
          renderInput={(params) => (
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <Search />
                ),
              }}
              label="searching tag"
            />
          )}
          onInputChange={handleChange}
          onChange={handleSelect}
        />
      </Box>

      <Stack columnGap={1} rowGap={1} direction="row" mt={4} ml="110px" flexWrap="wrap">
        {selectedTags?.map((tag) => (
          <Chip
            onDelete={handleDeleteCurried(tag.id)}
            key={tag.id}
            icon={<LocalOfferOutlined fontSize="small" />}
            label={tag.value}
            variant="outlined"
            sx={{
              px: 1,
            }}
          />
        ))}
      </Stack>
    </Box>
  );
};
